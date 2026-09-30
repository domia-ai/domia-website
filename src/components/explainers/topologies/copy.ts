import { getTranslations } from "next-intl/server"

import type { TopologiesData, TopologyScenarioId } from "@/data/types"

import { hintKeys, nodeKeyList, recordFrom, scenarioIds } from "./derive"
import type { TopologiesCopy } from "./types"

export const buildTopologiesCopy = async (
	data: TopologiesData,
): Promise<TopologiesCopy> => {
	const t = await getTranslations("explainers.topologies")

	const identities = Object.fromEntries(
		data.identities.map((identity) => [
			identity.id,
			t(`identities.${identity.id}`),
		]),
	)

	const bindingsFor = (id: TopologyScenarioId) => {
		const scenario = data.scenarios.find((item) => item.id === id)
		return Object.fromEntries(
			Object.entries(scenario?.bindings ?? {}).map(([nodeId, identityId]) => [
				nodeId,
				t("bindsTo", { identity: identities[identityId] }),
			]),
		)
	}

	return {
		title: t("title"),
		titleCompact: t("titleCompact"),
		intro: t("intro"),
		stageLabel: t("stageLabel"),
		tabsLabel: t("tabsLabel"),
		tabsInstruction: t("tabsInstruction"),
		tabs: recordFrom(scenarioIds, (id) => t(`tabs.${id}`)),
		device: recordFrom(scenarioIds, (id) => t(`device.${id}`)),
		nodes: recordFrom(nodeKeyList, (key) => ({
			title: t(`nodes.${key}.title`),
			sub: t.has(`nodes.${key}.sub`) ? t(`nodes.${key}.sub`) : undefined,
		})),
		identitiesLabel: t("identitiesLabel"),
		identities,
		bindings: recordFrom(scenarioIds, bindingsFor),
		chips: {
			wake: t("chips.wake"),
			stt: t("chips.stt"),
			routing: t("chips.routing"),
			llm: t("chips.llm"),
			tts: t("chips.tts"),
			memory: t("chips.memory"),
			llmShared: t("chips.llmShared"),
			llmDelegated: t("chips.llmDelegated"),
		},
		overlays: {
			audioStreams: t("overlays.audioStreams"),
			sameBehaviour: t("overlays.sameBehaviour"),
			realtimeEndpoint: t("overlays.realtimeEndpoint"),
			lendLead: t("overlays.lendLead"),
			lendEmphasis: t("overlays.lendEmphasis"),
			lendTail: t("overlays.lendTail"),
			personaTitle: t("overlays.personaTitle"),
			personaBody: t("overlays.personaBody"),
		},
		captions: recordFrom(scenarioIds, (id) => t(`captions.${id}`)),
		hintsHeading: t("hintsHeading"),
		hints: recordFrom(hintKeys, (key) => ({
			id: `topo-${key}`,
			title: t(`hints.${key}.title`),
			body: t(`hints.${key}.body`),
		})),
		badges: {
			local: t("badges.local"),
			noCloud: t("badges.noCloud"),
			openSource: t("badges.openSource"),
			adapts: t("badges.adapts"),
		},
		noscriptHeading: t("noscriptHeading"),
	}
}
