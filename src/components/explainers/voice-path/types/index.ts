import type { CSSProperties } from "react"

import type { SectionTone } from "@/components/sections"
import type { HintItem } from "@/components/explainers/shared"
import type { VoiceHop, VoicePathData } from "@/data/types"

export type VoicePathKey = "cloud" | "local"

export type VoicePathComparisonCopy = {
	caption: string
	questions: Record<string, string>
	answers: Record<VoicePathKey, Record<string, string>>
}

export type VoicePathCopy = {
	title: string
	intro: string
	switchLabel: string
	paths: Record<VoicePathKey, string>
	hops: Record<string, string>
	vendorItems: Record<string, string>
	nodeItems: Record<string, string>
	networkLabel: string
	offlineTag: string
	offlineNote: string
	note: string
	comparison: VoicePathComparisonCopy
	hints: { heading: string; vendor: HintItem; node: HintItem }
	noscriptHeading: string
	stageLabel: string
}

export type VoicePathState = { offline: boolean }

export type VoicePathExplainerProps = { tone?: SectionTone }

export type VoicePathIslandProps = {
	data: VoicePathData
	copy: VoicePathCopy
}

export type HopBoxGeometry = {
	hop: VoiceHop
	x: number
	y: number
	width: number
	height: number
}

export type HopSegment = {
	id: string
	from: VoiceHop
	to: VoiceHop
	x1: number
	x2: number
	y: number
}

export type MapLayout = {
	key: VoicePathKey
	hops: VoiceHop[]
	boxes: HopBoxGeometry[]
	segments: HopSegment[]
}

export type MapLayoutOptions = {
	key: VoicePathKey
	width: number
	centerY: number
	margin: number
}

export type HopVisibility = {
	offline: boolean
	isBroken: (hop: VoiceHop) => boolean
}

export type HopMapsProps = {
	layouts: MapLayout[]
	copy: VoicePathCopy
	visibility: HopVisibility
}

export type HopBoxProps = {
	box: HopBoxGeometry
	copy: VoicePathCopy
	broken: boolean
}

export type HopChipsProps = {
	hop: VoiceHop
	copy: VoicePathCopy
	className?: string
	wrap?: boolean
}

export type PathHeaderProps = {
	pathKey: VoicePathKey
	copy: VoicePathCopy
	visibility: HopVisibility
	className?: string
	style?: CSSProperties
}

export type PathComparisonProps = {
	questions: string[]
	copy: VoicePathCopy
}

export type VoicePathStackedProps = {
	layouts: MapLayout[]
	copy: VoicePathCopy
	visibility: HopVisibility
}
