import type { Turn } from "@/data/types"

import { LISTEN_FALLBACK_TTFA_MS, LISTEN_MAX_GAP_MS } from "./constants"
import type { ListenPlayback, TurnPlayer } from "./types"

const gapOf = (turn: Turn): number =>
	Math.min(turn.timings.ttfaMs ?? LISTEN_FALLBACK_TTFA_MS, LISTEN_MAX_GAP_MS)

export const createTurnPlayer = (
	onChange: (playback: ListenPlayback | null) => void,
): TurnPlayer => {
	const audio = new Audio()
	let timer: number | null = null

	const clear = () => {
		if (timer !== null) {
			window.clearTimeout(timer)
			timer = null
		}
		audio.onended = null
		audio.pause()
	}

	const stop = () => {
		clear()
		onChange(null)
	}

	const play = (turn: Turn) => {
		clear()
		const speak = () => {
			onChange({ turnId: turn.id, phase: "speaking" })
			audio.src = turn.replyAudio
			audio.onended = () => onChange(null)
			void audio.play().catch(() => onChange(null))
		}
		const think = () => {
			onChange({ turnId: turn.id, phase: "thinking" })
			timer = window.setTimeout(speak, gapOf(turn))
		}
		onChange({ turnId: turn.id, phase: "listening" })
		audio.src = turn.userAudio
		audio.onended = think
		void audio.play().catch(() => onChange(null))
	}

	return { play, stop, dispose: clear }
}
