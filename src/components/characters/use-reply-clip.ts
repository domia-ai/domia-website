"use client"

import { useEffect, useRef, useState } from "react"

import { createClipPlayer } from "./clip-player"
import type { ClipPlayer, ClipState, ReplyClip } from "./types"

export function useReplyClip(): ReplyClip {
	const playerRef = useRef<ClipPlayer | null>(null)
	const [state, setState] = useState<ClipState>({ playing: null, progress: 0 })

	const player = (): ClipPlayer => {
		if (playerRef.current === null)
			playerRef.current = createClipPlayer(setState)
		return playerRef.current
	}

	useEffect(() => () => playerRef.current?.dispose(), [])

	return {
		...state,
		play: (id: string, src: string) => player().play(id, src),
		stop: () => player().stop(),
	}
}
