"use client"

import { badgeVariants } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

import { overlayPillClassName } from "./classes"
import { Tip } from "./tip"
import type { OverlayLabelProps, OverlayLayerProps } from "./types"

const centeredX = "absolute -translate-x-1/2"

function OverlayLabel({ label, copy }: OverlayLabelProps) {
	const style = { left: label.x, top: label.y, width: label.w }
	switch (label.id) {
		case "audio-streams":
			return (
				<span
					className={cn(
						centeredX,
						"text-muted-foreground text-[11px] whitespace-nowrap",
					)}
					style={style}
				>
					{copy.overlays.audioStreams}
				</span>
			)
		case "same-behaviour":
			return (
				<div className={centeredX} style={style}>
					<Tip
						hint="sameBehaviour"
						className={cn(
							badgeVariants({ variant: "outline" }),
							"border-foreground/30 text-muted-foreground pointer-events-auto h-auto border-dashed px-3 py-1 text-[11px] font-normal tracking-wide",
						)}
					>
						{copy.overlays.sameBehaviour}
					</Tip>
				</div>
			)
		case "realtime-endpoint":
			return (
				<div className={centeredX} style={style}>
					<Tip
						hint="realtime"
						className={cn(overlayPillClassName, "pointer-events-auto")}
					>
						{copy.overlays.realtimeEndpoint}
					</Tip>
				</div>
			)
		case "lend-caption":
			return (
				<p
					className="text-muted-foreground absolute text-center text-[11px] leading-snug text-balance"
					style={style}
				>
					{copy.overlays.lendLead}{" "}
					<span className="text-foreground">{copy.overlays.lendEmphasis}</span>{" "}
					{copy.overlays.lendTail}
				</p>
			)
		case "persona-caption":
			return (
				<div
					className="absolute text-center text-[10.5px] leading-snug text-balance"
					style={style}
				>
					<div className="text-model font-semibold">
						{copy.overlays.personaTitle}
					</div>
					<div className="text-muted-foreground">
						{copy.overlays.personaBody}
					</div>
				</div>
			)
		default:
			return null
	}
}

export function OverlayLayer({ data, copy, active }: OverlayLayerProps) {
	return (
		<>
			{data.scenarios.map((scenario) => {
				const on = scenario.id === active
				return (
					<div
						key={scenario.id}
						className="pointer-events-none absolute inset-0 motion-safe:transition-opacity motion-safe:duration-500"
						style={{ opacity: on ? 1 : 0 }}
						aria-hidden={on ? undefined : true}
						inert={!on}
					>
						{scenario.labels.map((label) => (
							<OverlayLabel key={label.id} label={label} copy={copy} />
						))}
					</div>
				)
			})}
		</>
	)
}
