import { getTranslations } from "next-intl/server"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

const PROTOCOL_IDS = ["esphome", "wyoming", "websocket"] as const

export async function Satellites() {
	const t = await getTranslations("technology.satellites")

	return (
		<Card>
			<CardHeader>
				<TypographyH2>{t("title")}</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>{t("p1")}</TypographyLarge>

				<ul className="list-inside list-disc text-left">
					{PROTOCOL_IDS.map((id) => (
						<li key={id}>
							<strong>{t(`protocols.${id}.title`)}</strong> —{" "}
							{t(`protocols.${id}.description`)}
						</li>
					))}
				</ul>

				<TypographyLarge>{t("p2")}</TypographyLarge>
			</CardContent>
		</Card>
	)
}
