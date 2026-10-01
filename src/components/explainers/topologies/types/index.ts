import type { ReactNode } from "react"

import type { HintItem } from "@/components/explainers/shared"
import type { SectionTone } from "@/components/sections"
import type {
	TopologiesData,
	TopologyIdentity,
	TopologyLabel,
	TopologyLink,
	TopologyNode,
	TopologyPlacement,
	TopologyPoint,
	TopologyScenario,
	TopologyScenarioId,
} from "@/data/types"

export type ScenarioRecord<T> = Record<TopologyScenarioId, T>

export type TopologyNodeKey =
	| "main"
	| "mic"
	| "speaker"
	| "satEsphome"
	| "satLivekit"
	| "satWebsocket"
	| "satWyoming"
	| "hubB"
	| "hubC"

export type TopologyHintKey =
	| "node"
	| "identity"
	| "identityRemote"
	| "wake"
	| "stt"
	| "routing"
	| "llm"
	| "tts"
	| "memory"
	| "mic"
	| "speaker"
	| "satEsphome"
	| "satLivekit"
	| "satWebsocket"
	| "satWyoming"
	| "hubB"
	| "hubC"
	| "sameBehaviour"
	| "realtime"

export type TopologyPipelineChipKey = "wake" | "stt" | "routing" | "llm" | "tts"

export type TopologyChipsCopy = Record<TopologyPipelineChipKey, string> & {
	memory: string
	llmShared: string
	llmDelegated: string
}

export type TopologyNodeCopy = {
	title: string
	sub?: string
}

export type TopologyOverlaysCopy = {
	audioStreams: string
	sameBehaviour: string
	realtimeEndpoint: string
	lendLead: string
	lendEmphasis: string
	lendTail: string
	personaTitle: string
	personaBody: string
}

export type TopologiesCopy = {
	title: string
	intro: string
	stageLabel: string
	tabsLabel: string
	tabsInstruction: string
	tabs: ScenarioRecord<string>
	device: ScenarioRecord<string>
	nodes: Record<TopologyNodeKey, TopologyNodeCopy>
	identitiesLabel: string
	identities: Record<string, string>
	bindings: ScenarioRecord<Record<string, string>>
	chips: TopologyChipsCopy
	overlays: TopologyOverlaysCopy
	captions: ScenarioRecord<string>
	hintsHeading: string
	hints: Record<TopologyHintKey, HintItem>
	noscriptHeading: string
}

export type TopologiesExplainerProps = {
	tone?: SectionTone
}

export type TopologiesIslandProps = {
	data: TopologiesData
	copy: TopologiesCopy
}

export type HintsContextValue = Record<TopologyHintKey, HintItem> | null

export type TipProps = {
	hint: TopologyHintKey
	className?: string
	children: ReactNode
}

export type IdentityChipProps = {
	identity: TopologyIdentity
	name: string
	hint: TopologyHintKey
}

export type LinkShapeProps = {
	link: TopologyLink
	dotAt: TopologyPoint | null
}

export type PeerLlmMode = "shared" | "delegated"

export type NodeCardProps = {
	node: TopologyNode
	scenario: TopologyScenario
	data: TopologiesData
	copy: TopologiesCopy
}

export type LinkLayerProps = {
	data: TopologiesData
	active: TopologyScenarioId
}

export type OverlayLayerProps = {
	data: TopologiesData
	copy: TopologiesCopy
	active: TopologyScenarioId
}

export type OverlayLabelProps = {
	label: TopologyLabel
	copy: TopologiesCopy
}

export type TopologiesStackedProps = {
	data: TopologiesData
	copy: TopologiesCopy
	active: TopologyScenarioId
}

export type StackedNodeLine = {
	id: string
	title: string
	detail?: string
}

export type PlacementStyle = {
	transform: string
	opacity: number
}

export type PlacementInput = TopologyPlacement | null | undefined
