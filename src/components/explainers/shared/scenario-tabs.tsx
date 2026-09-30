"use client"

import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { SCROLL_END_TOLERANCE_PX } from "./constants"
import type { ScenarioTabsProps } from "./types"

const hasHiddenContentOnRight = (track: HTMLElement) =>
	track.scrollLeft + track.clientWidth <
	track.scrollWidth - SCROLL_END_TOLERANCE_PX

export function ScenarioTabs({
	value,
	onValueChange,
	items,
	label,
	instruction,
	children,
	className,
}: ScenarioTabsProps) {
	const trackRef = useRef<HTMLDivElement>(null)
	const [fadeEnd, setFadeEnd] = useState(false)

	useEffect(() => {
		const track = trackRef.current
		if (!track) return
		const update = () => setFadeEnd(hasHiddenContentOnRight(track))
		update()
		const resize = new ResizeObserver(update)
		resize.observe(track)
		if (track.firstElementChild) resize.observe(track.firstElementChild)
		track.addEventListener("scroll", update, { passive: true })
		return () => {
			resize.disconnect()
			track.removeEventListener("scroll", update)
		}
	}, [])

	return (
		<Tabs
			value={value}
			onValueChange={(next) => onValueChange(String(next))}
			className={className}
		>
			{instruction ? (
				<span className="text-muted-foreground text-sm font-medium">
					{instruction}
				</span>
			) : null}
			<div
				ref={trackRef}
				className={cn(
					"max-w-full [scrollbar-width:none] overflow-x-auto",
					fadeEnd && "mask-r-from-[calc(100%-3rem)]",
				)}
			>
				<TabsList aria-label={label} className="border-foreground/15 border">
					{items.map((item) => (
						<TabsTrigger key={item.value} value={item.value} variant="solid">
							{item.label}
						</TabsTrigger>
					))}
				</TabsList>
			</div>
			<TabsContent value={value}>{children}</TabsContent>
		</Tabs>
	)
}
