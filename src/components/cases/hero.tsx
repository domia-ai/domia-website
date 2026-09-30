import Image from "next/image"
import { getTranslations } from "next-intl/server"

import { SectionHero } from "@/components/sections"
import { Button } from "@/components/ui/button"
import { casesHeroImageSide, casesHeroImageSizes } from "@/constants/pages"

import { RouteLegend } from "./route-legend"

export async function Hero() {
	const t = await getTranslations("cases.hero")

	return (
		<SectionHero
			eyebrow={t("eyebrow")}
			title={t("title")}
			subtitle={t("subtitle")}
			priority
			actions={
				<>
					<Button size="lg" nativeButton={false} render={<a href="#home" />}>
						{t("homeAnchor")}
					</Button>
					<Button
						size="lg"
						variant="outline"
						nativeButton={false}
						render={<a href="#hospitality" />}
					>
						{t("hospitalityAnchor")}
					</Button>
				</>
			}
			art={
				<Image
					src="/cases.webp"
					alt={t("imageAlt")}
					width={casesHeroImageSide}
					height={casesHeroImageSide}
					sizes={casesHeroImageSizes}
					priority
					className="animate-domia-pulse h-auto w-full max-w-60 lg:max-w-105"
				/>
			}
			below={<RouteLegend />}
		/>
	)
}
