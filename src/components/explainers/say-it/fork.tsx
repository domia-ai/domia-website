"use client"

import { Brain, Zap } from "lucide-react"

import { useReducedMotion } from "@/components/explainers/shared"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

import {
	SAY_IT_FORK_DOT_MS,
	SAY_IT_FORK_MIN_HEIGHT,
	SAY_IT_FORK_VIEWBOX,
} from "./constants"
import { forkOutcomeOf } from "./summary"
import type {
	SayItBranchCardProps,
	SayItForkBranch,
	SayItForkProps,
} from "./types"

const { width, height } = SAY_IT_FORK_VIEWBOX
const branchX: Record<SayItForkBranch, number> = {
	yes: width / 4,
	no: (width * 3) / 4,
}
const branchPath = (branch: SayItForkBranch) =>
	`M${width / 2} 0 C${width / 2} ${height * 0.65} ${branchX[branch]} ${height * 0.35} ${branchX[branch]} ${height}`

const branchIcon: Record<SayItForkBranch, typeof Zap> = {
	yes: Zap,
	no: Brain,
}

const activeCardClassName: Record<SayItForkBranch, string> = {
	yes: "ring-fast-path/50 bg-fast-path/10",
	no: "ring-model/50 bg-model/10",
}

const labelClassName: Record<SayItForkBranch, string> = {
	yes: "bg-fast-path text-background",
	no: "bg-model text-background",
}

const strokeClassName: Record<SayItForkBranch, string> = {
	yes: "stroke-fast-path",
	no: "stroke-model",
}

const fillClassName: Record<SayItForkBranch, string> = {
	yes: "fill-fast-path",
	no: "fill-model",
}

const enterClassName =
	"motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-1 motion-safe:fill-mode-both motion-safe:duration-300"

function BranchCard({
	branch,
	active,
	copy,
	outcome,
	run,
}: SayItBranchCardProps) {
	const Icon = branchIcon[branch]
	const text = copy.branches[branch]

	return (
		<Card
			aria-current={active ? "true" : undefined}
			className={cn(
				"min-h-40 motion-safe:transition-[opacity,box-shadow,background-color] motion-safe:duration-300",
				active ? activeCardClassName[branch] : "opacity-60",
			)}
		>
			<CardContent className="flex flex-1 flex-col gap-2">
				<div className="flex items-center gap-2">
					<Badge
						className={cn("font-semibold uppercase", labelClassName[branch])}
					>
						{text.label}
					</Badge>
					<Icon className="text-muted-foreground size-4" aria-hidden="true" />
				</div>
				<p className="text-base font-medium text-pretty">{text.title}</p>
				<p className="text-muted-foreground text-sm text-pretty">{text.hint}</p>
				{outcome ? (
					<div
						key={run}
						className={cn(
							"mt-auto flex flex-col gap-1 border-t pt-2 text-sm motion-safe:[animation-delay:var(--dot-ms)]",
							enterClassName,
						)}
					>
						<p className="text-pretty">{outcome.text}</p>
						{outcome.note ? (
							<p className="text-muted-foreground text-xs text-pretty">
								{outcome.note}
							</p>
						) : null}
					</div>
				) : null}
			</CardContent>
		</Card>
	)
}

export function SayItFork({
	copy,
	locale,
	text,
	verdict,
	run,
}: SayItForkProps) {
	const reduced = useReducedMotion()
	const outcome = forkOutcomeOf(verdict, copy, locale)
	const active = outcome.branch

	return (
		<div
			className="flex min-w-0 flex-col gap-4"
			style={
				{
					minHeight: SAY_IT_FORK_MIN_HEIGHT,
					"--dot-ms": `${SAY_IT_FORK_DOT_MS}ms`,
				} as React.CSSProperties
			}
		>
			<div
				role="figure"
				aria-label={copy.fork.label}
				className="flex w-full flex-col items-center"
			>
				<p
					key={`${run}-request`}
					className={cn(
						"bg-primary text-primary-foreground max-w-full rounded-2xl rounded-br-sm px-3.5 py-2 text-sm text-pretty",
						enterClassName,
					)}
				>
					{text}
				</p>
				<div aria-hidden="true" className="bg-border h-5 w-px" />
				<Badge
					variant="outline"
					render={<p />}
					className="bg-card h-auto rounded-xl px-4 py-2 text-sm font-medium whitespace-normal shadow-sm"
				>
					{copy.fork.question}
				</Badge>
				<svg
					key={`${run}-fork`}
					viewBox={`0 0 ${width} ${height}`}
					aria-hidden="true"
					className="hidden h-auto w-full max-w-2xl sm:block"
				>
					{(["yes", "no"] as const).map((branch) => (
						<path
							key={branch}
							d={branchPath(branch)}
							vectorEffect="non-scaling-stroke"
							className={cn(
								"fill-none stroke-2",
								branch === active ? strokeClassName[branch] : "stroke-border",
							)}
						/>
					))}
					{reduced ? null : (
						<circle r="5" className={fillClassName[active]}>
							<animateMotion
								dur={`${SAY_IT_FORK_DOT_MS}ms`}
								fill="freeze"
								path={branchPath(active)}
							/>
						</circle>
					)}
				</svg>
				<div aria-hidden="true" className="bg-border h-5 w-px sm:hidden" />
				<p className="sr-only" aria-live="polite">
					{copy.branches[active].label}: {outcome.text}
					{outcome.note ? ` ${outcome.note}` : ""}
				</p>
				<div className="grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
					{(["yes", "no"] as const).map((branch) => (
						<BranchCard
							key={branch}
							branch={branch}
							active={branch === active}
							copy={copy}
							outcome={branch === active ? outcome : null}
							run={run}
						/>
					))}
				</div>
			</div>
			<p className="text-muted-foreground text-sm text-balance">
				{copy.templatesNote}
			</p>
		</div>
	)
}
