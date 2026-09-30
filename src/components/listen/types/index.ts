import type { Turn, TurnPath, TurnRoom } from "@/data/types"

export type ListenPhase = "idle" | "listening" | "thinking" | "speaking"

export type ListenCopy = {
	play: string
	stop: string
	phases: Record<ListenPhase, string>
	paths: Record<TurnPath, string>
	rooms: Record<TurnRoom, string>
	firstAudio: string
	replayNote: string
}

export type ListenSectionProps = {
	video?: string
	tone?: "base" | "alt"
	limit?: number
}

export type ListenStripProps = {
	turns: Turn[]
	copy: ListenCopy
}

export type TurnCardProps = {
	turn: Turn
	copy: ListenCopy
	phase: ListenPhase
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
