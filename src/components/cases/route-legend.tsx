import { getTranslations } from "next-intl/server"

import { LinkButton } from "@/components/sections"
import { TypographyH2, TypographyP } from "@/components/ui/typography"
import { caseBadgeIds } from "@/constants/pages"

import { CaseBadge } from "./case-badge"

export async function RouteLegend() {
	const t = await getTranslations("cases")

	return (
		<section
			aria-labelledby="routes-title"
			className="bg-card ring-foreground/10 flex flex-col gap-6 rounded-xl p-6 ring-1"
		>
			<TypographyH2 id="routes-title" className="text-2xl">
				{t("legend.title")}
			</TypographyH2>
			<ul className="grid list-none grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
				{caseBadgeIds.map((id) => (
					<li key={id} className="flex flex-col items-start gap-2">
						<CaseBadge id={id} label={t(`routes.${id}`)} />
						<TypographyP className="text-muted-foreground mt-0 text-sm leading-6">
							{t(`legend.${id}`)}
						</TypographyP>
					</li>
				))}
			</ul>
			<LinkButton
				href="/technology#routing"
				variant="link"
				className="self-start px-0"
			>
				{t("legend.link")}
			</LinkButton>
		</section>
	)
}
