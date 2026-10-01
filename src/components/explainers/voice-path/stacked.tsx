import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

import { HopChips } from "./hop-chips"
import { PathHeader } from "./path-header"
import type { VoicePathStackedProps } from "./types"

export function VoicePathStacked({
	layouts,
	copy,
	visibility,
}: VoicePathStackedProps) {
	return (
		<div className="flex flex-col gap-6">
			{layouts.map((layout) => (
				<div
					key={layout.key}
					className={cn(
						"flex flex-col gap-3 rounded-xl p-3",
						layout.key === "local" &&
							"border-mesh/60 bg-mesh/5 border-2 border-dashed",
					)}
				>
					<PathHeader
						pathKey={layout.key}
						copy={copy}
						visibility={visibility}
					/>
					<ol className="flex flex-col gap-2">
						{layout.hops.map((hop, index) => {
							const broken = visibility.isBroken(hop)
							return (
								<li key={hop.id}>
									<Card
										size="sm"
										className={cn(
											"rounded-lg motion-safe:transition-opacity motion-safe:duration-300",
											hop.kind === "node" && "bg-node-hub ring-mesh/50",
											broken && "opacity-50",
										)}
									>
										<CardContent className="flex flex-col gap-2">
											<span className="flex items-center gap-2 text-sm font-medium">
												<span className="bg-muted text-muted-foreground flex size-6 shrink-0 items-center justify-center rounded-full text-xs">
													{index + 1}
												</span>
												{copy.hops[hop.id] ?? hop.id}
												{broken ? (
													<span className="sr-only">{copy.offlineTag}</span>
												) : null}
											</span>
											<HopChips hop={hop} copy={copy} wrap />
										</CardContent>
									</Card>
								</li>
							)
						})}
					</ol>
				</div>
			))}
		</div>
	)
}
