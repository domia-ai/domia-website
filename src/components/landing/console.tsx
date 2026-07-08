import { getTranslations } from "next-intl/server"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
	TypographyH2,
	TypographyLarge,
	TypographyBlockquote,
} from "@/components/ui/typography"
import { consoleCapabilityIds } from "@/constants"

export async function Console() {
	const t = await getTranslations("landing.console")

	return (
		<Card>
			<CardHeader>
				<TypographyH2>{t("title")}</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>{t("intro")}</TypographyLarge>

				<dl className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{consoleCapabilityIds.map((id) => (
						<Card
							key={id}
							className="bg-secondary transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
						>
							<CardHeader>
								<dt className="text-xl font-bold">{t(`items.${id}.name`)}</dt>
							</CardHeader>

							<CardContent>
								<dd className="flex flex-auto flex-col text-base/7">
									<p className="text-md flex-auto">
										{t(`items.${id}.description`)}
									</p>
								</dd>
							</CardContent>
						</Card>
					))}
				</dl>

				<TypographyBlockquote>{t("quote")}</TypographyBlockquote>
			</CardContent>
		</Card>
	)
}
