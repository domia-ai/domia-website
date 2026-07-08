import Image from "next/image"
import { getTranslations } from "next-intl/server"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
	TypographyH2,
	TypographyLarge,
	TypographySmall,
} from "@/components/ui/typography"
import { personasShowcase } from "@/constants"

export async function Personas() {
	const t = await getTranslations("experience.personas")

	return (
		<Card id="personas">
			<CardHeader>
				<TypographyH2>{t("title")}</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>{t("intro")}</TypographyLarge>

				<ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{personasShowcase.map((persona) => (
						<li key={persona.id}>
							<Card className="bg-secondary h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
								<CardContent className="flex flex-col items-center gap-3 p-4 text-center">
									<Image
										src={persona.image}
										alt={persona.name}
										width={200}
										height={200}
										className="aspect-square w-full rounded-xl object-cover"
									/>
									<p className="text-base font-semibold">{persona.name}</p>
									<TypographySmall className="text-muted-foreground">
										{t(`blurbs.${persona.id}`)}
									</TypographySmall>
								</CardContent>
							</Card>
						</li>
					))}
				</ul>

				<TypographySmall className="text-muted-foreground">
					{t.rich("more", {
						code: (chunks) => <code>{chunks}</code>,
					})}
				</TypographySmall>
			</CardContent>
		</Card>
	)
}
