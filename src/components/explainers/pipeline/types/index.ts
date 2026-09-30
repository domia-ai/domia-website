import type { SectionTone } from "@/components/sections"
import type { Axis, AxisTick, FillSpan } from "@/components/explainers/shared"
import type {
	PipelineData,
	PipelineLaneColor,
	PipelineLaneId,
	PipelineMachineId,
	PipelineModeId,
	ReplayData,
	ReplayId,
	ReplayTurn,
} from "@/data/types"

import type { getTranslations } from "next-intl/server"

export type PipelineTranslator = Awaited<ReturnType<typeof getTranslations>>

export type CheckpointId = "fastPath" | "llm"

export type LaneCopy = {
	label: string
	sub: string | null
	note: Record<PipelineMachineId, string>
	tip: string
}

export type ByMode<T> = { conversation: T; command?: T }

export type ByMachineAndMode<T> = Record<PipelineMachineId, ByMode<T>>

export type PipelineCopy = {
	title: string
	intro: string
	stageLabel: string
	headline: ByMachineAndMode<string>
	source: ByMachineAndMode<string>
	link: string
	legend: { audio: string; model: string; fastPath: string }
	lanes: Record<PipelineLaneId, LaneCopy>
	markers: {
		endOfSpeech: { title: string; note: string }
		firstToken: string
		firstAudio: {
			title: string
			note: ByMachineAndMode<string>
		}
	}
	routing: {
		fastPath: string
		checkpoints: Record<CheckpointId, string>
		reply: string
		sentences: string[]
	}
	toggles: {
		machine: { label: string; items: Record<PipelineMachineId, string> }
		mode: { label: string; items: Record<PipelineModeId, string> }
	}
	controls: { play: string; pause: string; scrub: string }
	clock: { unit: string; intoTurn: string; afterTurn: string }
	epilogue: {
		divider: string
		micReopen: string
		bargeIn: string
		reflectionTitle: string
		reflectionBody: string
		reflectionAside: string
	}
	footer: string[]
	hints: { heading: string }
	stacked: {
		skipped: string
	}
	noscript: { heading: string }
	replay: ReplayCopy
}

export type PipelineSelection = {
	machine: PipelineMachineId
	mode: PipelineModeId
}

export type PipelineExplainerProps = {
	tone?: SectionTone
}

export type PipelineIslandProps = {
	data: PipelineData
	replay: ReplayData
	copy: PipelineCopy
}

export type PipelineStackedProps = {
	data: PipelineData
	copy: PipelineCopy
	selection: PipelineSelection
}

export type LaneLabelsProps = {
	data: PipelineData
	copy: PipelineCopy
	selection: PipelineSelection
	frame: PipelineFrame
}

export type CanvasProps = {
	data: PipelineData
	copy: PipelineCopy
	selection: PipelineSelection
	frame: PipelineFrame
}

export type LegendProps = {
	copy: PipelineCopy
}

export type HeadlineProps = {
	copy: PipelineCopy
	selection: PipelineSelection
	override: string | null
}

export type FooterChipsProps = {
	copy: PipelineCopy
}

export type SourceCaptionProps = {
	copy: PipelineCopy
	selection: PipelineSelection
	override: string | null
}

export type FrameInput = {
	data: PipelineData
	selection: PipelineSelection
	t: number
	replay?: ReplayFrameInput
}

export type Bar = FillSpan & {
	y: number
	height: number
	radius: number
}

export type LaneFrame = {
	id: PipelineLaneId
	y: number
	color: PipelineLaneColor
	active: boolean
	ghosts: Bar[]
	fills: Bar[]
}

export type WaveBar = {
	x: number
	y: number
	height: number
	opacity: number
}

export type TokenTick = {
	x: number
	opacity: number
}

export type ChipKind = "sentence" | "reply"

export type Chip = {
	index: number
	kind: ChipKind
	x: number
	y: number
	opacity: number
}

export type Checkpoint = {
	id: CheckpointId
	x: number
	opacity: number
}

export type Marker = {
	x: number
	opacity: number
}

export type RoutingFrame = {
	laneY: number
	fastPathLabel: Marker
	checkpoints: Checkpoint[]
}

export type MindGlow = {
	x: number
	y: number
	opacity: number
}

export type PlayheadFrame = {
	x: number
	opacity: number
}

export type EpilogueFrame = {
	dividerOpacity: number
	micOpacity: number
	ringRadius: number
	ringOpacity: number
	reflectionOpacity: number
}

export type PipelineFrame = {
	u: number
	axis: Axis
	ticks: AxisTick[]
	lanes: LaneFrame[]
	wave: WaveBar[]
	tokenTicks: TokenTick[]
	chips: Chip[]
	routing: RoutingFrame
	mindGlow: MindGlow | null
	markers: {
		endOfSpeech: Marker
		firstToken: Marker | null
		firstAudio: Marker
	}
	playhead: PlayheadFrame
	epilogue: EpilogueFrame
	laneY: Record<PipelineLaneId, number>
}

export type LaneTone = {
	fill: string
	stroke: string
	text: string
	swatch: string
}

export type ReplayCopy = {
	label: string
	play: string
	stop: string
	turns: Record<ReplayId, string>
	headline: string
	note: string
	live: Record<ReplayPhase, string>
}

export type ReplayPhase =
	"idle" | "listening" | "thinking" | "speaking" | "done"

export type ReplayState = {
	id: ReplayId | null
	t: number
	phase: ReplayPhase
}

export type ReplayPlayer = {
	start: (turn: ReplayTurn) => void
	stop: () => void
	dispose: () => void
}

export type ReplayFrameInput = {
	turn: ReplayTurn
	t: number
}

export type ReplayControlsProps = {
	turns: ReplayTurn[]
	copy: ReplayCopy
	selected: ReplayId
	running: boolean
	onSelect: (id: ReplayId) => void
	onToggle: () => void
}
