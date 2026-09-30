"use client"

import { cn } from "@/lib/utils"

import { HopBox } from "./hop-box"
import {
	BOUNDARY,
	MAP_TITLE_TOP,
	PULSE_PATH_LENGTH,
	STAGE_HEIGHT,
	STAGE_MARGIN,
	STAGE_WIDTH,
} from "./layout"
import { PathHeader } from "./path-header"
import type { HopMapsProps, HopSegment, HopVisibility } from "./types"

const segmentPath = (segment: HopSegment) =>
	`M ${segment.x1} ${segment.y} H ${segment.x2}`

const segmentBroken = (segment: HopSegment, visibility: HopVisibility) =>
	visibility.isBroken(segment.from) || visibility.isBroken(segment.to)

export function HopMaps({ layouts, copy, visibility }: HopMapsProps) {
	return (
		<>
			<svg
				viewBox={`0 0 ${STAGE_WIDTH} ${STAGE_HEIGHT}`}
				width={STAGE_WIDTH}
				height={STAGE_HEIGHT}
				className="absolute inset-0"
				aria-hidden
			>
				<rect
					x={BOUNDARY.x}
					y={BOUNDARY.y}
					width={BOUNDARY.width}
					height={BOUNDARY.height}
					rx={16}
					strokeWidth={2}
					strokeDasharray="8 6"
					className="fill-mesh/5 stroke-mesh/60"
				/>
				{layouts.flatMap((layout) =>
					layout.segments.map((segment) => {
						const broken = segmentBroken(segment, visibility)
						return (
							<g
								key={`${layout.key}-${segment.id}`}
								className={cn(
									"motion-safe:transition-opacity motion-safe:duration-300",
									broken && "opacity-30",
								)}
							>
								<path
									d={segmentPath(segment)}
									strokeWidth={2}
									className="stroke-border fill-none"
								/>
								<path
									d={segmentPath(segment)}
									pathLength={PULSE_PATH_LENGTH}
									strokeWidth={9}
									strokeLinecap="round"
									strokeDasharray="0.6 31.4"
									className={cn(
										"stroke-audio fill-none",
										!broken && "animate-mesh-dash",
									)}
								/>
							</g>
						)
					}),
				)}
			</svg>
			{layouts.map((layout) => (
				<PathHeader
					key={layout.key}
					pathKey={layout.key}
					copy={copy}
					visibility={visibility}
					className="absolute"
					style={{
						left: STAGE_MARGIN + 2,
						right: STAGE_MARGIN + 2,
						top: MAP_TITLE_TOP[layout.key],
					}}
				/>
			))}
			{layouts.flatMap((layout) =>
				layout.boxes.map((box) => (
					<HopBox
						key={`${layout.key}-${box.hop.id}`}
						box={box}
						copy={copy}
						broken={visibility.isBroken(box.hop)}
					/>
				)),
			)}
		</>
	)
}
