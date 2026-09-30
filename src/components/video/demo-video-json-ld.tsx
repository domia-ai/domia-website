import { getTranslations } from "next-intl/server"

import { JsonLd } from "@/components/seo/json-ld"
import { SITE_URL } from "@/i18n/urls"

import { DEMO_VIDEOS } from "./constants"
import type { DemoVideoJsonLdProps } from "./types"

export async function DemoVideoJsonLd({ video }: DemoVideoJsonLdProps) {
	const t = await getTranslations("videos")
	const spec = DEMO_VIDEOS[video]

	return (
		<JsonLd
			data={{
				"@context": "https://schema.org",
				"@type": "VideoObject",
				name: t(`${video}.title`),
				description: t(`${video}.body`),
				thumbnailUrl: `${SITE_URL}${spec.poster}`,
				contentUrl: spec.src,
				uploadDate: spec.uploadDate,
				duration: spec.duration,
			}}
		/>
	)
}
