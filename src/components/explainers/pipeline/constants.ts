import type { ReplayId } from "@/data/types"

import type { ReplayPhase } from "./types"

export const AFTER_ITEM_IDS = ["micReopen", "bargeIn", "reflection"]

export const REPLAY_IDS: ReplayId[] = [
	"conversation",
	"knowledge",
	"fast",
	"skill",
]

export const REPLAY_PHASES: ReplayPhase[] = [
	"idle",
	"listening",
	"thinking",
	"speaking",
	"done",
]
