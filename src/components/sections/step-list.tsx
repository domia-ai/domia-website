import { cn } from "@/lib/utils"
import { TypographyH3, TypographyP } from "@/components/ui/typography"

import type { StepColor, StepListProps, StepProps } from "./types"

const colorClassName: Record<StepColor, string> = {
	audio: "border-audio/50 bg-audio/10",
	speech: "border-speech/50 bg-speech/10",
	model: "border-model/50 bg-model/10",
	"fast-path": "border-fast-path/50 bg-fast-path/10",
	tool: "border-tool/50 bg-tool/10",
	memory: "border-memory/50 bg-memory/10",
}

const badgeClassName = (color?: StepColor) =>
	color ? colorClassName[color] : "border-primary/50 bg-primary/10"

function Step({ step, index }: StepProps) {
	return (
		<li className="group/step relative flex gap-4 md:flex-col md:gap-5">
			<div className="flex shrink-0 flex-col items-center md:flex-row">
				<span
					className={cn(
						"text-foreground flex size-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold",
						badgeClassName(step.color),
					)}
					aria-hidden="true"
				>
					{index + 1}
				</span>
				<span className="bg-border mt-2 h-full w-px group-last/step:hidden md:mt-0 md:ml-2 md:h-px md:w-full" />
			</div>
			<div className="flex flex-col gap-2 pb-8 md:pr-6 md:pb-0">
				<TypographyH3 className="text-xl">{step.title}</TypographyH3>
				<TypographyP className="text-muted-foreground">{step.body}</TypographyP>
			</div>
		</li>
	)
}

export function StepList({ steps }: StepListProps) {
	return (
		<ol className="grid list-none grid-cols-1 md:auto-cols-fr md:grid-flow-col md:gap-4">
			{steps.map((step, index) => (
				<Step key={step.id} step={step} index={index} />
			))}
		</ol>
	)
}
