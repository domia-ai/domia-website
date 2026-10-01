import { playback } from "@/lib/playback"

import type { ClipPlayer, ClipState } from "./types"

const idle: ClipState = { playing: null, progress: 0 }

export const createClipPlayer = (
	onChange: (state: ClipState) => void,
): ClipPlayer => {
	const audio = new Audio()
	let generation = 0

	const clear = () => {
		generation += 1
		audio.onended = null
		audio.ontimeupdate = null
		audio.pause()
	}

	const stop = () => {
		clear()
		playback.release(stop)
		onChange(idle)
	}

	const play = (id: string, src: string) => {
		clear()
		playback.claim(stop)
		const mine = generation
		const finish = () => {
			if (mine === generation) stop()
		}
		audio.src = src
		audio.onended = finish
		audio.ontimeupdate = () => {
			if (mine !== generation) return
			onChange({
				playing: id,
				progress: audio.duration > 0 ? audio.currentTime / audio.duration : 0,
			})
		}
		onChange({ playing: id, progress: 0 })
		void audio.play().catch(finish)
	}

	const dispose = () => {
		clear()
		playback.release(stop)
	}

	return { play, stop, dispose }
}
