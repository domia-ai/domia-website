import { getTranslations } from "next-intl/server"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
	TypographyBlockquote,
	TypographyH2,
	TypographyLarge,
	TypographySmall,
} from "@/components/ui/typography"
import { futureStepIds } from "@/constants"

export async function Future() {
	const t = await getTranslations("about.future")

	return (
		<Card>
			<CardHeader>
				<TypographyH2>{t("title")}</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>{t("p1")}</TypographyLarge>

				<TypographyLarge>{t("p2")}</TypographyLarge>

				<ul className="list-inside list-disc text-left">
					{futureStepIds.map((id) => (
						<li key={id}>
							<strong>{t(`items.${id}.title`)}</strong> —{" "}
							{t(`items.${id}.description`)}
						</li>
					))}
				</ul>

				<TypographySmall>{t("note")}</TypographySmall>

				<TypographyBlockquote>{t("quote")}</TypographyBlockquote>
			</CardContent>
		</Card>
	)
}
