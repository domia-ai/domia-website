import type { ReactElement, ReactNode } from "react"

export type StageBreakpoint = "sm" | "md" | "lg"

export type StageProps = {
	width: number
	height: number
	label: string
	collapseBelow?: StageBreakpoint
	stacked?: ReactNode
	children: ReactNode
	className?: string
}

export type HintSide = "top" | "bottom" | "left" | "right"

export type HintItem = {
	id: string
	title: string
	body: string
}

export type HintProps = {
	id: string
	title: string
	body: string
	side?: HintSide
	className?: string
	render?: ReactElement
	children: ReactNode
}

export type HintIndexProps = {
	heading: string
	items: HintItem[]
}

export type HintProviderProps = {
	children: ReactNode
}

export type OptionItem = {
	value: string
	label: string
}

export type ScenarioTabsProps = {
	value: string
	onValueChange: (v: string) => void
	items: OptionItem[]
	label: string
	instruction?: string
	children: ReactNode
	className?: string
}

export type MachineToggleProps = {
	value: string
	onValueChange: (v: string) => void
	items: OptionItem[]
	label: string
}

export type AxisOptions = {
	x0: number
	width: number
	max: number
}

export type AxisTick = {
	t: number
	x: number
}

export type Axis = {
	x: (t: number) => number
	t: (x: number) => number
	ticks: (step: number) => AxisTick[]
}

export type FillSpan = {
	x: number
	width: number
}

export type LazyIslandProps = {
	fallback: ReactNode
	children: ReactNode
}
