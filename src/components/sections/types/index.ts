import type { ComponentProps, ReactNode } from "react"
import type { LucideIcon } from "lucide-react"

import type { Button } from "@/components/ui/button"

export type SectionTone = "base" | "alt" | "accent"

export type SectionDensity = "default" | "compact"

export type SectionProps = {
	id?: string
	tone?: SectionTone
	density?: SectionDensity
	labelledBy?: string
	className?: string
	children: ReactNode
}

export type SectionHeroProps = {
	eyebrow?: string
	title: string
	subtitle: string
	actions?: ReactNode
	art?: ReactNode
	artPosition?: "right" | "below"
	below?: ReactNode
	halo?: boolean
	priority?: boolean
	className?: string
}

export type ExplainerSectionProps = {
	id: string
	title: string
	intro?: string
	reservedHeight?: number
	tone?: SectionTone
	children: ReactNode
}

export type LinkButtonProps = Omit<
	ComponentProps<typeof Button>,
	"render" | "nativeButton"
> & {
	href: string
	children: ReactNode
}

export type ProofItem = {
	id: string
	title: string
	body: string
	icon?: LucideIcon
	href?: string
	hrefLabel?: string
}

export type ProofGridProps = {
	items: ProofItem[]
	columns?: 2 | 3
}

export type StepColor =
	"audio" | "speech" | "model" | "fast-path" | "tool" | "memory"

export type StepItem = {
	id: string
	title: string
	body: string
	color?: StepColor
}

export type StepProps = {
	step: StepItem
	index: number
	ordered: boolean
}

export type StepListProps = {
	steps: StepItem[]
	ordered?: boolean
}

export type CtaLink = {
	href: string
	label: string
}

export type CtaBandProps = {
	title: string
	subtitle?: string
	primary: CtaLink
	secondary?: CtaLink
}

export type InPageNavItem = {
	id: string
	label: string
}

export type InPageNavProps = {
	items: InPageNavItem[]
	label: string
}

export type ThemeToggleProps = {
	label: string
}
