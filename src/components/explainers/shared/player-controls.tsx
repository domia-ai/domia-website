"use client"

import { Pause, Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

import type { PlayerControlsProps } from "./types"

export function PlayerControls({
	playing,
	onToggle,
	t,
	max,
	onSeek,
	labels,
	formatValue,
}: PlayerControlsProps) {
	return (
		<div className="flex items-center gap-3">
			<Button
				type="button"
				variant="ghost"
				size="icon"
				aria-label={playing ? labels.pause : labels.play}
				onClick={onToggle}
			>
				{playing ? <Pause /> : <Play />}
			</Button>
			<Slider
				value={[t]}
				min={0}
				max={max}
				step={0.01}
				aria-label={labels.scrub}
				aria-valuetext={formatValue(t)}
				onValueChange={(next) => onSeek(Array.isArray(next) ? next[0] : next)}
			/>
		</div>
	)
}
