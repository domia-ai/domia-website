"use client"

import { useEffect, useRef, useState, useSyncExternalStore } from "react"

import type { ReplayTurn } from "@/data/types"

import { createReplayPlayer } from "./replay-player"
import { createTimeStore } from "./time-store"
import type { ReplayPhase, ReplayPlayer, TimeStore } from "./types"

const serverTime = () => 0

export function useReplay() {
	const [phase, setPhase] = useState<ReplayPhase>("idle")
	const [store] = useState(createTimeStore)
	const playerRef = useRef<ReplayPlayer | null>(null)

	const player = (): ReplayPlayer => {
		if (playerRef.current === null)
			playerRef.current = createReplayPlayer(setPhase, store)
		return playerRef.current
	}

	useEffect(() => () => playerRef.current?.dispose(), [])

	return {
		phase,
		store,
		start: (turn: ReplayTurn) => player().start(turn),
		stop: () => playerRef.current?.stop(),
	}
}

export function useReplayTime(store: TimeStore): number {
	return useSyncExternalStore(store.subscribe, store.get, serverTime)
}
