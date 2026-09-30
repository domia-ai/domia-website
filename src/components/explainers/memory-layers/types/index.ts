import type { SectionTone } from "@/components/sections"
import type { MemoryData, MemoryLayer, MemoryLayerId } from "@/data/types"

export type MemoryPhase = "turn" | "idle"

export type MemoryLayerCopy = {
	name: string
	description: string
	example: string
	hint: string
}

export type MemoryLayersCopy = {
	regionLabel: string
	toggle: Record<"label" | MemoryPhase, string>
	pills: { inPrompt: string; inPromptSession: string; writtenNow: string }
	writerLabel: string
	writers: Record<MemoryLayer["writtenBy"], string>
	layers: Record<MemoryLayerId, MemoryLayerCopy>
	hintsHeading: string
	footer: string
	link: string
}

export type MemoryLayersExplainerProps = {
	tone?: SectionTone
}

export type MemoryLayersIslandProps = {
	data: MemoryData
	copy: MemoryLayersCopy
}

export type MemoryBandProps = {
	layer: MemoryLayer
	copy: MemoryLayersCopy
	phase: MemoryPhase
}
