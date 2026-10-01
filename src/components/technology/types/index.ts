import type { LucideIcon } from "lucide-react"

export type RelatedLinkProps = {
	href: string
	label: string
}

export type IconItem = {
	id: string
	icon: LucideIcon
}

export type EngineStageId =
	"wakeWord" | "stt" | "turn" | "llm" | "tts" | "memory"

export type EngineStage = {
	id: EngineStageId
	icon: LucideIcon
}
