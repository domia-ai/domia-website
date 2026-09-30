"use client"

import { useEffect, useRef, useState } from "react"

import { TypographyLarge } from "@/components/ui/typography"

import { VoiceButton } from "./voice-button"
import type { VoiceSamplerProps } from "./types"

export function VoiceSampler({ voices, copy }: VoiceSamplerProps) {
	const audioRef = useRef<HTMLAudioElement | null>(null)
	const [playing, setPlaying] = useState<string | null>(null)

	const stop = () => {
		audioRef.current?.pause()
		setPlaying(null)
	}

	const play = (face: string, src: string) => {
		const audio = audioRef.current ?? new Audio()
		audioRef.current = audio
		audio.pause()
		audio.src = src
		audio.onended = () => setPlaying(null)
		setPlaying(face)
		void audio.play().catch(() => setPlaying(null))
	}

	useEffect(() => () => audioRef.current?.pause(), [])

	const current = voices.find((voice) => voice.face === playing)

	return (
		<div className="flex flex-col gap-6">
			<div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
				{voices.map((voice) => (
					<VoiceButton
						key={voice.face}
						voice={voice}
						name={copy.faces[voice.face] ?? voice.face}
						playing={playing === voice.face}
						copy={copy}
						onToggle={() =>
							playing === voice.face ? stop() : play(voice.face, voice.audio)
						}
					/>
				))}
			</div>
			<TypographyLarge
				aria-live="polite"
				className="text-muted-foreground min-h-8 text-center"
			>
				{current ? `“${current.line}”` : " "}
			</TypographyLarge>
		</div>
	)
}
