import type { Metadata } from "next"

import { routing } from "./routing"

export const SITE_URL = "https://www.domia.ai"

export const SITE_LAST_MODIFIED = "2026-10-01"

export const localizedUrl = (path: string, locale: string): string => {
	const suffix = path === "/" ? "" : path
	return locale === routing.defaultLocale
		? `${SITE_URL}${suffix}`
		: `${SITE_URL}/${locale}${suffix}`
}

const OG_LOCALES: Record<string, string> = { en: "en_US", es: "es_ES" }

export const alternatesFor = (path: string) => ({
	canonical: (locale: string) => localizedUrl(path, locale),
	languages: {
		...Object.fromEntries(
			routing.locales.map((locale) => [locale, localizedUrl(path, locale)]),
		),
		"x-default": localizedUrl(path, routing.defaultLocale),
	},
})

export const ogLocale = (locale: string): string =>
	OG_LOCALES[locale] ?? OG_LOCALES[routing.defaultLocale]

export const ogAlternateLocales = (locale: string): string[] =>
	routing.locales
		.filter((candidate) => candidate !== locale)
		.map((candidate) => ogLocale(candidate))

export const pageMetadata = (
	path: string,
	page: string,
	locale: string,
	t: (key: string) => string,
): Metadata => {
	const alternates = alternatesFor(path)
	const title = t(`${page}.title`)
	const description = t(`${page}.description`)

	return {
		title,
		description,
		alternates: {
			canonical: alternates.canonical(locale),
			languages: alternates.languages,
		},
		openGraph: {
			title,
			description,
			url: localizedUrl(path, locale),
			siteName: "Domia",
			images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
			locale: ogLocale(locale),
			alternateLocale: ogAlternateLocales(locale),
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			site: "@domia_ai",
			creator: "@domia_ai",
			images: ["/og-image.png"],
		},
	}
}
