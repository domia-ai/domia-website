import type { MetadataRoute } from "next"

import { routing } from "@/i18n/routing"
import { alternatesFor, localizedUrl } from "@/i18n/urls"

const paths = [
	"/",
	"/technology",
	"/cases",
	"/experience",
	"/marketplace",
	"/about",
	"/community",
	"/contact",
]

export default function sitemap(): MetadataRoute.Sitemap {
	return paths.flatMap((path) =>
		routing.locales.map((locale) => ({
			url: localizedUrl(path, locale),
			alternates: {
				languages: alternatesFor(path).languages,
			},
		})),
	)
}
