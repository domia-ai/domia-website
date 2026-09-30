import type { ComponentType, SVGProps } from "react"
import type { LucideIcon } from "lucide-react"

export type DemoLinkVariant = "primary" | "secondary" | "inline"

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
