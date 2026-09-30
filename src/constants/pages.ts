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

export const caseGroupIds = ["home", "hospitality"] as const

export const homeCaseIds = [
	"alarm",
	"companion",
	"followUp",
	"memory",
	"lights",
	"music",
	"timer",
	"reminder",
	"bargeIn",
	"time",
	"goodnight",
] as const

export const hospitalityCaseIds = [
	"wifi",
	"readingLight",
	"mealTimes",
	"nearby",
	"frontDesk",
] as const

export const caseIds = [...homeCaseIds, ...hospitalityCaseIds] as const

export const caseRoutes: Record<CaseId, CaseRouteId> = {
	alarm: "fastPath",
	companion: "model",
	followUp: "fastPath",
	memory: "memory",
	lights: "fastPath",
	music: "model",
	timer: "fastPath",
	reminder: "model",
	bargeIn: "fastPath",
	time: "fastPath",
	goodnight: "fastPath",
	wifi: "notes",
	readingLight: "fastPath",
	mealTimes: "notes",
	nearby: "notes",
	frontDesk: "notes",
}

export const homeAlsoIds = ["identities", "broadcast", "move"] as const

export const hostingSetupStepIds = ["notes", "hub", "rooms"] as const

export const caseGroupAvatars: Record<CaseGroupId, string> = {
	home: "/collection/teacher.webp",
	hospitality: "/collection/architect.webp",
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
