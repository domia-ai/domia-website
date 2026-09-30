import { ArrowRight } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { ExplainerSection, LinkButton } from "@/components/sections"
import { loadPipeline, loadReplay } from "@/data"
import type {
	PipelineData,
	PipelineLaneId,
	PipelineMachineId,
	PipelineMode,
	PipelineModeId,
} from "@/data/types"

import { defaultSelection, subLanes } from "./geometry"
import { PipelineIsland } from "./island"
import { laneSubtitle } from "./lane-copy"
import type {
	ByMode,
	LaneCopy,
	PipelineCopy,
	PipelineExplainerProps,
	PipelineTranslator,
} from "./types"

const byMachine = <T,>(
	pick: (machine: PipelineMachineId) => T,
): Record<PipelineMachineId, T> => ({
	hub: pick("hub"),
	fastDesktop: pick("fastDesktop"),
})

const byMode = <T,>(
	data: PipelineData,
	machine: PipelineMachineId,
	pick: (mode: PipelineMode, id: PipelineModeId) => T,
): ByMode<T> => {
	const { conversation, command } = data.machines[machine].modes
	return {
		conversation: pick(conversation, "conversation"),
		command: command ? pick(command, "command") : undefined,
	}
}

const secondsAfterLastWord = (mode: PipelineMode) =>
	Math.round((mode.markers.firstAudio - mode.markers.endOfSpeech) * 10) / 10

const halfSecondsAfterLastWord = (mode: PipelineMode) =>
	String(Math.round((mode.markers.firstAudio - mode.markers.endOfSpeech) * 2))

const buildCopy = (t: PipelineTranslator, data: PipelineData): PipelineCopy => {
	const msLabel = ([lo, hi]: [number, number]) =>
		lo === hi
			? t("clock.msAbout", { value: lo })
			: t("clock.msRange", { lo, hi })

	const laneCopy = (id: PipelineLaneId): LaneCopy => ({
		label: t(`lanes.${id}.label`),
		sub: subLanes.has(id) ? null : t(`lanes.${id}.sub`),
		note: byMachine((machine) =>
			t(`lanes.${id}.note`, {
				ms: data.machines[machine].modes.conversation.routing.fastPathMs,
				range: msLabel(data.machines[machine].ledger.ttftMsRange),
			}),
		),
		tip: t(`lanes.${id}.tip`),
	})

	const sentenceCount = Math.max(
		...Object.values(data.machines).flatMap((machine) =>
			Object.values(machine.modes).map((mode) => mode?.sentences.length ?? 0),
		),
	)

	const sourceCopy = (machine: PipelineMachineId, id: PipelineModeId) => {
		const { ledger } = data.machines[machine]
		if (id === "conversation")
			return t("source.conversation", {
				ms: ledger.perceivedMs,
				machine: t(`machines.${machine}.phrase`),
			})
		if (!ledger.fastPathPerceivedMsRange)
			throw new Error(`pipeline ledger missing fast path range: ${machine}`)
		const [lo, hi] = ledger.fastPathPerceivedMsRange
		return t("source.command", { lo, hi })
	}

	return {
		title: t("title"),
		intro: t("intro"),
		stageLabel: t("stageLabel"),
		headline: byMachine((machine) =>
			byMode(data, machine, (mode) =>
				t("headline", {
					halves: halfSecondsAfterLastWord(mode),
					seconds: secondsAfterLastWord(mode),
				}),
			),
		),
		source: byMachine((machine) =>
			byMode(data, machine, (_, id) => sourceCopy(machine, id)),
		),
		link: t("link"),
		legend: {
			audio: t("legend.audio"),
			model: t("legend.model"),
			fastPath: t("legend.fastPath"),
		},
		lanes: {
			mic: laneCopy("mic"),
			stt: laneCopy("stt"),
			routing: laneCopy("routing"),
			mind: laneCopy("mind"),
			llm: laneCopy("llm"),
			splitter: laneCopy("splitter"),
			tts: laneCopy("tts"),
			hear: laneCopy("hear"),
		},
		markers: {
			endOfSpeech: {
				title: t("markers.endOfSpeech.title"),
				note: t("markers.endOfSpeech.note"),
			},
			firstToken: t("markers.firstToken"),
			firstAudio: {
				title: t("markers.firstAudio.title"),
				note: byMachine((machine) =>
					byMode(data, machine, (mode) =>
						t("markers.firstAudio.note", {
							seconds: secondsAfterLastWord(mode),
							machine: t(`machines.${machine}.phrase`),
						}),
					),
				),
			},
		},
		routing: {
			fastPath: t("routing.fastPath", {
				ms: data.machines[defaultSelection.machine].modes.conversation.routing
					.fastPathMs,
			}),
			checkpoints: {
				fastPath: t("routing.checkpoints.fastPath"),
				llm: t("routing.checkpoints.llm"),
			},
			reply: t("routing.reply"),
			sentences: Array.from({ length: sentenceCount }, (_, i) =>
				t("routing.sentence", { n: i + 1 }),
			),
		},
		toggles: {
			machine: {
				label: t("toggles.machine"),
				items: byMachine((machine) => t(`machines.${machine}.label`)),
			},
			mode: {
				label: t("toggles.mode"),
				items: {
					conversation: t("modes.conversation"),
					command: t("modes.command"),
				},
			},
		},
		controls: {
			play: t("controls.play"),
			pause: t("controls.pause"),
			scrub: t("controls.scrub"),
		},
		clock: {
			unit: t("clock.unit"),
			intoTurn: t("clock.intoTurn"),
			afterTurn: t("clock.afterTurn"),
		},
		epilogue: {
			divider: t("epilogue.divider"),
			micReopen: t("epilogue.micReopen"),
			bargeIn: t("epilogue.bargeIn"),
			reflectionTitle: t("epilogue.reflectionTitle"),
			reflectionBody: t("epilogue.reflectionBody"),
			reflectionAside: t("epilogue.reflectionAside"),
		},
		footer: [t("footer.local"), t("footer.llm"), t("footer.storage")],
		hints: { heading: t("hints.heading") },
		stacked: { skipped: t("stacked.skipped") },
		noscript: { heading: t("noscript.heading") },
		replay: {
			label: t("replay.label"),
			play: t("replay.play"),
			stop: t("replay.stop"),
			turns: {
				fast: t("replay.turns.fast"),
				knowledge: t("replay.turns.knowledge"),
				conversation: t("replay.turns.conversation"),
			},
			headline: t("replay.headline"),
			note: t("replay.note"),
			live: {
				idle: t("replay.live.idle"),
				listening: t("replay.live.listening"),
				thinking: t("replay.live.thinking"),
				speaking: t("replay.live.speaking"),
				done: t("replay.live.done"),
			},
		},
	}
}

export async function PipelineExplainer({ tone }: PipelineExplainerProps) {
	const data = loadPipeline()
	const replay = loadReplay()
	const t = await getTranslations("explainers.pipeline")
	const copy = buildCopy(t, data)

	return (
		<ExplainerSection
			id="turn"
			title={copy.title}
			intro={copy.intro}
			tone={tone}
		>
			<div className="flex flex-col gap-6">
				<PipelineIsland data={data} replay={replay} copy={copy} />
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
					{copy.noscript.heading}
				</h3>
				<ol className="text-muted-foreground mt-2 list-decimal pl-5 text-sm">
					{data.lanes.map((lane) => (
						<li key={lane.id}>
							<span className="text-foreground font-medium">
								{copy.lanes[lane.id].label}
							</span>
							{": "}
							{laneSubtitle(copy.lanes[lane.id], defaultSelection.machine)}
						</li>
					))}
				</ol>
			</noscript>
		</ExplainerSection>
	)
}
