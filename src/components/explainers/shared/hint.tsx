"use client"

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"

import { HINT_DELAY_MS } from "./constants"
import type { HintIndexProps, HintProps, HintProviderProps } from "./types"

const hintDomId = (id: string) => `hint-${id}`

export function HintProvider({ children }: HintProviderProps) {
	return <TooltipProvider delay={HINT_DELAY_MS}>{children}</TooltipProvider>
}

export function Hint({
	id,
	title,
	body,
	side = "top",
	className,
	render,
	children,
}: HintProps) {
	return (
		<Tooltip>
			<TooltipTrigger
				render={render ?? <button type="button" />}
				className={className}
				aria-describedby={hintDomId(id)}
			>
				{children}
			</TooltipTrigger>
			<TooltipContent side={side} className="flex-col items-start gap-0.5">
				<span className="font-medium">{title}</span>
				<span>{body}</span>
			</TooltipContent>
		</Tooltip>
	)
}

export function HintIndex({ heading, items }: HintIndexProps) {
	return (
		<dl className="sr-only" aria-label={heading}>
			{items.map((item) => (
				<div key={item.id}>
					<dt>{item.title}</dt>
					<dd id={hintDomId(item.id)}>{item.body}</dd>
				</div>
			))}
		</dl>
	)
}
