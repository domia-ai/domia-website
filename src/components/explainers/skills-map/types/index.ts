import type { ReactNode } from "react"

import type { SectionTone } from "@/components/sections"
import type { SkillExampleId, SkillGroupId, ToolPolicy } from "@/data/types"

export type SkillCapabilityKey = string

export type SkillCapabilitySource = {
	key: SkillCapabilityKey
	tools: readonly string[]
	domain?: string
}

export type SkillCapabilityTraits = {
	fastPath: boolean
	hidden: boolean
	policy: ToolPolicy
}

export type SkillCapability = SkillCapabilityTraits & {
	key: SkillCapabilityKey
	label: string
}

export type SkillsMapGroupView = {
	id: SkillGroupId
	defaultOn: boolean
	capabilities: SkillCapability[]
}

export type SkillsMapExampleView = {
	id: SkillExampleId
	group: SkillGroupId
	fastPath: boolean
}

export type SkillsMapView = {
	groups: SkillsMapGroupView[]
	examples: SkillsMapExampleView[]
}

export type SkillsMapHintCopy = {
	title: string
	body: string
}

export type SkillsMapGroupCopy = {
	name: string
	blurb: string
}

export type SkillsMapExampleCopy = {
	line: string
	on: string
	off: string
}

export type SkillsMapCopy = {
	switchOffLabel: string
	examplesLabel: string
	hintsHeading: string
	groups: Record<SkillGroupId, SkillsMapGroupCopy>
	examples: Record<SkillExampleId, SkillsMapExampleCopy>
	policy: Record<ToolPolicy, string>
	fastPathLabel: string
	hiddenLabel: string
	legend: string
	switchedOff: string
	availability: {
		fromStart: string
		onceConnected: string
	}
	defaultOn: SkillsMapHintCopy
	hidden: SkillsMapHintCopy
	mcp: {
		anyServer: string
		policy: string
	}
	routines: {
		exampleTitle: string
		steps: string[]
		maxSteps: string
	}
}

export type SkillsMapState = {
	active: Set<SkillGroupId>
}

export type SkillsMapExplainerProps = {
	tone?: SectionTone
}

export type SkillsMapIslandProps = {
	view: SkillsMapView
	copy: SkillsMapCopy
}

export type GroupSwitchProps = {
	groupId: SkillGroupId
	checked: boolean
	onCheckedChange: (groupId: SkillGroupId, checked: boolean) => void
	copy: SkillsMapCopy
}

export type ExampleCardProps = {
	example: SkillsMapExampleView
	active: boolean
	copy: SkillsMapCopy
}

export type CapabilityChipProps = {
	capability: SkillCapability
	copy: SkillsMapCopy
}

export type McpDetailsProps = {
	copy: SkillsMapCopy
}

export type RoutinesDetailsProps = {
	copy: SkillsMapCopy
}

export type GroupCardProps = {
	groupId: SkillGroupId
	active: boolean
	defaultOn: boolean
	copy: SkillsMapCopy
	className?: string
	children: ReactNode
}
