"use client"

import { useState } from "react"

import {
	HintIndex,
	HintProvider,
	ScenarioTabs,
	Stage,
} from "@/components/explainers/shared"
import type { TopologyScenarioId } from "@/data/types"

import { frameClassName, stageClassName } from "./classes"
import { defaultScenario, findScenario, isScenarioId } from "./derive"
import { LinkLayer } from "./link-layer"
import { NodeCard } from "./node-card"
import { OverlayLayer } from "./overlays"
import { TopologiesStacked } from "./stacked"
import { HintsContext } from "./tip"
import type { TopologiesIslandProps } from "./types"

export function TopologiesIsland({ data, copy }: TopologiesIslandProps) {
	const [scenario, setScenario] = useState<TopologyScenarioId>(defaultScenario)
	const current = findScenario(data, scenario)

	const content = (
		<div className="flex flex-col gap-6">
			<ScenarioTabs
				value={scenario}
				onValueChange={(next) => {
					if (isScenarioId(data, next)) setScenario(next)
				}}
				items={data.scenarios.map((item) => ({
					value: item.id,
					label: copy.tabs[item.id],
				}))}
				label={copy.tabsLabel}
				instruction={copy.tabsInstruction}
				className="flex-col"
			>
				<div className="flex flex-col gap-4">
					<p
						className="text-foreground max-w-2xl text-base leading-7 text-pretty"
						aria-live="polite"
					>
						{copy.captions[scenario]}
					</p>
					<Stage
						width={data.canvas.w}
						height={current.frame.h}
						label={copy.stageLabel}
						collapseBelow="md"
						className={stageClassName}
						stacked={
							<TopologiesStacked data={data} copy={copy} active={scenario} />
						}
					>
						<div
							className={frameClassName}
							style={{
								width: data.canvas.w,
								height: data.canvas.h,
								transform: `translateY(${-current.frame.y}px)`,
							}}
						>
							<LinkLayer data={data} active={scenario} />
							{data.nodes.map((node) => (
								<NodeCard
									key={node.id}
									node={node}
									scenario={current}
									data={data}
									copy={copy}
								/>
							))}
							<OverlayLayer data={data} copy={copy} active={scenario} />
						</div>
					</Stage>
				</div>
			</ScenarioTabs>
			<HintIndex
				heading={copy.hintsHeading}
				items={Object.values(copy.hints)}
			/>
		</div>
	)

	return (
		<HintsContext.Provider value={copy.hints}>
			<HintProvider>{content}</HintProvider>
		</HintsContext.Provider>
	)
}
