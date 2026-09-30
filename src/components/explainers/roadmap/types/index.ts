import type { RoadmapArea, RoadmapData } from "@/data/types"
import type { SectionTone } from "@/components/sections"

export type RoadmapLaneKey = keyof RoadmapData["lanes"]

export type RoadmapAreaEntries = {
	area: RoadmapArea
	ids: string[]
}

export type RoadmapItem = {
	id: string
	label: string
	note: string
}

export type RoadmapAreaGroup = {
	area: RoadmapArea
	label: string
	items: RoadmapItem[]
}

export type RoadmapLane = {
	key: RoadmapLaneKey
	label: string
	areas: RoadmapAreaGroup[]
}

export type RoadmapLaneProps = {
	lane: RoadmapLane
}

export type RoadmapExplainerProps = {
	tone?: SectionTone
}
