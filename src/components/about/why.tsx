import { getTranslations } from "next-intl/server"

import { Section } from "@/components/sections"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export async function WhyItExists() {
	const t = await getTranslations("about.why")

	return (
		<Section id="why" tone="alt" labelledBy="why-title">
			<div className="mx-auto flex max-w-3xl flex-col gap-6">
				<TypographyH2 id="why-title">{t("title")}</TypographyH2>
				<TypographyLarge>{t("p1")}</TypographyLarge>
				<TypographyLarge>{t("p2")}</TypographyLarge>
			</div>
		</Section>
	)
}
