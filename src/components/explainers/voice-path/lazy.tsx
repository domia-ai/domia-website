"use client"

import { lazy } from "react"

import { LazyIsland } from "@/components/explainers/shared"

import type { VoicePathIslandProps } from "./types"

const Island = lazy(() =>
	import("./island").then((module) => ({ default: module.VoicePathIsland })),
)

export function VoicePathLazy(props: VoicePathIslandProps) {
	return (
		<LazyIsland fallback={<div className="min-h-96" />}>
			<Island {...props} />
		</LazyIsland>
	)
}
