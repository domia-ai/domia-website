import { cn } from "@/lib/utils"

import { laneTone } from "./geometry"
import type { LegendProps } from "./types"

export function Legend({ copy }: LegendProps) {
	const items = [
		{ id: "audio", swatch: laneTone.audio.swatch, label: copy.legend.audio },
		{
			id: "model",
			swatch: laneTone.thinking.swatch,
			label: copy.legend.model,
		},
		{
			id: "fastPath",
			swatch: laneTone.fastPath.swatch,
			label: copy.legend.fastPath,
		},
		{ id: "skill", swatch: laneTone.tool.swatch, label: copy.legend.skill },
	]

	return (
		<ul className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
			{items.map((item) => (
				<li key={item.id} className="flex items-center gap-2">
					<span
						aria-hidden="true"
						className={cn("size-2.5 shrink-0 rounded-xs", item.swatch)}
					/>
					{item.label}
				</li>
			))}
		</ul>
	)
}
