import { Check, CircleOff, Zap } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

import { outcomeMinHeightClassName } from "./constants"
import type { ExampleCardProps } from "./types"

const outcomeRevealClassName =
	"motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300 motion-safe:fill-mode-both"

export function ExampleCard({ example, active, copy }: ExampleCardProps) {
	const exampleCopy = copy.examples[example.id]
	const bolt = active && example.fastPath

	return (
		<li data-example={example.id} data-outcome={active ? "on" : "off"}>
			<Card size="sm" className="h-full">
				<CardContent className="flex flex-col gap-2">
					<p className="text-sm font-medium text-balance">{exampleCopy.line}</p>
					<div className={outcomeMinHeightClassName}>
						<p
							key={active ? "on" : "off"}
							className={cn(
								"flex items-start gap-1.5 text-sm leading-5",
								active ? "text-foreground" : "text-muted-foreground",
								outcomeRevealClassName,
							)}
						>
							{bolt ? (
								<Zap
									aria-hidden="true"
									className="fill-fast-path stroke-fast-path mt-0.5 size-3.5 shrink-0"
								/>
							) : active ? (
								<Check
									aria-hidden="true"
									className="text-tool mt-0.5 size-3.5 shrink-0"
								/>
							) : (
								<CircleOff
									aria-hidden="true"
									className="mt-0.5 size-3.5 shrink-0"
								/>
							)}
							<span className="text-pretty">
								{active ? exampleCopy.on : exampleCopy.off}
							</span>
						</p>
					</div>
				</CardContent>
			</Card>
		</li>
	)
}
