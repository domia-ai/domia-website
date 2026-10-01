"use client"

import { createElement } from "react"
import type { LucideIcon } from "lucide-react"
import { Cloud, Globe, House, Mic, Router, Volume2 } from "lucide-react"

import { Hint } from "@/components/explainers/shared"
import { cn } from "@/lib/utils"
import type { VoiceHop, VoiceHopKind } from "@/data/types"

import { HopChips } from "./hop-chips"
import type { HopBoxProps } from "./types"

const iconById: Record<string, LucideIcon> = {
	mic: Mic,
	speaker: Volume2,
}

const iconByKind: Record<VoiceHopKind, LucideIcon> = {
	device: Mic,
	network: Router,
	internet: Globe,
	vendor: Cloud,
	node: House,
}

const hopIcon = (hop: VoiceHop) => iconById[hop.id] ?? iconByKind[hop.kind]

const boxClassName: Record<VoiceHopKind, string> = {
	device: "bg-card border-border",
	network: "bg-card border-border",
	internet: "bg-muted/60 border-border border-dashed",
	vendor: "bg-card border-border",
	node: "bg-node-hub border-mesh/50",
}

const hintIdByKind: Partial<Record<VoiceHopKind, "vendor" | "node">> = {
	vendor: "vendor",
	node: "node",
}

export function HopBox({ box, copy, broken }: HopBoxProps) {
	const { hop } = box
	const hintKey = hintIdByKind[hop.kind]
	const label = copy.hops[hop.id] ?? hop.id
	const frameClassName = cn(
		"flex h-full w-full flex-col gap-2 rounded-xl border p-3 text-left",
		boxClassName[hop.kind],
	)
	const style = {
		left: box.x,
		top: box.y,
		width: box.width,
		height: box.height,
	}
	const outerClassName = cn(
		"absolute motion-safe:transition-opacity motion-safe:duration-300",
		broken && "opacity-50",
	)

	const content = (
		<>
			<span className="flex items-center gap-2 text-sm font-medium text-balance">
				{createElement(hopIcon(hop), {
					className: "text-muted-foreground size-4 shrink-0",
					"aria-hidden": true,
				})}
				<span className="leading-tight">{label}</span>
				{broken ? <span className="sr-only">{copy.offlineTag}</span> : null}
			</span>
			<HopChips hop={hop} copy={copy} />
		</>
	)

	if (hintKey) {
		const hint = copy.hints[hintKey]
		return (
			<div className={outerClassName} style={style}>
				<Hint
					id={hint.id}
					title={hint.title}
					body={hint.body}
					side="bottom"
					className={cn(
						frameClassName,
						"focus-visible:ring-ring/50 outline-none focus-visible:ring-3",
					)}
				>
					{content}
				</Hint>
			</div>
		)
	}

	return (
		<div className={cn(outerClassName, frameClassName)} style={style}>
			{content}
		</div>
	)
}
