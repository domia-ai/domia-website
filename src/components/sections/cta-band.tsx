import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

import { LinkButton } from "./link-button"
import { Section } from "./section"
import type { CtaBandProps } from "./types"

export function CtaBand({ title, subtitle, primary, secondary }: CtaBandProps) {
	return (
		<Section tone="accent">
			<div className="flex flex-col items-center gap-6 text-center">
				<TypographyH2>{title}</TypographyH2>
				{subtitle ? (
					<TypographyLarge className="text-muted-foreground max-w-2xl">
						{subtitle}
					</TypographyLarge>
				) : null}
				<div className="flex flex-wrap items-center justify-center gap-3">
					<LinkButton href={primary.href} size="lg">
						{primary.label}
					</LinkButton>
					{secondary ? (
						<LinkButton href={secondary.href} size="lg" variant="outline">
							{secondary.label}
						</LinkButton>
					) : null}
				</div>
			</div>
		</Section>
	)
}
