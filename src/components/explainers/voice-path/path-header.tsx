import { WifiOff } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

import type { PathHeaderProps } from "./types"

export function PathHeader({
	pathKey,
	copy,
	visibility,
	className,
	style,
}: PathHeaderProps) {
	return (
		<div
			style={style}
			className={cn(
				"flex flex-wrap items-center justify-between gap-x-4 gap-y-1",
				className,
			)}
		>
			<span className="text-2xl font-semibold tracking-tight">
				{copy.paths[pathKey]}
			</span>
			{pathKey === "cloud" ? (
				<span
					aria-hidden={!visibility.offline}
					className={cn(
						"flex flex-wrap items-center gap-2 motion-safe:transition-opacity motion-safe:duration-300",
						!visibility.offline && "opacity-0",
					)}
				>
					<Badge variant="destructive">
						<WifiOff data-icon="inline-start" />
						{copy.offlineTag}
					</Badge>
					<span className="text-muted-foreground text-sm">
						{copy.offlineNote}
					</span>
				</span>
			) : (
				<span className="text-mesh text-xs font-medium tracking-wide uppercase">
					{copy.networkLabel}
				</span>
			)}
		</div>
	)
}
