import { ArrowRight } from "lucide-react"
import { getLocale, getTranslations } from "next-intl/server"

import { ExplainerSection, LinkButton } from "@/components/sections"
import { loadPipeline, loadReplay } from "@/data"
import type { PipelineData, PipelineLaneId } from "@/data/types"
import { formatSeconds } from "@/lib/format"
import { recordFrom } from "@/lib/record"

import { AFTER_ITEM_IDS, REPLAY_IDS, REPLAY_PHASES } from "./constants"
import { PipelineIsland } from "./island"
import type {
	LaneCopy,
	PipelineCopy,
	PipelineExplainerProps,
	PipelineTranslator,
} from "./types"

const buildCopy = (
	t: PipelineTranslator,
	data: PipelineData,
	locale: string,
): PipelineCopy => {
	const laneCopy = (id: PipelineLaneId): LaneCopy => ({
		label: t(`lanes.${id}.label`),
		sub: t(`lanes.${id}.sub`),
		note: t(`lanes.${id}.note`),
		tip: t(`lanes.${id}.tip`),
	})
	const { hubConversationMs, hubCommandMsRange } = data.benchmarks

	return {
		title: t("title"),
		intro: t("intro"),
		stageLabel: t("stageLabel"),
		headline: t.raw("headline"),
		link: t("link"),
		legend: {
			audio: t("legend.audio"),
			model: t("legend.model"),
			fastPath: t("legend.fastPath"),
			skill: t("legend.skill"),
		},
		lanes: recordFrom(
			data.lanes.map((lane) => lane.id),
			laneCopy,
		),
		markers: {
			endOfSpeech: {
				title: t("markers.endOfSpeech.title"),
				note: t("markers.endOfSpeech.note"),
			},
			firstToken: t("markers.firstToken"),
			firstAudio: {
				title: t("markers.firstAudio.title"),
				note: t.raw("markers.firstAudio.note"),
			},
		},
		routing: {
			fastPath: t.raw("routing.fastPath"),
			checkpoints: {
				fastPath: t("routing.checkpoints.fastPath"),
				llm: t("routing.checkpoints.llm"),
			},
			reply: t("routing.reply"),
			skillCall: t("routing.skillCall"),
		},
		picker: {
			label: t("picker.label"),
			play: t("picker.play"),
			stop: t("picker.stop"),
			turns: recordFrom(REPLAY_IDS, (id) => t(`picker.turns.${id}`)),
		},
		live: recordFrom(REPLAY_PHASES, (phase) => t(`live.${phase}`)),
		unit: t("unit"),
		locale,
		after: {
			title: t("after.title"),
			items: AFTER_ITEM_IDS.map((id) => ({ id, text: t(`after.${id}`) })),
		},
		note: t("note", {
			seconds: formatSeconds(hubConversationMs / 1000, locale),
			lo: hubCommandMsRange[0],
			hi: hubCommandMsRange[1],
		}),
		hints: { heading: t("hints.heading") },
		stacked: { skipped: t("stacked.skipped") },
	}
}

export async function PipelineExplainer({ tone }: PipelineExplainerProps) {
	const data = loadPipeline()
	const replay = loadReplay()
	const t = await getTranslations("explainers.pipeline")
	const copy = buildCopy(t, data, await getLocale())

	return (
		<ExplainerSection
			id="turn"
			title={copy.title}
			intro={copy.intro}
			tone={tone}
		>
			<div className="flex flex-col gap-6">
				<PipelineIsland data={data} turns={replay.turns} copy={copy} />
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
				<h3 className="mt-6 text-base font-semibold">
					{t("noscript.heading")}
				</h3>
				<ol className="text-muted-foreground mt-2 list-decimal pl-5 text-sm">
					{data.lanes.map((lane) => (
						<li key={lane.id}>
							<span className="text-foreground font-medium">
								{copy.lanes[lane.id].label}
							</span>
							{": "}
							{copy.lanes[lane.id].sub} · {copy.lanes[lane.id].note}
						</li>
					))}
				</ol>
			</noscript>
		</ExplainerSection>
	)
}
