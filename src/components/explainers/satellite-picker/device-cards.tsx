"use client"

import { TabsList, TabsTrigger } from "@/components/ui/tabs"

import { protocolIcons } from "./icons"
import {
	DEVICE_CARD_GAP,
	DEVICE_CARD_HEIGHT,
	DEVICE_COLUMN_WIDTH,
	deviceColumnTop,
	deviceLabelTop,
} from "./layout"
import type { DeviceCardsProps } from "./types"

export function DeviceCards({ protocols, copy }: DeviceCardsProps) {
	return (
		<>
			<p
				className="absolute left-0 text-sm font-medium"
				style={{ top: deviceLabelTop(protocols.length) }}
			>
				{copy.chooseLabel}
			</p>
			<TabsList
				aria-label={copy.tabsLabel}
				className="text-foreground absolute left-0 flex w-auto flex-col items-stretch justify-start rounded-none bg-transparent p-0"
				style={{
					top: deviceColumnTop(protocols.length),
					width: DEVICE_COLUMN_WIDTH,
					gap: DEVICE_CARD_GAP,
				}}
			>
				{protocols.map((protocol) => {
					const Icon = protocolIcons[protocol.id]
					const item = copy.protocols[protocol.id]
					return (
						<TabsTrigger
							key={protocol.id}
							value={protocol.id}
							variant="solid"
							className="group/device border-border bg-card text-muted-foreground hover:text-foreground h-auto flex-none items-center justify-start gap-3 rounded-xl px-4 py-3 text-left whitespace-normal after:hidden"
							style={{ height: DEVICE_CARD_HEIGHT }}
						>
							<span
								aria-hidden
								className="bg-node-hub text-mesh group-data-active/device:bg-primary-foreground/15 group-data-active/device:text-primary-foreground flex size-9 shrink-0 items-center justify-center rounded-lg"
							>
								<Icon className="size-5" />
							</span>
							<span className="flex min-w-0 flex-col gap-0.5">
								<span className="text-foreground group-data-active/device:text-primary-foreground text-sm leading-tight font-medium text-balance">
									{item.name}
								</span>
								<span className="sr-only">, </span>
								<span className="text-muted-foreground group-data-active/device:text-primary-foreground/80 text-xs leading-snug">
									{item.device}
								</span>
							</span>
						</TabsTrigger>
					)
				})}
			</TabsList>
		</>
	)
}
