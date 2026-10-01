"use client"

import { useId, useState } from "react"

import { Card, CardContent } from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

import { CharacterCard } from "./character-card"
import { CHARACTER_IDS } from "./constants"
import type { CharactersIslandProps } from "./types"
import { useReplyClip } from "./use-reply-clip"

export function CharactersIsland({ questions, copy }: CharactersIslandProps) {
	const labelId = useId()
	const clip = useReplyClip()
	const [index, setIndex] = useState(0)
	const question = questions[index] ?? questions[0]

	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-wrap items-center gap-3">
				<span id={labelId} className="text-muted-foreground text-sm">
					{copy.questionLabel}
				</span>
				<ToggleGroup
					value={[String(index)]}
					onValueChange={(next) => {
						const [first] = next
						if (typeof first !== "string") return
						clip.stop()
						setIndex(Number(first))
					}}
					variant="outline"
					aria-labelledby={labelId}
					className="flex-wrap"
				>
					{questions.map((item, position) => (
						<ToggleGroupItem
							key={item.turns[CHARACTER_IDS[0]].id}
							value={String(position)}
							className="aria-pressed:border-primary/50 rounded-full px-4 max-sm:h-10"
						>
							“{item.text}”
						</ToggleGroupItem>
					))}
				</ToggleGroup>
			</div>
			<ul className="grid list-none grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
				{CHARACTER_IDS.map((id) => {
					const turn = question.turns[id]
					const playing = clip.playing === turn.id
					return (
						<li key={id} className="min-w-0">
							<CharacterCard
								id={id}
								turn={turn}
								copy={copy}
								playing={playing}
								progress={playing ? clip.progress : 0}
								onToggle={() =>
									playing ? clip.stop() : clip.play(turn.id, turn.replyAudio)
								}
							/>
						</li>
					)
				})}
				<li className="min-w-0">
					<Card className="bg-muted/40 outline-border h-full py-5 ring-0 outline-1 outline-dashed">
						<CardContent className="flex h-full flex-col justify-center gap-2">
							<p className="text-lg font-semibold">{copy.yours.title}</p>
							<p className="text-muted-foreground text-sm text-pretty">
								{copy.yours.body}
							</p>
						</CardContent>
					</Card>
				</li>
			</ul>
		</div>
	)
}
