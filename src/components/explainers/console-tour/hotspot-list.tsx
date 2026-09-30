"use client"

import { cn } from "@/lib/utils"

import type { HotspotListProps } from "./types"

export function HotspotList({
	idPrefix,
	heading,
	hotspots,
	copy,
	active,
	onActiveChange,
}: HotspotListProps) {
	return (
		<div className="flex flex-col gap-2">
			<p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
				{heading}
			</p>
			<ol className="grid gap-2 md:grid-cols-3">
				{hotspots.map((hotspot, index) => {
					const highlighted = active === hotspot.id
					return (
						<li
							key={hotspot.id}
							id={`${idPrefix}-${hotspot.id}`}
							data-active={highlighted || undefined}
							onPointerEnter={() => onActiveChange(hotspot.id)}
							onPointerLeave={() => onActiveChange(null)}
							className={cn(
								"-mx-2 flex scroll-mt-24 gap-3 rounded-lg px-2 py-1.5 ring-1 motion-safe:transition-[background-color,box-shadow] motion-safe:duration-200",
								highlighted
									? "bg-primary/10 ring-primary/40"
									: "ring-transparent",
							)}
						>
							<span
								aria-hidden
								className={cn(
									"bg-primary text-primary-foreground mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold tabular-nums motion-safe:transition-transform motion-safe:duration-200",
									highlighted && "scale-110",
								)}
							>
								{index + 1}
							</span>
							<span className="flex flex-col">
								<span className="font-medium">{copy[hotspot.id].title}</span>
								<span
									id={`${idPrefix}-${hotspot.id}-body`}
									className="text-muted-foreground"
								>
									{copy[hotspot.id].body}
								</span>
							</span>
						</li>
					)
				})}
			</ol>
		</div>
	)
}
