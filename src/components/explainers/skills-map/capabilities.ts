import type { SkillGroup, SkillGroupId, ToolPolicy } from "@/data/types"

import type { SkillCapabilitySource, SkillCapabilityTraits } from "./types"

export const capabilitySources: Partial<
	Record<SkillGroupId, readonly SkillCapabilitySource[]>
> = {
	builtin: [
		{ key: "time", tools: ["time"] },
		{ key: "date", tools: ["date"] },
		{ key: "timer", tools: ["timer"] },
		{ key: "cancelTimer", tools: ["timer_cancel"] },
		{ key: "timerStatus", tools: ["timer_status"] },
		{ key: "reminder", tools: ["reminder"] },
		{ key: "repeat", tools: ["repeat"] },
		{ key: "cancel", tools: ["cancel"] },
		{ key: "alarm", tools: ["alarm"] },
		{ key: "cancelAlarm", tools: ["alarm_cancel"] },
		{ key: "volume", tools: ["volume"] },
		{ key: "remember", tools: ["remember"] },
		{ key: "forget", tools: ["forget"] },
	],
	homeAssistant: [
		{ key: "lights", tools: ["HassTurnOn", "HassTurnOff", "HassLightSet"] },
		{ key: "switches", tools: ["HassTurnOn", "HassTurnOff"] },
		{
			key: "covers",
			tools: ["HassSetPosition", "HassTurnOn", "HassTurnOff"],
			domain: "cover",
		},
		{
			key: "climate",
			tools: ["HassClimateSetTemperature", "HassClimateSetFanMode"],
		},
		{ key: "fans", tools: ["HassFanSetSpeed", "HassTurnOn", "HassTurnOff"] },
		{
			key: "vacuum",
			tools: [
				"HassVacuumStart",
				"HassVacuumReturnToBase",
				"HassVacuumCleanArea",
			],
		},
		{
			key: "mower",
			tools: ["HassLawnMowerStartMowing", "HassLawnMowerDock"],
		},
		{
			key: "lockUnlock",
			tools: ["HassLockDoor", "HassUnlockDoor"],
			domain: "lock",
		},
		{ key: "alarmPanels", tools: [], domain: "alarm_control_panel" },
		{ key: "sirens", tools: [], domain: "siren" },
		{ key: "liveState", tools: ["GetLiveContext"] },
	],
	musicAssistant: [
		{ key: "play", tools: ["music_play", "playback_play_media"] },
		{ key: "pause", tools: ["playback_pause", "playback_resume"] },
		{
			key: "skip",
			tools: ["playback_next_track", "playback_previous_track"],
		},
		{
			key: "volume",
			tools: [
				"volume_volume_set",
				"volume_volume_up",
				"volume_volume_down",
				"volume_volume_mute",
			],
		},
		{ key: "nowPlaying", tools: ["music_now_playing"] },
		{
			key: "search",
			tools: [
				"library_search_artists",
				"library_search_albums",
				"library_search_tracks",
			],
		},
	],
}

const policyRank: Record<ToolPolicy, number> = {
	allow: 0,
	confirm: 1,
	block: 2,
}

const strictestPolicy = (policies: ToolPolicy[]): ToolPolicy =>
	policies.reduce<ToolPolicy>(
		(strictest, policy) =>
			policyRank[policy] > policyRank[strictest] ? policy : strictest,
		"allow",
	)

export const capabilityTraits = (
	group: SkillGroup,
	source: SkillCapabilitySource,
): SkillCapabilityTraits | null => {
	const tools = group.tools.filter((tool) => source.tools.includes(tool.id))
	const domain = group.domains.find((entry) => entry.id === source.domain)
	if (tools.length === 0 && domain === undefined) return null
	const toolsFastPath =
		tools.length === 0 || tools.some((tool) => tool.fastPath)
	return {
		fastPath: toolsFastPath && (domain?.fastPath ?? true),
		hidden: tools.length > 0 && tools.every((tool) => tool.hidden),
		policy: strictestPolicy([
			...tools.map((tool) => tool.policy),
			...(domain === undefined ? [] : [domain.policy]),
		]),
	}
}
