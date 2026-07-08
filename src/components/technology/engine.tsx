import { getTranslations } from "next-intl/server"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"
import { engineIds } from "@/constants"

export async function Engine() {
	const t = await getTranslations("technology.engine")

	return (
		<Card>
			<CardHeader>
				<TypographyH2>{t("title")}</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>{t("p1")}</TypographyLarge>

				<ul className="list-inside list-disc text-left">
					{engineIds.map((id) => (
						<li key={id}>
							<strong>{t(`items.${id}.title`)}</strong> —{" "}
							{t(`items.${id}.description`)}
						</li>
					))}
				</ul>

				<TypographyLarge>{t("p2")}</TypographyLarge>

				<TypographyLarge>{t("p3")}</TypographyLarge>
			</CardContent>
		</Card>
	)
}
