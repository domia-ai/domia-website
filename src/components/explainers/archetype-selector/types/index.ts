import type { SectionTone } from "@/components/sections"
import type {
	Archetype,
	ArchetypeId,
	ArchetypeStageId,
	ArchetypeTemplateId,
	ArchetypesData,
} from "@/data/types"

export type StageId = ArchetypeStageId

export type StagePlacement = "here" | "elsewhere"

export type IdentityCount = Archetype["identities"]

export type ArchetypeCopy = {
	name: string
	description: string
	chooseIf: string
	panelTitle: string
	templateLine: string
}

export type ArchetypeSelectorCopy = {
	selectorLabel: string
	archetypes: Record<ArchetypeId, ArchetypeCopy>
	stages: Record<StageId, string>
	columns: Record<StagePlacement, string>
	emptyColumn: string
	identities: Record<IdentityCount, string>
	sharesPill: string
	needsPeer: string
	templates: Record<ArchetypeTemplateId, string>
	footnote: string
}

export type ArchetypeSelectorState = {
	archetype: ArchetypeId
}

export type ArchetypeSelectorIslandProps = {
	data: ArchetypesData
	copy: ArchetypeSelectorCopy
}

export type ArchetypeSelectorExplainerProps = {
	tone?: SectionTone
}

export type NodeCardProps = {
	archetype: Archetype
	copy: ArchetypeSelectorCopy
}

export type StageColumnProps = {
	heading: string
	stages: StageId[]
	placement: StagePlacement
	copy: ArchetypeSelectorCopy
}

export type StageChipProps = {
	label: string
	placement: StagePlacement
}
