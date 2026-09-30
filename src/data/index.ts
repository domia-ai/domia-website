import {
	archetypesSchema,
	consoleTourSchema,
	fastPathSchema,
	memorySchema,
	parseData,
	personasSchema,
	pipelineSchema,
	roadmapSchema,
	satellitesSchema,
	skillsSchema,
	topologiesSchema,
	voicePathSchema,
} from "@/schemas/data"

import archetypesJson from "./archetypes.json"
import consoleTourJson from "./console-tour.json"
import fastPathJson from "./fast-path.json"
import memoryJson from "./memory.json"
import personasJson from "./personas.json"
import pipelineJson from "./pipeline.json"
import roadmapJson from "./roadmap.json"
import satellitesJson from "./satellites.json"
import skillsJson from "./skills.json"
import topologiesJson from "./topologies.json"
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
export const loadRoadmap = memoise(() => parseData(roadmapSchema, roadmapJson))
export const loadConsoleTour = memoise(() =>
	parseData(consoleTourSchema, consoleTourJson),
)
export const loadPersonas = memoise(() =>
	parseData(personasSchema, personasJson),
)
