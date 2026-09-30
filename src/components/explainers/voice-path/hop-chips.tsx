import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

import { hopItemLabel } from "./layout"
import type { HopChipsProps } from "./types"

const nodeChipClassName: Record<string, string> = {
	wake: "border-audio/60 text-audio",
	stt: "border-speech/60 text-speech",
	routing: "border-fast-path/60 text-fast-path",
	llm: "border-model/60 text-model",
	tts: "border-speech/60 text-speech",
	memory: "border-memory/60 text-memory",
}

const chipClassName = (hop: HopChipsProps["hop"], item: string) =>
	hop.kind === "node"
		? (nodeChipClassName[item] ?? "border-border text-foreground")
		: "border-border text-muted-foreground"

export function HopChips({ hop, copy, className, wrap }: HopChipsProps) {
	if (!hop.stores?.length) return null

	return (
		<ul className={cn("flex flex-wrap gap-1.5", className)}>
			{hop.stores.map((item) => (
				<Badge
					key={item}
					variant="outline"
					render={<li />}
					className={cn(
						"bg-background/70",
						wrap && "h-auto whitespace-normal",
						chipClassName(hop, item),
					)}
				>
					{hopItemLabel(hop, item, copy.vendorItems, copy.nodeItems)}
				</Badge>
			))}
		</ul>
	)
}
