import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Open() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🧵 Open Discussions, Always</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Whether it’s ethics, identity, memory, or governance — no topic is
					off-limits. From internal emotions to public applications, Domia’s
					community has an open invitation to shape the ecosystem’s direction
					through conversation and collaboration.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
