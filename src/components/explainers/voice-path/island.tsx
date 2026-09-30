"use client"

import { useId, useState } from "react"
import { WifiOff } from "lucide-react"

import { HintIndex, HintProvider, Stage } from "@/components/explainers/shared"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

import { HopMaps } from "./hop-maps"
import {
	STAGE_HEIGHT,
	STAGE_WIDTH,
	createHopVisibility,
	createStageLayouts,
} from "./layout"
import { VoicePathStacked } from "./stacked"
import type { VoicePathIslandProps, VoicePathState } from "./types"

const initialState: VoicePathState = { offline: false }

export function VoicePathIsland({ data, copy }: VoicePathIslandProps) {
	const [state, setState] = useState(initialState)
	const switchId = useId()
	const layouts = createStageLayouts(data)
	const visibility = createHopVisibility(state.offline, data.offlineBreaks)
	const hintItems = [copy.hints.vendor, copy.hints.node]

	return (
		<HintProvider>
			<div className="flex flex-col gap-6">
				<div className="flex flex-wrap items-center justify-between gap-4">
					<div className="flex items-center gap-3">
						<Switch
							id={switchId}
							checked={state.offline}
							onCheckedChange={(checked) => setState({ offline: checked })}
						/>
						<Label htmlFor={switchId} className="cursor-pointer text-base">
							<WifiOff className="text-muted-foreground size-4" aria-hidden />
							{copy.switchLabel}
						</Label>
					</div>
					<p className="text-muted-foreground max-w-md text-sm text-balance">
						{copy.note}
					</p>
				</div>
				<Stage
					width={STAGE_WIDTH}
					height={STAGE_HEIGHT}
					label={copy.stageLabel}
					collapseBelow="md"
					stacked={
						<VoicePathStacked
							layouts={layouts}
							copy={copy}
							visibility={visibility}
						/>
					}
				>
					<HopMaps layouts={layouts} copy={copy} visibility={visibility} />
				</Stage>
				<HintIndex heading={copy.hints.heading} items={hintItems} />
			</div>
		</HintProvider>
	)
}
