import { getTranslations } from "next-intl/server"

import { Section } from "@/components/sections"
import { caseGroupCaseIds, caseRoutes } from "@/constants/pages"

import { CaseCard } from "./case-card"
import { caseGridClassName } from "./constants"
import { GroupHeader } from "./group-header"
import type { CaseGroupProps } from "./types"

const groupsWithNeeds: readonly string[] = ["home"]

export async function CaseGroup({ group, tone }: CaseGroupProps) {
	const t = await getTranslations("cases")
	const listLabelId = `${group}-requests`

	return (
		<Section id={group} tone={tone} labelledBy={`${group}-title`}>
			<div className="flex flex-col gap-8">
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
				<div className="flex flex-col gap-4">
					<p
						id={listLabelId}
						className="text-muted-foreground text-sm font-medium tracking-wide uppercase"
					>
						{t("typical")}
					</p>
					<ul aria-labelledby={listLabelId} className={caseGridClassName}>
						{caseGroupCaseIds[group].map((id) => (
							<CaseCard
								key={id}
								line={t("quote", { line: t(`cards.${id}.line`) })}
								happens={t(`cards.${id}.happens`)}
								routeLabel={t("routeLabel")}
								badges={[
									{ id: caseRoutes[id], label: t(`routes.${caseRoutes[id]}`) },
								]}
							/>
						))}
					</ul>
				</div>
			</div>
		</Section>
	)
}
