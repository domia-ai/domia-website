const SITE = "https://domia.ai"

export function BreadcrumbsJsonLd({
	items,
}: {
	items: { name: string; path: string }[]
}) {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [{ name: "Home", path: "/" }, ...items].map(
			(item, index) => ({
				"@type": "ListItem",
				position: index + 1,
				name: item.name,
				item: `${SITE}${item.path === "/" ? "" : item.path}`,
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
