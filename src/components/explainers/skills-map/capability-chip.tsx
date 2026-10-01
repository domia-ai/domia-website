"use client"

import { Zap } from "lucide-react"

import { Badge, badgeVariants } from "@/components/ui/badge"
import type { ToolPolicy } from "@/data/types"
import { cn } from "@/lib/utils"

import { Hint } from "@/components/explainers/shared"
import type { CapabilityChipProps } from "./types"

const policyClassName: Record<Exclude<ToolPolicy, "allow">, string> = {
	confirm: "bg-fast-path/15 text-fast-path-text",
	block: "bg-destructive/10 text-destructive",
}

const chipClassName = cn(
	badgeVariants({ variant: "outline" }),
	"bg-background h-auto min-h-8 gap-1.5 rounded-lg px-2.5 py-1 text-sm font-normal whitespace-normal",
)

export function CapabilityChip({ capability, copy }: CapabilityChipProps) {
	const content = (
		<>
			<span>{capability.label}</span>
			{capability.hidden ? (
				<span className="sr-only">{copy.hiddenLabel}</span>
			) : null}
			{capability.fastPath ? (
				<>
					<Zap
						aria-hidden="true"
						className="fill-fast-path stroke-fast-path size-3.5 shrink-0"
					/>
					<span className="sr-only">{copy.fastPathLabel}</span>
				</>
			) : null}
			{capability.policy === "allow" ? null : (
				<Badge
					variant="outline"
					className={cn(
						"h-4 border-transparent px-1.5",
						policyClassName[capability.policy],
					)}
				>
					{copy.policy[capability.policy]}
				</Badge>
			)}
		</>
	)

	return (
		<li>
			{capability.hidden ? (
				<Hint
					id="hidden"
					title={copy.hidden.title}
					body={copy.hidden.body}
					className={cn(chipClassName, "text-muted-foreground border-dashed")}
				>
					{content}
				</Hint>
			) : (
				<span className={chipClassName}>{content}</span>
			)}
		</li>
	)
}
