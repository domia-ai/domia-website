import { getLocale, getTranslations } from "next-intl/server"

import { ExplainerSection } from "@/components/sections"
import { TypographySmall } from "@/components/ui/typography"
import { loadArchetypes } from "@/data"
import type { ArchetypeId, ArchetypeTemplateId } from "@/data/types"

import { ArchetypeSelectorIsland } from "./island"
import type {
	ArchetypeCopy,
	ArchetypeSelectorCopy,
	ArchetypeSelectorExplainerProps,
} from "./types"

export async function ArchetypeSelectorExplainer({
	tone,
}: ArchetypeSelectorExplainerProps) {
	const t = await getTranslations("explainers.archetypeSelector")
	const locale = await getLocale()
	const data = loadArchetypes()

	const templates: Record<ArchetypeTemplateId, string> = {
		"thin-client": t("templates.thinClient"),
		standalone: t("templates.standalone"),
		"full-hub": t("templates.fullHub"),
	}

	const archetypeCopy = (id: ArchetypeId): ArchetypeCopy => {
		const name = t(`archetypes.${id}.name`)
		const template = data.archetypes.find(
			(archetype) => archetype.id === id,
		)?.template
		return {
			name,
			description: t(`archetypes.${id}.description`),
			chooseIf: t(`archetypes.${id}.chooseIf`),
			panelTitle: t("panelTitle", {
				archetype: id,
				machine: name.toLocaleLowerCase(locale),
			}),
			templateLine:
				template === undefined
					? ""
					: t("templateLine", { template: templates[template] }),
		}
	}

	const copy: ArchetypeSelectorCopy = {
		selectorLabel: t("selectorLabel"),
		archetypes: {
			thin: archetypeCopy("thin"),
			capable: archetypeCopy("capable"),
			hubClass: archetypeCopy("hubClass"),
		},
		stages: {
			wake: t("stages.wake"),
			audio: t("stages.audio"),
			stt: t("stages.stt"),
			routing: t("stages.routing"),
			llm: t("stages.llm"),
			tts: t("stages.tts"),
			memory: t("stages.memory"),
			satellites: t("stages.satellites"),
		},
		columns: {
			here: t("columns.here"),
			elsewhere: t("columns.elsewhere"),
		},
		emptyColumn: t("emptyColumn"),
		identities: {
			one: t("identities.one"),
			several: t("identities.several"),
		},
		sharesPill: t("sharesPill"),
		needsPeer: t("needsPeer"),
		templates,
		footnote: t("footnote"),
	}

	return (
		<ExplainerSection
			id="archetypes"
			title={t("title")}
			intro={t("intro")}
			tone={tone}
		>
			<div className="flex flex-col gap-6">
				<ArchetypeSelectorIsland data={data} copy={copy} />
				<TypographySmall className="text-muted-foreground font-normal text-balance">
					{copy.footnote}
				</TypographySmall>
				<noscript>
					<h3>{t("noscriptHeading")}</h3>
					<ol>
						{data.archetypes.map((archetype) => (
							<li key={archetype.id}>
								{copy.archetypes[archetype.id].name}:{" "}
								{copy.archetypes[archetype.id].description}{" "}
								{copy.archetypes[archetype.id].chooseIf}{" "}
								{copy.archetypes[archetype.id].templateLine}
							</li>
						))}
					</ol>
				</noscript>
			</div>
		</ExplainerSection>
	)
}
