import { getTranslations } from "next-intl/server"

import { Section } from "@/components/sections"
import { TypographyP } from "@/components/ui/typography"
import {
	caseRoutes,
	homeAlsoIds,
	homeCaseIds,
	hospitalityCaseIds,
} from "@/constants/pages"

import { CaseCard, CaseNoteCard } from "./case-card"
import { caseGridClassName } from "./constants"
import { GroupHeader } from "./group-header"
import { SetupSteps } from "./setup-steps"
import type { CaseBadgeProps, CaseId } from "./types"

export async function CaseGroups() {
	const t = await getTranslations("cases")

	const badgesFor = (id: CaseId): CaseBadgeProps[] => {
		const route = caseRoutes[id]
		const routeBadge = { id: route, label: t(`routes.${route}`) }

		return [routeBadge]
	}

	const cardFor = (id: CaseId) => (
		<CaseCard
			key={id}
			line={t("quote", { line: t(`cards.${id}.line`) })}
			happens={t(`cards.${id}.happens`)}
			routeLabel={t("routeLabel")}
			badges={badgesFor(id)}
		/>
	)

	return (
		<>
			<Section id="home" tone="alt" labelledBy="home-title">
				<div className="flex flex-col gap-10">
					<GroupHeader
						id="home"
						title={t("groups.home.title")}
						intro={t("groups.home.intro")}
						needs={t("groups.home.needs")}
					/>
					<ul className={caseGridClassName}>
						{homeCaseIds.map(cardFor)}
						<CaseNoteCard title={t("also.title")}>
							<ul className="flex list-disc flex-col gap-2 pl-5">
								{homeAlsoIds.map((id) => (
									<li key={id}>{t(`also.${id}`)}</li>
								))}
							</ul>
						</CaseNoteCard>
					</ul>
				</div>
			</Section>
			<Section id="hospitality" labelledBy="hospitality-title">
				<div className="flex flex-col gap-10">
					<GroupHeader
						id="hospitality"
						title={t("groups.hospitality.title")}
						intro={t("groups.hospitality.intro")}
					/>
					<SetupSteps />
					<ul className={caseGridClassName}>
						{hospitalityCaseIds.map(cardFor)}
						<CaseNoteCard title={t("limits.title")}>
							<TypographyP className="mt-0 leading-6">
								{t("limits.body")}
							</TypographyP>
						</CaseNoteCard>
					</ul>
				</div>
			</Section>
		</>
	)
}
