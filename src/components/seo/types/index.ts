export type BreadcrumbsJsonLdProps = {
	items: { name: string; path: string }[]
}

export type JsonLdProps = {
	data: Record<string, unknown>
}
