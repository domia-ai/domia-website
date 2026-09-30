"use client"

import { useId, useState } from "react"
import { Zap } from "lucide-react"

import type { SkillGroupId } from "@/data/types"

import { HintIndex, HintProvider } from "../shared"
import { CapabilityChip } from "./capability-chip"
import { groupSpanClassName } from "./constants"
import { ExampleCard } from "./example-card"
import { GroupCard } from "./group-card"
import { McpDetails, RoutinesDetails } from "./group-details"
import { GroupSwitch } from "./group-switch"
import type { SkillsMapIslandProps, SkillsMapState } from "./types"

export function SkillsMapIsland({ view, copy }: SkillsMapIslandProps) {
	const switchesLabelId = useId()
	const examplesLabelId = useId()
	const [state, setState] = useState<SkillsMapState>(() => ({
		active: new Set(view.groups.map((group) => group.id)),
	}))

	const toggleGroup = (groupId: SkillGroupId, checked: boolean) => {
		setState((current) => {
			const active = new Set(current.active)
			if (checked) active.add(groupId)
			else active.delete(groupId)
			return { active }
		})
	}

	return (
		<HintProvider>
			<div className="flex flex-col gap-8">
				<div className="flex flex-col gap-3">
					<p
						id={switchesLabelId}
						className="text-muted-foreground text-sm font-medium"
					>
						{copy.switchOffLabel}
					</p>
					<ul
						aria-labelledby={switchesLabelId}
						className="flex list-none flex-wrap gap-2"
					>
						{view.groups.map((group) => (
							<GroupSwitch
								key={group.id}
								groupId={group.id}
								checked={state.active.has(group.id)}
								onCheckedChange={toggleGroup}
								copy={copy}
							/>
						))}
					</ul>
					<p className="text-muted-foreground flex items-center gap-1.5 text-sm">
						<Zap
							aria-hidden="true"
							className="fill-fast-path stroke-fast-path size-3.5 shrink-0"
						/>
						<span className="text-pretty">{copy.legend}</span>
					</p>
				</div>

				<div className="flex flex-col gap-3">
					<p
						id={examplesLabelId}
						className="text-muted-foreground text-sm font-medium"
					>
						{copy.examplesLabel}
					</p>
					<ul
						aria-labelledby={examplesLabelId}
						aria-live="polite"
						className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
					>
						{view.examples.map((example) => (
							<ExampleCard
								key={example.id}
								example={example}
								active={state.active.has(example.group)}
								copy={copy}
							/>
						))}
					</ul>
				</div>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
					{view.groups.map((group) => (
						<GroupCard
							key={group.id}
							groupId={group.id}
							active={state.active.has(group.id)}
							defaultOn={group.defaultOn}
							copy={copy}
							className={groupSpanClassName[group.id]}
						>
							{group.id === "mcp" ? (
								<McpDetails copy={copy} />
							) : group.id === "routines" ? (
								<RoutinesDetails copy={copy} />
							) : (
								<ul className="flex flex-wrap gap-2">
									{group.capabilities.map((capability) => (
										<CapabilityChip
											key={capability.key}
											capability={capability}
											copy={copy}
										/>
									))}
								</ul>
							)}
						</GroupCard>
					))}
				</div>

				<p className="text-muted-foreground text-sm text-pretty">
					<span className="text-foreground font-medium">
						{copy.defaultOn.title}.
					</span>{" "}
					{copy.defaultOn.body}
				</p>

				<HintIndex
					heading={copy.hintsHeading}
					items={[
						{ id: "hidden", title: copy.hidden.title, body: copy.hidden.body },
					]}
				/>
			</div>
		</HintProvider>
	)
}
