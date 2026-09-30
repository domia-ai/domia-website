import Image from "next/image"
import { getTranslations } from "next-intl/server"

import { SectionHero, LinkButton } from "@/components/sections"
import { GithubIcon } from "@/components/landing/icons"
import { DemoLink } from "@/components/landing/demo-link"

export async function Hero() {
	const t = await getTranslations("landing.hero")

	return (
		<SectionHero
			eyebrow={t("eyebrow")}
			title={t("title")}
			subtitle={t("subtitle")}
			priority
			actions={
				<>
					<LinkButton href="/technology" size="lg">
						{t("how")}
					</LinkButton>
					<DemoLink variant="secondary" size="lg" label={t("demo")} />
					<LinkButton
						href="https://github.com/domia-ai"
						size="lg"
						variant="ghost"
					>
						<GithubIcon className="mr-2 size-4" aria-hidden="true" />
						{t("github")}
					</LinkButton>
				</>
			}
			art={
				<Image
					src="/domia.webp"
					alt={t("imageAlt")}
					width={360}
					height={360}
					priority
					sizes="(min-width: 1024px) 360px, 240px"
					className="w-full max-w-60 lg:max-w-[360px]"
				/>
			}
		/>
	)
}
