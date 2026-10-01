import { getTranslations } from "next-intl/server"

import { Section } from "@/components/sections"
import { TypographyH2, TypographyH3 } from "@/components/ui/typography"
import { caseAlsoIds } from "@/constants/pages"

import { SetupSteps } from "./setup-steps"
import type { SetupAlsoProps } from "./types"

export async function SetupAlso({ tone }: SetupAlsoProps) {
	const t = await getTranslations("cases")

	return (
		<Section id="setup" tone={tone} labelledBy="setup-title">
			<div className="flex flex-col gap-10">
				<div className="flex max-w-3xl flex-col gap-4">
					<TypographyH2 id="setup-title">{t("setup.title")}</TypographyH2>
				</div>
				<SetupSteps />
				<div className="flex flex-col gap-4">
					<TypographyH3 id="also-title" className="text-xl">
						{t("also.title")}
					</TypographyH3>
					<ul
						aria-labelledby="also-title"
						className="text-muted-foreground grid list-none grid-cols-1 gap-6 leading-6 md:grid-cols-3"
					>
						{caseAlsoIds.map((id) => (
							<li key={id} className="border-primary/30 border-l-2 pl-4">
								{t(`also.${id}`)}
							</li>
						))}
					</ul>
				</div>
			</div>
		</Section>
	)
}
