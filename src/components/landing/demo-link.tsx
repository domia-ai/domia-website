import { useTranslations } from "next-intl"
import { ArrowRight, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { demoUrl } from "@/constants"

import type { DemoLinkProps } from "./types"

export function DemoLink({
	path = "/",
	label,
	variant = "primary",
	size,
	className,
}: DemoLinkProps) {
	const t = useTranslations("nav")
	const href = path.startsWith("/") ? `${demoUrl}${path}` : `${demoUrl}/${path}`
	const anchor = (
		<a href={href} target="_blank" rel="noopener noreferrer" role={undefined} />
	)
	const newTabNote = <span className="sr-only"> {t("opensInNewTab")}</span>

	if (variant === "inline") {
		return (
			<Button
				variant="link"
				className={cn("h-auto gap-2 self-start p-0", className)}
				nativeButton={false}
				render={anchor}
			>
				{label}
				{newTabNote}
				<ArrowRight aria-hidden="true" className="size-4" />
			</Button>
		)
	}

	return (
		<Button
			size={size ?? (variant === "primary" ? "lg" : "sm")}
			variant={variant === "primary" ? "default" : "outline"}
			className={className}
			nativeButton={false}
			render={anchor}
		>
			{label}
			{newTabNote}
			<ExternalLink aria-hidden="true" className="ml-2 size-4" />
		</Button>
	)
}
