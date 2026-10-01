import Image from "next/image"
import { getTranslations } from "next-intl/server"

import { SectionHero } from "@/components/sections"

export async function Hero() {
	const t = await getTranslations("technology.hero")

	return (
		<SectionHero
			eyebrow={t("eyebrow")}
			title={t("title")}
			subtitle={t("subtitle")}
			art={
				<Image
					src="/technology-variant.webp"
					alt={t("imageAlt")}
					width={1024}
					height={1200}
					sizes="(min-width: 640px) 440px, 205px"
					priority
					className="animate-domia-pulse mx-auto h-60 w-auto sm:h-auto sm:w-full sm:max-w-110"
				/>
			}
		/>
	)
}
