import { cn } from "@/lib/utils"

import { laneIcon, laneIconClassName } from "./constants"
import type { RoadmapLaneProps } from "./types"

export function RoadmapLaneBlock({ lane }: RoadmapLaneProps) {
	const Icon = laneIcon[lane.key]
	const iconClassName = laneIconClassName[lane.key]

	return (
		<div className="flex flex-col gap-6 border-t pt-8">
			<h3 className="flex items-center gap-2 text-xl font-semibold">
				<Icon aria-hidden="true" className={cn("size-5", iconClassName)} />
				{lane.label}
			</h3>
			<div className="flex flex-col gap-8">
				{lane.areas.map((group) => (
					<div
						key={group.area}
						className="grid gap-3 md:grid-cols-[10rem_1fr] md:gap-8"
					>
						<h4 className="text-muted-foreground text-sm font-medium tracking-wide uppercase md:pt-0.5">
							{group.label}
						</h4>
						<ul className="flex list-none flex-col gap-4">
							{group.items.map((item) => (
								<li
									key={item.id}
									className="grid gap-1 md:grid-cols-[minmax(12rem,18rem)_1fr] md:gap-6"
								>
									<span className="flex items-start gap-2 font-medium">
										<Icon
											aria-hidden="true"
											className={cn("mt-1 size-4 shrink-0", iconClassName)}
										/>
										{item.label}
									</span>
									<span className="text-muted-foreground pl-6 md:pl-0">
										{item.note}
									</span>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</div>
	)
}
