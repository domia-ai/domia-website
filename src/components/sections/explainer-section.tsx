import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

import { Section } from "./section"
import type { ExplainerSectionProps } from "./types"

export function ExplainerSection({
	id,
	title,
	intro,
	reservedHeight,
	tone,
	children,
}: ExplainerSectionProps) {
	const titleId = `${id}-title`

	return (
		<Section id={id} tone={tone} labelledBy={titleId}>
			<div className="flex flex-col gap-10">
				<div className="flex max-w-3xl flex-col gap-4">
					<TypographyH2 id={titleId}>{title}</TypographyH2>
					{intro ? (
						<TypographyLarge className="text-muted-foreground">
							{intro}
						</TypographyLarge>
					) : null}
				</div>
				<div
					style={
						reservedHeight === undefined
							? undefined
							: { minHeight: reservedHeight }
					}
				>
					{children}
				</div>
			</div>
		</Section>
	)
}
