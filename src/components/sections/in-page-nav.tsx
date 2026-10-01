"use client"

import { useEffect, useRef, useState } from "react"

import { Button } from "@/components/ui/button"

import {
	IN_PAGE_NAV_ROOT_MARGIN,
	IN_PAGE_NAV_SCROLL_PADDING_PX,
	IN_PAGE_NAV_THRESHOLDS,
} from "./constants"
import type { InPageNavProps } from "./types"

const revealActiveItem = (track: HTMLElement, activeId: string) => {
	const link = track.querySelector<HTMLElement>(`a[href="#${activeId}"]`)
	if (!link) return
	const start = link.offsetLeft - IN_PAGE_NAV_SCROLL_PADDING_PX
	const end = link.offsetLeft + link.offsetWidth + IN_PAGE_NAV_SCROLL_PADDING_PX
	if (start < track.scrollLeft) track.scrollLeft = start
	else if (end > track.scrollLeft + track.clientWidth)
		track.scrollLeft = end - track.clientWidth
}

export function InPageNav({ items, label }: InPageNavProps) {
	const [activeId, setActiveId] = useState<string | undefined>(undefined)
	const trackRef = useRef<HTMLElement>(null)

	useEffect(() => {
		const targets = items
			.map((item) => document.getElementById(item.id))
			.filter((element): element is HTMLElement => element !== null)

		if (targets.length === 0) return

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio)
				if (visible.length > 0) setActiveId(visible[0].target.id)
			},
			{
				rootMargin: IN_PAGE_NAV_ROOT_MARGIN,
				threshold: IN_PAGE_NAV_THRESHOLDS,
			},
		)

		targets.forEach((target) => observer.observe(target))
		return () => observer.disconnect()
	}, [items])

	useEffect(() => {
		if (activeId && trackRef.current)
			revealActiveItem(trackRef.current, activeId)
	}, [activeId])

	return (
		<div className="bg-background/80 sticky top-16 z-30 w-full border-b backdrop-blur">
			<nav
				ref={trackRef}
				aria-label={label}
				className="relative mx-auto w-full max-w-7xl [scrollbar-width:none] overflow-x-auto px-4 max-md:[mask-image:linear-gradient(to_right,black_calc(100%-2.5rem),transparent)]"
			>
				<ul className="flex list-none items-center gap-1 py-2 max-md:pr-10">
					{items.map((item) => {
						const active = item.id === activeId
						return (
							<li key={item.id} className="shrink-0">
								<Button
									variant="ghost"
									size="sm"
									className="text-muted-foreground aria-[current=location]:bg-muted aria-[current=location]:text-foreground h-9 rounded-lg px-3 text-sm md:h-8"
									nativeButton={false}
									render={
										<a
											href={`#${item.id}`}
											role={undefined}
											aria-current={active ? "location" : undefined}
										/>
									}
								>
									{item.label}
								</Button>
							</li>
						)
					})}
				</ul>
			</nav>
		</div>
	)
}
