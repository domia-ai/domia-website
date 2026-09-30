import type { BrowserFrameProps } from "./types"

const dots = ["one", "two", "three"]

export function BrowserFrame({ route, children }: BrowserFrameProps) {
	return (
		<div className="bg-card ring-foreground/10 overflow-hidden rounded-xl shadow-sm ring-1">
			<div className="bg-muted/60 border-border flex items-center gap-2 border-b px-3 py-2">
				<span aria-hidden className="flex gap-1.5">
					{dots.map((dot) => (
						<span
							key={dot}
							className="bg-foreground/20 block size-2.5 rounded-full"
						/>
					))}
				</span>
				<span className="bg-background text-muted-foreground mx-auto min-w-0 truncate rounded-md px-3 py-0.5 font-mono text-xs">
					{route}
				</span>
			</div>
			{children}
		</div>
	)
}
