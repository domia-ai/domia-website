"use client"

import { Hint } from "@/components/explainers/shared"
import { cn } from "@/lib/utils"

import { laneTone, layout } from "./geometry"
import { laneHintBody } from "./lane-copy"
import type { LaneLabelsProps } from "./types"

export function LaneLabels({ data, copy, selection, frame }: LaneLabelsProps) {
	const width = data.axis.x0 - layout.label.x - layout.label.gap

	return (
		<div className="pointer-events-none absolute inset-0">
			{frame.lanes.map((lane) => {
				const laneCopy = copy.lanes[lane.id]
				const tone = laneTone[lane.color]
				return (
					<div
						key={lane.id}
						className={cn(
							"pointer-events-auto absolute",
							!lane.active && "opacity-70",
						)}
						style={{
							top: lane.y - layout.label.offsetY,
							left: layout.label.x,
							width,
						}}
					>
						<Hint
							id={`pipeline-${lane.id}`}
							title={laneCopy.label}
							body={laneHintBody(laneCopy, selection.machine)}
							side="right"
							className="focus-visible:ring-ring flex w-full cursor-help flex-col items-start gap-0.5 rounded-sm text-left outline-none focus-visible:ring-2"
						>
							{lane.active ? null : (
								<span className="sr-only">{copy.stacked.skipped}</span>
							)}
							<span className="flex items-center gap-2">
								<span
									aria-hidden="true"
									className={cn("size-2 shrink-0 rounded-[2px]", tone.swatch)}
								/>
								<span
									className={cn(
										"leading-tight",
										laneCopy.sub === null
											? "text-muted-foreground text-[11px] font-medium"
											: "text-foreground text-[13px] font-semibold",
									)}
								>
									{laneCopy.label}
								</span>
							</span>
							{laneCopy.sub === null ? null : (
								<span className="text-muted-foreground block text-[10px] leading-tight">
									{laneCopy.sub}
								</span>
							)}
						</Hint>
					</div>
				)
			})}
		</div>
	)
}
