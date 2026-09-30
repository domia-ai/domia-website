import type { CSSProperties } from "react"

import { cn } from "@/lib/utils"

import type { StageBreakpoint, StageProps } from "./types"

const showFrom: Record<StageBreakpoint, string> = {
	sm: "hidden sm:block",
	md: "hidden md:block",
	lg: "hidden lg:block",
}

const hideFrom: Record<StageBreakpoint, string> = {
	sm: "sm:hidden",
	md: "md:hidden",
	lg: "lg:hidden",
}

export function Stage({
	width,
	height,
	label,
	collapseBelow,
	stacked,
	children,
	className,
}: StageProps) {
	const canvasStyle = {
		width,
		height,
		"--stage-w": `${width}px`,
	} as CSSProperties

	const figure = (
		<div
			role="figure"
			aria-label={label}
			className={cn(
				"@container relative w-full overflow-hidden",
				collapseBelow && showFrom[collapseBelow],
				className,
			)}
			style={{ aspectRatio: `${width} / ${height}` }}
		>
			<div
				className="absolute top-0 left-0 origin-top-left scale-[tan(atan2(100cqw,var(--stage-w)))]"
				style={canvasStyle}
			>
				{children}
			</div>
		</div>
	)

	if (!collapseBelow) return figure

	return (
		<>
			{figure}
			<div className={hideFrom[collapseBelow]}>{stacked}</div>
		</>
	)
}
