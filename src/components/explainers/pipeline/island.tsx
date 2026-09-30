"use client"

import { useRef, useState } from "react"

import type { ReplayId } from "@/data/types"

import {
	HintIndex,
	HintProvider,
	MachineToggle,
	PlayerControls,
	Stage,
	loopToTurn,
	useRafClock,
} from "@/components/explainers/shared"
import type { HintItem } from "@/components/explainers/shared"

import { PipelineCanvas } from "./canvas"
import { deriveFrame } from "./frame"
import { defaultSelection } from "./geometry"
import { laneHintBody } from "./lane-copy"
import { LaneLabels } from "./lane-labels"
import { FooterChips, Headline, Legend, SourceCaption } from "./parts"
import {
	isMachine,
	isMode,
	machineIds,
	modeIds,
	pickCopy,
	withMachine,
	withMode,
} from "./selection"
import { ReplayControls } from "./replay-controls"
import { PipelineStacked } from "./stacked"
import { useReplay } from "./use-replay"
import type { PipelineIslandProps, PipelineSelection } from "./types"

const machineItems = (copy: PipelineIslandProps["copy"]) =>
	machineIds.map((value) => ({
		value,
		label: copy.toggles.machine.items[value],
	}))

const modeItems = (copy: PipelineIslandProps["copy"]) =>
	modeIds.map((value) => ({ value, label: copy.toggles.mode.items[value] }))

export function PipelineIsland({ data, replay, copy }: PipelineIslandProps) {
	const ref = useRef<HTMLDivElement>(null)
	const [selection, setSelection] =
		useState<PipelineSelection>(defaultSelection)
	const clock = useRafClock({
		duration: data.axis.loopSeconds,
		frozenAt: data.axis.sweepSeconds,
		ref,
	})
	const replayer = useReplay()
	const [replayId, setReplayId] = useState<ReplayId>(replay.turns[0].id)
	const replayTurn =
		replay.turns.find((turn) => turn.id === replayId) ?? replay.turns[0]
	const replaying = replayer.state.phase !== "idle"
	const frame = deriveFrame({
		data,
		selection,
		t: replaying ? replayer.state.t : clock.t,
		replay: replaying ? { turn: replayTurn, t: replayer.state.t } : undefined,
	})
	const replayHeadline = copy.replay.headline.replace(
		"{seconds}",
		(
			replayTurn.mode.markers.firstAudio - replayTurn.mode.markers.endOfSpeech
		).toFixed(1),
	)
	const toggleReplay = () => {
		if (replaying) {
			replayer.stop()
			return
		}
		clock.pause()
		replayer.start(replayTurn)
	}

	const formatValue = (t: number) =>
		t <= data.axis.sweepSeconds
			? `${loopToTurn(t, data.axis.sweepSeconds, data.axis.maxSeconds).toFixed(1)} ${copy.clock.unit} ${copy.clock.intoTurn}`
			: copy.clock.afterTurn

	const hintItems: HintItem[] = [
		...data.lanes.map((lane) => ({
			id: `pipeline-${lane.id}`,
			title: copy.lanes[lane.id].label,
			body: laneHintBody(copy.lanes[lane.id], selection.machine),
		})),
		{
			id: "pipeline-end-of-speech",
			title: copy.markers.endOfSpeech.title,
			body: copy.markers.endOfSpeech.note,
		},
		{
			id: "pipeline-first-audio",
			title: copy.markers.firstAudio.title,
			body: pickCopy(copy.markers.firstAudio.note, selection),
		},
	]

	return (
		<HintProvider>
			<div ref={ref} className="flex flex-col gap-4">
				<Headline
					copy={copy}
					selection={selection}
					override={replaying ? replayHeadline : null}
				/>
				<div className="flex flex-wrap items-center justify-between gap-3">
					<Legend copy={copy} />
					{replaying ? null : (
						<div className="flex flex-wrap gap-2">
							<MachineToggle
								value={selection.machine}
								onValueChange={(next) => {
									if (isMachine(next))
										setSelection((prev) => withMachine(data, prev, next))
								}}
								items={machineItems(copy)}
								label={copy.toggles.machine.label}
							/>
							<MachineToggle
								value={selection.mode}
								onValueChange={(next) => {
									if (isMode(next))
										setSelection((prev) => withMode(data, prev, next))
								}}
								items={modeItems(copy)}
								label={copy.toggles.mode.label}
							/>
						</div>
					)}
				</div>

				<Stage
					width={data.axis.viewBox.w}
					height={data.axis.viewBox.h}
					label={copy.stageLabel}
					collapseBelow="sm"
					stacked={
						<PipelineStacked data={data} copy={copy} selection={selection} />
					}
				>
					<PipelineCanvas
						data={data}
						copy={copy}
						selection={selection}
						frame={frame}
					/>
					<LaneLabels
						data={data}
						copy={copy}
						selection={selection}
						frame={frame}
					/>
				</Stage>

				{replaying ? (
					<p
						aria-live="polite"
						className="text-muted-foreground text-sm tabular-nums"
					>
						{copy.replay.live[replayer.state.phase]} ·{" "}
						{replayer.state.t.toFixed(1)} {copy.clock.unit}
					</p>
				) : (
					<div className="flex items-center gap-3">
						<div className="min-w-0 flex-1">
							<PlayerControls
								playing={clock.playing}
								onToggle={clock.toggle}
								t={clock.t}
								max={data.axis.loopSeconds}
								onSeek={clock.seek}
								labels={copy.controls}
								formatValue={formatValue}
							/>
						</div>
						<span
							aria-hidden="true"
							className="text-muted-foreground w-36 shrink-0 text-right text-xs tabular-nums"
						>
							{formatValue(clock.t)}
						</span>
					</div>
				)}

				<ReplayControls
					turns={replay.turns}
					copy={copy.replay}
					selected={replayTurn.id}
					running={replaying}
					onSelect={(id) => {
						replayer.stop()
						setReplayId(id)
					}}
					onToggle={toggleReplay}
				/>

				<SourceCaption
					copy={copy}
					selection={selection}
					override={replaying ? copy.replay.note : null}
				/>
				<FooterChips copy={copy} />
				<HintIndex heading={copy.hints.heading} items={hintItems} />
			</div>
		</HintProvider>
	)
}
