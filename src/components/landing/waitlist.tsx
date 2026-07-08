import { getTranslations } from "next-intl/server"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"
import { Link } from "@/i18n/navigation"

export async function Waitlist() {
	const t = await getTranslations("landing.waitlist")

	return (
		<Card id="waitlist">
			<CardHeader>
				<TypographyH2>{t("title")}</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col items-start gap-6">
				<TypographyLarge>{t("p1")}</TypographyLarge>
				<Button
					size="lg"
					nativeButton={false}
					render={<Link href="/contact" />}
				>
					{t("cta")}
				</Button>
			</CardContent>
		</Card>
	)
}
