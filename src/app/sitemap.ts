import type { MetadataRoute } from "next"

import { footerRoutes } from "@/constants"
import { routing } from "@/i18n/routing"
import { alternatesFor, localizedUrl, SITE_LAST_MODIFIED } from "@/i18n/urls"

const paths = ["/", ...footerRoutes]

export default function sitemap(): MetadataRoute.Sitemap {
	const lastModified = new Date(SITE_LAST_MODIFIED)

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
