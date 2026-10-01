import type { ReplayTurn } from "@/data/types"
import { playback } from "@/lib/playback"

import type { ReplayPhase, ReplayPlayer, TimeStore } from "./types"

export const createReplayPlayer = (
	onPhase: (phase: ReplayPhase) => void,
	store: TimeStore,
): ReplayPlayer => {
	const user = new Audio()
	const reply = new Audio()
	let raf = 0
	let startedAt = 0
	let active: ReplayTurn | null = null
	let replyStarted = false
	let phase: ReplayPhase = "idle"

	const setPhase = (next: ReplayPhase) => {
		if (next === phase) return
		phase = next
		onPhase(next)
	}

	const clear = () => {
		if (raf !== 0) cancelAnimationFrame(raf)
		raf = 0
		user.pause()
		reply.pause()
		replyStarted = false
		active = null
	}

	const stop = () => {
		clear()
		playback.release(stop)
		store.set(0)
		setPhase("idle")
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
			const { maxSeconds } = active
			clear()
			playback.release(stop)
			store.set(maxSeconds)
			setPhase("done")
			return
		}
		store.set(t)
		setPhase(
			t < markers.endOfSpeech
				? "listening"
				: t < markers.firstAudio
					? "thinking"
					: "speaking",
		)
		raf = requestAnimationFrame(tick)
	}

	const start = (turn: ReplayTurn) => {
		clear()
		playback.claim(stop)
		active = turn
		startedAt = performance.now()
		user.src = turn.userAudio
		void user.play().catch(() => undefined)
		store.set(0)
		setPhase("listening")
		raf = requestAnimationFrame(tick)
	}

	const dispose = () => {
		clear()
		playback.release(stop)
	}

	return { start, stop, dispose }
}
