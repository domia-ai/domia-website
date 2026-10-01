import type { ReactNode } from "react"

import type { SectionTone } from "@/components/sections"
import type { SkillGroupId, ToolPolicy } from "@/data/types"

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

export type SkillsMapView = {
	groups: SkillsMapGroupView[]
}

export type SkillsMapHintCopy = {
	title: string
	body: string
}

export type SkillsMapGroupCopy = {
	name: string
	blurb: string
}

export type SkillsMapCopy = {
	switchOffLabel: string
	hintsHeading: string
	groups: Record<SkillGroupId, SkillsMapGroupCopy>
	policy: Record<Exclude<ToolPolicy, "allow">, string>
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
