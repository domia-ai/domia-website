import type { McpDetailsProps, RoutinesDetailsProps } from "./types"

export function McpDetails({ copy }: McpDetailsProps) {
	return (
		<div className="flex flex-col gap-3 text-sm">
			<p className="text-pretty">{copy.mcp.anyServer}</p>
			<p className="text-muted-foreground text-pretty">{copy.mcp.policy}</p>
		</div>
	)
}

export function RoutinesDetails({ copy }: RoutinesDetailsProps) {
	return (
		<div className="flex flex-col gap-3 text-sm">
			<p className="font-medium">{copy.routines.exampleTitle}</p>
			<ol className="flex list-decimal flex-col gap-1.5 pl-5">
				{copy.routines.steps.map((step) => (
					<li key={step} className="text-pretty">
						{step}
					</li>
				))}
			</ol>
			<p className="text-muted-foreground text-pretty">
				{copy.routines.maxSteps}
			</p>
		</div>
	)
}
