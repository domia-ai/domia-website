"use client"

import { Suspense } from "react"

import type { LazyIslandProps } from "./types"
import { useNearViewport } from "./use-near-viewport"

export function LazyIsland({ fallback, children }: LazyIslandProps) {
	const { ref, near } = useNearViewport<HTMLDivElement>()

	return (
		<div ref={ref}>
			{near ? <Suspense fallback={fallback}>{children}</Suspense> : fallback}
		</div>
	)
}
