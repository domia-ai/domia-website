import { CircleCheck, CircleDashed, CircleOff } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import type { RoadmapArea } from "@/data/types"

import type { RoadmapLaneKey } from "./types"

export const laneOrder: RoadmapLaneKey[] = ["shipped", "maturing", "notBuilt"]

export const areaOrder: RoadmapArea[] = [
	"voice",
	"skills",
	"memoryIdentity",
	"network",
	"console",
	"upkeep",
]

export const laneIcon: Record<RoadmapLaneKey, LucideIcon> = {
	shipped: CircleCheck,
	maturing: CircleDashed,
	notBuilt: CircleOff,
}

export const laneIconClassName: Record<RoadmapLaneKey, string> = {
	shipped: "text-audio",
	maturing: "text-fast-path",
	notBuilt: "text-muted-foreground",
}
