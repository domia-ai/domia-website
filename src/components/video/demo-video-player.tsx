"use client"

import { Play } from "lucide-react"
import { useCallback, useRef, useState, useSyncExternalStore } from "react"

import { playback } from "@/lib/playback"

import type { DemoVideoPlayerProps } from "./types"

const subscribeNever = () => () => {}

export function DemoVideoPlayer({ spec, copy }: DemoVideoPlayerProps) {
	const videoRef = useRef<HTMLVideoElement>(null)
	const [activated, setActivated] = useState(false)
	const hydrated = useSyncExternalStore(
		subscribeNever,
		() => true,
		() => false,
	)
	const overlay = hydrated && !activated
	const pause = useCallback(() => videoRef.current?.pause(), [])

	const start = () => {
		setActivated(true)
		const video = videoRef.current
		if (!video) return
		void video.play().catch(() => undefined)
		video.focus()
	}

	return (
		<div className="relative">
			<video
				ref={videoRef}
				controls={!overlay}
				playsInline
				onPlay={() => playback.claim(pause)}
				onPause={() => playback.release(pause)}
				onEnded={() => playback.release(pause)}
				preload="none"
				poster={spec.poster}
				width={spec.width}
				height={spec.height}
				aria-label={copy.label}
				className="bg-media aspect-video w-full"
			>
				<source src={spec.src} type="video/mp4" />
				{spec.captions ? (
					<track
						kind="captions"
						srcLang="en"
						label={copy.captions}
						src={spec.captions}
					/>
				) : null}
				{copy.unsupported}
			</video>
			{overlay ? (
				<button
					type="button"
					onClick={start}
					aria-label={`${copy.play}: ${copy.label} (${spec.durationLabel})`}
					className="group focus-visible:ring-ring/60 absolute inset-0 grid place-items-center outline-none focus-visible:ring-4 focus-visible:ring-inset"
				>
					<span className="bg-primary text-primary-foreground grid size-18 place-items-center rounded-full shadow-lg transition-transform group-hover:scale-105 motion-reduce:transition-none md:size-22">
						<Play
							className="size-8 translate-x-0.5 md:size-10"
							aria-hidden="true"
						/>
					</span>
					<span className="bg-media/70 text-media-foreground absolute right-3 bottom-3 rounded-md px-2 py-1 text-sm font-medium tabular-nums">
						{spec.durationLabel}
					</span>
				</button>
			) : null}
		</div>
	)
}
