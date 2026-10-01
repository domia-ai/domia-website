"use client"
import { useLocale, useTranslations } from "next-intl"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { getPathname, usePathname } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"

export function LanguageSwitcher() {
	const locale = useLocale()
	const pathname = usePathname()
	const t = useTranslations("nav")

	return (
		<div
			role="group"
			aria-label={t("languageSwitcher")}
			className="flex items-center gap-1"
		>
			{routing.locales.map((target) => (
				<Button
					key={target}
					variant="ghost"
					size="sm"
					nativeButton={false}
					className={cn(
						"uppercase max-lg:h-10 max-lg:px-3",
						target === locale
							? "text-primary bg-primary/10"
							: "text-muted-foreground hover:text-primary hover:bg-primary/5",
					)}
					render={
						<a
							href={getPathname({ locale: target, href: pathname })}
							hrefLang={target}
							lang={target}
							role={undefined}
							aria-label={t(`languageNames.${target}`)}
							aria-current={target === locale ? "true" : undefined}
						/>
					}
				>
					{target}
				</Button>
			))}
		</div>
	)
}
