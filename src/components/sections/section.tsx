import { cn } from "@/lib/utils"

import type { SectionProps, SectionTone } from "./types"

const toneClassName: Record<SectionTone, string> = {
	base: "bg-background",
	alt: "bg-section-alt",
	accent: "bg-primary/5",
}

export function Section({
	id,
	tone = "base",
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
			<div className="mx-auto w-full max-w-7xl px-4 py-16 md:py-24">
				{children}
			</div>
		</section>
	)
}
