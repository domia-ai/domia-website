import { getTranslations } from "next-intl/server"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"
import { socialMediaLinks } from "@/constants"

export async function Collaborate() {
	const t = await getTranslations("landing.collaborate")

	return (
		<Card>
			<CardHeader>
				<TypographyH2>{t("title")}</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>{t("p1")}</TypographyLarge>

				<div className="flex flex-wrap gap-3">
					{socialMediaLinks.map((link) => (
						<Button
							key={link.name}
							variant="outline"
							nativeButton={false}
							render={
								<a
									href={link.href}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={link.name}
								/>
							}
						>
							<link.icon className="mr-2 size-4" />
							{link.name}
						</Button>
					))}
				</div>
			</CardContent>
		</Card>
	)
}
