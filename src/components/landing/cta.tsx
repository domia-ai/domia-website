import { getTranslations } from "next-intl/server"

import { githubUrl } from "@/constants"

import { LinkButton, Section } from "@/components/sections"
import { GithubIcon } from "@/components/landing/icons"
import { DemoLink } from "@/components/landing/demo-link"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

import { AskAi } from "./ask-ai"

export async function Cta() {
	const t = await getTranslations("landing.cta")

	return (
		<Section tone="accent" labelledBy="cta-title">
			<div className="flex flex-col items-center gap-6 text-center">
				<TypographyH2 id="cta-title">{t("title")}</TypographyH2>
				<TypographyLarge className="text-muted-foreground max-w-2xl">
					{t("subtitle")}
				</TypographyLarge>
				<div className="flex flex-wrap items-center justify-center gap-3">
					<LinkButton href="/run" size="lg">
						{t("install")}
					</LinkButton>
					<DemoLink variant="secondary" size="lg" label={t("demo")} />
				</div>
				<LinkButton href={githubUrl} variant="link">
					<GithubIcon data-icon="inline-start" aria-hidden="true" />
					{t("github")}
				</LinkButton>
				<AskAi />
			</div>
		</Section>
	)
}
