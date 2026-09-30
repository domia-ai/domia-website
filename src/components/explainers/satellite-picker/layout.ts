import type { LayoutPoint, LayoutRect } from "./types"

export const STAGE_WIDTH = 1000
export const STAGE_HEIGHT = 480
export const STACKED_MIN_HEIGHT = 520

export const DEVICE_CARD_HEIGHT = 84
export const DEVICE_CARD_GAP = 12
export const DEVICE_COLUMN_WIDTH = 300
const DEVICE_LABEL_OFFSET = 32

export const HUB_RECT: LayoutRect = { x: 400, y: 110, width: 200, height: 200 }
export const DETAILS_RECT: LayoutRect = {
	x: 640,
	y: 0,
	width: 360,
	height: STAGE_HEIGHT,
}

export const deviceColumnTop = (count: number) =>
	Math.round(
		(STAGE_HEIGHT -
			(count * DEVICE_CARD_HEIGHT + (count - 1) * DEVICE_CARD_GAP)) /
			2,
	)

export const deviceLabelTop = (count: number) =>
	deviceColumnTop(count) - DEVICE_LABEL_OFFSET

const devicePoint = (index: number, count: number): LayoutPoint => ({
	x: DEVICE_COLUMN_WIDTH,
	y:
		deviceColumnTop(count) +
		index * (DEVICE_CARD_HEIGHT + DEVICE_CARD_GAP) +
		DEVICE_CARD_HEIGHT / 2,
})

export const hubPoint: LayoutPoint = {
	x: HUB_RECT.x,
	y: HUB_RECT.y + HUB_RECT.height / 2,
}

export const linkPath = (index: number, count: number) => {
	const from = devicePoint(index, count)
	const midX = (from.x + hubPoint.x) / 2
	return `M ${from.x} ${from.y} C ${midX} ${from.y}, ${midX} ${hubPoint.y}, ${hubPoint.x} ${hubPoint.y}`
}
