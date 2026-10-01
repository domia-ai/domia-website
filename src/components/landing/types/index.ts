import type { ComponentType, SVGProps } from "react"
import type { LucideIcon } from "lucide-react"

import type { ListenCopy } from "@/components/listen/types"
import type { Turn } from "@/data/types"

export type DemoLinkVariant = "primary" | "secondary"

export type DemoLinkSize = "sm" | "lg"

export type DemoLinkProps = {
	path?: string
	label: string
	variant?: DemoLinkVariant
	size?: DemoLinkSize
	className?: string
}

export type ProofEntry = {
	id: string
	icon: LucideIcon
}

export type AskAiAssistant = {
	name: string
	href: string
	icon: ComponentType<SVGProps<SVGSVGElement>>
}

export type AskAiCopyButtonProps = {
	prompt: string
	label: string
	copiedTitle: string
	copiedDescription: string
	failedTitle: string
	failedDescription: string
}

export type ImageCrop = {
	sourceWidth: number
	sourceHeight: number
	x: number
	y: number
	width: number
	height: number
}

export type HeroTurnCopy = {
	previous: string
	next: string
	show: string
	imageAlt: string
}

export type HeroTurnProps = {
	turns: Turn[]
	listen: ListenCopy
	copy: HeroTurnCopy
}
