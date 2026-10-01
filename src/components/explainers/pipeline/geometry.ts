import type { PipelineLaneColor } from "@/data/types"

import type { LaneTone } from "./types"

export const REPLAY_REST_SECONDS = 1

export const layout = {
	grid: {
		top: 44,
		bottom: 432,
		labelY: 34,
		step: 0.5,
		steps: [
			{ above: 8, seconds: 2 },
			{ above: 4, seconds: 1 },
		],
	},
	bar: { height: 16, radius: 4, minWidth: 6 },
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
	tokens: { step: 0.048, opacity: 0.9, inset: 3 },
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
	hear: { glowPad: 3, glowOpacity: 0.25 },
	markers: {
		endOfSpeech: { above: 10, labelX: 9, labelY: 4, noteGap: 14, dot: 4.5 },
		firstToken: { above: 8, labelX: 8, labelY: 5 },
		firstAudio: { above: 28, labelX: 11, labelY: 4, noteGap: 14, dot: 4.5 },
	},
	playhead: { opacity: 0.9, half: 4.5, tip: 8 },
}

export const laneTone: Record<PipelineLaneColor, LaneTone> = {
	audio: {
		fill: "fill-audio",
		swatch: "bg-audio",
	},
	thinking: {
		fill: "fill-model",
		swatch: "bg-model",
	},
	fastPath: {
		fill: "fill-fast-path",
		swatch: "bg-fast-path",
	},
	tool: {
		fill: "fill-tool",
		swatch: "bg-tool",
	},
}
