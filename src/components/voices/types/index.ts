import type { Voice } from "@/data/types"

export type VoicesCopy = {
	play: string
	stop: string
	faces: Record<string, string>
}

export type VoiceSamplerProps = {
	voices: Voice[]
	copy: VoicesCopy
}

export type VoiceButtonProps = {
	voice: Voice
	name: string
	playing: boolean
	copy: VoicesCopy
	onToggle: () => void
}

export type VoicesSectionProps = {
	tone?: "base" | "alt"
}
