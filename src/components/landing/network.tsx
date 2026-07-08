import { getTranslations } from "next-intl/server"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
	TypographyBlockquote,
	TypographyH2,
	TypographyLarge,
} from "@/components/ui/typography"

export async function Network() {
	const t = await getTranslations("landing.network")

	return (
		<Card>
			<CardHeader>
				<TypographyH2>{t("title")}</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>{t("p1")}</TypographyLarge>

				<TypographyBlockquote>{t("quote")}</TypographyBlockquote>
			</CardContent>
		</Card>
	)
}
