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
			actions={
				<>
					<LinkButton href={gettingStartedUrl} size="lg">
						{t("primary")}
					</LinkButton>
					<Button
						size="lg"
						variant="outline"
						nativeButton={false}
						render={<a href="#first-turn" role={undefined} />}
					>
						{t("secondary")}
					</Button>
				</>
			}
			art={
				<Image
					src="/run.webp"
					alt={t("imageAlt")}
					width={1536}
					height={1024}
					sizes="(min-width: 552px) 520px, calc(100vw - 2rem)"
					priority
					className="animate-domia-pulse h-auto w-full max-w-130"
				/>
			}
		/>
	)
}
