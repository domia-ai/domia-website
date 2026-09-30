import type { PipelineLaneColor, PipelineLaneId } from "@/data/types"

import type { LaneTone, PipelineSelection } from "./types"

export const defaultSelection: PipelineSelection = {
	machine: "hub",
	mode: "conversation",
}

export const subLanes: ReadonlySet<PipelineLaneId> = new Set<PipelineLaneId>([
	"mind",
	"splitter",
])

export const layout = {
	grid: { top: 44, bottom: 462, labelY: 34, step: 0.5 },
	bar: { height: 16, radius: 4, minWidth: 6 },
	row: { height: 9, radius: 3 },
	label: { x: 18, offsetY: 4, gap: 10 },
	reveal: 0.06,
	wave: {
		bars: 42,
		width: 3.6,
		minHeight: 3.5,
		maxHeight: 18,
		boost: 1.4,
		near: 0.05,
		lit: 0.95,
		dim: 0.22,
		textureA: 1.7,
		textureB: 0.6,
		textureC: 0.53,
		textureScale: 1.6,
		envelopePower: 0.55,
	},
	tokens: { step: 0.048, opacity: 0.9 },
	chip: {
		width: 76,
		height: 15,
		radius: 4.5,
		inset: 2,
		textBaseline: 11,
		drop: 0.1,
		lead: 0.18,
		hold: 0.28,
		fade: 0.35,
	},
	checkpoint: { radius: 2.5, labelOffset: 13, lineGap: 12 },
	fastPathLabel: { offsetY: 6 },
	mind: { glowRadius: 15, pulse: 18, base: 0.35, amplitude: 0.25, idle: 0.1 },
	hear: { glowPad: 3, glowOpacity: 0.25 },
	markers: {
		endOfSpeech: { above: 10, labelX: 9, labelY: 4, noteGap: 14 },
		firstToken: { above: 8, labelX: 8, labelY: 5 },
		firstAudio: { above: 28, labelX: 11, labelY: 4, noteGap: 14, dot: 4.5 },
	},
	playhead: { opacity: 0.9, fadePerSecond: 1.5, half: 4.5, tip: 8 },
	epilogue: {
		dividerY: 470,
		labelGap: 6,
		micY: 498,
		dot: 5,
		dotInset: 8,
		boxRadius: 8,
		textX: 18,
		textY: 4,
		boxY: 520,
		boxHeight: 44,
		boxWidth: 650,
		boxPad: 16,
		titleY: 18,
		bodyY: 34,
		asideY: 24,
		fade: 0.7,
		dividerOpacity: 0.9,
		ringGrow: 11,
		ringOpacity: 0.5,
		pulseRate: 0.8,
	},
}

export const laneTone: Record<PipelineLaneColor, LaneTone> = {
	audio: {
		fill: "fill-audio",
		stroke: "stroke-audio",
		text: "fill-audio",
		swatch: "bg-audio",
	},
	thinking: {
		fill: "fill-model",
		stroke: "stroke-model",
		text: "fill-model",
		swatch: "bg-model",
	},
	fastPath: {
		fill: "fill-fast-path",
		stroke: "stroke-fast-path",
		text: "fill-fast-path",
		swatch: "bg-fast-path",
	},
	neutral: {
		fill: "fill-muted-foreground",
		stroke: "stroke-muted-foreground",
		text: "fill-muted-foreground",
		swatch: "bg-muted-foreground",
	},
}
