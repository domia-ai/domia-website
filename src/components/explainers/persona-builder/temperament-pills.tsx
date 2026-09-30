"use client"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

import type { TemperamentPillsProps } from "./types"

export function TemperamentPills({
	templates,
	value,
	onValueChange,
	labelledBy,
	copy,
}: TemperamentPillsProps) {
	const select = (next: unknown[]) => {
		const [first] = next
		const template = templates.find((candidate) => candidate.id === first)
		if (template) onValueChange(template.id)
	}

	return (
		<ToggleGroup
			value={[value]}
			onValueChange={select}
			variant="outline"
			aria-labelledby={labelledBy}
			className="flex-wrap"
		>
			{templates.map((template) => (
				<ToggleGroupItem
					key={template.id}
					value={template.id}
					className="data-[state=on]:border-primary/50 min-w-32 rounded-full px-4"
				>
					{copy.templates[template.id].name}
				</ToggleGroupItem>
			))}
		</ToggleGroup>
	)
}
