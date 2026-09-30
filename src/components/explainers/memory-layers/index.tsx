import { ArrowRight } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { ExplainerSection, LinkButton } from "@/components/sections"
import { loadMemory } from "@/data"
import type { MemoryLayerId } from "@/data/types"

import { MemoryLayersIsland } from "./island"
import type {
	MemoryLayerCopy,
	MemoryLayersCopy,
	MemoryLayersExplainerProps,
} from "./types"

export async function MemoryLayersExplainer({
	tone,
}: MemoryLayersExplainerProps) {
	const data = loadMemory()
	const t = await getTranslations("explainers.memoryLayers")

	const layerCopy = (id: MemoryLayerId): MemoryLayerCopy => ({
		name: t(`layers.${id}.name`),
		description: t(`layers.${id}.description`),
		example: t(`layers.${id}.example`),
		hint: t(`layers.${id}.hint`),
	})

	const copy: MemoryLayersCopy = {
		regionLabel: t("regionLabel"),
		toggle: {
			label: t("toggle.label"),
			turn: t("toggle.turn"),
			idle: t("toggle.idle"),
		},
		pills: {
			inPrompt: t("pills.inPrompt"),
			inPromptSession: t("pills.inPromptSession"),
			writtenNow: t("pills.writtenNow"),
		},
		writerLabel: t("writerLabel"),
		writers: {
			author: t("writers.author"),
			turn: t("writers.turn"),
			reflection: t("writers.reflection"),
		},
		layers: {
			recentTurns: layerCopy("recentTurns"),
			facts: layerCopy("facts"),
			knowledge: layerCopy("knowledge"),
			episodes: layerCopy("episodes"),
			userModel: layerCopy("userModel"),
		},
		hintsHeading: t("hintsHeading"),
		footer: t("footer"),
		link: t("link"),
	}

	return (
		<ExplainerSection
			id="memory"
			title={t("title")}
			intro={t("intro")}
			tone={tone}
		>
			<div className="flex flex-col gap-6">
				<MemoryLayersIsland data={data} copy={copy} />
				<LinkButton
					href="/console"
					variant="link"
					className="h-auto self-start px-0 text-base"
				>
					{copy.link}
					<ArrowRight data-icon="inline-end" aria-hidden="true" />
				</LinkButton>
			</div>
			<noscript>
				<h3>{t("noscript.heading")}</h3>
				<ol>
					{data.layers.map((layer) => (
						<li key={layer.id}>
							{copy.layers[layer.id].name}: {copy.layers[layer.id].description}{" "}
							({copy.writerLabel} {copy.writers[layer.writtenBy]})
						</li>
					))}
				</ol>
				<p>{copy.footer}</p>
			</noscript>
		</ExplainerSection>
	)
}
