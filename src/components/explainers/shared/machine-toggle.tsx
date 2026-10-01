"use client"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

import type { MachineToggleProps } from "./types"

export function MachineToggle({
	value,
	onValueChange,
	items,
	label,
}: MachineToggleProps) {
	return (
		<ToggleGroup
			value={[value]}
			onValueChange={(next) => {
				const [first] = next
				if (first !== undefined) onValueChange(first)
			}}
			spacing={1}
			aria-label={label}
			className="border-border bg-muted/40 max-w-full flex-nowrap overflow-x-auto rounded-lg border p-1"
		>
			{items.map((item) => (
				<ToggleGroupItem
					key={item.value}
					value={item.value}
					className="aria-pressed:bg-primary aria-pressed:text-primary-foreground hover:aria-pressed:bg-primary hover:aria-pressed:text-primary-foreground shrink-0 aria-pressed:shadow-sm max-sm:h-9"
				>
					{item.label}
				</ToggleGroupItem>
			))}
		</ToggleGroup>
	)
}
