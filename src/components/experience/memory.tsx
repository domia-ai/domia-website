import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Memory() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🗂️ Memory Timeline</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Navigate through a timeline of significant events, emotional shifts,
					and key conversations. Domia’s memory interface shows not only what
					happened, but how it felt — making reflection a meaningful experience.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
