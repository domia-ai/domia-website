import Image from "next/image"
import { getTranslations } from "next-intl/server"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export async function Cultural() {
	const t = await getTranslations("cases.cultural")

	return (
		<Card>
			<CardHeader>
				<TypographyH2>{t("title")}</TypographyH2>
			</CardHeader>

			<CardContent className="flex flex-col-reverse items-center gap-8 lg:flex-row lg:items-start">
				<TypographyLarge>{t("p1")}</TypographyLarge>

				<Image
					src="/cases/cultural.webp"
					alt={t("imageAlt")}
					width={723}
					height={959}
					priority
					className="h-auto w-full max-w-[200px]"
				/>
			</CardContent>
		</Card>
	)
}
