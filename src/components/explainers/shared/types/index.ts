import type { ReactElement, ReactNode, RefObject } from "react"

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
	className?: string
}

export type PlayerControlsLabels = {
	play: string
	pause: string
	scrub: string
}

export type PlayerControlsProps = {
	playing: boolean
	onToggle: () => void
	t: number
	max: number
	onSeek: (t: number) => void
	labels: PlayerControlsLabels
	formatValue: (t: number) => string
}

export type RafClockOptions = {
	duration: number
	speed?: number
	autoplay?: boolean
	frozenAt: number
	ref: RefObject<HTMLElement | null>
}

export type RafClock = {
	t: number
	playing: boolean
	play: () => void
	pause: () => void
	toggle: () => void
	seek: (t: number) => void
}

export type ClockMode = "auto" | "playing" | "paused"

export type ClockConfig = {
	duration: number
	speed: number
}

export type CreateClockOptions = {
	initial: number
	config: ClockConfig
	onTick: (t: number) => void
}

export type Clock = {
	start: () => void
	stop: () => void
	seek: (t: number) => void
	configure: (config: ClockConfig) => void
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
