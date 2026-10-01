import Image from "next/image"
import { getTranslations } from "next-intl/server"

import { BrowserFrame } from "@/components/explainers/console-tour/browser-frame"
import { DemoLink } from "@/components/landing/demo-link"
import { LinkButton, SectionHero } from "@/components/sections"
import { loadConsoleTour } from "@/data"

import {
	HERO_IMAGE_QUALITY,
	HERO_IMAGE_SIZES,
	HERO_SCREEN_KEY,
} from "./constants"

export async function Hero() {
	const t = await getTranslations("experience.hero")
	const capture = loadConsoleTour().screens.find(
		(screen) => screen.key === HERO_SCREEN_KEY,
	)
	if (!capture) throw new Error(`Console screen ${HERO_SCREEN_KEY} is missing`)

	return (
		<SectionHero
			eyebrow={t("eyebrow")}
			title={t("title")}
			subtitle={t("subtitle")}
			artPosition="below"
			actions={
				<>
					<DemoLink variant="primary" label={t("demo")} />
					<LinkButton href="/run" size="lg" variant="outline">
						{t("run")}
					</LinkButton>
				</>
			}
			art={
				<div className="mx-auto w-full max-w-5xl">
					<BrowserFrame route={capture.route}>
						<Image
							src={capture.image.light}
							alt={t("imageAlt")}
							width={capture.image.width}
							height={capture.image.height}
							sizes={HERO_IMAGE_SIZES}
							quality={HERO_IMAGE_QUALITY}
							priority
							className="bg-muted h-auto w-full dark:hidden"
						/>
						<Image
							src={capture.image.dark}
							alt={t("imageAlt")}
							width={capture.image.width}
							height={capture.image.height}
							sizes={HERO_IMAGE_SIZES}
							quality={HERO_IMAGE_QUALITY}
							loading="eager"
							className="bg-muted hidden h-auto w-full dark:block"
						/>
					</BrowserFrame>
				</div>
			}
		/>
	)
}
