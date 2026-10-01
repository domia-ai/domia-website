import { getLocale, getTranslations } from "next-intl/server"

import { ExplainerSection } from "@/components/sections"
import { loadFastPath } from "@/data"
import type { FastPathData } from "@/data/types"

import { SAY_IT_RESERVED_HEIGHT } from "./constants"
import { SayItIsland } from "./island"
import { createMatcher, homeNamesFor } from "./matcher"
import { SayItNoScript } from "./noscript"
import type {
	SayItCopy,
	SayItExplainerProps,
	SayItInitial,
	SayItInputCopy,
	SayItPhraseCopy,
	SayItPreset,
	SayItSource,
	SayItToolCopy,
	SayItTranslator,
	SayItVerdict,
} from "./types"

const optional = (t: SayItTranslator, key: string): string | undefined =>
	t.has(key) ? t.raw(key) : undefined

const messageKeyOf = (id: string): string => id.replace(/\W/g, "_")

const labelsOf = (
	t: SayItTranslator,
	prefix: string,
	ids: string[],
): Record<string, string> =>
	Object.fromEntries(
		ids.flatMap((id) => {
			const value = optional(t, `${prefix}.${messageKeyOf(id)}`)
			return value === undefined ? [] : [[id, value]]
		}),
	)

const unique = (values: string[]): string[] => [...new Set(values)]

const intentsOf = (data: FastPathData) =>
	Object.values(data.languages).flatMap((pack) => pack.intents)

const toolCopy = (t: SayItTranslator, tool: string): SayItToolCopy | null => {
	const action = optional(t, `tools.${tool}.action`)
	if (action === undefined) return null
	return {
		action,
		entity: optional(t, `tools.${tool}.entity`),
		area: optional(t, `tools.${tool}.area`),
		any: optional(t, `tools.${tool}.any`),
		realNode: optional(t, `tools.${tool}.realNode`),
	}
}

const buildPhrases = (
	t: SayItTranslator,
	data: FastPathData,
): SayItPhraseCopy => {
	const intents = intentsOf(data)
	const providers = unique(intents.map((intent) => intent.provider))
	const tools = unique(intents.map((intent) => intent.tool))
	return {
		generic: t("generic"),
		providers: Object.fromEntries(
			providers.map((slug) => [slug, t(`providers.${slug}`)]),
		),
		tools: Object.fromEntries(
			tools.flatMap((tool) => {
				const copy = toolCopy(t, tool)
				return copy ? [[tool, copy]] : []
			}),
		),
		things: t.raw("things"),
		entities: labelsOf(
			t,
			"entities",
			data.demoHome.entities.map((entity) => entity.id),
		),
		areas: labelsOf(
			t,
			"areas",
			data.demoHome.areas.map((area) => area.id),
		),
		questions: {
			domains: labelsOf(t, "confirm.domains", data.excludedDomains),
			tools: labelsOf(t, "confirm.tools", tools),
			generic: t.raw("confirm.generic"),
		},
	}
}

const buildInput = (t: SayItTranslator): SayItInputCopy => ({
	placeholder: t("input.placeholder"),
	submit: t("input.submit"),
	loading: t("input.loading"),
	failed: t("input.failed"),
})

const buildCopy = (t: SayItTranslator, data: FastPathData): SayItCopy => {
	const providers = unique(intentsOf(data).map((intent) => intent.provider))
	return {
		phrases: buildPhrases(t, data),
		input: buildInput(t),
		presetsLabel: t("input.presetsLabel"),
		fork: {
			label: t("fork.label"),
			question: t("fork.question"),
			outcome: {
				match: t.raw("fork.outcome.match"),
				matchConfirm: t.raw("fork.outcome.matchConfirm"),
				confirm: t.raw("fork.outcome.confirm"),
			},
		},
		branches: {
			yes: {
				label: t("branches.yes.label"),
				title: t("branches.yes.title"),
				hint: t("branches.yes.hint"),
			},
			no: {
				label: t("branches.no.label"),
				title: t("branches.no.title"),
				hint: t("branches.no.hint"),
			},
		},
		reasons: {
			too_long: t("reasons.too_long"),
			no_match: t("reasons.no_match"),
		},
		realNode: Object.fromEntries(
			providers.map((slug) => [slug, t(`realNode.${slug}`)]),
		),
		templatesNote: t("templatesNote"),
		noscript: {
			note: t("noscript.note"),
			heading: t("noscript.heading"),
		},
	}
}

const initialOf = (
	presets: SayItPreset[],
	verdicts: Record<string, SayItVerdict>,
): SayItInitial => {
	const [first] = presets
	return first
		? { presetId: first.id, text: first.text, verdict: verdicts[first.id] }
		: {
				presetId: null,
				text: "",
				verdict: { kind: "miss", reason: "no_match" },
			}
}

const resolveSayIt = async () => {
	const data = loadFastPath()
	const locale = await getLocale()
	const t = await getTranslations("explainers.sayIt")
	const language =
		data.languages[locale] === undefined
			? Object.keys(data.languages)[0]
			: locale
	const homeNames = homeNamesFor(data, language)
	const matcher = createMatcher(data.languages[language], homeNames)
	const presets = data.presets
		.filter((preset) => preset.language === language)
		.map(({ id, text }) => ({ id, text }))
	const verdicts = Object.fromEntries(
		presets.map((preset) => [preset.id, matcher.run(preset.text)]),
	)
	const source: SayItSource = {
		language,
		locale,
		homeNames,
		presets,
		verdicts,
		initial: initialOf(presets, verdicts),
	}
	return { t, data, source }
}

export async function SayItExplainer({ tone }: SayItExplainerProps) {
	const { t, data, source } = await resolveSayIt()
	const copy = buildCopy(t, data)

	return (
		<ExplainerSection
			id="routing"
			title={t("title")}
			intro={t("intro")}
			reservedHeight={SAY_IT_RESERVED_HEIGHT}
			tone={tone}
		>
			<SayItIsland {...source} copy={copy} />
			<SayItNoScript
				copy={copy}
				locale={source.locale}
				initial={source.initial}
			/>
		</ExplainerSection>
	)
}
