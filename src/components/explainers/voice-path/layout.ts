import type { VoiceHop, VoiceHopKind, VoicePathData } from "@/data/types"

import type {
	HopBoxGeometry,
	HopSegment,
	HopVisibility,
	MapLayout,
	MapLayoutOptions,
} from "./types"

export const STAGE_WIDTH = 1100
export const STAGE_HEIGHT = 394
export const STAGE_MARGIN = 16
const CLOUD_CENTER_Y = 120
const LOCAL_CENTER_Y = 314
export const MAP_TITLE_TOP = { cloud: 8, local: 206 }
export const BOUNDARY = { x: 6, y: 196, width: 1088, height: 190 }
export const PULSE_PATH_LENGTH = 32
export const COMPARISON_CAPTION_ID = "voice-path-comparison"

const hopWidths: Record<VoiceHopKind, number> = {
	device: 136,
	network: 124,
	internet: 100,
	vendor: 270,
	node: 420,
}

const hopHeights: Record<VoiceHopKind, number> = {
	device: 64,
	network: 64,
	internet: 56,
	vendor: 116,
	node: 116,
}

const createMapLayout = (
	hops: VoiceHop[],
	{ key, width, centerY, margin }: MapLayoutOptions,
): MapLayout => {
	const total = hops.reduce((sum, hop) => sum + hopWidths[hop.kind], 0)
	const gap =
		hops.length > 1 ? (width - margin * 2 - total) / (hops.length - 1) : 0

	const boxes = hops.reduce<HopBoxGeometry[]>((acc, hop) => {
		const previous = acc.at(-1)
		const x = previous ? previous.x + previous.width + gap : margin
		const height = hopHeights[hop.kind]
		return [
			...acc,
			{ hop, x, y: centerY - height / 2, width: hopWidths[hop.kind], height },
		]
	}, [])

	const segments = boxes.slice(1).map<HopSegment>((box, index) => {
		const from = boxes[index]
		return {
			id: `${from.hop.id}-${box.hop.id}`,
			from: from.hop,
			to: box.hop,
			x1: from.x + from.width,
			x2: box.x,
			y: centerY,
		}
	})

	return { key, hops, boxes, segments, centerY }
}

export const createStageLayouts = (data: VoicePathData): MapLayout[] => [
	createMapLayout(data.paths.cloud.hops, {
		key: "cloud",
		width: STAGE_WIDTH,
		centerY: CLOUD_CENTER_Y,
		margin: STAGE_MARGIN,
	}),
	createMapLayout(data.paths.local.hops, {
		key: "local",
		width: STAGE_WIDTH,
		centerY: LOCAL_CENTER_Y,
		margin: STAGE_MARGIN,
	}),
]

export const createHopVisibility = (
	offline: boolean,
	offlineBreaks: string[],
): HopVisibility => ({
	offline,
	isBroken: (hop) =>
		offline && (offlineBreaks.includes(hop.id) || hop.kind === "vendor"),
})

export const hopItemLabel = (
	hop: VoiceHop,
	item: string,
	vendorItems: Record<string, string>,
	nodeItems: Record<string, string>,
) => (hop.kind === "vendor" ? vendorItems[item] : nodeItems[item]) ?? item
