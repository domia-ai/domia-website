import type { SectionTone } from "@/components/sections"
import type { Axis, AxisTick, FillSpan } from "@/components/explainers/shared"
import type {
	PipelineData,
	PipelineLaneColor,
	PipelineLaneId,
	ReplayId,
	ReplayTurn,
} from "@/data/types"

import type { getTranslations } from "next-intl/server"

export type PipelineTranslator = Awaited<ReturnType<typeof getTranslations>>

export type CheckpointId = "fastPath" | "llm"

export type LaneCopy = {
	label: string
	sub: string
	note: string
	tip: string
}

export type AfterItem = {
	id: string
	text: string
}

export type ReplayPhase =
	"idle" | "listening" | "thinking" | "speaking" | "done"

export type PipelineCopy = {
	title: string
	intro: string
	stageLabel: string
	headline: string
	link: string
	legend: { audio: string; model: string; fastPath: string; skill: string }
	lanes: Record<PipelineLaneId, LaneCopy>
	markers: {
		endOfSpeech: { title: string; note: string }
		firstToken: string
		firstAudio: { title: string; note: string }
	}
	routing: {
		fastPath: string
		checkpoints: Record<CheckpointId, string>
		reply: string
		skillCall: string
	}
	picker: {
		label: string
		play: string
		stop: string
		turns: Record<ReplayId, string>
	}
	live: Record<ReplayPhase, string>
	unit: string
	locale: string
	after: { title: string; items: AfterItem[] }
	note: string
	hints: { heading: string }
	stacked: { skipped: string }
}

export type PipelineExplainerProps = {
	tone?: SectionTone
}

export type PipelineIslandProps = {
	data: PipelineData
	turns: ReplayTurn[]
	copy: PipelineCopy
}

export type TimelineProps = {
	data: PipelineData
	copy: PipelineCopy
	turn: ReplayTurn
	labels: TurnLabels
	store: TimeStore
	playing: boolean
}

export type TurnLabels = {
	headline: string
	firstAudioNote: string
	fastPath: string
}

export type PipelineStackedProps = {
	data: PipelineData
	copy: PipelineCopy
	turn: ReplayTurn
	labels: TurnLabels
}

export type LaneLabelsProps = {
	data: PipelineData
	copy: PipelineCopy
	turn: ReplayTurn
}

export type CanvasProps = {
	data: PipelineData
	copy: PipelineCopy
	frame: PipelineFrame
	labels: TurnLabels
}

export type LegendProps = {
	copy: PipelineCopy
}

export type FrameInput = {
	data: PipelineData
	turn: ReplayTurn
	t: number
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

export type Chip = {
	index: number
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
	fastPathLabel: Marker
	checkpoints: Checkpoint[]
}

export type PlayheadFrame = {
	x: number
	opacity: number
}

export type PipelineFrame = {
	axis: Axis
	maxSeconds: number
	ticks: AxisTick[]
	lanes: LaneFrame[]
	wave: WaveBar[]
	tokenTicks: TokenTick[]
	chips: Chip[]
	routing: RoutingFrame
	markers: {
		endOfSpeech: Marker
		firstToken: Marker | null
		firstAudio: Marker
	}
	playhead: PlayheadFrame
	laneY: Record<PipelineLaneId, number>
}

export type LaneTone = {
	fill: string
	swatch: string
}

export type ReplayPlayer = {
	start: (turn: ReplayTurn) => void
	stop: () => void
	dispose: () => void
}

export type TimeStore = {
	get: () => number
	set: (next: number) => void
	subscribe: (listener: () => void) => () => void
}

export type TurnPickerProps = {
	turns: ReplayTurn[]
	copy: PipelineCopy["picker"]
	selected: ReplayId
	running: boolean
	onSelect: (id: ReplayId) => void
	onToggle: () => void
}
