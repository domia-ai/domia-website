"use client"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"

import type { MachineToggleProps } from "./types"

export function MachineToggle({
	value,
	onValueChange,
	items,
	label,
	className,
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
			className={cn(
				"border-border bg-muted/40 flex-wrap rounded-lg border p-1",
				className,
			)}
		>
			{items.map((item) => (
				<ToggleGroupItem
					key={item.value}
					value={item.value}
					className="aria-pressed:bg-primary aria-pressed:text-primary-foreground hover:aria-pressed:bg-primary hover:aria-pressed:text-primary-foreground aria-pressed:shadow-sm"
				>
					{item.label}
				</ToggleGroupItem>
			))}
		</ToggleGroup>
	)
}
