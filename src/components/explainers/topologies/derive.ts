import type {
	TopologiesData,
	TopologyScenario,
	TopologyScenarioId,
} from "@/data/types"

import type {
	PeerLlmMode,
	PlacementInput,
	PlacementStyle,
	StackedNodeLine,
	TopologiesCopy,
	TopologyHintKey,
	TopologyNodeKey,
	TopologyPipelineChipKey,
} from "./types"

const hiddenScale = 0.93

export const defaultScenario: TopologyScenarioId = "hubRooms"

export const scenarioIds: readonly TopologyScenarioId[] = [
	"single",
	"hubRooms",
	"mesh",
]

const nodeKeys: Record<string, TopologyNodeKey> = {
	main: "main",
	mic: "mic",
	speaker: "speaker",
	"sat-esphome": "satEsphome",
	"sat-livekit": "satLivekit",
	"sat-websocket": "satWebsocket",
	"sat-wyoming": "satWyoming",
	"hub-b": "hubB",
	"hub-c": "hubC",
}

export const nodeKeyList: readonly TopologyNodeKey[] = [
	"main",
	"mic",
	"speaker",
	"satEsphome",
	"satLivekit",
	"satWebsocket",
	"satWyoming",
	"hubB",
	"hubC",
]

export const hintKeys: readonly TopologyHintKey[] = [
	"node",
	"identity",
	"identityRemote",
	"wake",
	"stt",
	"routing",
	"llm",
	"tts",
	"memory",
	"mic",
	"speaker",
	"satEsphome",
	"satLivekit",
	"satWebsocket",
	"satWyoming",
	"hubB",
	"hubC",
	"sameBehaviour",
	"realtime",
	"badgeLocal",
	"badgeNoCloud",
	"badgeOpenSource",
	"badgeAdapts",
]

const pipelineChipKeys: readonly TopologyPipelineChipKey[] = [
	"wake",
	"stt",
	"routing",
	"llm",
	"tts",
]

export const recordFrom = <K extends string, V>(
	keys: readonly K[],
	value: (key: K) => V,
): Record<K, V> =>
	Object.fromEntries(keys.map((key) => [key, value(key)])) as Record<K, V>

export const nodeKey = (id: string): TopologyNodeKey => nodeKeys[id]

export const nodeHint = (id: string): TopologyHintKey => {
	const key = nodeKey(id)
	return key === "main" ? "node" : key
}

export const isPipelineChip = (
	value: string,
): value is TopologyPipelineChipKey =>
	pipelineChipKeys.some((key) => key === value)

export const isScenarioId = (
	data: TopologiesData,
	value: string,
): value is TopologyScenarioId =>
	data.scenarios.some((scenario) => scenario.id === value)

export const findScenario = (data: TopologiesData, id: TopologyScenarioId) =>
	data.scenarios.find((scenario) => scenario.id === id) ?? data.scenarios[0]

export const placementStyle = (placement: PlacementInput): PlacementStyle =>
	placement
		? {
				transform: `translate(${placement.dx}px, ${placement.dy}px) scale(${placement.scale})`,
				opacity: 1,
			}
		: {
				transform: `translate(0px, 0px) scale(${hiddenScale})`,
				opacity: 0,
			}

export const identitiesOn = (
	data: TopologiesData,
	scenario: TopologyScenario,
	nodeId: string,
) =>
	data.identities.filter(
		(identity) =>
			identity.node === nodeId && scenario.identities.includes(identity.id),
	)

export const peerLlmMode = (
	nodeId: string,
	scenario: TopologyScenario,
): PeerLlmMode =>
	scenario.links.some((link) => link.arrow && link.from === nodeId)
		? "delegated"
		: "shared"

const presentNodes = (data: TopologiesData, scenario: TopologyScenario) =>
	data.nodes.filter((node) => scenario.placements[node.id])

const joinDetails = (parts: (string | undefined)[]) =>
	parts.filter((part) => part !== undefined && part !== "").join(" · ")

export const stackedLines = (
	data: TopologiesData,
	copy: TopologiesCopy,
	scenario: TopologyScenario,
): StackedNodeLine[] =>
	presentNodes(data, scenario).map((node) => {
		const nodeCopy = copy.nodes[nodeKey(node.id)]
		const names = identitiesOn(data, scenario, node.id)
			.map((identity) => copy.identities[identity.id])
			.join(", ")
		switch (node.kind) {
			case "node":
				return {
					id: node.id,
					title: nodeCopy.title,
					detail: joinDetails([
						copy.device[scenario.id],
						names,
						copy.chips.memory,
					]),
				}
			case "peer":
				return {
					id: node.id,
					title: nodeCopy.title,
					detail: joinDetails([
						nodeCopy.sub,
						names,
						peerLlmMode(node.id, scenario) === "delegated"
							? copy.chips.llmDelegated
							: copy.chips.llmShared,
					]),
				}
			case "satellite":
				return {
					id: node.id,
					title: nodeCopy.title,
					detail: joinDetails([
						nodeCopy.sub,
						copy.bindings[scenario.id][node.id],
					]),
				}
			case "peripheral":
				return { id: node.id, title: nodeCopy.title }
		}
	})
