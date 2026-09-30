import Image from "next/image"
import { getTranslations } from "next-intl/server"

import { SectionHero } from "@/components/sections"

import { HERO_ART_SIZE } from "./constants"

export async function Hero() {
	const t = await getTranslations("contact.hero")

	return (
		<SectionHero
			eyebrow={t("eyebrow")}
			title={t("title")}
			subtitle={t("subtitle")}
			className="py-10 md:py-14"
			art={
				<Image
					src="/contact.webp"
					alt={t("imageAlt")}
					width={HERO_ART_SIZE}
					height={HERO_ART_SIZE}
					sizes={`${HERO_ART_SIZE}px`}
					className="animate-domia-pulse hidden lg:block"
				/>
			}
		/>
	)
}
