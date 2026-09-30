export type DataMeta = {
	source: string
	capturedAt: string
	generator: string
}

export type TopologyNodeKind = "node" | "peripheral" | "satellite" | "peer"

export type TopologyRect = { x: number; y: number; w: number; h: number }

export type TopologyNode = {
	id: string
	kind: TopologyNodeKind
	base: TopologyRect
}

export type TopologyPlacement = { dx: number; dy: number; scale: number }

export type TopologyLinkKind = "audio" | "stage" | "discovery" | "satellite"

export type TopologyPoint = [number, number]

export type TopologyLink = {
	id: string
	from: string
	to: string
	kind: TopologyLinkKind
	dashed: boolean
	arrow: boolean
	points?: [TopologyPoint, TopologyPoint]
	path?: string
}

export type TopologyLabel = { id: string; x: number; y: number; w?: number }

export type TopologyScenarioId = "single" | "hubRooms" | "mesh"

export type TopologyFrame = { y: number; h: number }

export type TopologyScenario = {
	id: TopologyScenarioId
	frame: TopologyFrame
	placements: Record<string, TopologyPlacement | null>
	links: TopologyLink[]
	labels: TopologyLabel[]
	bindings: Record<string, string>
	identities: string[]
}

export type TopologyIdentity = { id: string; node: string; avatar: string }

export type TopologiesData = {
	meta: DataMeta
	canvas: { w: number; h: number }
	nodes: TopologyNode[]
	scenarios: TopologyScenario[]
	identities: TopologyIdentity[]
	pipelineChips: string[]
}

export type PipelineAxis = {
	maxSeconds: number
	loopSeconds: number
	sweepSeconds: number
	x0: number
	width: number
	viewBox: { w: number; h: number }
}

export type PipelineLaneId =
	"mic" | "stt" | "routing" | "mind" | "llm" | "splitter" | "tts" | "hear"

export type PipelineLaneColor = "audio" | "thinking" | "fastPath" | "neutral"

export type PipelineLane = {
	id: PipelineLaneId
	y: number
	color: PipelineLaneColor
	rows?: number[]
}

export type PipelineSpan = [number, number]

export type PipelineSentence = { at: number; row: number; tts: PipelineSpan }

export type PipelineMarkers = {
	endOfSpeech: number
	sttFinal: number
	firstToken: number | null
	firstAudio: number
}

export type PipelineRouting = {
	fastPathMs: number
	fastPathEnd: number
	llmStart: number | null
}

export type PipelineMode = {
	spans: Partial<Record<PipelineLaneId, PipelineSpan[]>>
	sentences: PipelineSentence[]
	markers: PipelineMarkers
	routing: PipelineRouting
}

export type PipelineModeId = "conversation" | "command"

export type PipelineMachineId = "hub" | "fastDesktop"

export type PipelineLedger = {
	perceivedMs: number
	ttftMsRange: [number, number]
	fastPathPerceivedMsRange?: [number, number]
}

export type PipelineMachine = {
	id: PipelineMachineId
	template: string
	modes: { conversation: PipelineMode; command?: PipelineMode }
	ledger: PipelineLedger
}

export type PipelineData = {
	meta: DataMeta
	axis: PipelineAxis
	lanes: PipelineLane[]
	machines: Record<PipelineMachineId, PipelineMachine>
	epilogue: { micReopenAt: number; reflectionAt: number }
}

export type FastPathAstNode =
	| { kind: "text"; value: string }
	| { kind: "slot"; name: string }
	| { kind: "optional"; body: FastPathAstNode[] }
	| { kind: "group"; alternatives: FastPathAstNode[][] }

export type FastPathTemplate = {
	source: string
	ast: FastPathAstNode[]
	prefilter: string
}

export type FastPathSlotValue = {
	phrase: string
	args: Record<string, unknown>
}

export type FastPathSlotKind =
	"context" | "values" | "range" | "duration" | "clockTime"

export type FastPathSlot = {
	kind: FastPathSlotKind
	arg: string
	key?: string
	values?: FastPathSlotValue[]
	min?: number
	max?: number
	maxSeconds?: number
}

export type FastPathIntent = {
	tool: string
	provider: string
	templates: FastPathTemplate[]
	slots: Record<string, FastPathSlot>
	requiredKeywords: string[][]
	argDefaults: Record<string, unknown>
	priority: number
	allowBlockedTokens?: boolean
}

export type FastPathLanguagePack = {
	skipWords: string[]
	skipPhrasesPerSide: number
	maxUtteranceChars: number
	blockers: string[]
	minCoverage: number
	intents: FastPathIntent[]
}

export type FastPathLanguageStats = {
	intents: number
	templates: number
	corpusActionRows: number
	corpusMatched: number
	corpusWrong: number
}

export type FastPathStats = {
	languages: Record<string, FastPathLanguageStats>
	falsePositives: number
	matchMsP50: number
	matchMsP95: number
}

export type FastPathPreset = { id: string; language: string; text: string }

export type FastPathDemoArea = { id: string; names: Record<string, string> }

export type FastPathDemoEntity = {
	id: string
	domain: string
	area: string
	names: Record<string, string>
}

export type FastPathData = {
	meta: DataMeta
	stats: FastPathStats
	excludedDomains: string[]
	nameGroups: Record<string, string[]>
	languages: Record<string, FastPathLanguagePack>
	presets: FastPathPreset[]
	demoHome: { areas: FastPathDemoArea[]; entities: FastPathDemoEntity[] }
}

export type MemoryLayerId =
	"recentTurns" | "facts" | "knowledge" | "episodes" | "userModel"

export type MemoryLayer = {
	id: MemoryLayerId
	writtenBy: "turn" | "author" | "reflection"
	recalledBy: "always" | "relevance" | "session"
}

export type MemoryData = { meta: DataMeta; layers: MemoryLayer[] }

export type ToolPolicy = "allow" | "confirm" | "block"

export type SkillTool = {
	id: string
	fastPath: boolean
	hidden: boolean
	policy: ToolPolicy
}

export type SkillDomain = {
	id: string
	fastPath: boolean
	policy: ToolPolicy
}

export type SkillGroupId =
	"builtin" | "homeAssistant" | "musicAssistant" | "mcp" | "routines"

export type SkillGroup = {
	id: SkillGroupId
	alwaysOn: boolean
	defaultOn: boolean
	tools: SkillTool[]
	domains: SkillDomain[]
}

export type SkillExampleId =
	"timer" | "lights" | "music" | "goodNight" | "descriptor"

export type SkillExample = {
	id: SkillExampleId
	group: SkillGroupId
	tool: string
	fastPath: boolean
}

export type SkillsData = {
	meta: DataMeta
	groups: SkillGroup[]
	examples: SkillExample[]
	routineMaxSteps: number
	descriptorLimits: {
		maxBytes: number
		maxTemplates: number
		maxTemplateChars: number
	}
	defaults: {
		fastPathEnabled: boolean
		skillsEngine: boolean
		builtinTools: boolean
	}
}

export type SatelliteProtocolId =
	"esphome" | "wyoming" | "livekit" | "websocket"

export type SatelliteProtocol = {
	id: SatelliteProtocolId
	factoryFirmware: boolean
	connectsOut: boolean
	onDevice: string[]
	streams: string[]
	caveats: string[]
}

export type SatellitesData = {
	meta: DataMeta
	protocols: SatelliteProtocol[]
	followUpDefault: boolean
	defaultProtocol: SatelliteProtocolId
}

export type ArchetypeId = "thin" | "capable" | "hubClass"

export type ArchetypeStageId =
	"wake" | "audio" | "stt" | "routing" | "llm" | "tts" | "memory" | "satellites"

export type ArchetypeTemplateId = "thin-client" | "standalone" | "full-hub"

export type Archetype = {
	id: ArchetypeId
	onBoard: ArchetypeStageId[]
	delegates: ArchetypeStageId[]
	identities: "one" | "several"
	sharesStages: boolean
	template: ArchetypeTemplateId
}

export type ArchetypesData = { meta: DataMeta; archetypes: Archetype[] }

export type VoiceHopKind = "device" | "network" | "internet" | "vendor" | "node"

export type VoiceHop = { id: string; kind: VoiceHopKind; stores?: string[] }

export type VoicePathData = {
	meta: DataMeta
	paths: {
		cloud: { hops: VoiceHop[] }
		local: { hops: VoiceHop[]; boundary: string }
	}
	offlineBreaks: string[]
	comparison: { questions: string[] }
}

export type ConsoleHotspot = {
	id: string
	x: number
	y: number
	w: number
	h: number
}

export type ConsoleScreen = {
	key: string
	route: string
	lead?: boolean
	liveRoute?: boolean
	image: { light: string; dark: string; width: number; height: number }
	hotspots: ConsoleHotspot[]
}

export type ConsoleTourData = {
	meta: DataMeta
	screens: ConsoleScreen[]
}

export type PersonaFaceId =
	| "accountant"
	| "architect"
	| "astronaut"
	| "athlete"
	| "aviator"
	| "chef"
	| "doctor"
	| "electrician"
	| "gamer"
	| "investigator"
	| "lawyer"
	| "legendary"
	| "mechanic"
	| "musician"
	| "programmer"
	| "teacher"

export type PersonaTemplateId =
	"warmHost" | "grumpyComedian" | "empatheticCaregiver" | "calmAnalyst"

export type PersonaFace = { id: PersonaFaceId; image: string }

export type PersonaTemplate = {
	id: PersonaTemplateId
	defaultFace: PersonaFaceId
}

export type PersonasData = {
	meta: DataMeta
	faces: PersonaFace[]
	templates: PersonaTemplate[]
}

export type TurnRoom =
	"kitchen" | "cinema" | "hallway" | "guest" | "entrance" | "terrace"

export type TurnPath =
	"fast" | "tool" | "llm" | "memory" | "knowledge" | "routine"

export type TurnTimings = {
	sttMs: number | null
	llmTtftMs: number | null
	ttsFirstChunkMs: number | null
	ttfaMs: number | null
	totalMs: number | null
}

export type Turn = {
	id: string
	video: string
	identity: string
	avatar: string
	room: TurnRoom
	path: TurnPath
	userText: string
	replyText: string
	userAudio: string
	replyAudio: string
	userDurationMs: number
	replyDurationMs: number
	timings: TurnTimings
	tools: string[]
}

export type TurnsData = {
	meta: DataMeta
	turns: Turn[]
}

export type Voice = {
	face: string
	voice: string
	line: string
	audio: string
	avatar: string
	durationMs: number
}

export type VoicesData = {
	meta: DataMeta
	voices: Voice[]
}

export type ReplayId = "fast" | "knowledge" | "conversation"

export type ReplayTurn = {
	id: ReplayId
	turnId: string
	identity: string
	path: TurnPath
	userText: string
	replyText: string
	userAudio: string
	replyAudio: string
	maxSeconds: number
	mode: PipelineMode
}

export type ReplayData = {
	meta: DataMeta
	turns: ReplayTurn[]
}
