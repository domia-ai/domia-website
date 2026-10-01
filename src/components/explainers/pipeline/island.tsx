"use client"

import { useState } from "react"

import { HintIndex, HintProvider } from "@/components/explainers/shared"
import type { HintItem } from "@/components/explainers/shared"
import { TypographyH3 } from "@/components/ui/typography"
import type { ReplayId } from "@/data/types"
import { formatSeconds } from "@/lib/format"
import { fillTemplate } from "@/lib/template"

import { Legend } from "./parts"
import { Timeline } from "./timeline"
import { TurnPicker } from "./turn-picker"
import { useReplay } from "./use-replay"
import type { PipelineIslandProps, TurnLabels } from "./types"

export function PipelineIsland({ data, turns, copy }: PipelineIslandProps) {
	const { phase, store, start, stop } = useReplay()
	const [turnId, setTurnId] = useState<ReplayId>(turns[0].id)
	const turn = turns.find(({ id }) => id === turnId) ?? turns[0]
	const playing = phase !== "idle" && phase !== "done"
	const seconds = formatSeconds(
		turn.mode.markers.firstAudio - turn.mode.markers.endOfSpeech,
		copy.locale,
	)
	const labels: TurnLabels = {
		headline: fillTemplate(copy.headline, { seconds }),
		firstAudioNote: fillTemplate(copy.markers.firstAudio.note, { seconds }),
		fastPath: fillTemplate(copy.routing.fastPath, {
			ms: Math.max(1, Math.round(turn.mode.routing.fastPathMs)),
		}),
	}
	const hintItems: HintItem[] = [
		...data.lanes.map((lane) => ({
			id: `pipeline-${lane.id}`,
			title: copy.lanes[lane.id].label,
			body: `${copy.lanes[lane.id].tip} ${copy.lanes[lane.id].note}`,
		})),
		{
			id: "pipeline-end-of-speech",
			title: copy.markers.endOfSpeech.title,
			body: copy.markers.endOfSpeech.note,
		},
	]

	return (
		<HintProvider>
			<div className="flex flex-col gap-4">
				<TypographyH3 className="max-w-3xl text-2xl text-balance sm:text-3xl">
					{labels.headline}
				</TypographyH3>
				<TurnPicker
					turns={turns}
					copy={copy.picker}
					selected={turn.id}
					running={playing}
					onSelect={(id) => {
						stop()
						setTurnId(id)
					}}
					onToggle={() => (playing ? stop() : start(turn))}
				/>
				<div className="flex flex-wrap items-center justify-between gap-3">
					<Legend copy={copy} />
					<p aria-live="polite" className="text-muted-foreground text-sm">
						{phase === "idle" ? null : copy.live[phase]}
					</p>
				</div>
				<Timeline
					data={data}
					copy={copy}
					turn={turn}
					labels={labels}
					store={store}
					playing={playing}
				/>
				<div className="flex flex-col gap-2">
					<p className="text-sm font-medium">{copy.after.title}</p>
					<ul className="text-muted-foreground flex list-disc flex-col gap-1 pl-5 text-sm">
						{copy.after.items.map((item) => (
							<li key={item.id}>{item.text}</li>
						))}
					</ul>
				</div>
				<p className="text-muted-foreground max-w-3xl text-xs text-balance">
					{copy.note}
				</p>
				<HintIndex heading={copy.hints.heading} items={hintItems} />
			</div>
		</HintProvider>
	)
}
