import { getTranslations } from "next-intl/server"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GithubIcon } from "@/components/landing/icons"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"
import { Link } from "@/i18n/navigation"

export async function CtaBand({
	title,
	subtitle,
	contactLabel,
}: {
	title?: string
	subtitle?: string
	contactLabel?: string
}) {
	const t = await getTranslations("common.ctaBand")

	return (
		<Card>
			<CardContent className="flex flex-col items-center gap-6 py-8 text-center">
				<TypographyH2>{title ?? t("title")}</TypographyH2>
				<TypographyLarge className="max-w-2xl">
					{subtitle ?? t("subtitle")}
				</TypographyLarge>
				<div className="flex flex-wrap items-center justify-center gap-3">
					<Button
						size="lg"
						nativeButton={false}
						render={
							<a
								href="https://github.com/domia-ai"
								target="_blank"
								rel="noopener noreferrer"
							/>
						}
					>
						<GithubIcon className="mr-2 size-4" />
						{t("github")}
					</Button>
					<Button
						size="lg"
						variant="outline"
						nativeButton={false}
						render={<Link href="/contact" />}
					>
						{contactLabel ?? t("contact")}
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}
