import { getTranslations } from "next-intl/server"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { DemoLink } from "@/components/landing/demo-link"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export async function Templates() {
	const t = await getTranslations("experience.templates")

	return (
		<Card>
			<CardHeader>
				<TypographyH2>{t("title")}</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>{t("intro")}</TypographyLarge>

				<DemoLink variant="inline" path="/templates" label={t("demo")} />
			</CardContent>
		</Card>
	)
}
