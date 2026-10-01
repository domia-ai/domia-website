import type {
	SayItConfirmVerdict,
	SayItCopy,
	SayItForkOutcome,
	SayItPhraseCopy,
	SayItToolVerdict,
	SayItVerdict,
} from "./types"

const fill = (template: string, values: Record<string, unknown>): string =>
	template.replace(/\{(\w+)\}/g, (_, name: string) =>
		name in values ? String(values[name]) : "",
	)

const firstOf = (value: unknown): string | null => {
	if (typeof value === "string") return value
	if (Array.isArray(value) && typeof value[0] === "string") return value[0]
	return null
}

const labelOf = (
	labels: Record<string, string>,
	id: unknown,
	fallback: unknown,
): unknown => (typeof id === "string" ? (labels[id] ?? fallback) : fallback)

const thingsOf = (
	verdict: SayItToolVerdict,
	phrases: SayItPhraseCopy,
): string | undefined =>
	phrases.things[firstOf(verdict.targets.device_class) ?? ""] ??
	phrases.things[firstOf(verdict.targets.domain) ?? ""]

const valuesOf = (verdict: SayItToolVerdict, phrases: SayItPhraseCopy) => ({
	...verdict.args,
	entity: labelOf(
		phrases.entities,
		verdict.targets.entity,
		verdict.args.entity,
	),
	area: labelOf(phrases.areas, verdict.targets.area, verdict.args.area),
	things: thingsOf(verdict, phrases),
})

const objectOf = (
	verdict: SayItToolVerdict,
	phrases: SayItPhraseCopy,
): string | null => {
	const tool = phrases.tools[verdict.tool]
	if (!tool) return null
	const values = valuesOf(verdict, phrases)
	if (tool.entity && typeof verdict.targets.entity === "string")
		return fill(tool.entity, values)
	if (tool.area && typeof verdict.targets.area === "string" && values.things)
		return fill(tool.area, values)
	if (tool.any) return fill(tool.any, values)
	return null
}

const joinLine = (action: string, object: string | null): string =>
	object && object.trim().length > 0 ? `${action} ${object}` : action

const understoodOf = (
	verdict: SayItToolVerdict,
	phrases: SayItPhraseCopy,
): string =>
	joinLine(
		phrases.tools[verdict.tool]?.action ?? phrases.generic,
		objectOf(verdict, phrases),
	)

const sentence = (text: string, locale: string): string =>
	text.charAt(0).toLocaleUpperCase(locale) + text.slice(1)

const confirmQuestionOf = (
	verdict: SayItConfirmVerdict,
	phrases: SayItPhraseCopy,
): string =>
	fill(phrases.questions.domains[verdict.domain] ?? phrases.questions.generic, {
		thing: phrases.entities[verdict.target] ?? verdict.entity,
	})

const toolQuestionOf = (
	verdict: SayItToolVerdict,
	phrases: SayItPhraseCopy,
): string =>
	fill(phrases.questions.tools[verdict.tool] ?? phrases.questions.generic, {
		thing: objectOf(verdict, phrases) ?? phrases.generic,
	})

export const forkOutcomeOf = (
	verdict: SayItVerdict,
	copy: SayItCopy,
	locale: string,
): SayItForkOutcome => {
	const { phrases } = copy
	if (verdict.kind === "miss")
		return { branch: "no", text: copy.reasons[verdict.reason] }
	if (verdict.kind === "confirm")
		return {
			branch: "no",
			text: fill(copy.fork.outcome.confirm, {
				question: confirmQuestionOf(verdict, phrases),
			}),
		}
	if (verdict.kind === "matchConfirm")
		return {
			branch: "yes",
			text: fill(copy.fork.outcome.matchConfirm, {
				question: toolQuestionOf(verdict, phrases),
			}),
		}
	const realNode =
		phrases.tools[verdict.tool]?.realNode ?? copy.realNode[verdict.provider]
	return {
		branch: "yes",
		text: sentence(
			fill(copy.fork.outcome.match, {
				provider: phrases.providers[verdict.provider] ?? phrases.generic,
				understood: understoodOf(verdict, phrases),
			}),
			locale,
		),
		note: realNode ? sentence(realNode, locale) : undefined,
	}
}
