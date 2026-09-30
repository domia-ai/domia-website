import type { SkillGroupId } from "@/data/types"

export const outcomeMinHeightClassName = "xl:min-h-10"

export const groupSpanClassName: Record<SkillGroupId, string> = {
	builtin: "xl:col-span-2",
	homeAssistant: "xl:col-span-2",
	musicAssistant: "xl:col-span-2",
	mcp: "xl:col-span-3",
	routines: "md:col-span-2 xl:col-span-3",
}
