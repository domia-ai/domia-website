import { Brain, NotebookPen, Sparkles, Zap } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import type {
	CaseBadgeId,
	CaseGroupId,
	CaseId,
	CaseRouteId,
} from "@/components/cases/types"

export const caseRouteIds = ["fastPath", "model", "notes", "memory"] as const

export const caseBadgeIds = caseRouteIds

export const caseGroupIds = ["home", "hospitality", "venues"] as const

export const homeCaseIds = [
	"companion",
	"memory",
	"lights",
	"music",
	"reminder",
	"goodnight",
] as const

export const hospitalityCaseIds = [
	"wifi",
	"houseRules",
	"mealTimes",
	"nearby",
	"readingLight",
	"wakeUp",
] as const

export const venueCaseIds = [
	"character",
	"storyTime",
	"showTimes",
	"findWay",
	"exhibit",
	"visitorMemory",
] as const

export const caseIds = [
	...homeCaseIds,
	...hospitalityCaseIds,
	...venueCaseIds,
] as const

export const caseGroupCaseIds: Record<CaseGroupId, readonly CaseId[]> = {
	home: homeCaseIds,
	hospitality: hospitalityCaseIds,
	venues: venueCaseIds,
}

export const caseRoutes: Record<CaseId, CaseRouteId> = {
	companion: "model",
	memory: "memory",
	lights: "fastPath",
	music: "model",
	reminder: "model",
	goodnight: "fastPath",
	wifi: "notes",
	houseRules: "notes",
	mealTimes: "notes",
	nearby: "notes",
	readingLight: "fastPath",
	wakeUp: "fastPath",
	character: "model",
	storyTime: "model",
	showTimes: "notes",
	findWay: "notes",
	exhibit: "notes",
	visitorMemory: "memory",
}

export const caseAlsoIds = ["identities", "broadcast", "move"] as const

export const caseSetupStepIds = ["notes", "hub", "rooms"] as const

export const caseGroupAvatars: Record<CaseGroupId, string> = {
	home: "/collection/teacher.webp",
	hospitality: "/collection/architect.webp",
	venues: "/collection/astronaut.webp",
}

export const caseBadgeClassName: Record<CaseBadgeId, string> = {
	fastPath: "border-fast-path/50 bg-fast-path/10 text-foreground",
	model: "border-model/50 bg-model/10 text-foreground",
	notes: "border-tool/50 bg-tool/10 text-foreground",
	memory: "border-memory/50 bg-memory/10 text-foreground",
}

export const caseBadgeIcons: Record<CaseBadgeId, LucideIcon> = {
	fastPath: Zap,
	model: Sparkles,
	notes: NotebookPen,
	memory: Brain,
}

export const casesHeroImageSizes = "(min-width: 1024px) 420px, 240px"

export const casesHeroImageSide = 500

export const caseGroupAvatarSide = 56
