"use client"

import { Pause, Play } from "lucide-react"
import Image from "next/image"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { formatClock, formatMs } from "@/lib/format"
import { fillTemplate } from "@/lib/template"
import { cn } from "@/lib/utils"

import { CHARACTER_AVATAR_SIZE } from "./constants"
import type { CharacterCardProps } from "./types"

export function CharacterCard({
	id,
	turn,
	copy,
	playing,
	progress,
	onToggle,
}: CharacterCardProps) {
	const ttfa = turn.timings.ttfaMs

	return (
		<Card
			className={cn(
				"h-full gap-4 py-5 transition-shadow duration-300 motion-reduce:transition-none",
				playing && "ring-audio/50 ring-2",
			)}
		>
			<CardContent className="flex h-full flex-col gap-4">
				<div className="flex items-center gap-3">
					<Image
						src={turn.avatar}
						alt=""
						width={CHARACTER_AVATAR_SIZE}
						height={CHARACTER_AVATAR_SIZE}
						className="bg-muted size-14 rounded-full object-cover"
					/>
					<div className="flex min-w-0 flex-1 flex-col">
						<span className="text-lg font-semibold">{turn.identity}</span>
						<span className="text-muted-foreground text-sm">
							{copy.traits[id]}
						</span>
					</div>
				</div>
				<p className="bg-muted rounded-2xl rounded-tl-sm px-3 py-2 text-sm text-pretty">
					{turn.replyText}
				</p>
				<div className="mt-auto flex items-center gap-3">
					<Button
						type="button"
						size="icon-xl"
						variant={playing ? "default" : "outline"}
						aria-pressed={playing}
						aria-label={`${playing ? copy.stop : copy.play}: ${turn.identity}`}
						onClick={onToggle}
						className="shrink-0"
					>
						{playing ? <Pause /> : <Play />}
					</Button>
					<div
						aria-hidden="true"
						className="bg-muted h-1.5 min-w-0 flex-1 overflow-hidden rounded-full"
					>
						<div
							className="bg-audio h-full rounded-full"
							style={{ width: `${Math.round(progress * 100)}%` }}
						/>
					</div>
					<span className="text-muted-foreground text-xs tabular-nums">
						{formatClock(turn.replyDurationMs)}
					</span>
				</div>
				{ttfa !== null ? (
					<Badge variant="outline" className="self-start">
						{fillTemplate(copy.firstAudio, {
							time: formatMs(ttfa, copy.locale),
						})}
					</Badge>
				) : null}
			</CardContent>
		</Card>
	)
}
