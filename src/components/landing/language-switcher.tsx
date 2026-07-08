"use client"
import { useLocale, useTranslations } from "next-intl"

import { cn } from "@/lib/utils"
import { getPathname, usePathname } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"

export function LanguageSwitcher({ className }: { className?: string }) {
	const locale = useLocale()
	const pathname = usePathname()
	const t = useTranslations("nav")

	return (
		<div
			role="group"
			aria-label={t("languageSwitcher")}
			className={cn("flex items-center gap-1", className)}
		>
			{routing.locales.map((target) => (
				<a
					key={target}
					href={getPathname({ locale: target, href: pathname })}
					aria-current={target === locale ? "true" : undefined}
					className={cn(
						"rounded-md px-2 py-1 text-sm font-medium uppercase transition-all duration-300",
						target === locale
							? "text-primary bg-primary/10"
							: "text-muted-foreground hover:text-primary hover:bg-primary/5",
					)}
				>
					{target}
				</a>
			))}
		</div>
	)
}
