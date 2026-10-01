"use client"

import { Pause, Play } from "lucide-react"
import Image from "next/image"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { formatMs } from "@/lib/format"
import { fillTemplate } from "@/lib/template"
import { cn } from "@/lib/utils"

import type { TurnCardProps } from "./types"

const phaseClassName = {
	idle: "",
	listening: "ring-speech/50 ring-2",
	thinking: "ring-model/40 ring-2",
	speaking: "ring-audio/50 ring-2",
} as const

export function TurnCard({
	turn,
	copy,
	phase,
	prominent = false,
	onToggle,
}: TurnCardProps) {
	const active = phase !== "idle"
	const ttfa = turn.timings.ttfaMs

	return (
		<Card
			className={cn(
				"h-full gap-4 py-5 transition-shadow duration-300 motion-reduce:transition-none",
				phaseClassName[phase],
			)}
		>
			<CardContent className="flex h-full flex-col gap-4">
				<div className="flex items-center gap-3">
					<Image
						src={turn.avatar}
						alt=""
						width={44}
						height={44}
						className="bg-muted size-11 rounded-full object-cover"
					/>
					<div className="flex min-w-0 flex-1 flex-col">
						<span className="font-semibold">{turn.identity}</span>
						<span className="text-muted-foreground text-xs">
							{copy.rooms[turn.room]}
						</span>
					</div>
					<Button
						type="button"
						size="icon-xl"
						variant={active || prominent ? "default" : "outline"}
						aria-pressed={active}
						aria-label={`${active ? copy.stop : copy.play}: ${turn.identity}, ${turn.userText}`}
						onClick={onToggle}
						className={cn(prominent && "size-12")}
					>
						{active ? <Pause /> : <Play />}
					</Button>
				</div>
				<p
					className={cn(
						"text-base font-medium transition-colors",
						phase === "listening" ? "text-speech" : "text-foreground",
					)}
				>
					“{turn.userText}”
				</p>
				<p
					aria-live="polite"
					className={cn(
						"text-muted-foreground min-h-12 text-sm",
						phase === "listening" && "invisible",
					)}
				>
					{phase === "thinking" ? copy.phases.thinking : turn.replyText}
				</p>
				<div className="mt-auto flex flex-wrap gap-2">
					<Badge variant="secondary">{copy.paths[turn.path]}</Badge>
					{ttfa !== null ? (
						<Badge variant="outline">
							{fillTemplate(copy.firstAudio, {
								time: formatMs(ttfa, copy.locale),
							})}
						</Badge>
					) : null}
				</div>
			</CardContent>
		</Card>
	)
}
