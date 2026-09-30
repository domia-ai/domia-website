import Image from "next/image"
import { getTranslations } from "next-intl/server"

import { LinkButton, SectionHero } from "@/components/sections"
import { Button } from "@/components/ui/button"
import { gettingStartedUrl } from "@/constants/run"

export async function Hero() {
	const t = await getTranslations("run.hero")

	return (
		<SectionHero
			eyebrow={t("eyebrow")}
			title={t("title")}
			subtitle={t("subtitle")}
			priority
			actions={
				<>
					<Button
						size="lg"
						nativeButton={false}
						render={<a href="#first-turn" />}
					>
						{t("primary")}
					</Button>
					<LinkButton href={gettingStartedUrl} size="lg" variant="outline">
						{t("secondary")}
					</LinkButton>
				</>
			}
			art={
				<Image
					src="/run.webp"
					alt={t("imageAlt")}
					width={1536}
					height={1024}
					sizes="(min-width: 1024px) 520px, 100vw"
					priority
					className="animate-domia-pulse h-auto w-full max-w-[520px]"
				/>
			}
		/>
	)
}
