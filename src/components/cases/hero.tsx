import Image from "next/image"
import { getTranslations } from "next-intl/server"

import { SectionHero } from "@/components/sections"
import { Button } from "@/components/ui/button"
import {
	caseGroupIds,
	casesHeroImageSide,
	casesHeroImageSizes,
} from "@/constants/pages"

import { RouteLegend } from "./route-legend"

export async function Hero() {
	const t = await getTranslations("cases.hero")

	return (
		<SectionHero
			eyebrow={t("eyebrow")}
			title={t("title")}
			subtitle={t("subtitle")}
			actions={
				<>
					{caseGroupIds.map((group) => (
						<Button
							key={group}
							size="lg"
							variant="outline"
							nativeButton={false}
							render={<a href={`#${group}`} role={undefined} />}
						>
							{t(`anchors.${group}`)}
						</Button>
					))}
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
					className="animate-domia-pulse aspect-square w-60 max-w-full lg:w-105"
				/>
			}
			below={<RouteLegend />}
		/>
	)
}
