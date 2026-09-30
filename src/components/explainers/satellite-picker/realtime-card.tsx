import { AppWindow } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

import type { RealtimeCardProps } from "./types"

export function RealtimeCard({ copy }: RealtimeCardProps) {
	return (
		<Card size="sm" className="max-w-3xl">
			<CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center">
				<span
					aria-hidden
					className="bg-node-satellite text-mesh flex size-9 shrink-0 items-center justify-center rounded-lg"
				>
					<AppWindow className="size-5" />
				</span>
				<div className="flex min-w-0 flex-1 flex-col gap-0.5">
					<p className="text-sm leading-snug font-medium text-balance">
						{copy.title}
					</p>
					<p className="text-muted-foreground text-xs leading-snug">
						{copy.body}
					</p>
				</div>
			</CardContent>
		</Card>
	)
}
