import type { ReplayTurn } from "@/data/types"

import type { ReplayPlayer, ReplayState } from "./types"

export const createReplayPlayer = (
	onChange: (state: ReplayState) => void,
): ReplayPlayer => {
	const user = new Audio()
	const reply = new Audio()
	let raf = 0
	let startedAt = 0
	let active: ReplayTurn | null = null
	let replyStarted = false

	const clear = () => {
		if (raf !== 0) cancelAnimationFrame(raf)
		raf = 0
		user.pause()
		reply.pause()
		replyStarted = false
	}

	const tick = (now: number) => {
		if (!active) return
		const t = (now - startedAt) / 1000
		const { markers } = active.mode
		if (!replyStarted && t >= markers.firstAudio) {
			replyStarted = true
			reply.src = active.replyAudio
			void reply.play().catch(() => undefined)
		}
		if (t >= active.maxSeconds) {
			const finished = active
			clear()
			active = null
			onChange({ id: finished.id, t: finished.maxSeconds, phase: "done" })
			return
		}
		const phase =
			t < markers.endOfSpeech
				? "listening"
				: t < markers.firstAudio
					? "thinking"
					: "speaking"
		onChange({ id: active.id, t, phase })
		raf = requestAnimationFrame(tick)
	}

	const start = (turn: ReplayTurn) => {
		clear()
		active = turn
		startedAt = performance.now()
		user.src = turn.userAudio
		void user.play().catch(() => undefined)
		onChange({ id: turn.id, t: 0, phase: "listening" })
		raf = requestAnimationFrame(tick)
	}

	const stop = () => {
		const stopped = active
		clear()
		active = null
		onChange({ id: stopped?.id ?? null, t: 0, phase: "idle" })
	}

	return { start, stop, dispose: clear }
}
