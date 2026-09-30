import { z } from "zod"

import type {
	Archetype,
	ArchetypesData,
	ConsoleHotspot,
	ConsoleScreen,
	ConsoleTourData,
	DataMeta,
	FastPathAstNode,
	FastPathData,
	FastPathDemoArea,
	FastPathDemoEntity,
	FastPathIntent,
	FastPathLanguagePack,
	FastPathLanguageStats,
	FastPathPreset,
	FastPathSlot,
	FastPathSlotValue,
	FastPathStats,
	FastPathTemplate,
	MemoryData,
	MemoryLayer,
	PersonaFace,
	PersonaTemplate,
	PersonasData,
	PipelineAxis,
	PipelineData,
	PipelineLane,
	PipelineLedger,
	PipelineMachine,
	PipelineMarkers,
	PipelineMode,
	PipelineRouting,
	PipelineSentence,
	PipelineSpan,
	SatelliteProtocol,
	SatellitesData,
	SkillDomain,
	SkillExample,
	SkillGroup,
	SkillTool,
	SkillsData,
	TopologiesData,
	TopologyFrame,
	TopologyIdentity,
	TopologyLabel,
	TopologyLink,
	TopologyNode,
	TopologyPlacement,
	TopologyPoint,
	TopologyRect,
	TopologyScenario,
	Turn,
	TurnsData,
	ReplayData,
	ReplayTurn,
	TurnTimings,
	Voice,
	VoiceHop,
	VoicesData,
	VoicePathData,
} from "@/data/types"

const metaSchema: z.ZodType<DataMeta> = z.object({
	source: z.string().min(1),
	capturedAt: z.string().min(1),
	generator: z.string().min(1),
})

const rectSchema: z.ZodType<TopologyRect> = z.object({
	x: z.number(),
	y: z.number(),
	w: z.number().positive(),
	h: z.number().positive(),
})

const topologyNodeSchema: z.ZodType<TopologyNode> = z.object({
	id: z.string().min(1),
	kind: z.enum(["node", "peripheral", "satellite", "peer"]),
	base: rectSchema,
})

const placementSchema: z.ZodType<TopologyPlacement> = z.object({
	dx: z.number(),
	dy: z.number(),
	scale: z.number().positive(),
})

const pointSchema: z.ZodType<TopologyPoint> = z.tuple([z.number(), z.number()])

const topologyLinkSchema: z.ZodType<TopologyLink> = z.object({
	id: z.string().min(1),
	from: z.string().min(1),
	to: z.string().min(1),
	kind: z.enum(["audio", "stage", "discovery", "satellite"]),
	dashed: z.boolean(),
	arrow: z.boolean(),
	points: z.tuple([pointSchema, pointSchema]).optional(),
	path: z.string().min(1).optional(),
})

const topologyLabelSchema: z.ZodType<TopologyLabel> = z.object({
	id: z.string().min(1),
	x: z.number(),
	y: z.number(),
	w: z.number().positive().optional(),
})

const topologyFrameSchema: z.ZodType<TopologyFrame> = z.object({
	y: z.number(),
	h: z.number().positive(),
})

const topologyScenarioSchema: z.ZodType<TopologyScenario> = z.object({
	id: z.enum(["single", "hubRooms", "mesh"]),
	frame: topologyFrameSchema,
	placements: z.record(z.string(), placementSchema.nullable()),
	links: z.array(topologyLinkSchema),
	labels: z.array(topologyLabelSchema),
	bindings: z.record(z.string(), z.string()),
	identities: z.array(z.string().min(1)).min(1),
})

const topologyIdentitySchema: z.ZodType<TopologyIdentity> = z.object({
	id: z.string().min(1),
	node: z.string().min(1),
	avatar: z.string().min(1),
})

export const topologiesSchema: z.ZodType<TopologiesData> = z.object({
	meta: metaSchema,
	canvas: z.object({ w: z.number().positive(), h: z.number().positive() }),
	nodes: z.array(topologyNodeSchema),
	scenarios: z.array(topologyScenarioSchema),
	identities: z.array(topologyIdentitySchema),
	pipelineChips: z.array(z.string().min(1)),
})

const laneIdSchema = z.enum([
	"mic",
	"stt",
	"routing",
	"mind",
	"llm",
	"splitter",
	"tts",
	"hear",
])

const spanSchema: z.ZodType<PipelineSpan> = z.tuple([z.number(), z.number()])

const axisSchema: z.ZodType<PipelineAxis> = z.object({
	maxSeconds: z.number().positive(),
	loopSeconds: z.number().positive(),
	sweepSeconds: z.number().positive(),
	x0: z.number(),
	width: z.number().positive(),
	viewBox: z.object({ w: z.number().positive(), h: z.number().positive() }),
})

const laneSchema: z.ZodType<PipelineLane> = z.object({
	id: laneIdSchema,
	y: z.number(),
	color: z.enum(["audio", "thinking", "fastPath", "neutral"]),
	rows: z.array(z.number()).optional(),
})

const sentenceSchema: z.ZodType<PipelineSentence> = z.object({
	at: z.number(),
	row: z.number().int().nonnegative(),
	tts: spanSchema,
})

const markersSchema: z.ZodType<PipelineMarkers> = z.object({
	endOfSpeech: z.number(),
	sttFinal: z.number(),
	firstToken: z.number().nullable(),
	firstAudio: z.number(),
})

const routingSchema: z.ZodType<PipelineRouting> = z.object({
	fastPathMs: z.number().nonnegative(),
	fastPathEnd: z.number(),
	llmStart: z.number().nullable(),
})

const modeSchema: z.ZodType<PipelineMode> = z.object({
	spans: z.partialRecord(laneIdSchema, z.array(spanSchema)),
	sentences: z.array(sentenceSchema),
	markers: markersSchema,
	routing: routingSchema,
})

const ledgerSchema: z.ZodType<PipelineLedger> = z.object({
	perceivedMs: z.number().positive(),
	ttftMsRange: z.tuple([z.number(), z.number()]),
	fastPathPerceivedMsRange: z.tuple([z.number(), z.number()]).optional(),
})

const machineSchema: z.ZodType<PipelineMachine> = z.object({
	id: z.enum(["hub", "fastDesktop"]),
	template: z.string().min(1),
	modes: z.object({
		conversation: modeSchema,
		command: modeSchema.optional(),
	}),
	ledger: ledgerSchema,
})

export const pipelineSchema: z.ZodType<PipelineData> = z.object({
	meta: metaSchema,
	axis: axisSchema,
	lanes: z.array(laneSchema),
	machines: z.object({ hub: machineSchema, fastDesktop: machineSchema }),
	epilogue: z.object({ micReopenAt: z.number(), reflectionAt: z.number() }),
})

const astNodeSchema: z.ZodType<FastPathAstNode> = z.lazy(() =>
	z.union([
		z.object({ kind: z.literal("text"), value: z.string().min(1) }),
		z.object({ kind: z.literal("slot"), name: z.string().min(1) }),
		z.object({ kind: z.literal("optional"), body: z.array(astNodeSchema) }),
		z.object({
			kind: z.literal("group"),
			alternatives: z.array(z.array(astNodeSchema)),
		}),
	]),
)

const templateSchema: z.ZodType<FastPathTemplate> = z.object({
	source: z.string().min(1),
	ast: z.array(astNodeSchema),
	prefilter: z.string().min(1),
})

const slotValueSchema: z.ZodType<FastPathSlotValue> = z.object({
	phrase: z.string().min(1),
	args: z.record(z.string(), z.unknown()),
})

const slotSchema: z.ZodType<FastPathSlot> = z.object({
	kind: z.enum(["context", "values", "range", "duration", "clockTime"]),
	arg: z.string().min(1),
	key: z.string().min(1).optional(),
	values: z.array(slotValueSchema).optional(),
	min: z.number().optional(),
	max: z.number().optional(),
	maxSeconds: z.number().optional(),
})

const intentSchema: z.ZodType<FastPathIntent> = z.object({
	tool: z.string().min(1),
	provider: z.string().min(1),
	templates: z.array(templateSchema).min(1),
	slots: z.record(z.string(), slotSchema),
	requiredKeywords: z.array(z.array(z.string().min(1))),
	argDefaults: z.record(z.string(), z.unknown()),
	priority: z.number(),
	allowBlockedTokens: z.boolean().optional(),
})

const languagePackSchema: z.ZodType<FastPathLanguagePack> = z.object({
	skipWords: z.array(z.string().min(1)),
	skipPhrasesPerSide: z.number().int().nonnegative(),
	maxUtteranceChars: z.number().int().positive(),
	blockers: z.array(z.string().min(1)),
	minCoverage: z.number().min(0).max(1),
	intents: z.array(intentSchema),
})

const languageStatsSchema: z.ZodType<FastPathLanguageStats> = z.object({
	intents: z.number().int().nonnegative(),
	templates: z.number().int().nonnegative(),
	corpusActionRows: z.number().int().nonnegative(),
	corpusMatched: z.number().int().nonnegative(),
	corpusWrong: z.number().int().nonnegative(),
})

const statsSchema: z.ZodType<FastPathStats> = z.object({
	languages: z.record(z.string(), languageStatsSchema),
	falsePositives: z.number().int().nonnegative(),
	matchMsP50: z.number().nonnegative(),
	matchMsP95: z.number().nonnegative(),
})

const presetSchema: z.ZodType<FastPathPreset> = z.object({
	id: z.string().min(1),
	language: z.string().min(1),
	text: z.string().min(1),
})

const demoAreaSchema: z.ZodType<FastPathDemoArea> = z.object({
	id: z.string().min(1),
	names: z.record(z.string(), z.string().min(1)),
})

const demoEntitySchema: z.ZodType<FastPathDemoEntity> = z.object({
	id: z.string().min(1),
	domain: z.string().min(1),
	area: z.string().min(1),
	names: z.record(z.string(), z.string().min(1)),
})

export const fastPathSchema: z.ZodType<FastPathData> = z.object({
	meta: metaSchema,
	stats: statsSchema,
	excludedDomains: z.array(z.string().min(1)),
	nameGroups: z.record(z.string(), z.array(z.string().min(1))),
	languages: z.record(z.string(), languagePackSchema),
	presets: z.array(presetSchema),
	demoHome: z.object({
		areas: z.array(demoAreaSchema),
		entities: z.array(demoEntitySchema),
	}),
})

const memoryLayerSchema: z.ZodType<MemoryLayer> = z.object({
	id: z.enum(["recentTurns", "facts", "knowledge", "episodes", "userModel"]),
	writtenBy: z.enum(["turn", "author", "reflection"]),
	recalledBy: z.enum(["always", "relevance", "session"]),
})

export const memorySchema: z.ZodType<MemoryData> = z.object({
	meta: metaSchema,
	layers: z.array(memoryLayerSchema),
})

const toolPolicySchema = z.enum(["allow", "confirm", "block"])

const skillToolSchema: z.ZodType<SkillTool> = z.object({
	id: z.string().min(1),
	fastPath: z.boolean(),
	hidden: z.boolean(),
	policy: toolPolicySchema,
})

const skillDomainSchema: z.ZodType<SkillDomain> = z.object({
	id: z.string().min(1),
	fastPath: z.boolean(),
	policy: toolPolicySchema,
})

const skillGroupIdSchema = z.enum([
	"builtin",
	"homeAssistant",
	"musicAssistant",
	"mcp",
	"routines",
])

const skillGroupSchema: z.ZodType<SkillGroup> = z.object({
	id: skillGroupIdSchema,
	alwaysOn: z.boolean(),
	defaultOn: z.boolean(),
	tools: z.array(skillToolSchema),
	domains: z.array(skillDomainSchema),
})

const skillExampleSchema: z.ZodType<SkillExample> = z.object({
	id: z.enum(["timer", "lights", "music", "goodNight", "descriptor"]),
	group: skillGroupIdSchema,
	tool: z.string().min(1),
	fastPath: z.boolean(),
})

export const skillsSchema: z.ZodType<SkillsData> = z.object({
	meta: metaSchema,
	groups: z.array(skillGroupSchema),
	examples: z.array(skillExampleSchema),
	routineMaxSteps: z.number().int().positive(),
	descriptorLimits: z.object({
		maxBytes: z.number().int().positive(),
		maxTemplates: z.number().int().positive(),
		maxTemplateChars: z.number().int().positive(),
	}),
	defaults: z.object({
		fastPathEnabled: z.boolean(),
		skillsEngine: z.boolean(),
		builtinTools: z.boolean(),
	}),
})

const protocolIdSchema = z.enum(["esphome", "wyoming", "livekit", "websocket"])

const satelliteProtocolSchema: z.ZodType<SatelliteProtocol> = z.object({
	id: protocolIdSchema,
	factoryFirmware: z.boolean(),
	connectsOut: z.boolean(),
	onDevice: z.array(z.string().min(1)),
	streams: z.array(z.string().min(1)),
	caveats: z.array(z.string().min(1)),
})

export const satellitesSchema: z.ZodType<SatellitesData> = z.object({
	meta: metaSchema,
	protocols: z.array(satelliteProtocolSchema),
	followUpDefault: z.boolean(),
	defaultProtocol: protocolIdSchema,
})

const archetypeStageSchema = z.enum([
	"wake",
	"audio",
	"stt",
	"routing",
	"llm",
	"tts",
	"memory",
	"satellites",
])

const archetypeSchema: z.ZodType<Archetype> = z.object({
	id: z.enum(["thin", "capable", "hubClass"]),
	onBoard: z.array(archetypeStageSchema),
	delegates: z.array(archetypeStageSchema),
	identities: z.enum(["one", "several"]),
	sharesStages: z.boolean(),
	template: z.enum(["thin-client", "standalone", "full-hub"]),
})

export const archetypesSchema: z.ZodType<ArchetypesData> = z.object({
	meta: metaSchema,
	archetypes: z.array(archetypeSchema),
})

const voiceHopSchema: z.ZodType<VoiceHop> = z.object({
	id: z.string().min(1),
	kind: z.enum(["device", "network", "internet", "vendor", "node"]),
	stores: z.array(z.string().min(1)).optional(),
})

export const voicePathSchema: z.ZodType<VoicePathData> = z.object({
	meta: metaSchema,
	paths: z.object({
		cloud: z.object({ hops: z.array(voiceHopSchema) }),
		local: z.object({
			hops: z.array(voiceHopSchema),
			boundary: z.string().min(1),
		}),
	}),
	offlineBreaks: z.array(z.string().min(1)),
	comparison: z.object({ questions: z.array(z.string().min(1)) }),
})

const hotspotSchema: z.ZodType<ConsoleHotspot> = z.object({
	id: z.string().min(1),
	x: z.number().min(0).max(100),
	y: z.number().min(0).max(100),
	w: z.number().positive().max(100),
	h: z.number().positive().max(100),
})

const consoleScreenSchema: z.ZodType<ConsoleScreen> = z.object({
	key: z.string().min(1),
	route: z.string().min(1),
	lead: z.boolean().optional(),
	liveRoute: z.boolean().optional(),
	image: z.object({
		light: z.string().min(1),
		dark: z.string().min(1),
		width: z.number().int().positive(),
		height: z.number().int().positive(),
	}),
	hotspots: z.array(hotspotSchema).min(1).max(3),
})

export const consoleTourSchema: z.ZodType<ConsoleTourData> = z.object({
	meta: metaSchema,
	screens: z.array(consoleScreenSchema),
})

const personaFaceIdSchema = z.enum([
	"accountant",
	"architect",
	"astronaut",
	"athlete",
	"aviator",
	"chef",
	"doctor",
	"electrician",
	"gamer",
	"investigator",
	"lawyer",
	"legendary",
	"mechanic",
	"musician",
	"programmer",
	"teacher",
])

const personaFaceSchema: z.ZodType<PersonaFace> = z.object({
	id: personaFaceIdSchema,
	image: z.string().min(1),
})

const personaTemplateSchema: z.ZodType<PersonaTemplate> = z.object({
	id: z.enum([
		"warmHost",
		"grumpyComedian",
		"empatheticCaregiver",
		"calmAnalyst",
	]),
	defaultFace: personaFaceIdSchema,
})

export const personasSchema: z.ZodType<PersonasData> = z.object({
	meta: metaSchema,
	faces: z.array(personaFaceSchema).min(1),
	templates: z.array(personaTemplateSchema).min(1),
})

const turnTimingsSchema: z.ZodType<TurnTimings> = z.object({
	sttMs: z.number().nullable(),
	llmTtftMs: z.number().nullable(),
	ttsFirstChunkMs: z.number().nullable(),
	ttfaMs: z.number().nullable(),
	totalMs: z.number().nullable(),
})

const turnSchema: z.ZodType<Turn> = z.object({
	id: z.string().min(1),
	video: z.string().min(1),
	identity: z.string().min(1),
	avatar: z.string().min(1),
	room: z.enum([
		"kitchen",
		"cinema",
		"hallway",
		"guest",
		"entrance",
		"terrace",
	]),
	path: z.enum(["fast", "tool", "llm", "memory", "knowledge", "routine"]),
	userText: z.string().min(1),
	replyText: z.string().min(1),
	userAudio: z.string().min(1),
	replyAudio: z.string().min(1),
	userDurationMs: z.number().positive(),
	replyDurationMs: z.number().positive(),
	timings: turnTimingsSchema,
	tools: z.array(z.string()),
})

export const turnsSchema: z.ZodType<TurnsData> = z.object({
	meta: metaSchema,
	turns: z.array(turnSchema).min(1),
})

const voiceSchema: z.ZodType<Voice> = z.object({
	face: z.string().min(1),
	voice: z.string().min(1),
	line: z.string().min(1),
	audio: z.string().min(1),
	avatar: z.string().min(1),
	durationMs: z.number().positive(),
})

export const voicesSchema: z.ZodType<VoicesData> = z.object({
	meta: metaSchema,
	voices: z.array(voiceSchema).min(1),
})

const replayTurnSchema: z.ZodType<ReplayTurn> = z.object({
	id: z.enum(["fast", "knowledge", "conversation"]),
	turnId: z.string().min(1),
	identity: z.string().min(1),
	path: z.enum(["fast", "tool", "llm", "memory", "knowledge", "routine"]),
	userText: z.string().min(1),
	replyText: z.string().min(1),
	userAudio: z.string().min(1),
	replyAudio: z.string().min(1),
	maxSeconds: z.number().positive(),
	mode: modeSchema,
})

export const replaySchema: z.ZodType<ReplayData> = z.object({
	meta: metaSchema,
	turns: z.array(replayTurnSchema).min(1),
})

export const parseData = <T>(schema: z.ZodType<T>, json: unknown): T =>
	schema.parse(json)
