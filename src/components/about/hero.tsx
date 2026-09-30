import Image from "next/image"
import { getTranslations } from "next-intl/server"

import { SectionHero } from "@/components/sections"

export async function Hero() {
	const t = await getTranslations("about.hero")

	return (
		<SectionHero
			eyebrow={t("eyebrow")}
			title={t("title")}
			subtitle={t("subtitle")}
			priority
			art={
				<Image
					src="/about.webp"
					alt={t("imageAlt")}
					width={500}
					height={500}
					sizes="(min-width: 540px) 500px, 92vw"
					priority
					className="animate-domia-pulse"
				/>
			}
		/>
	)
}
