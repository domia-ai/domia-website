import { cn } from "@/lib/utils"

import type { SectionDensity, SectionProps, SectionTone } from "./types"

const toneClassName: Record<SectionTone, string> = {
	base: "bg-background",
	alt: "bg-section-alt",
	accent: "bg-primary/5",
}

const densityClassName: Record<SectionDensity, string> = {
	default: "py-16 md:py-24",
	compact: "py-10 md:py-12",
}

export function Section({
	id,
	tone = "base",
	density = "default",
	labelledBy,
	className,
	children,
}: SectionProps) {
	return (
		<section
			id={id}
			aria-labelledby={labelledBy}
			className={cn("w-full scroll-mt-32", toneClassName[tone], className)}
		>
			<div
				className={cn(
					"mx-auto w-full max-w-7xl px-4",
					densityClassName[density],
				)}
			>
				{children}
			</div>
		</section>
	)
}
