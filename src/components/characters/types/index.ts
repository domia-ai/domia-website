import type { SectionTone } from "@/components/sections"
import type { Turn } from "@/data/types"

export type CharacterId = "atlas" | "luna" | "marlowe" | "torque" | "sous"

export type CharactersCopy = {
	questionLabel: string
	play: string
	stop: string
	firstAudio: string
	locale: string
	traits: Record<CharacterId, string>
	yours: { title: string; body: string }
}

export type CharacterQuestion = {
	text: string
	turns: Record<CharacterId, Turn>
}

export type CharactersSectionProps = {
	tone?: SectionTone
}

export type CharactersIslandProps = {
	questions: CharacterQuestion[]
	copy: CharactersCopy
}

export type CharacterCardProps = {
	id: CharacterId
	turn: Turn
	copy: CharactersCopy
	playing: boolean
	progress: number
	onToggle: () => void
}

export type ClipState = {
	playing: string | null
	progress: number
}

export type ClipPlayer = {
	play: (id: string, src: string) => void
	stop: () => void
	dispose: () => void
}

export type ReplyClip = ClipState & {
	play: (id: string, src: string) => void
	stop: () => void
}
