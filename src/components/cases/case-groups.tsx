import { getTranslations } from "next-intl/server"

import { Section } from "@/components/sections"
import {
	caseGroupCaseIds,
	caseGroupIds,
	caseRoutes,
	homeAlsoIds,
} from "@/constants/pages"

import { CaseCard, CaseNoteCard } from "./case-card"
import { caseGridClassName } from "./constants"
import { GroupHeader } from "./group-header"
import { SetupSteps } from "./setup-steps"
import type { CaseBadgeProps, CaseGroupId, CaseId } from "./types"

const groupsWithSetup: readonly CaseGroupId[] = ["hospitality", "venues"]

const groupsWithNeeds: readonly CaseGroupId[] = ["home"]

export async function CaseGroups() {
	const t = await getTranslations("cases")

	const badgesFor = (id: CaseId): CaseBadgeProps[] => {
		const route = caseRoutes[id]
		return [{ id: route, label: t(`routes.${route}`) }]
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
			{caseGroupIds.map((group, index) => (
				<Section
					key={group}
					id={group}
					tone={index % 2 === 0 ? "alt" : "base"}
					labelledBy={`${group}-title`}
				>
					<div className="flex flex-col gap-10">
						<GroupHeader
							id={group}
							title={t(`groups.${group}.title`)}
							intro={t(`groups.${group}.intro`)}
							needs={
								groupsWithNeeds.includes(group)
									? t(`groups.${group}.needs`)
									: undefined
							}
						/>
						{groupsWithSetup.includes(group) && group === "hospitality" ? (
							<SetupSteps />
						) : null}
						<ul className={caseGridClassName}>
							{caseGroupCaseIds[group].map(cardFor)}
							{group === "home" ? (
								<CaseNoteCard title={t("also.title")}>
									<ul className="flex list-disc flex-col gap-2 pl-5">
										{homeAlsoIds.map((id) => (
											<li key={id}>{t(`also.${id}`)}</li>
										))}
									</ul>
								</CaseNoteCard>
							) : null}
						</ul>
					</div>
				</Section>
			))}
		</>
	)
}
