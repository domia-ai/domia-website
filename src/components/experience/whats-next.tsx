import { getTranslations } from "next-intl/server"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
	TypographyH2,
	TypographyLarge,
	TypographySmall,
} from "@/components/ui/typography"

const upcomingIds = ["skills", "mobile", "trainer"] as const

export async function WhatsNext() {
	const t = await getTranslations("experience.whatsNext")

	return (
		<Card>
			<CardHeader>
				<TypographyH2>{t("title")}</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>{t("intro")}</TypographyLarge>

				<ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{upcomingIds.map((id) => (
						<li key={id}>
							<Card className="bg-secondary h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
								<CardHeader>
									<p className="text-lg font-bold">{t(`items.${id}.title`)}</p>
								</CardHeader>
								<CardContent>
									<TypographySmall className="text-muted-foreground">
										{t(`items.${id}.description`)}
									</TypographySmall>
								</CardContent>
							</Card>
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	)
}
