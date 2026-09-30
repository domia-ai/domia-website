import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"

import type { LinkButtonProps } from "./types"

const isInternalHref = (href: string) => href.startsWith("/")

export function LinkButton({
	href,
	children,
	...buttonProps
}: LinkButtonProps) {
	const t = useTranslations("nav")

	if (isInternalHref(href)) {
		return (
			<Button
				{...buttonProps}
				nativeButton={false}
				render={<Link href={href} role={undefined} />}
			>
				{children}
			</Button>
		)
	}

	return (
		<Button
			{...buttonProps}
			nativeButton={false}
			render={
				<a
					href={href}
					target="_blank"
					rel="noopener noreferrer"
					role={undefined}
				/>
			}
		>
			{children}
			<span className="sr-only"> {t("opensInNewTab")}</span>
		</Button>
	)
}
