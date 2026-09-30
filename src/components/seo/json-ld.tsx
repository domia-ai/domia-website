import type { JsonLdProps } from "./types"

const serialise = (data: unknown): string =>
	JSON.stringify(data).replace(/</g, "\\u003c")

export function JsonLd({ data }: JsonLdProps) {
	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: serialise(data) }}
		/>
	)
}
