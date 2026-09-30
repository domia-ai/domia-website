import {
	clamp01,
	createAxis,
	fillBetween,
	loopToTurn,
	smoothstep,
} from "@/components/explainers/shared"
import type { Axis } from "@/components/explainers/shared"
import type {
	PipelineLane,
	PipelineLaneId,
	PipelineMode,
	PipelineSpan,
} from "@/data/types"

import { layout } from "./geometry"
import { selectedMode } from "./selection"
import type {
	Bar,
	Checkpoint,
	CheckpointId,
	Chip,
	EpilogueFrame,
	FrameInput,
	LaneFrame,
	MindGlow,
	PipelineFrame,
	RoutingFrame,
	TokenTick,
	WaveBar,
} from "./types"

const laneCenter = (y: number) => y + layout.bar.height / 2

const rowCenter = (y: number) => y + layout.row.height / 2

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
	spans.map(([start, end], index) => {
		const rowY = lane.rows?.[index]
		const size = rowY === undefined ? layout.bar : layout.row
		const y = rowY ?? lane.y
		const full = axis.x(end) - axis.x(start)
		const tiny = full < layout.bar.minWidth
		if (u === null) {
			return {
				x: axis.x(start),
				width: tiny ? layout.bar.minWidth : full,
				y,
				height: size.height,
				radius: size.radius,
			}
		}
		const span = fillBetween(u, start, end, axis)
		const width = tiny && u >= start ? layout.bar.minWidth : span.width
		return { ...span, width, y, height: size.height, radius: size.radius }
	})

const deriveLanes = (
	lanes: PipelineLane[],
	mode: PipelineMode,
	fallback: PipelineMode,
	axis: Axis,
	u: number,
): LaneFrame[] =>
	lanes.map((lane) => {
		const own = mode.spans[lane.id] ?? []
		const active = own.length > 0
		const schedule = active ? own : (fallback.spans[lane.id] ?? [])
		return {
			id: lane.id,
			y: lane.y,
			color: lane.color,
			active,
			ghosts: laneBars(lane, schedule, axis, null),
			fills: active ? laneBars(lane, own, axis, u) : [],
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
	ttsLane: PipelineLane,
	kind: Chip["kind"],
	axis: Axis,
	u: number,
): Chip[] =>
	mode.sentences.map((sentence, index) => {
		const { drop, lead, hold, fade, height, inset } = layout.chip
		const progress = smoothstep(sentence.at, sentence.at + drop, u)
		const fromY = laneCenter(originY) - height / 2
		const rowY = ttsLane.rows?.[sentence.row] ?? ttsLane.y
		const toY = rowCenter(rowY) - height / 2
		const fadeIn = clamp01((u - (sentence.at - lead)) / drop)
		const fadeOut = 1 - clamp01((u - sentence.at - hold) / fade)
		return {
			index,
			kind,
			x: axis.x(sentence.at) + inset,
			y: fromY + progress * (toY - fromY),
			opacity: fadeIn * fadeOut,
		}
	})

const deriveRouting = (
	mode: PipelineMode,
	laneY: number,
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
		laneY,
		fastPathLabel: {
			x: axis.x(markers.sttFinal),
			opacity: reveal(u, routing.fastPathEnd),
		},
		checkpoints,
	}
}

const deriveMindGlow = (
	span: PipelineSpan | undefined,
	laneY: number,
	axis: Axis,
	u: number,
	t: number,
): MindGlow | null => {
	if (!span) return null
	const [start, end] = span
	const { glowRadius, pulse, base, amplitude, idle } = layout.mind
	const inside = u >= start && u <= end + layout.reveal
	const opacity = inside
		? base + amplitude * Math.sin(t * pulse)
		: u > end
			? idle
			: 0
	return { x: axis.x(start) + glowRadius, y: laneCenter(laneY), opacity }
}

const deriveEpilogue = (
	t: number,
	micReopenAt: number,
	reflectionAt: number,
): EpilogueFrame => {
	const { fade, dividerOpacity, ringGrow, ringOpacity, pulseRate, dot } =
		layout.epilogue
	const micOpacity = clamp01((t - micReopenAt) / fade)
	const pulse = (t * pulseRate) % 1
	return {
		dividerOpacity: micOpacity * dividerOpacity,
		micOpacity,
		ringRadius: dot + pulse * ringGrow,
		ringOpacity: (1 - pulse) * ringOpacity,
		reflectionOpacity: clamp01((t - reflectionAt) / fade),
	}
}

const laneById = (lanes: PipelineLane[], id: PipelineLaneId) => {
	const lane = lanes.find((candidate) => candidate.id === id)
	if (!lane) throw new Error(`pipeline lane missing: ${id}`)
	return lane
}

export const deriveFrame = ({
	data,
	selection,
	t,
	replay,
}: FrameInput): PipelineFrame => {
	const { axis: axisData, lanes, epilogue } = data
	const maxSeconds = replay ? replay.turn.maxSeconds : axisData.maxSeconds
	const sweepSeconds = replay ? replay.turn.maxSeconds : axisData.sweepSeconds
	const axis = createAxis({
		x0: axisData.x0,
		width: axisData.width,
		max: maxSeconds,
	})
	const u = loopToTurn(t, sweepSeconds, maxSeconds)
	const mode = replay ? replay.turn.mode : selectedMode(data, selection)
	const fallback = replay
		? replay.turn.mode
		: data.machines[selection.machine].modes.conversation

	const mic = laneById(lanes, "mic")
	const routing = laneById(lanes, "routing")
	const mind = laneById(lanes, "mind")
	const llm = laneById(lanes, "llm")
	const splitter = laneById(lanes, "splitter")
	const tts = laneById(lanes, "tts")

	const splitterActive = (mode.spans.splitter ?? []).length > 0
	const chipOrigin = splitterActive ? splitter : routing
	const chipKind = splitterActive ? "sentence" : "reply"

	const playheadOpacity =
		t < sweepSeconds
			? layout.playhead.opacity
			: Math.max(
					0,
					layout.playhead.opacity -
						(t - sweepSeconds) * layout.playhead.fadePerSecond,
				)
	const gridStep =
		maxSeconds > 8
			? layout.grid.step * 4
			: maxSeconds > 4
				? layout.grid.step * 2
				: layout.grid.step

	return {
		u,
		axis,
		ticks: axis.ticks(gridStep),
		lanes: deriveLanes(lanes, mode, fallback, axis, u),
		wave: deriveWave(mode.spans.mic?.[0], mic.y, axis, u),
		tokenTicks: deriveTokenTicks(
			mode.spans.llm?.[0],
			mode.markers.firstToken,
			axis,
			u,
		),
		chips: deriveChips(mode, chipOrigin.y, tts, chipKind, axis, u),
		routing: deriveRouting(mode, routing.y, axis, u),
		mindGlow: deriveMindGlow(mode.spans.mind?.[0], mind.y, axis, u, t),
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
		playhead: { x: axis.x(u), opacity: playheadOpacity },
		epilogue: replay
			? deriveEpilogue(0, epilogue.micReopenAt, epilogue.reflectionAt)
			: deriveEpilogue(t, epilogue.micReopenAt, epilogue.reflectionAt),
		laneY: {
			mic: mic.y,
			stt: laneById(lanes, "stt").y,
			routing: routing.y,
			mind: mind.y,
			llm: llm.y,
			splitter: splitter.y,
			tts: tts.y,
			hear: laneById(lanes, "hear").y,
		},
	}
}
