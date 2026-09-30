import { Card, CardContent } from "@/components/ui/card"

import { findScenario, stackedLines } from "./derive"
import type { TopologiesStackedProps } from "./types"

export function TopologiesStacked({
	data,
	copy,
	active,
}: TopologiesStackedProps) {
	const scenario = findScenario(data, active)
	return (
		<Card size="sm">
			<CardContent>
				<ul className="flex flex-col gap-3">
					{stackedLines(data, copy, scenario).map((line) => (
						<li key={line.id} className="flex flex-col">
							<span className="font-medium">{line.title}</span>
							{line.detail ? (
								<span className="text-muted-foreground text-xs">
									{line.detail}
								</span>
							) : null}
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	)
}
