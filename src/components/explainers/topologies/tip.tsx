"use client"

import { createContext, useContext } from "react"

import { Hint } from "@/components/explainers/shared"
import { cn } from "@/lib/utils"

import type { HintsContextValue, TipProps } from "./types"

export const HintsContext = createContext<HintsContextValue>(null)

export function Tip({ hint, side, className, children }: TipProps) {
	const hints = useContext(HintsContext)
	if (!hints) return <span className={className}>{children}</span>
	const item = hints[hint]
	return (
		<Hint
			id={item.id}
			title={item.title}
			body={item.body}
			side={side}
			className={cn(
				"focus-visible:outline-ring cursor-default text-left focus-visible:outline-2 focus-visible:outline-offset-2",
				className,
			)}
		>
			{children}
		</Hint>
	)
}
