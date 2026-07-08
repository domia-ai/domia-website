import { getTranslations } from "next-intl/server"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { DemoLink } from "@/components/landing/demo-link"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export async function Latency() {
	const t = await getTranslations("experience.latency")

	return (
		<Card>
			<CardHeader>
				<TypographyH2>{t("title")}</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>{t("p1")}</TypographyLarge>

				<TypographyLarge>{t("p2")}</TypographyLarge>

				<DemoLink variant="inline" path="/analytics" label={t("demo")} />
			</CardContent>
		</Card>
	)
}
