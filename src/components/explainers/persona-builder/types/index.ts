import type { SayItConversationSource } from "@/components/explainers/say-it/types"
import type { SectionTone } from "@/components/sections"
import type {
	PersonaFace,
	PersonaFaceId,
	PersonaTemplate,
	PersonaTemplateId,
	PersonasData,
} from "@/data/types"

export type PersonaTemplateCopy = {
	name: string
	persona: string
	sample: string
}

export type PersonaBuilderCopy = {
	pickFace: string
	pickTemperament: string
	faces: Record<PersonaFaceId, string>
	templates: Record<PersonaTemplateId, PersonaTemplateCopy>
	examplesNote: string
}

export type PersonaBuilderState = {
	face: PersonaFaceId
	template: PersonaTemplateId
}

export type PersonaBuilderIslandProps = {
	data: PersonasData
	copy: PersonaBuilderCopy
	conversation: SayItConversationSource
}

export type PersonaBuilderExplainerProps = {
	tone?: SectionTone
}

export type FaceGridProps = {
	faces: PersonaFace[]
	value: PersonaFaceId
	onValueChange: (id: PersonaFaceId) => void
	labelledBy: string
	copy: PersonaBuilderCopy
}

export type TemperamentPillsProps = {
	templates: PersonaTemplate[]
	value: PersonaTemplateId
	onValueChange: (id: PersonaTemplateId) => void
	labelledBy: string
	copy: PersonaBuilderCopy
}
