import type { CSSProperties } from "react"

import type { ConsoleHotspot } from "@/data/types"

import { CROP_MAX_HEIGHT_PX, CROP_MAX_SCALE } from "./constants"
import type { HotspotCropProps } from "./types"

const backgroundOffset = (start: number, size: number) =>
	size >= 100 ? 0 : (start / (100 - size)) * 100

const cropBackground = (hotspot: ConsoleHotspot): CSSProperties => ({
	backgroundSize: `${10000 / hotspot.w}% ${10000 / hotspot.h}%`,
	backgroundPosition: `${backgroundOffset(hotspot.x, hotspot.w)}% ${backgroundOffset(hotspot.y, hotspot.h)}%`,
	backgroundRepeat: "no-repeat",
})

export function HotspotCrop({ screen, hotspot }: HotspotCropProps) {
	const { image } = screen
	const widthPx = (hotspot.w / 100) * image.width
	const heightPx = (hotspot.h / 100) * image.height
	const aspect = widthPx / heightPx
	const frame: CSSProperties = {
		aspectRatio: `${widthPx} / ${heightPx}`,
		width: `min(100%, ${widthPx * CROP_MAX_SCALE}px, ${CROP_MAX_HEIGHT_PX * aspect}px)`,
	}
	const background = cropBackground(hotspot)

	return (
		<span
			aria-hidden
			style={frame}
			className="bg-muted ring-foreground/10 relative block overflow-hidden rounded-md ring-1"
		>
			<span
				className="absolute inset-0 dark:hidden"
				style={{ ...background, backgroundImage: `url(${image.light})` }}
			/>
			<span
				className="absolute inset-0 hidden dark:block"
				style={{ ...background, backgroundImage: `url(${image.dark})` }}
			/>
		</span>
	)
}
