import type { PipelineMachineId } from "@/data/types"

import type { LaneCopy } from "./types"

export const laneSubtitle = (lane: LaneCopy, machine: PipelineMachineId) =>
	lane.sub === null ? lane.note[machine] : `${lane.sub} · ${lane.note[machine]}`

export const laneHintBody = (lane: LaneCopy, machine: PipelineMachineId) =>
	`${lane.tip} ${lane.note[machine]}`
