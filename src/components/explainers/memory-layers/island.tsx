"use client"

import { useState } from "react"

import {
	HintIndex,
	HintProvider,
	MachineToggle,
} from "@/components/explainers/shared"
import { MemoryBand, hintId } from "./band"
import type { MemoryLayersIslandProps, MemoryPhase } from "./types"

const phases: MemoryPhase[] = ["turn", "idle"]

const isMemoryPhase = (value: string): value is MemoryPhase =>
	phases.some((phase) => phase === value)

export function MemoryLayersIsland({ data, copy }: MemoryLayersIslandProps) {
	const [phase, setPhase] = useState<MemoryPhase>("turn")

	return (
		<HintProvider>
			<div
				role="group"
				aria-label={copy.regionLabel}
				className="flex flex-col gap-6"
			>
				<MachineToggle
					value={phase}
					onValueChange={(next) => {
						if (isMemoryPhase(next)) setPhase(next)
					}}
					items={phases.map((value) => ({ value, label: copy.toggle[value] }))}
					label={copy.toggle.label}
				/>
				<ol className="flex flex-col gap-3">
					{data.layers.map((layer) => (
						<MemoryBand
							key={layer.id}
							layer={layer}
							copy={copy}
							phase={phase}
						/>
					))}
				</ol>
				<p className="text-muted-foreground max-w-3xl text-sm text-balance">
					{copy.footer}
				</p>
				<HintIndex
					heading={copy.hintsHeading}
					items={data.layers.map((layer) => ({
						id: hintId(layer.id),
						title: copy.layers[layer.id].name,
						body: copy.layers[layer.id].hint,
					}))}
				/>
			</div>
		</HintProvider>
	)
}
