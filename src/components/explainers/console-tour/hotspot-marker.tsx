"use client"

import type { CSSProperties } from "react"

import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

import type { HotspotMarkerProps } from "./types"

export function HotspotMarker({
	hotspot,
	index,
	copy,
	describedBy,
	side,
	active,
	onActiveChange,
	onActivate,
}: HotspotMarkerProps) {
	const style: CSSProperties = {
		left: `${hotspot.x}%`,
		top: `${hotspot.y}%`,
		width: `${hotspot.w}%`,
		height: `${hotspot.h}%`,
	}

	return (
		<Tooltip>
			<TooltipTrigger
				render={
					<button
						type="button"
						style={style}
						aria-describedby={describedBy}
						onClick={() => onActivate(hotspot.id)}
						onPointerEnter={() => onActiveChange(hotspot.id)}
						onPointerLeave={() => onActiveChange(null)}
						onFocus={() => onActiveChange(hotspot.id)}
						onBlur={() => onActiveChange(null)}
					/>
				}
				className={cn(
					"focus-visible:ring-ring absolute rounded-md ring-2 outline-none focus-visible:ring-4 motion-safe:transition-[box-shadow,background-color] motion-safe:duration-200",
					active ? "ring-primary bg-primary/5" : "ring-transparent",
				)}
			>
				<span aria-hidden className="absolute -top-3 -left-3 size-6">
					<span
						className={cn(
							"bg-primary/30 absolute -inset-1 rounded-full motion-safe:animate-ping motion-safe:[animation-duration:2.4s]",
							active && "motion-safe:[animation-play-state:paused]",
						)}
					/>
					<span
						className={cn(
							"bg-primary text-primary-foreground ring-card relative flex size-full items-center justify-center rounded-full text-xs font-semibold tabular-nums shadow-sm ring-2 motion-safe:transition-transform motion-safe:duration-200",
							active && "scale-110",
						)}
					>
						{index + 1}
					</span>
				</span>
				<span className="sr-only">{copy.title}</span>
			</TooltipTrigger>
			<TooltipContent
				side={side}
				aria-hidden
				className="flex-col items-start gap-0.5"
			>
				<span className="font-medium">{copy.title}</span>
				<span>{copy.body}</span>
			</TooltipContent>
		</Tooltip>
	)
}
