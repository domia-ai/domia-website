"use client"

import { useId, useState } from "react"

import { Button } from "@/components/ui/button"

import { TurnCard } from "./turn-card"
import { useTurnPlayer } from "./use-turn-player"
import type { ListenStripProps } from "./types"

export function ListenStrip({ turns, visibleCount, copy }: ListenStripProps) {
	const listId = useId()
	const { playback, play, stop } = useTurnPlayer()
	const [expanded, setExpanded] = useState(false)
	const hasMore = turns.length > visibleCount
	const shown = expanded ? turns : turns.slice(0, visibleCount)

	return (
		<div className="flex flex-col gap-4">
			<ul
				id={listId}
				className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
			>
				{shown.map((turn) => {
					const phase = playback?.turnId === turn.id ? playback.phase : "idle"
					return (
						<li key={turn.id} className="min-w-0">
							<TurnCard
								turn={turn}
								copy={copy}
								phase={phase}
								onToggle={() => (phase === "idle" ? play(turn) : stop())}
							/>
						</li>
					)
				})}
			</ul>
			{hasMore ? (
				<Button
					type="button"
					variant="outline"
					aria-expanded={expanded}
					aria-controls={listId}
					onClick={() => setExpanded((open) => !open)}
					className="self-center max-sm:h-10"
				>
					{expanded ? copy.less : copy.more}
				</Button>
			) : null}
		</div>
	)
}
