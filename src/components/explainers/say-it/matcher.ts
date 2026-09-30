import type {
	FastPathAstNode,
	FastPathData,
	FastPathIntent,
	FastPathLanguagePack,
	FastPathSlot,
} from "@/data/types"

import {
	SAY_IT_ASK_FIRST_DOMAINS,
	SAY_IT_FREE_CAPTURE_MAX_TOKENS,
} from "./constants"
import type {
	SayItBest,
	SayItCandidate,
	SayItCapture,
	SayItCompiledIntent,
	SayItCompiledSlot,
	SayItHomeName,
	SayItHomeNames,
	SayItMatchState,
	SayItMatcher,
	SayItParse,
	SayItVerdict,
} from "./types"

const fold = (text: string): string =>
	text
		.toLowerCase()
		.normalize("NFD")
		.replace(/[̀-ͯ]/g, "")
		.replace(/[.,!?¡¿;:'"„“”]/g, " ")
		.replace(/\s+/g, " ")
		.trim()

const tokensOf = (text: string): string[] =>
	fold(text).split(" ").filter(Boolean)

const phraseAt = (
	tokens: string[],
	index: number,
	phrases: string[][],
): string[] | undefined =>
	phrases.find((p) => p.every((t, k) => tokens[index + k] === t))

const phraseEndingAt = (
	tokens: string[],
	end: number,
	phrases: string[][],
): string[] | undefined =>
	phrases.find(
		(p) =>
			end - p.length >= 0 &&
			p.every((t, k) => tokens[end - p.length + k] === t),
	)

const stripSkipWords = (
	folded: string,
	skipWords: string[],
	maxPerSide: number,
): string => {
	const phrases = skipWords
		.map((w) => tokensOf(w))
		.filter((p) => p.length > 0)
		.sort((a, b) => b.length - a.length)
	const tokens = folded.split(" ").filter(Boolean)
	let start = 0
	let end = tokens.length
	for (let n = 0; n < maxPerSide && start < end; n++) {
		const hit = phraseAt(tokens, start, phrases)
		if (!hit || start + hit.length >= end) break
		start += hit.length
	}
	for (let n = 0; n < maxPerSide && end > start; n++) {
		const hit = phraseEndingAt(tokens, end, phrases)
		if (!hit || end - hit.length <= start) break
		end -= hit.length
	}
	const kept = tokens.slice(start, end)
	return kept.length > 0 ? kept.join(" ") : folded
}

const blockerOf = (folded: string, blockers: string[]): string | null => {
	const tokens = new Set(folded.split(" "))
	return (
		blockers.find((b) =>
			b.includes(" ") ? folded.includes(b) : tokens.has(b),
		) ?? null
	)
}

const nameFor = (names: Record<string, string>, language: string): string =>
	names[language] ?? names.en ?? Object.values(names)[0] ?? ""

export const homeNamesFor = (
	data: FastPathData,
	language: string,
): SayItHomeNames => {
	const excludedDomains = new Set(data.excludedDomains)
	const entities = data.demoHome.entities.map((entity) => ({
		phrase: nameFor(entity.names, language),
		target: entity.id,
		domain: entity.domain,
	}))
	return {
		entities: entities.filter((e) => !excludedDomains.has(e.domain)),
		excluded: entities.filter((e) => excludedDomains.has(e.domain)),
		areas: data.demoHome.areas.map((area) => ({
			phrase: nameFor(area.names, language),
			target: area.id,
			domain: "area",
		})),
		nameGroups: data.nameGroups,
	}
}

const entityKeyDomains = (
	key: string,
	groups: Record<string, string[]>,
): Set<string> | null => {
	const spec = key.split(":")[1] ?? ""
	const domains = spec
		.split(",")
		.flatMap((d) => groups[d] ?? [d])
		.map((d) => d.trim())
		.filter((d) => d.length > 0)
	return domains.length > 0 ? new Set(domains) : null
}

const contextSlot = (
	arg: string,
	names: SayItHomeName[],
): SayItCompiledSlot => ({
	kind: "values",
	arg,
	values: names
		.map((name) => ({
			phrase: name.phrase,
			folded: fold(name.phrase),
			args: { [arg]: name.target },
		}))
		.sort((a, b) => b.folded.length - a.folded.length),
})

const compileSlot = (
	slot: FastPathSlot,
	home: SayItHomeNames,
): SayItCompiledSlot => {
	if (slot.kind === "values")
		return {
			kind: "values",
			arg: slot.arg,
			values: (slot.values ?? []).map((value) => ({
				phrase: value.phrase,
				folded: fold(value.phrase),
				args: value.args,
			})),
		}
	if (slot.kind === "context") {
		const key = slot.key ?? ""
		if (key.startsWith("area")) return contextSlot(slot.arg, home.areas)
		const domains = entityKeyDomains(key, home.nameGroups)
		const names = domains
			? home.entities.filter((entity) => domains.has(entity.domain))
			: home.entities
		return contextSlot(slot.arg, names)
	}
	return { kind: "free", arg: slot.arg }
}

const compileIntent = (
	intent: FastPathIntent,
	home: SayItHomeNames,
): SayItCompiledIntent => ({
	tool: intent.tool,
	provider: intent.provider,
	priority: intent.priority,
	allowBlockedTokens: intent.allowBlockedTokens ?? false,
	requiredKeywords: intent.requiredKeywords,
	argDefaults: intent.argDefaults,
	templates: intent.templates.map((template) => ({
		source: template.source,
		ast: template.ast,
		prefilter: new RegExp(template.prefilter),
	})),
	slots: new Map(
		Object.entries(intent.slots).map(([name, slot]) => [
			name,
			compileSlot(slot, home),
		]),
	),
})

const skipSpaces = (text: string, pos: number): number => {
	let cursor = pos
	while (cursor < text.length && text[cursor] === " ") cursor++
	return cursor
}

const matchNodes = (
	text: string,
	nodes: FastPathAstNode[],
	nodeIdx: number,
	state: SayItMatchState,
	slots: Map<string, SayItCompiledSlot>,
	results: SayItMatchState[],
): void => {
	if (results.length > 0) return
	if (nodeIdx >= nodes.length) {
		if (text.slice(state.pos).trim().length === 0) results.push(state)
		return
	}
	const node = nodes[nodeIdx]
	const pos = skipSpaces(text, state.pos)
	if (node.kind === "text") {
		const literal = node.value
		if (!text.startsWith(literal, pos)) return
		const after = pos + literal.length
		const boundary =
			after >= text.length || text[after] === " " || text[after - 1] === " "
		if (!boundary) return
		matchNodes(
			text,
			nodes,
			nodeIdx + 1,
			{
				...state,
				pos: after,
				literalChars: state.literalChars + literal.length,
			},
			slots,
			results,
		)
		return
	}
	if (node.kind === "optional") {
		matchNodes(
			text,
			[...node.body, ...nodes.slice(nodeIdx + 1)],
			0,
			{ ...state, captures: new Map(state.captures) },
			slots,
			results,
		)
		if (results.length > 0) return
		matchNodes(text, nodes, nodeIdx + 1, state, slots, results)
		return
	}
	if (node.kind === "group") {
		for (const alt of node.alternatives) {
			matchNodes(
				text,
				[...alt, ...nodes.slice(nodeIdx + 1)],
				0,
				{ ...state, captures: new Map(state.captures) },
				slots,
				results,
			)
			if (results.length > 0) return
		}
		return
	}
	const slot = slots.get(node.name)
	if (!slot) return
	if (slot.kind === "free") {
		const tokens = text.slice(pos).split(" ").filter(Boolean)
		const limit = Math.min(SAY_IT_FREE_CAPTURE_MAX_TOKENS, tokens.length)
		for (let count = 1; count <= limit; count++) {
			const captured = tokens.slice(0, count).join(" ")
			const captures = new Map(state.captures)
			captures.set(node.name, { kind: "free", text: captured })
			matchNodes(
				text,
				nodes,
				nodeIdx + 1,
				{
					...state,
					pos: pos + captured.length,
					slotChars: state.slotChars + captured.length,
					captures,
				},
				slots,
				results,
			)
			if (results.length > 0) return
		}
		return
	}
	for (const value of slot.values) {
		if (!text.startsWith(value.folded, pos)) continue
		const after = pos + value.folded.length
		if (after < text.length && text[after] !== " ") continue
		const captures = new Map(state.captures)
		captures.set(node.name, { kind: "value", value })
		matchNodes(
			text,
			nodes,
			nodeIdx + 1,
			{
				...state,
				pos: after,
				slotChars: state.slotChars + value.folded.length,
				captures,
			},
			slots,
			results,
		)
		if (results.length > 0) return
	}
}

const matchTemplate = (
	folded: string,
	ast: FastPathAstNode[],
	slots: Map<string, SayItCompiledSlot>,
): SayItParse | null => {
	const results: SayItMatchState[] = []
	matchNodes(
		folded,
		ast,
		0,
		{ pos: 0, literalChars: 0, slotChars: 0, captures: new Map() },
		slots,
		results,
	)
	const hit = results.find((r) => folded.slice(r.pos).trim().length === 0)
	return hit
		? {
				literalChars: hit.literalChars,
				slotChars: hit.slotChars,
				captures: hit.captures,
			}
		: null
}

const argsOf = (
	captures: Map<string, SayItCapture>,
	slots: Map<string, SayItCompiledSlot>,
	argDefaults: Record<string, unknown>,
): { args: Record<string, unknown>; resolved: Record<string, unknown> } => {
	const args: Record<string, unknown> = { ...argDefaults }
	const resolved: Record<string, unknown> = { ...argDefaults }
	for (const [slotName, captured] of captures) {
		const arg = slots.get(slotName)?.arg ?? slotName
		if (captured.kind === "free") {
			args[arg] = captured.text
			resolved[arg] = captured.text
			continue
		}
		Object.assign(resolved, captured.value.args)
		for (const argName of Object.keys(captured.value.args))
			args[argName] = captured.value.phrase
	}
	return { args, resolved }
}

const candidatesFor = (
	intents: SayItCompiledIntent[],
	folded: string,
	minCoverage: number,
	blocked: boolean,
): SayItCandidate[] => {
	const utteranceTokens = new Set(folded.split(" "))
	const candidates: SayItCandidate[] = []
	for (const intent of intents) {
		if (blocked && !intent.allowBlockedTokens) continue
		const keywordsOk = intent.requiredKeywords.every((group) =>
			group.some((k) =>
				k.includes(" ") ? folded.includes(k) : utteranceTokens.has(k),
			),
		)
		if (!keywordsOk) continue
		for (const template of intent.templates) {
			if (!template.prefilter.test(folded)) continue
			const parsed = matchTemplate(folded, template.ast, intent.slots)
			if (!parsed) continue
			const coverage =
				folded.length > 0 ? parsed.literalChars / folded.length : 0
			if (parsed.literalChars === 0 || coverage < minCoverage) continue
			const { args, resolved } = argsOf(
				parsed.captures,
				intent.slots,
				intent.argDefaults,
			)
			candidates.push({
				tool: intent.tool,
				provider: intent.provider,
				priority: intent.priority,
				literalChars: parsed.literalChars,
				slotChars: parsed.slotChars,
				args,
				resolved,
			})
		}
	}
	return candidates
}

const bestOf = (candidates: SayItCandidate[]): SayItBest => {
	if (candidates.length === 0) return { kind: "none" }
	const sorted = [...candidates].sort(
		(a, b) =>
			b.priority - a.priority ||
			b.literalChars - a.literalChars ||
			a.slotChars - b.slotChars ||
			`${a.provider}/${a.tool}`.localeCompare(`${b.provider}/${b.tool}`),
	)
	const best = sorted[0]
	const rival = sorted.find(
		(c) =>
			c !== best &&
			c.priority === best.priority &&
			c.literalChars === best.literalChars &&
			c.slotChars === best.slotChars &&
			(c.tool !== best.tool ||
				c.provider !== best.provider ||
				JSON.stringify(c.resolved) !== JSON.stringify(best.resolved)),
	)
	return rival ? { kind: "ambiguous" } : { kind: "match", candidate: best }
}

const excludedNameIn = (
	folded: string,
	excluded: SayItHomeName[],
): SayItHomeName | undefined =>
	excluded.find((name) => ` ${folded} `.includes(` ${fold(name.phrase)} `))

const askFirstDomainOf = (
	resolved: Record<string, unknown>,
	home: SayItHomeNames,
): string | undefined => {
	const declared = Array.isArray(resolved.domain)
		? resolved.domain.filter((d): d is string => typeof d === "string")
		: []
	const entity = home.entities.find((name) => name.target === resolved.entity)
	const domains = entity ? [...declared, entity.domain] : declared
	return domains.find((domain) => SAY_IT_ASK_FIRST_DOMAINS.includes(domain))
}

const verdictOf = (
	candidate: SayItCandidate,
	home: SayItHomeNames,
): SayItVerdict => {
	const matched = {
		tool: candidate.tool,
		provider: candidate.provider,
		args: candidate.args,
		targets: candidate.resolved,
	}
	const askFirst = askFirstDomainOf(candidate.resolved, home)
	return askFirst === undefined
		? { kind: "match", ...matched }
		: { kind: "matchConfirm", ...matched, domain: askFirst }
}

const noMatch: SayItVerdict = { kind: "miss", reason: "no_match" }

export const createMatcher = (
	pack: FastPathLanguagePack,
	home: SayItHomeNames,
): SayItMatcher => {
	const intents = pack.intents.map((intent) => compileIntent(intent, home))

	const run = (text: string): SayItVerdict => {
		const stripped = stripSkipWords(
			fold(text),
			pack.skipWords,
			pack.skipPhrasesPerSide,
		)
		if (stripped.length === 0) return noMatch
		if (stripped.length > pack.maxUtteranceChars)
			return { kind: "miss", reason: "too_long" }
		const blocker = blockerOf(stripped, pack.blockers)
		const best = bestOf(
			candidatesFor(intents, stripped, pack.minCoverage, blocker !== null),
		)
		if (best.kind === "match") return verdictOf(best.candidate, home)
		if (best.kind === "ambiguous" || blocker !== null) return noMatch
		const excluded = excludedNameIn(stripped, home.excluded)
		if (excluded)
			return {
				kind: "confirm",
				entity: excluded.phrase,
				target: excluded.target,
				domain: excluded.domain,
			}
		return noMatch
	}

	return { run }
}
