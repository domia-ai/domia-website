"use client"

import { useEffect, useRef, useState } from "react"

import type { ReplayTurn } from "@/data/types"

import { createReplayPlayer } from "./replay-player"
import type { ReplayPlayer, ReplayState } from "./types"

const idle: ReplayState = { id: null, t: 0, phase: "idle" }

export function useReplay() {
	const playerRef = useRef<ReplayPlayer | null>(null)
	const [state, setState] = useState<ReplayState>(idle)

	const player = (): ReplayPlayer => {
		if (playerRef.current === null)
			playerRef.current = createReplayPlayer(setState)
		return playerRef.current
	}

	useEffect(() => () => playerRef.current?.dispose(), [])

	return {
		state,
		start: (turn: ReplayTurn) => player().start(turn),
		stop: () => player().stop(),
	}
}
