import { Hint } from "@/components/explainers/shared"
import { cn } from "@/lib/utils"

import { laneTone, layout } from "./geometry"
import type { LaneLabelsProps } from "./types"

export function LaneLabels({ data, copy, turn }: LaneLabelsProps) {
	const width = data.axis.x0 - layout.label.x - layout.label.gap

	return (
		<div className="pointer-events-none absolute inset-0">
			{data.lanes.map((lane) => {
				const laneCopy = copy.lanes[lane.id]
				const tone = laneTone[lane.color]
				const active = (turn.mode.spans[lane.id] ?? []).length > 0
				return (
					<div
						key={lane.id}
						className="pointer-events-auto absolute"
						style={{
							top: lane.y - layout.label.offsetY,
							left: layout.label.x,
							width,
						}}
					>
						<Hint
							id={`pipeline-${lane.id}`}
							title={laneCopy.label}
							body={`${laneCopy.tip} ${laneCopy.note}`}
							side="right"
							className="focus-visible:ring-ring/50 flex w-full cursor-help flex-col items-start gap-0.5 rounded-sm text-left outline-none focus-visible:ring-3"
						>
							<span className="flex items-center gap-2">
								<span
									aria-hidden="true"
									className={cn(
										"size-2 shrink-0 rounded-xs",
										tone.swatch,
										!active && "opacity-40",
									)}
								/>
								<span
									className={cn(
										"text-[13px] leading-tight font-semibold",
										active ? "text-foreground" : "text-muted-foreground",
									)}
								>
									{laneCopy.label}
								</span>
							</span>
							<span className="text-muted-foreground block text-[12px] leading-tight">
								{active ? laneCopy.sub : copy.stacked.skipped}
							</span>
						</Hint>
					</div>
				)
			})}
		</div>
	)
}
