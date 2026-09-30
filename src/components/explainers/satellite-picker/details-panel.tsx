import { Badge } from "@/components/ui/badge"

import { onDeviceIcon, streamIcon } from "./icons"
import type { DetailsPanelProps } from "./types"

export function DetailsPanel({ protocol, copy, labels }: DetailsPanelProps) {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-1">
				<p className="text-mesh text-xs font-medium tracking-wide uppercase">
					{labels.heading}
				</p>
				<p className="text-base leading-snug font-medium text-balance">
					{copy.name}
				</p>
				<p className="text-muted-foreground text-xs leading-snug">
					{copy.connection}
				</p>
			</div>
			<div className="flex flex-col gap-1.5">
				<p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
					{labels.onDevice}
				</p>
				<ul className="flex flex-wrap gap-1.5">
					{protocol.onDevice.map((id, index) => {
						const Icon = onDeviceIcon(id)
						return (
							<li key={id}>
								<Badge
									variant="secondary"
									className="h-auto gap-1.5 py-1 whitespace-normal"
								>
									<Icon aria-hidden className="text-mesh" />
									{copy.onDevice[index]}
								</Badge>
							</li>
						)
					})}
				</ul>
			</div>
			<div className="flex flex-col gap-1.5">
				<p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
					{labels.streams}
				</p>
				<ul className="flex flex-wrap gap-1.5">
					{protocol.streams.map((id, index) => {
						const Icon = streamIcon(id)
						return (
							<li key={id}>
								<Badge
									variant="outline"
									className="h-auto gap-1.5 py-1 whitespace-normal"
								>
									<Icon aria-hidden className="text-audio" />
									{copy.streams[index]}
								</Badge>
							</li>
						)
					})}
				</ul>
			</div>
			<div className="flex flex-col gap-1.5">
				<p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
					{labels.caveats}
				</p>
				<ul className="text-muted-foreground flex flex-col gap-1 text-xs leading-snug">
					{protocol.caveats.map((id, index) => (
						<li key={id} className="flex gap-2">
							<span
								aria-hidden
								className="bg-mesh mt-1.5 size-1.5 shrink-0 rounded-full"
							/>
							<span>{copy.caveats[index]}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
