import { getTranslations } from "next-intl/server"

import { ExplainerSection } from "@/components/sections"
import { loadSkills } from "@/data"
import type { SkillGroup } from "@/data/types"

import { capabilitySources, capabilityTraits } from "./capabilities"
import { SkillsMapIsland } from "./island"
import type {
	SkillCapability,
	SkillsMapCopy,
	SkillsMapExplainerProps,
	SkillsMapGroupCopy,
	SkillsMapView,
} from "./types"

const routineStepKeys = ["one", "two", "three"] as const

export async function SkillsMapExplainer({ tone }: SkillsMapExplainerProps) {
	const data = loadSkills()
	const t = await getTranslations("explainers.skillsMap")

	const groupById = new Map(data.groups.map((group) => [group.id, group]))

	const groupCopy = (id: SkillGroup["id"]): SkillsMapGroupCopy => {
		const tools = groupById.get(id)?.tools ?? []
		return {
			name: t(`groups.${id}.name`),
			blurb: t(`groups.${id}.blurb`, {
				total: tools.length,
				hidden: tools.filter((tool) => tool.hidden).length,
			}),
		}
	}

	const capabilitiesOf = (group: SkillGroup): SkillCapability[] =>
		(capabilitySources[group.id] ?? []).flatMap((source) => {
			const traits = capabilityTraits(group, source)
			if (traits === null) return []
			return [
				{
					...traits,
					key: source.key,
					label: t(`capabilities.${group.id}.${source.key}`),
				},
			]
		})

	const view: SkillsMapView = {
		groups: data.groups.map((group) => ({
			id: group.id,
			defaultOn: group.defaultOn,
			capabilities: capabilitiesOf(group),
		})),
	}

	const copy: SkillsMapCopy = {
		switchOffLabel: t("switchOffLabel"),
		hintsHeading: t("hintsHeading"),
		groups: {
			builtin: groupCopy("builtin"),
			homeAssistant: groupCopy("homeAssistant"),
			musicAssistant: groupCopy("musicAssistant"),
			mcp: groupCopy("mcp"),
			routines: groupCopy("routines"),
		},
		policy: {
			confirm: t("policy.confirm"),
			block: t("policy.block"),
		},
		fastPathLabel: t("fastPathLabel"),
		hiddenLabel: t("hiddenLabel"),
		legend: t("legend"),
		switchedOff: t("switchedOff"),
		availability: {
			fromStart: t("availability.fromStart"),
			onceConnected: t("availability.onceConnected"),
		},
		defaultOn: { title: t("defaultOn.title"), body: t("defaultOn.body") },
		hidden: { title: t("hidden.title"), body: t("hidden.body") },
		mcp: {
			anyServer: t("mcp.anyServer"),
			policy: t("mcp.policy"),
		},
		routines: {
			exampleTitle: t("routines.exampleTitle"),
			steps: routineStepKeys.map((key) => t(`routines.steps.${key}`)),
			maxSteps: t("routines.maxSteps", { max: data.routineMaxSteps }),
		},
	}

	return (
		<ExplainerSection
			id="skills"
			title={t("title")}
			intro={t("intro")}
			tone={tone}
		>
			<SkillsMapIsland view={view} copy={copy} />
			<noscript>
				<p>{t("noscriptHeading")}</p>
				<ol>
					{view.groups.map((group) => (
						<li key={group.id}>
							{copy.groups[group.id].name}
							{group.capabilities.length > 0
								? `: ${group.capabilities.map((item) => item.label).join(", ")}`
								: `: ${copy.groups[group.id].blurb}`}
						</li>
					))}
				</ol>
				<p>
					{copy.defaultOn.title}. {copy.defaultOn.body}
				</p>
			</noscript>
		</ExplainerSection>
	)
}
