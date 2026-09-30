import type { ReactNode } from "react"

import type {
	caseBadgeIds,
	caseGroupIds,
	caseIds,
	caseRouteIds,
} from "@/constants/pages"

export type CaseId = (typeof caseIds)[number]

export type CaseGroupId = (typeof caseGroupIds)[number]

export type CaseRouteId = (typeof caseRouteIds)[number]

export type CaseBadgeId = (typeof caseBadgeIds)[number]

export type CaseBadgeProps = {
	id: CaseBadgeId
	label: string
}

export type CaseCardProps = {
	line: string
	happens: string
	routeLabel: string
	badges: CaseBadgeProps[]
}

export type CaseNoteCardProps = {
	title: string
	children: ReactNode
}

export type CaseGroupHeaderProps = {
	id: CaseGroupId
	title: string
	intro: string
	needs?: string
}
