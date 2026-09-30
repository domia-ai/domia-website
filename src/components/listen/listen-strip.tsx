"use client"

import { TurnCard } from "./turn-card"
import { useTurnPlayer } from "./use-turn-player"
import type { ListenStripProps } from "./types"

export function ListenStrip({ turns, copy }: ListenStripProps) {
	const { playback, play, stop } = useTurnPlayer()

	return (
		<ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			{turns.map((turn) => {
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
	)
}
