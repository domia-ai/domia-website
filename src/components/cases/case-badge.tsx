import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { caseBadgeClassName, caseBadgeIcons } from "@/constants/pages"

import type { CaseBadgeProps } from "./types"

export function CaseBadge({ id, label }: CaseBadgeProps) {
	const Icon = caseBadgeIcons[id]

	return (
		<Badge
			variant="outline"
			className={cn("h-6 px-2.5", caseBadgeClassName[id])}
		>
			<Icon aria-hidden="true" data-icon="inline-start" />
			{label}
		</Badge>
	)
}
