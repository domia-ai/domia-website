"use client"

import { Server } from "lucide-react"

import { Hint } from "@/components/explainers/shared"

import { HUB_RECT } from "./layout"
import type { HubCardProps } from "./types"

export const HUB_HINT_ID = "satellite-hub"

export function HubCard({ copy }: HubCardProps) {
	return (
		<Hint
			id={HUB_HINT_ID}
			title={copy.hint.title}
			body={copy.hint.body}
			side="bottom"
			render={
				<button
					type="button"
					style={{
						left: HUB_RECT.x,
						top: HUB_RECT.y,
						width: HUB_RECT.width,
						height: HUB_RECT.height,
					}}
				/>
			}
			className="bg-node-hub ring-mesh/40 focus-visible:ring-ring absolute flex flex-col items-center justify-center gap-3 rounded-2xl px-5 text-center ring-1 outline-none focus-visible:ring-2"
		>
			<span
				aria-hidden
				className="bg-mesh text-background animate-domia-pulse flex size-12 items-center justify-center rounded-full"
			>
				<Server className="size-6" />
			</span>
			<span className="text-sm font-medium text-balance">{copy.title}</span>
			<span className="text-muted-foreground text-xs leading-snug text-balance">
				{copy.body}
			</span>
		</Hint>
	)
}
