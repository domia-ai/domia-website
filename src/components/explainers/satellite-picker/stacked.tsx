"use client"

import { Server } from "lucide-react"

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"

import { DetailsPanel } from "./details-panel"
import { protocolIcons } from "./icons"
import { STACKED_MIN_HEIGHT } from "./layout"
import type { StackedProps } from "./types"

export function Stacked({
	data,
	copy,
	protocol,
	onProtocolChange,
}: StackedProps) {
	return (
		<div
			className="flex flex-col gap-4"
			style={{ minHeight: STACKED_MIN_HEIGHT }}
		>
			<Card size="sm" className="bg-node-hub ring-mesh/40">
				<CardContent className="flex items-start gap-3 px-4">
					<span
						aria-hidden
						className="bg-mesh text-background flex size-9 shrink-0 items-center justify-center rounded-full"
					>
						<Server className="size-5" />
					</span>
					<div className="flex flex-col gap-0.5">
						<p className="text-sm font-medium">{copy.hub.title}</p>
						<p className="text-muted-foreground text-xs leading-snug">
							{copy.hub.body} {copy.hub.hint.body}
						</p>
					</div>
				</CardContent>
			</Card>
			<p className="text-sm font-medium">{copy.chooseLabel}</p>
			<Accordion
				aria-label={copy.tabsLabel}
				multiple={false}
				value={[protocol]}
				onValueChange={(next) => {
					const opened = next.at(-1)
					if (opened !== undefined) onProtocolChange(opened)
				}}
				className="gap-2"
			>
				{data.protocols.map((item) => {
					const Icon = protocolIcons[item.id]
					const itemCopy = copy.protocols[item.id]
					return (
						<AccordionItem
							key={item.id}
							value={item.id}
							className="not-last:border-b-0"
						>
							<AccordionTrigger className="border-border bg-card text-muted-foreground aria-expanded:border-primary aria-expanded:bg-primary aria-expanded:text-primary-foreground [&[aria-expanded=true]_[data-slot=accordion-trigger-icon]]:text-primary-foreground items-center gap-3 rounded-xl px-3 py-3 hover:no-underline">
								<span
									aria-hidden
									className="bg-node-satellite text-mesh group-aria-expanded/accordion-trigger:bg-primary-foreground/15 group-aria-expanded/accordion-trigger:text-primary-foreground flex size-9 shrink-0 items-center justify-center rounded-lg"
								>
									<Icon className="size-5" />
								</span>
								<span className="flex min-w-0 flex-1 flex-col gap-0.5">
									<span className="text-foreground group-aria-expanded/accordion-trigger:text-primary-foreground text-sm leading-tight font-medium text-balance">
										{itemCopy.name}
									</span>
									<span className="sr-only">, </span>
									<span className="text-muted-foreground group-aria-expanded/accordion-trigger:text-primary-foreground/80 text-xs leading-snug font-normal">
										{itemCopy.device}
									</span>
								</span>
							</AccordionTrigger>
							<AccordionContent className="px-3 pt-3">
								<DetailsPanel
									protocol={item}
									copy={itemCopy}
									labels={copy.details}
								/>
							</AccordionContent>
						</AccordionItem>
					)
				})}
			</Accordion>
		</div>
	)
}
