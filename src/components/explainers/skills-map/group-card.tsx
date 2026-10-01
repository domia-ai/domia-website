import { PowerOff } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

import type { GroupCardProps } from "./types"

export function GroupCard({
	groupId,
	active,
	defaultOn,
	copy,
	className,
	children,
}: GroupCardProps) {
	const group = copy.groups[groupId]

	return (
		<Card
			data-group={groupId}
			data-active={active}
			className={cn(
				"h-full motion-safe:transition-colors motion-safe:duration-300",
				!active && "bg-muted/40 [&_svg]:opacity-50",
				className,
			)}
		>
			<CardHeader>
				<CardTitle className="flex flex-wrap items-center gap-2 text-balance">
					<h3 className="text-base leading-snug font-medium">{group.name}</h3>
					{active ? (
						<Badge
							variant="outline"
							className={cn(
								"font-normal",
								defaultOn
									? "text-tool border-tool/40"
									: "text-muted-foreground",
							)}
						>
							{defaultOn
								? copy.availability.fromStart
								: copy.availability.onceConnected}
						</Badge>
					) : (
						<Badge variant="secondary" className="gap-1">
							<PowerOff aria-hidden="true" />
							{copy.switchedOff}
						</Badge>
					)}
				</CardTitle>
				<CardDescription className="text-pretty">{group.blurb}</CardDescription>
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	)
}
