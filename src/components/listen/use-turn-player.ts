"use client"

import { useEffect, useRef, useState } from "react"

import type { Turn } from "@/data/types"

import { createTurnPlayer } from "./turn-player"
import type { ListenPlayback, TurnPlayer } from "./types"

export function useTurnPlayer() {
	const playerRef = useRef<TurnPlayer | null>(null)
	const [playback, setPlayback] = useState<ListenPlayback | null>(null)

	const player = (): TurnPlayer => {
		if (playerRef.current === null) {
			playerRef.current = createTurnPlayer(setPlayback)
		}
		return playerRef.current
	}

	useEffect(() => () => playerRef.current?.dispose(), [])

	return {
		playback,
		play: (turn: Turn) => player().play(turn),
		stop: () => player().stop(),
	}
}
