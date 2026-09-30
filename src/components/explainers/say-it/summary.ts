import {
	SAY_IT_CONVERSATION_TOPIC_ORDER,
	SAY_IT_PERSONA_TOPIC,
} from "./constants"
import type {
	SayItConfirmVerdict,
	SayItConversationCardCopy,
	SayItConversationTurn,
	SayItCopy,
	SayItForkOutcome,
	SayItPhraseCopy,
	SayItPreset,
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

export const presetTopicOf = (presetId: string): string =>
	presetId.split("-").slice(1).join("-")

const topicRank = (preset: SayItPreset): number => {
	const rank = SAY_IT_CONVERSATION_TOPIC_ORDER.indexOf(presetTopicOf(preset.id))
	return rank === -1 ? SAY_IT_CONVERSATION_TOPIC_ORDER.length : rank
}

export const conversationOrderOf = (presets: SayItPreset[]): SayItPreset[] =>
	[...presets].sort((a, b) => topicRank(a) - topicRank(b))

export const conversationTurnOf = (
	verdict: SayItVerdict,
	presetId: string | null,
	copy: SayItConversationCardCopy,
	personaSample: string,
): SayItConversationTurn => {
	const { conversation, phrases } = copy
	if (verdict.kind === "miss") {
		const topic = presetId === null ? "" : presetTopicOf(presetId)
		if (topic === SAY_IT_PERSONA_TOPIC)
			return {
				kind: "chat",
				reply: personaSample,
				line: conversation.lines.persona,
			}
		return {
			kind: "think",
			pause: conversation.replies.pause,
			reply: conversation.thoughts[topic] ?? conversation.replies.thought,
			line: conversation.lines.miss,
		}
	}
	if (verdict.kind === "confirm" || verdict.kind === "matchConfirm")
		return {
			kind: "ask",
			reply:
				verdict.kind === "confirm"
					? confirmQuestionOf(verdict, phrases)
					: toolQuestionOf(verdict, phrases),
			confirmed:
				conversation.replies.confirmed[verdict.domain] ??
				conversation.replies.plain,
			line: conversation.lines.confirm,
		}
	return {
		kind: "act",
		reply: fill(
			conversation.replies.tools[verdict.tool] ?? conversation.replies.done,
			{
				...valuesOf(verdict, phrases),
				thing: objectOf(verdict, phrases) ?? phrases.generic,
				provider: phrases.providers[verdict.provider] ?? phrases.generic,
			},
		),
		line: conversation.lines.match,
	}
}
