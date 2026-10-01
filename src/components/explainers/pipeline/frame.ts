import {
	clamp01,
	createAxis,
	fillBetween,
	smoothstep,
} from "@/components/explainers/shared"
import type { Axis } from "@/components/explainers/shared"
import type {
	PipelineLane,
	PipelineLaneId,
	PipelineMode,
	PipelineSpan,
} from "@/data/types"

import { recordFrom } from "@/lib/record"

import { layout } from "./geometry"
import type {
	Bar,
	Checkpoint,
	CheckpointId,
	Chip,
	FrameInput,
	LaneFrame,
	PipelineFrame,
	RoutingFrame,
	TokenTick,
	WaveBar,
} from "./types"

const laneCenter = (y: number) => y + layout.bar.height / 2

const reveal = (u: number, at: number) => clamp01((u - at) / layout.reveal)

const waveAmplitude = (i: number, count: number) => {
	const { textureA, textureB, textureC, textureScale, envelopePower } =
		layout.wave
	const texture =
		Math.abs(Math.sin(i * textureA) + textureB * Math.sin(i * textureC + 1)) /
		textureScale
	const envelope = Math.pow(
		Math.sin((Math.PI * (i + 0.5)) / count),
		envelopePower,
	)
	return layout.wave.minHeight + layout.wave.maxHeight * texture * envelope
}

const laneBars = (
	lane: PipelineLane,
	spans: PipelineSpan[],
	axis: Axis,
	u: number | null,
): Bar[] =>
	spans.map(([start, end]) => {
		const full = axis.x(end) - axis.x(start)
		const tiny = full < layout.bar.minWidth
		const shape = {
			y: lane.y,
			height: layout.bar.height,
			radius: layout.bar.radius,
		}
		if (u === null)
			return {
				x: axis.x(start),
				width: tiny ? layout.bar.minWidth : full,
				...shape,
			}
		const span = fillBetween(u, start, end, axis)
		const width = tiny && u >= start ? layout.bar.minWidth : span.width
		return { ...span, width, ...shape }
	})

const deriveLanes = (
	lanes: PipelineLane[],
	mode: PipelineMode,
	axis: Axis,
	u: number,
): LaneFrame[] =>
	lanes.map((lane) => {
		const spans = mode.spans[lane.id] ?? []
		return {
			id: lane.id,
			y: lane.y,
			color: lane.color,
			active: spans.length > 0,
			ghosts: laneBars(lane, spans, axis, null),
			fills: laneBars(lane, spans, axis, u),
		}
	})

const deriveWave = (
	span: PipelineSpan | undefined,
	laneY: number,
	axis: Axis,
	u: number,
): WaveBar[] => {
	if (!span) return []
	const [start, end] = span
	const { bars, width, boost, near, lit, dim } = layout.wave
	return Array.from({ length: bars }, (_, i) => {
		const p = start + ((i + 0.5) / bars) * (end - start)
		const nearPlayhead = u <= end + near && Math.abs(p - u) < near
		const height = waveAmplitude(i, bars) * (nearPlayhead ? boost : 1)
		return {
			x: axis.x(p) - width / 2,
			y: laneCenter(laneY) - height / 2,
			height,
			opacity: u >= p ? lit : dim,
		}
	})
}

const deriveTokenTicks = (
	span: PipelineSpan | undefined,
	firstToken: number | null,
	axis: Axis,
	u: number,
): TokenTick[] => {
	if (!span || firstToken === null) return []
	const [, end] = span
	const count = Math.floor((end - firstToken) / layout.tokens.step)
	return Array.from({ length: count }, (_, i) => {
		const p = firstToken + (i + 1) * layout.tokens.step
		return { x: axis.x(p), opacity: u >= p ? layout.tokens.opacity : 0 }
	})
}

const deriveChips = (
	mode: PipelineMode,
	originY: number,
	targetY: number,
	axis: Axis,
	u: number,
): Chip[] =>
	mode.sentences.map((sentence, index) => {
		const { drop, lead, hold, fade, height, inset } = layout.chip
		const progress = smoothstep(sentence.at, sentence.at + drop, u)
		const fromY = laneCenter(originY) - height / 2
		const toY = laneCenter(targetY) - height / 2
		const fadeIn = clamp01((u - (sentence.at - lead)) / drop)
		const fadeOut = 1 - clamp01((u - sentence.at - hold) / fade)
		return {
			index,
			x: axis.x(sentence.at) + inset,
			y: fromY + progress * (toY - fromY),
			opacity: fadeIn * fadeOut,
		}
	})

const deriveRouting = (
	mode: PipelineMode,
	axis: Axis,
	u: number,
): RoutingFrame => {
	const { routing, markers } = mode
	const stops: [CheckpointId, number | null][] = [
		["fastPath", routing.fastPathEnd],
		["llm", routing.llmStart],
	]
	const checkpoints: Checkpoint[] = stops.flatMap(([id, at]) =>
		at === null ? [] : [{ id, x: axis.x(at), opacity: reveal(u, at) }],
	)
	return {
		fastPathLabel: {
			x: axis.x(markers.sttFinal),
			opacity: reveal(u, routing.fastPathEnd),
		},
		checkpoints,
	}
}

const laneById = (lanes: PipelineLane[], id: PipelineLaneId) => {
	const lane = lanes.find((candidate) => candidate.id === id)
	if (!lane) throw new Error(`pipeline lane missing: ${id}`)
	return lane
}

const hasSpans = (mode: PipelineMode, id: PipelineLaneId) =>
	(mode.spans[id] ?? []).length > 0

export const deriveFrame = ({ data, turn, t }: FrameInput): PipelineFrame => {
	const { axis: axisData, lanes } = data
	const { mode, maxSeconds } = turn
	const axis = createAxis({
		x0: axisData.x0,
		width: axisData.width,
		max: maxSeconds,
	})
	const u = Math.min(maxSeconds, Math.max(0, t))
	const laneY = recordFrom(
		lanes.map((lane) => lane.id),
		(id) => laneById(lanes, id).y,
	)
	const chipOrigin = hasSpans(mode, "skill")
		? laneById(lanes, "skill")
		: hasSpans(mode, "llm")
			? laneById(lanes, "llm")
			: laneById(lanes, "routing")
	const gridStep =
		layout.grid.steps.find((step) => maxSeconds > step.above)?.seconds ??
		layout.grid.step

	return {
		axis,
		maxSeconds,
		ticks: axis.ticks(gridStep),
		lanes: deriveLanes(lanes, mode, axis, u),
		wave: deriveWave(mode.spans.mic?.[0], laneY.mic, axis, u),
		tokenTicks: deriveTokenTicks(
			mode.spans.llm?.[0],
			mode.markers.firstToken,
			axis,
			u,
		),
		chips: deriveChips(mode, chipOrigin.y, laneY.tts, axis, u),
		routing: deriveRouting(mode, axis, u),
		markers: {
			endOfSpeech: {
				x: axis.x(mode.markers.endOfSpeech),
				opacity: reveal(u, mode.markers.endOfSpeech),
			},
			firstToken:
				mode.markers.firstToken === null
					? null
					: {
							x: axis.x(mode.markers.firstToken),
							opacity: reveal(u, mode.markers.firstToken),
						},
			firstAudio: {
				x: axis.x(mode.markers.firstAudio),
				opacity: reveal(u, mode.markers.firstAudio),
			},
		},
		playhead: {
			x: axis.x(u),
			opacity: t > maxSeconds ? 0 : layout.playhead.opacity,
		},
		laneY,
	}
}
