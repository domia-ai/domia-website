import { getTranslations } from "next-intl/server"

import { loadSayItConversation } from "@/components/explainers/say-it"
import { ExplainerSection, LinkButton } from "@/components/sections"
import { loadPersonas } from "@/data"

import { PersonaBuilderIsland } from "./island"
import type { PersonaBuilderCopy, PersonaBuilderExplainerProps } from "./types"

export async function PersonaBuilderExplainer({
	tone,
}: PersonaBuilderExplainerProps) {
	const t = await getTranslations("explainers.personaBuilder")
	const data = loadPersonas()
	const conversation = await loadSayItConversation()

	const copy: PersonaBuilderCopy = {
		pickFace: t("pickFace"),
		pickTemperament: t("pickTemperament"),
		faces: Object.fromEntries(
			data.faces.map((face) => [face.id, t(`faces.${face.id}.name`)]),
		) as PersonaBuilderCopy["faces"],
		templates: Object.fromEntries(
			data.templates.map((template) => [
				template.id,
				{
					name: t(`templates.${template.id}.name`),
					persona: t(`templates.${template.id}.persona`),
					sample: t(`templates.${template.id}.sample`),
				},
			]),
		) as PersonaBuilderCopy["templates"],
		examplesNote: t("examplesNote"),
	}

	return (
		<ExplainerSection
			id="personas"
			title={t("title")}
			intro={t("intro")}
			tone={tone}
		>
			<div className="flex flex-col gap-8">
				<PersonaBuilderIsland
					data={data}
					copy={copy}
					conversation={conversation}
				/>
				<div className="flex flex-wrap gap-2">
					<LinkButton href="/console#console-tour" variant="secondary">
						{t("seeRadar")}
					</LinkButton>
					<LinkButton href="/run" variant="outline">
						{t("runIt")}
					</LinkButton>
				</div>
				<noscript>
					<h3>{t("noscriptHeading")}</h3>
					<ol>
						{data.templates.map((template) => (
							<li key={template.id}>
								{copy.templates[template.id].name}:{" "}
								{copy.templates[template.id].persona} (
								{copy.faces[template.defaultFace]}).{" "}
								{copy.templates[template.id].sample}
							</li>
						))}
					</ol>
				</noscript>
			</div>
		</ExplainerSection>
	)
}
