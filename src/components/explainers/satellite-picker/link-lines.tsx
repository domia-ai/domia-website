import { cn } from "@/lib/utils"

import { STAGE_HEIGHT, STAGE_WIDTH, hubPoint, linkPath } from "./layout"
import type { LinkLinesProps } from "./types"

export function LinkLines({ count, selectedIndex }: LinkLinesProps) {
	return (
		<svg
			aria-hidden
			viewBox={`0 0 ${STAGE_WIDTH} ${STAGE_HEIGHT}`}
			className="pointer-events-none absolute inset-0 size-full"
		>
			{Array.from({ length: count }, (_, index) => (
				<path
					key={index}
					d={linkPath(index, count)}
					fill="none"
					strokeWidth={2}
					strokeDasharray="8 8"
					strokeLinecap="round"
					className={cn(
						"stroke-mesh animate-mesh-dash motion-safe:transition-opacity motion-safe:duration-300",
						index === selectedIndex ? "opacity-100" : "opacity-0",
					)}
				/>
			))}
			<circle cx={hubPoint.x} cy={hubPoint.y} r={5} className="fill-mesh" />
		</svg>
	)
}
