import { getLocale, getTranslations } from "next-intl/server"

import { localizedUrl } from "@/i18n/urls"

export async function BreadcrumbsJsonLd({
	items,
}: {
	items: { name: string; path: string }[]
}) {
	const locale = await getLocale()
	const t = await getTranslations("meta")

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [{ name: t("home.breadcrumb"), path: "/" }, ...items].map(
			(item, index) => ({
				"@type": "ListItem",
				position: index + 1,
				name: item.name,
				item: localizedUrl(item.path, locale),
			}),
		),
	}

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
		/>
	)
}
