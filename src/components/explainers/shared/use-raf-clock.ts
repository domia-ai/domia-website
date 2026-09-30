"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import { MAX_FRAME_SECONDS, ON_SCREEN_THRESHOLD } from "./constants"
import { useReducedMotion } from "./use-reduced-motion"
import type {
	Clock,
	ClockConfig,
	ClockMode,
	CreateClockOptions,
	RafClock,
	RafClockOptions,
} from "./types"

const createClock = ({
	initial,
	config,
	onTick,
}: CreateClockOptions): Clock => {
	let t = initial
	let last = 0
	let raf = 0
	let current = config

	const frame = (now: number) => {
		const dt = (now - last) / 1000
		last = now
		t = (t + Math.min(MAX_FRAME_SECONDS, dt) * current.speed) % current.duration
		onTick(t)
		raf = requestAnimationFrame(frame)
	}

	const start = () => {
		if (raf !== 0) return
		last = performance.now()
		raf = requestAnimationFrame(frame)
	}

	const stop = () => {
		if (raf === 0) return
		cancelAnimationFrame(raf)
		raf = 0
	}

	const seek = (next: number) => {
		t = Math.min(current.duration, Math.max(0, next))
		onTick(t)
	}

	const configure = (next: ClockConfig) => {
		current = next
	}

	return { start, stop, seek, configure }
}

export function useRafClock({
	duration,
	speed = 1,
	autoplay = true,
	frozenAt,
	ref,
}: RafClockOptions): RafClock {
	const reduced = useReducedMotion()
	const [mode, setMode] = useState<ClockMode>("auto")
	const [t, setT] = useState(frozenAt)
	const clockRef = useRef<Clock | null>(null)

	if (clockRef.current === null) {
		clockRef.current = createClock({
			initial: frozenAt,
			config: { duration, speed },
			onTick: setT,
		})
	}

	const playing =
		mode === "playing" || (mode === "auto" && autoplay && !reduced)

	useEffect(() => {
		clockRef.current?.configure({ duration, speed })
	}, [duration, speed])

	useEffect(() => {
		const clock = clockRef.current
		if (!clock) return

		const gates = { visible: !document.hidden, onScreen: false }
		const sync = () => {
			if (playing && gates.visible && gates.onScreen) clock.start()
			else clock.stop()
		}

		const onVisibility = () => {
			gates.visible = !document.hidden
			sync()
		}
		document.addEventListener("visibilitychange", onVisibility)

		const element = ref.current
		const observer = element
			? new IntersectionObserver(
					(entries) => {
						const latest = entries[entries.length - 1]
						if (!latest) return
						gates.onScreen = latest.isIntersecting
						sync()
					},
					{ threshold: ON_SCREEN_THRESHOLD },
				)
			: null

		if (observer && element) {
			observer.observe(element)
		} else {
			gates.onScreen = true
			sync()
		}

		return () => {
			document.removeEventListener("visibilitychange", onVisibility)
			observer?.disconnect()
			clock.stop()
		}
	}, [playing, ref])

	const play = useCallback(() => setMode("playing"), [])
	const pause = useCallback(() => setMode("paused"), [])
	const toggle = useCallback(
		() => setMode(playing ? "paused" : "playing"),
		[playing],
	)
	const seek = useCallback((next: number) => clockRef.current?.seek(next), [])

	return { t, playing, play, pause, toggle, seek }
}
