import type { Turn, TurnPath, TurnRoom } from "@/data/types"

export type ListenPhase = "idle" | "listening" | "thinking" | "speaking"

export type ListenCopy = {
	play: string
	stop: string
	phases: Record<ListenPhase, string>
	paths: Record<TurnPath, string>
	rooms: Record<TurnRoom, string>
	firstAudio: string
	locale: string
	more: string
	less: string
}

export type ListenSectionProps = {
	video?: string
	tone?: "base" | "alt"
	featured?: string[]
}

export type ListenStripProps = {
	turns: Turn[]
	visibleCount: number
	copy: ListenCopy
}

export type TurnCardProps = {
	turn: Turn
	copy: ListenCopy
	phase: ListenPhase
	prominent?: boolean
	onToggle: () => void
}

export type ListenPlayback = {
	turnId: string
	phase: ListenPhase
}

export type TurnPlayer = {
	play: (turn: Turn) => void
	stop: () => void
	dispose: () => void
}
