import { LinkButton } from "@/components/sections"
import { demoUrl } from "@/constants"

import type { ScreenDemoLinkProps } from "./types"

export function ScreenDemoLink({ screen, copy }: ScreenDemoLinkProps) {
	const live = screen.liveRoute !== false

	return (
		<div className="flex flex-wrap items-center gap-x-4 gap-y-2">
			<LinkButton href={live ? `${demoUrl}${screen.route}` : demoUrl} size="lg">
				{live ? copy.openScreen : copy.openHome}
			</LinkButton>
			<span className="text-muted-foreground text-sm">
				{live ? copy.caption : copy.notLiveYet}
			</span>
		</div>
	)
}
