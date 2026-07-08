import type { Metadata } from "next"

import { routing } from "./routing"

export const SITE_URL = "https://domia.ai"

export const localizedUrl = (path: string, locale: string): string => {
	const suffix = path === "/" ? "" : path
	return locale === routing.defaultLocale
		? `${SITE_URL}${suffix}`
		: `${SITE_URL}/${locale}${suffix}`
}

export const alternatesFor = (path: string) => ({
	canonical: (locale: string) => localizedUrl(path, locale),
	languages: {
		en: localizedUrl(path, "en"),
		es: localizedUrl(path, "es"),
		"x-default": localizedUrl(path, "en"),
	},
})

export const ogLocale = (locale: string) =>
	locale === "es" ? "es_ES" : "en_US"

export const ogAlternateLocale = (locale: string) =>
	locale === "es" ? "en_US" : "es_ES"

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
			alternateLocale: ogAlternateLocale(locale),
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
