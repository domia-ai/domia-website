import type { connectSkillIds, stepIds } from "@/constants/run"

export type StepId = (typeof stepIds)[number]

export type ConnectSkillId = (typeof connectSkillIds)[number]

export type PortabilityItemId = "mind" | "templates"
