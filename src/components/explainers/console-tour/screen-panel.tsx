"use client"

import { useState } from "react"
import Image from "next/image"

import { useReducedMotion } from "@/components/explainers/shared"
import type { HintSide } from "@/components/explainers/shared"
import type { ConsoleHotspot } from "@/data/types"

import { BrowserFrame } from "./browser-frame"
import { HotspotList } from "./hotspot-list"
import { HotspotMarker } from "./hotspot-marker"
import { ScreenDemoLink } from "./screen-demo-link"
import {
	CAPTURE_IMAGE_QUALITY,
	CAPTURE_IMAGE_SIZES,
	HOTSPOT_BOTTOM_SIDE_MAX_Y,
	HOTSPOT_LEFT_SIDE_MIN_CENTER_X,
	TOUR_LIST_ID_PREFIX,
} from "./constants"
import type { ActiveHotspot, ScreenViewProps } from "./types"

const tooltipSide = (hotspot: ConsoleHotspot): HintSide => {
	if (hotspot.x + hotspot.w / 2 > HOTSPOT_LEFT_SIDE_MIN_CENTER_X) return "left"
	if (hotspot.y < HOTSPOT_BOTTOM_SIDE_MAX_Y) return "bottom"
	return "top"
}

export function ScreenPanel({
	screen,
	copy,
	hotspotsHeading,
	demo,
}: ScreenViewProps) {
	const { image, hotspots } = screen
	const [hovered, setHovered] = useState<ActiveHotspot>(null)
	const [pinned, setPinned] = useState<ActiveHotspot>(null)
	const reducedMotion = useReducedMotion()
	const active = hovered ?? pinned
	const idPrefix = `${TOUR_LIST_ID_PREFIX}-${screen.key}`

	const pinHotspot = (id: string) => {
		setPinned(id)
		document.getElementById(`${idPrefix}-${id}`)?.scrollIntoView({
			block: "nearest",
			behavior: reducedMotion ? "auto" : "smooth",
		})
	}

	return (
		<div className="flex flex-col gap-5">
			<p className="text-muted-foreground min-h-[2lh] max-w-3xl text-base text-balance">
				{copy.summary}
			</p>
			<BrowserFrame route={screen.route}>
				<div
					className="bg-muted relative w-full"
					style={{ aspectRatio: `${image.width} / ${image.height}` }}
				>
					<Image
						src={image.light}
						alt={copy.imageAlt}
						fill
						sizes={CAPTURE_IMAGE_SIZES}
						quality={CAPTURE_IMAGE_QUALITY}
						className="object-cover dark:hidden"
					/>
					<Image
						src={image.dark}
						alt={copy.imageAlt}
						fill
						sizes={CAPTURE_IMAGE_SIZES}
						quality={CAPTURE_IMAGE_QUALITY}
						className="hidden object-cover dark:block"
					/>
					<div className="absolute inset-0">
						{hotspots.map((hotspot, index) => (
							<HotspotMarker
								key={hotspot.id}
								hotspot={hotspot}
								index={index}
								copy={copy.hotspots[hotspot.id]}
								describedBy={`${idPrefix}-${hotspot.id}-body`}
								side={tooltipSide(hotspot)}
								active={active === hotspot.id}
								onActiveChange={setHovered}
								onActivate={pinHotspot}
							/>
						))}
					</div>
				</div>
			</BrowserFrame>
			<HotspotList
				idPrefix={idPrefix}
				heading={hotspotsHeading}
				hotspots={hotspots}
				copy={copy.hotspots}
				active={active}
				onActiveChange={setHovered}
			/>
			<ScreenDemoLink screen={screen} copy={demo} />
		</div>
	)
}
