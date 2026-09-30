"use client"

import { Play, Square } from "lucide-react"

import { MachineToggle } from "@/components/explainers/shared"
import { Button } from "@/components/ui/button"
import type { ReplayId } from "@/data/types"

import type { ReplayControlsProps } from "./types"

const isReplayId = (value: string, ids: ReplayId[]): value is ReplayId =>
	ids.some((id) => id === value)

export function ReplayControls({
	turns,
	copy,
	selected,
	running,
	onSelect,
	onToggle,
}: ReplayControlsProps) {
	const ids = turns.map((turn) => turn.id)
	return (
		<div className="border-border bg-muted/30 flex flex-wrap items-center gap-3 rounded-lg border p-3">
			<span className="text-sm font-medium">{copy.label}</span>
			<MachineToggle
				value={selected}
				onValueChange={(next) => {
					if (isReplayId(next, ids)) onSelect(next)
				}}
				items={turns.map((turn) => ({
					value: turn.id,
					label: copy.turns[turn.id],
				}))}
				label={copy.label}
			/>
			<Button
				type="button"
				size="sm"
				variant={running ? "outline" : "default"}
				aria-pressed={running}
				onClick={onToggle}
			>
				{running ? (
					<Square data-icon="inline-start" />
				) : (
					<Play data-icon="inline-start" />
				)}
				{running ? copy.stop : copy.play}
			</Button>
		</div>
	)
}
