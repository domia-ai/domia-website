import type { LucideIcon } from "lucide-react"

import type { StepColor } from "@/components/sections"

export type RelatedLinkProps = {
	href: string
	label: string
}

export type ConfirmationStep = {
	id: string
	color: StepColor
}

export type IconItem = {
	id: string
	icon: LucideIcon
}
