import { useTranslations } from "next-intl"
import { ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
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
			<ExternalLink data-icon="inline-end" aria-hidden="true" />
		</Button>
	)
}
