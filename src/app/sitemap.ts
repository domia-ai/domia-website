import type { MetadataRoute } from "next"

import { routes } from "@/constants"
import { routing } from "@/i18n/routing"
import { alternatesFor, localizedUrl } from "@/i18n/urls"

const paths = ["/", ...routes]

export default function sitemap(): MetadataRoute.Sitemap {
	const lastModified = new Date()

	return paths.flatMap((path) =>
		routing.locales.map((locale) => ({
			url: localizedUrl(path, locale),
			lastModified,
			alternates: {
				languages: alternatesFor(path).languages,
			},
		})),
	)
}
