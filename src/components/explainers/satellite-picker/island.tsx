"use client"

import { useState } from "react"

import { HintIndex, HintProvider, Stage } from "@/components/explainers/shared"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import type { SatelliteProtocolId } from "@/data/types"

import { DetailsPanel } from "./details-panel"
import { DeviceCards } from "./device-cards"
import { HUB_HINT_ID, HubCard } from "./hub-card"
import { DETAILS_RECT, STAGE_HEIGHT, STAGE_WIDTH } from "./layout"
import { LinkLines } from "./link-lines"
import { RealtimeCard } from "./realtime-card"
import { Stacked } from "./stacked"
import type { SatellitePickerIslandProps } from "./types"

export function SatellitePickerIsland({
	data,
	copy,
}: SatellitePickerIslandProps) {
	const [protocol, setProtocol] = useState<SatelliteProtocolId>(
		data.defaultProtocol,
	)
	const isProtocolId = (value: unknown): value is SatelliteProtocolId =>
		data.protocols.some((item) => item.id === value)
	const selectProtocol = (value: unknown) => {
		if (isProtocolId(value)) setProtocol(value)
	}
	const selectedIndex = data.protocols.findIndex((item) => item.id === protocol)
	const selected = data.protocols[selectedIndex] ?? data.protocols[0]

	return (
		<HintProvider>
			<div className="flex flex-col gap-6">
				<Stage
					width={STAGE_WIDTH}
					height={STAGE_HEIGHT}
					label={copy.stageLabel}
					collapseBelow="lg"
					stacked={
						<Stacked
							data={data}
							copy={copy}
							protocol={protocol}
							onProtocolChange={selectProtocol}
						/>
					}
				>
					<LinkLines
						count={data.protocols.length}
						selectedIndex={selectedIndex}
					/>
					<Tabs
						orientation="vertical"
						value={protocol}
						onValueChange={selectProtocol}
						className="absolute inset-0 block"
					>
						<DeviceCards protocols={data.protocols} copy={copy} />
						<HubCard copy={copy.hub} />
						<TabsContent
							value={protocol}
							className="bg-card ring-foreground/10 absolute overflow-hidden rounded-2xl p-4 ring-1"
							style={{
								left: DETAILS_RECT.x,
								top: DETAILS_RECT.y,
								width: DETAILS_RECT.width,
								height: DETAILS_RECT.height,
							}}
						>
							<DetailsPanel
								key={selected.id}
								protocol={selected}
								copy={copy.protocols[selected.id]}
								labels={copy.details}
							/>
						</TabsContent>
					</Tabs>
				</Stage>
				<RealtimeCard copy={copy.realtime} />
				<HintIndex
					heading={copy.hintIndexHeading}
					items={[
						{
							id: HUB_HINT_ID,
							title: copy.hub.hint.title,
							body: copy.hub.hint.body,
						},
					]}
				/>
			</div>
		</HintProvider>
	)
}
