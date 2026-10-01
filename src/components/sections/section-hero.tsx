import { cn } from "@/lib/utils"
import {
	TypographyH1,
	TypographyLarge,
	TypographyXLarge,
} from "@/components/ui/typography"

import type { SectionHeroProps } from "./types"

export function SectionHero({
	eyebrow,
	title,
	subtitle,
	actions,
	art,
	artPosition = "right",
	below,
	halo = true,
	className,
}: SectionHeroProps) {
	const stacked = artPosition === "below"

	return (
		<div
			className={cn(
				"mx-auto flex w-full max-w-7xl flex-col gap-12 overflow-x-clip px-4 py-16 md:py-24",
				className,
			)}
		>
			<div
				className={cn(
					"flex w-full flex-col gap-10",
					stacked ? "items-center" : "lg:flex-row lg:items-center",
				)}
			>
				<div
					className={cn(
						"flex flex-1 flex-col items-center gap-6 text-center",
						stacked ? "max-w-3xl" : "lg:items-start lg:text-left",
					)}
				>
					{eyebrow ? (
						<TypographyLarge className="text-primary font-semibold tracking-wide uppercase">
							{eyebrow}
						</TypographyLarge>
					) : null}
					<TypographyH1 className="leading-tight">{title}</TypographyH1>
					<TypographyXLarge className="text-muted-foreground max-w-xl">
						{subtitle}
					</TypographyXLarge>
					{actions ? (
						<div
							className={cn(
								"flex flex-wrap items-center justify-center gap-3",
								!stacked && "lg:justify-start",
							)}
						>
							{actions}
						</div>
					) : null}
				</div>
				{art ? (
					<div
						className={cn(
							"flex flex-1 items-center justify-center",
							stacked && "w-full",
						)}
					>
						<div className={cn("relative", stacked && "w-full")}>
							{halo ? (
								<div className="from-halo-from via-halo-via to-halo-to animate-halo absolute inset-0 z-0 rounded-full bg-radial-[at_50%_75%] to-90% blur-2xl" />
							) : null}
							<div className={cn("relative z-10", stacked && "w-full")}>
								{art}
							</div>
						</div>
					</div>
				) : null}
			</div>
			{below ? <div className="w-full min-w-0">{below}</div> : null}
		</div>
	)
}
