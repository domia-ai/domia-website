import {
	archetypesSchema,
	consoleTourSchema,
	fastPathSchema,
	memorySchema,
	parseData,
	pipelineSchema,
	replaySchema,
	satellitesSchema,
	skillsSchema,
	topologiesSchema,
	turnsSchema,
	voicePathSchema,
} from "@/schemas/data"

import archetypesJson from "./archetypes.json"
import consoleTourJson from "./console-tour.json"
import fastPathJson from "./fast-path.json"
import memoryJson from "./memory.json"
import pipelineJson from "./pipeline.json"
import replayJson from "./replay.json"
import satellitesJson from "./satellites.json"
import skillsJson from "./skills.json"
import topologiesJson from "./topologies.json"
import turnsJson from "./turns.json"
import voicePathJson from "./voice-path.json"

const memoise = <T>(load: () => T): (() => T) => {
	let cached: T | undefined
	return () => {
		if (cached === undefined) cached = load()
		return cached
	}
}

export const loadTopologies = memoise(() =>
	parseData(topologiesSchema, topologiesJson),
)
export const loadPipeline = memoise(() =>
	parseData(pipelineSchema, pipelineJson),
)
export const loadFastPath = memoise(() =>
	parseData(fastPathSchema, fastPathJson),
)
export const loadMemory = memoise(() => parseData(memorySchema, memoryJson))
export const loadSkills = memoise(() => parseData(skillsSchema, skillsJson))
export const loadSatellites = memoise(() =>
	parseData(satellitesSchema, satellitesJson),
)
export const loadArchetypes = memoise(() =>
	parseData(archetypesSchema, archetypesJson),
)
export const loadVoicePath = memoise(() =>
	parseData(voicePathSchema, voicePathJson),
)
export const loadConsoleTour = memoise(() =>
	parseData(consoleTourSchema, consoleTourJson),
)
export const loadTurns = memoise(() => parseData(turnsSchema, turnsJson))
export const loadReplay = memoise(() => parseData(replaySchema, replayJson))
