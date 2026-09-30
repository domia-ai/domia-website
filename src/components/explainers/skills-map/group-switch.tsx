"use client"

import { useId } from "react"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

import type { GroupSwitchProps } from "./types"

export function GroupSwitch({
	groupId,
	checked,
	onCheckedChange,
	copy,
}: GroupSwitchProps) {
	const switchId = useId()

	return (
		<li className="flex min-h-10 items-center gap-3 rounded-lg border px-3 py-2">
			<Switch
				id={switchId}
				checked={checked}
				onCheckedChange={(next) => onCheckedChange(groupId, next)}
			/>
			<Label htmlFor={switchId} className="cursor-pointer">
				{copy.groups[groupId].name}
			</Label>
		</li>
	)
}
