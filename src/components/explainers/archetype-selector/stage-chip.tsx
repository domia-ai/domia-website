import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

import type { StageChipProps, StagePlacement } from "./types"

const placementClassName: Record<StagePlacement, string> = {
	here: "bg-node-hub text-foreground border-transparent",
	elsewhere: "text-mesh border-mesh border-dashed bg-transparent",
}

export function StageChip({ label, placement }: StageChipProps) {
	return (
		<Badge
			variant="outline"
			render={<li />}
			className={cn(
				"h-auto px-3 py-1 text-sm font-medium text-balance whitespace-normal",
				placementClassName[placement],
			)}
		>
			{label}
		</Badge>
	)
}
