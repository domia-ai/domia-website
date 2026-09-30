"use client"

import { useId, useState } from "react"

import { MachineToggle } from "@/components/explainers/shared"
import { TypographySmall } from "@/components/ui/typography"

import { nodeCardMinHeightClassName } from "./constants"
import { NodeCard } from "./node-card"
import type {
	ArchetypeSelectorIslandProps,
	ArchetypeSelectorState,
} from "./types"

const defaultState: ArchetypeSelectorState = { archetype: "capable" }

export function ArchetypeSelectorIsland({
	data,
	copy,
}: ArchetypeSelectorIslandProps) {
	const selectorLabelId = useId()
	const [state, setState] = useState(defaultState)
	const current = data.archetypes.find(
		(archetype) => archetype.id === state.archetype,
	)
	const items = data.archetypes.map((archetype) => ({
		value: archetype.id,
		label: copy.archetypes[archetype.id].name,
	}))

	const selectById = (next: string) => {
		const match = data.archetypes.find((archetype) => archetype.id === next)
		if (match !== undefined) setState({ archetype: match.id })
	}

	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-col gap-2">
				<TypographySmall id={selectorLabelId} className="font-medium">
					{copy.selectorLabel}
				</TypographySmall>
				<MachineToggle
					value={state.archetype}
					onValueChange={selectById}
					items={items}
					label={copy.selectorLabel}
				/>
			</div>
			<div
				role="region"
				aria-labelledby={selectorLabelId}
				aria-live="polite"
				className={nodeCardMinHeightClassName}
			>
				{current ? <NodeCard archetype={current} copy={copy} /> : null}
			</div>
		</div>
	)
}
