import type { getTranslations } from "next-intl/server"

import type { FastPathAstNode } from "@/data/types"
import type { SectionTone } from "@/components/sections"

export type SayItTranslator = Awaited<ReturnType<typeof getTranslations>>

export type SayItMissReason = "too_long" | "no_match"

export type SayItMatchVerdict = {
	kind: "match"
	tool: string
	provider: string
	args: Record<string, unknown>
	targets: Record<string, unknown>
}

export type SayItMatchConfirmVerdict = Omit<SayItMatchVerdict, "kind"> & {
	kind: "matchConfirm"
	domain: string
}

export type SayItToolVerdict = SayItMatchVerdict | SayItMatchConfirmVerdict

export type SayItConfirmVerdict = {
	kind: "confirm"
	entity: string
	target: string
	domain: string
}

export type SayItMissVerdict = { kind: "miss"; reason: SayItMissReason }

export type SayItVerdict =
	| SayItMatchVerdict
	| SayItMatchConfirmVerdict
	| SayItConfirmVerdict
	| SayItMissVerdict

export type SayItHomeName = {
	phrase: string
	target: string
	domain: string
}

export type SayItHomeNames = {
	entities: SayItHomeName[]
	areas: SayItHomeName[]
	excluded: SayItHomeName[]
	nameGroups: Record<string, string[]>
}

export type SayItCompiledValue = {
	phrase: string
	folded: string
	args: Record<string, unknown>
}

export type SayItCompiledSlot =
	| { kind: "values"; arg: string; values: SayItCompiledValue[] }
	| { kind: "free"; arg: string }

export type SayItCompiledTemplate = {
	source: string
	ast: FastPathAstNode[]
	prefilter: RegExp
}

export type SayItCompiledIntent = {
	tool: string
	provider: string
	priority: number
	allowBlockedTokens: boolean
	requiredKeywords: string[][]
	argDefaults: Record<string, unknown>
	templates: SayItCompiledTemplate[]
	slots: Map<string, SayItCompiledSlot>
}

export type SayItCapture =
	{ kind: "value"; value: SayItCompiledValue } | { kind: "free"; text: string }

export type SayItMatchState = {
	pos: number
	literalChars: number
	slotChars: number
	captures: Map<string, SayItCapture>
}

export type SayItParse = {
	literalChars: number
	slotChars: number
	captures: Map<string, SayItCapture>
}

export type SayItCandidate = {
	tool: string
	provider: string
	priority: number
	literalChars: number
	slotChars: number
	args: Record<string, unknown>
	resolved: Record<string, unknown>
}

export type SayItBest =
	| { kind: "match"; candidate: SayItCandidate }
	| { kind: "ambiguous" }
	| { kind: "none" }

export type SayItMatcher = {
	run: (text: string) => SayItVerdict
}

export type SayItMatcherStatus = "idle" | "loading" | "ready" | "failed"

export type SayItLazyMatcher = {
	status: SayItMatcherStatus
	load: () => Promise<SayItMatcher | null>
}

export type SayItToolCopy = {
	action: string
	entity?: string
	area?: string
	any?: string
	realNode?: string
}

export type SayItQuestionCopy = {
	domains: Record<string, string>
	tools: Record<string, string>
	generic: string
}

export type SayItPhraseCopy = {
	generic: string
	providers: Record<string, string>
	tools: Record<string, SayItToolCopy>
	things: Record<string, string>
	entities: Record<string, string>
	areas: Record<string, string>
	questions: SayItQuestionCopy
}

export type SayItInputCopy = {
	placeholder: string
	submit: string
	loading: string
	failed: string
}

export type SayItForkBranch = "yes" | "no"

export type SayItForkBranchCopy = {
	label: string
	title: string
	hint: string
}

export type SayItForkCopy = {
	label: string
	question: string
	outcome: {
		match: string
		matchConfirm: string
		confirm: string
	}
}

export type SayItForkOutcome = {
	branch: SayItForkBranch
	text: string
	note?: string
}

export type SayItCopy = {
	phrases: SayItPhraseCopy
	input: SayItInputCopy
	presetsLabel: string
	fork: SayItForkCopy
	branches: Record<SayItForkBranch, SayItForkBranchCopy>
	reasons: Record<SayItMissReason, string>
	realNode: Record<string, string>
	templatesNote: string
	noscript: { note: string; heading: string }
}

export type SayItPreset = { id: string; text: string }

export type SayItInitial = {
	presetId: string | null
	text: string
	verdict: SayItVerdict
}

export type SayItSource = {
	language: string
	locale: string
	homeNames: SayItHomeNames
	presets: SayItPreset[]
	verdicts: Record<string, SayItVerdict>
	initial: SayItInitial
}

export type SayItForkShown = {
	run: number
	text: string
	verdict: SayItVerdict
}

export type SayItIslandProps = SayItSource & { copy: SayItCopy }

export type SayItPresetsProps = {
	label: string
	selectedPreset: string | null
	presets: SayItPreset[]
	onPreset: (id: string) => void
}

export type SayItFreeTextProps = {
	copy: SayItInputCopy
	draft: string
	status: SayItMatcherStatus
	onDraftChange: (value: string) => void
	onFocus?: () => void
	onSubmit: () => void
}

export type SayItComposerProps = {
	copy: SayItCopy
	draft: string
	status: SayItMatcherStatus
	selectedPreset: string | null
	presets: SayItPreset[]
	onDraftChange: (value: string) => void
	onFocus: () => void
	onSubmit: () => void
	onPreset: (id: string) => void
}

export type SayItForkProps = {
	copy: SayItCopy
	locale: string
	text: string
	verdict: SayItVerdict
	run: number
}

export type SayItBranchCardProps = {
	branch: SayItForkBranch
	active: boolean
	copy: SayItCopy
	outcome: SayItForkOutcome | null
	run: number
}

export type SayItNoScriptProps = {
	copy: SayItCopy
	locale: string
	initial: SayItInitial
}

export type SayItExplainerProps = {
	tone?: SectionTone
}

export type SayItResolvedArgs = {
	args: Record<string, unknown>
	resolved: Record<string, unknown>
}
