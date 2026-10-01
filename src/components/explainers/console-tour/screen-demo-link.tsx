import { DemoLink } from "@/components/landing/demo-link"

import type { ScreenDemoLinkProps } from "./types"

export function ScreenDemoLink({ screen, copy }: ScreenDemoLinkProps) {
	return (
		<div className="flex flex-wrap items-center gap-x-4 gap-y-2">
			<DemoLink path={screen.route} label={copy.openScreen} />
			<span className="text-muted-foreground text-sm">{copy.caption}</span>
		</div>
	)
}
