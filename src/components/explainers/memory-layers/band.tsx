"use client"

import { MessageCircle, Moon, PenLine } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { MemoryLayer } from "@/data/types"

import { Hint } from "@/components/explainers/shared"
import type { MemoryBandProps, MemoryPhase } from "./types"

const writerIcons: Record<MemoryLayer["writtenBy"], LucideIcon> = {
	author: PenLine,
	turn: MessageCircle,
	reflection: Moon,
}

export const hintId = (layerId: MemoryLayer["id"]) => `memory-${layerId}`

const isHighlighted = (layer: MemoryLayer, phase: MemoryPhase) =>
	phase === "turn" || layer.writtenBy === "reflection"

const pillFor = (
	layer: MemoryLayer,
	phase: MemoryPhase,
	pills: MemoryBandProps["copy"]["pills"],
) => {
	if (phase === "idle") return pills.writtenNow
	return layer.recalledBy === "session" ? pills.inPromptSession : pills.inPrompt
}

export function MemoryBand({ layer, copy, phase }: MemoryBandProps) {
	const layerCopy = copy.layers[layer.id]
	const highlighted = isHighlighted(layer, phase)
	const pill = pillFor(layer, phase, copy.pills)
	const WriterIcon = writerIcons[layer.writtenBy]

	return (
		<li data-layer={layer.id} data-highlighted={highlighted}>
			<Card
				className={cn(
					"text-base motion-safe:transition-colors motion-safe:duration-300",
					highlighted
						? "ring-memory bg-memory/10"
						: "bg-muted/30 ring-border/60",
				)}
			>
				<CardContent className="grid gap-3 sm:grid-cols-[minmax(10rem,1fr)_2fr] lg:grid-cols-[minmax(11rem,1fr)_2fr_2fr_auto] lg:items-start">
					<div className="flex flex-col items-start gap-2">
						<Hint
							id={hintId(layer.id)}
							title={layerCopy.name}
							body={layerCopy.hint}
							className="decoration-memory/60 focus-visible:ring-ring/50 rounded-sm text-left font-medium text-balance underline decoration-dotted underline-offset-4 focus-visible:ring-3 focus-visible:outline-none"
						>
							{layerCopy.name}
						</Hint>
						{highlighted ? (
							<Badge className="bg-memory text-background h-auto whitespace-normal">
								{pill}
							</Badge>
						) : null}
					</div>
					<p className="text-muted-foreground text-sm text-balance">
						{layerCopy.description}
					</p>
					<p className="border-border bg-background w-fit max-w-full rounded-2xl rounded-tl-sm border px-3 py-2 text-sm">
						{layerCopy.example}
					</p>
					<p className="text-muted-foreground flex flex-wrap items-center gap-1.5 text-xs">
						<span>{copy.writerLabel}</span>
						<Badge variant="outline" className="gap-1">
							<WriterIcon aria-hidden />
							{copy.writers[layer.writtenBy]}
						</Badge>
					</p>
				</CardContent>
			</Card>
		</li>
	)
}
