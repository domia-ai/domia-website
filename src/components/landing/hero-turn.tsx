"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

import { TurnCard } from "@/components/listen/turn-card"
import type { ListenPhase } from "@/components/listen/types"
import { useTurnPlayer } from "@/components/listen/use-turn-player"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { HERO_ART_SIZE } from "./constants"
import type { HeroTurnProps } from "./types"

const haloClassName: Record<ListenPhase, string> = {
	idle: "animate-halo",
	listening: "opacity-60 motion-safe:scale-95",
	thinking:
		"opacity-80 motion-safe:animate-pulse motion-safe:[animation-duration:900ms]",
	speaking:
		"opacity-100 motion-safe:scale-110 motion-safe:animate-pulse motion-safe:[animation-duration:1400ms]",
}

export function HeroTurn({ turns, listen, copy }: HeroTurnProps) {
	const { playback, play, stop } = useTurnPlayer()
	const [index, setIndex] = useState(0)
	const turn = turns[index] ?? turns[0]
	const phase = playback?.turnId === turn.id ? playback.phase : "idle"

	const show = (next: number) => {
		stop()
		setIndex((next + turns.length) % turns.length)
	}

	return (
		<div className="flex w-[min(28rem,calc(100vw-2rem))] flex-col-reverse items-center gap-4 lg:flex-col">
			<div className="relative w-60 max-w-full lg:w-80">
				<div
					className={cn(
						"from-halo-from via-halo-via to-halo-to absolute inset-0 z-0 rounded-full bg-radial-[at_50%_75%] to-90% blur-2xl motion-safe:transition-[opacity,transform] motion-safe:duration-500",
						haloClassName[phase],
					)}
				/>
				<Image
					src="/domia.webp"
					alt={copy.imageAlt}
					width={HERO_ART_SIZE}
					height={HERO_ART_SIZE}
					priority
					sizes="(min-width: 1024px) 320px, 240px"
					className="relative z-10 aspect-square w-full"
				/>
			</div>
			<div className="flex w-full flex-col gap-3 text-left">
				<div className="min-h-56">
					<TurnCard
						turn={turn}
						copy={listen}
						phase={phase}
						prominent
						onToggle={() => (phase === "idle" ? play(turn) : stop())}
					/>
				</div>
				{turns.length > 1 ? (
					<div className="flex items-center justify-center gap-2">
						<Button
							type="button"
							variant="ghost"
							size="icon-xl"
							aria-label={copy.previous}
							onClick={() => show(index - 1)}
						>
							<ChevronLeft />
						</Button>
						<ul className="flex list-none items-center gap-1">
							{turns.map((item, position) => (
								<li key={item.id}>
									<button
										type="button"
										aria-label={`${copy.show} ${position + 1}: ${item.userText}`}
										aria-current={position === index ? "true" : undefined}
										onClick={() => show(position)}
										className="group focus-visible:ring-ring/50 grid size-10 place-items-center rounded-full outline-none focus-visible:ring-3"
									>
										<span
											className={cn(
												"block h-2 rounded-full transition-[width,background-color] motion-reduce:transition-none",
												position === index
													? "bg-primary w-6"
													: "bg-foreground/25 group-hover:bg-foreground/50 w-2",
											)}
										/>
									</button>
								</li>
							))}
						</ul>
						<Button
							type="button"
							variant="ghost"
							size="icon-xl"
							aria-label={copy.next}
							onClick={() => show(index + 1)}
						>
							<ChevronRight />
						</Button>
					</div>
				) : null}
			</div>
		</div>
	)
}
