import type { Turn } from "@/data/types"
import { playback } from "@/lib/playback"

import { LISTEN_FALLBACK_TTFA_MS, LISTEN_MAX_GAP_MS } from "./constants"
import type { ListenPlayback, TurnPlayer } from "./types"

const gapOf = (turn: Turn): number =>
	Math.min(turn.timings.ttfaMs ?? LISTEN_FALLBACK_TTFA_MS, LISTEN_MAX_GAP_MS)

export const createTurnPlayer = (
	onChange: (playback: ListenPlayback | null) => void,
): TurnPlayer => {
	const audio = new Audio()
	let timer: number | null = null
	let generation = 0

	const clear = () => {
		generation += 1
		if (timer !== null) {
			window.clearTimeout(timer)
			timer = null
		}
		audio.onended = null
		audio.pause()
	}

	const stop = () => {
		clear()
		playback.release(stop)
		onChange(null)
	}

	const play = (turn: Turn) => {
		clear()
		playback.claim(stop)
		const mine = generation
		const current = (step: () => void) => () => {
			if (mine === generation) step()
		}
		const finish = current(stop)
		const speak = current(() => {
			onChange({ turnId: turn.id, phase: "speaking" })
			audio.src = turn.replyAudio
			audio.onended = finish
			void audio.play().catch(finish)
		})
		const think = current(() => {
			onChange({ turnId: turn.id, phase: "thinking" })
			timer = window.setTimeout(speak, gapOf(turn))
		})
		onChange({ turnId: turn.id, phase: "listening" })
		audio.src = turn.userAudio
		audio.onended = think
		void audio.play().catch(finish)
	}

	const dispose = () => {
		clear()
		playback.release(stop)
	}

	return { play, stop, dispose }
}
