"use client"

import { Stage } from "@/components/explainers/shared"
import { formatSeconds } from "@/lib/format"

import { PipelineCanvas } from "./canvas"
import { deriveFrame } from "./frame"
import { REPLAY_REST_SECONDS } from "./geometry"
import { LaneLabels } from "./lane-labels"
import { PipelineStacked } from "./stacked"
import type { TimelineProps } from "./types"
import { useReplayTime } from "./use-replay"

export function Timeline({
	data,
	copy,
	turn,
	labels,
	store,
	playing,
}: TimelineProps) {
	const time = useReplayTime(store)
	const frame = deriveFrame({
		data,
		turn,
		t: playing ? time : turn.maxSeconds + REPLAY_REST_SECONDS,
	})

	return (
		<div className="flex flex-col gap-2">
			<p
				aria-hidden="true"
				className="text-muted-foreground min-h-5 text-right text-sm tabular-nums"
			>
				{playing ? `${formatSeconds(time, copy.locale)} ${copy.unit}` : null}
			</p>
			<Stage
				width={data.axis.viewBox.w}
				height={data.axis.viewBox.h}
				label={copy.stageLabel}
				collapseBelow="sm"
				stacked={
					<PipelineStacked
						data={data}
						copy={copy}
						turn={turn}
						labels={labels}
					/>
				}
			>
				<PipelineCanvas data={data} copy={copy} frame={frame} labels={labels} />
				<LaneLabels data={data} copy={copy} turn={turn} />
			</Stage>
		</div>
	)
}
