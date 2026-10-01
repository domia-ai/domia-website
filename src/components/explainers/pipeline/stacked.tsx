import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

import { laneTone } from "./geometry"
import type { PipelineStackedProps } from "./types"

export function PipelineStacked({
	data,
	copy,
	turn,
	labels,
}: PipelineStackedProps) {
	const { mode, maxSeconds } = turn
	const markers = [
		{
			id: "endOfSpeech",
			title: copy.markers.endOfSpeech.title,
			note: copy.markers.endOfSpeech.note,
		},
		{
			id: "firstAudio",
			title: copy.markers.firstAudio.title,
			note: labels.firstAudioNote,
		},
	]

	return (
		<div className="flex flex-col gap-3">
			<dl className="border-border flex flex-col gap-2 rounded-xl border p-3 text-sm">
				{markers.map((marker) => (
					<div key={marker.id} className="flex flex-col gap-0.5">
						<dt className="text-audio-text font-semibold">{marker.title}</dt>
						<dd className="text-muted-foreground text-xs text-balance">
							{marker.note}
						</dd>
					</div>
				))}
			</dl>
			<ol className="flex flex-col gap-2">
				{data.lanes.map((lane) => {
					const spans = mode.spans[lane.id] ?? []
					const skipped = spans.length === 0
					const tone = laneTone[lane.color]
					const laneCopy = copy.lanes[lane.id]
					return (
						<li key={lane.id}>
							<Card
								size="sm"
								className={cn(skipped && "bg-muted/40 ring-border/60")}
							>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<span
											aria-hidden="true"
											className={cn("size-2 shrink-0 rounded-xs", tone.swatch)}
										/>
										{laneCopy.label}
									</CardTitle>
									<CardDescription className="text-balance">
										{skipped
											? copy.stacked.skipped
											: `${laneCopy.sub} · ${laneCopy.note}`}
									</CardDescription>
								</CardHeader>
								{skipped ? null : (
									<CardContent>
										<div
											aria-hidden="true"
											className="bg-foreground/8 relative h-2 overflow-hidden rounded-full"
										>
											{spans.map(([start, end], i) => (
												<span
													key={i}
													className={cn(
														"absolute inset-y-0 min-w-0.5 rounded-full",
														tone.swatch,
													)}
													style={{
														left: `${(start / maxSeconds) * 100}%`,
														width: `${((end - start) / maxSeconds) * 100}%`,
													}}
												/>
											))}
										</div>
									</CardContent>
								)}
							</Card>
						</li>
					)
				})}
			</ol>
		</div>
	)
}
