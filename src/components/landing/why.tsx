import { getTranslations } from "next-intl/server"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export async function Why() {
	const t = await getTranslations("landing.why")

	return (
		<Card>
			<CardHeader>
				<TypographyH2>{t("title")}</TypographyH2>
			</CardHeader>
			<CardContent>
				<TypographyLarge>{t("p1")}</TypographyLarge>
			</CardContent>
		</Card>
	)
}
