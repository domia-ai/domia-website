import { getTranslations } from "next-intl/server"

import { SectionHero, LinkButton } from "@/components/sections"
import { DemoLink } from "@/components/landing/demo-link"
import { loadListenCopy } from "@/components/listen/copy"
import { loadTurns } from "@/data"

import { HERO_VIDEO } from "./constants"
import { HeroTurn } from "./hero-turn"

export async function Hero() {
	const t = await getTranslations("landing.hero")
	const turns = loadTurns().turns.filter(({ video }) => video === HERO_VIDEO)
	if (turns.length === 0) throw new Error("Hero turns are missing")

	return (
		<SectionHero
			eyebrow={t("eyebrow")}
			title={t("title")}
			subtitle={t("subtitle")}
			halo={false}
			actions={
				<>
					<LinkButton href="/run" size="lg">
						{t("run")}
					</LinkButton>
					<DemoLink variant="secondary" size="lg" label={t("demo")} />
				</>
			}
			art={
				<HeroTurn
					turns={turns}
					listen={await loadListenCopy()}
					copy={{
						previous: t("previous"),
						next: t("next"),
						show: t("show"),
						imageAlt: t("imageAlt"),
					}}
				/>
			}
		/>
	)
}
