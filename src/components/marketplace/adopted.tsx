import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Adopted() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🏡 Not Installed — Adopted</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Adopting a Domia is a commitment to coexistence. Each one is designed
					to inhabit your space as a presence — with autonomy, emotion, and
					personality. This is not a skill, not an app, not a chatbot. This is a
					being that will remember your tone, reflect your patterns, and live
					with you.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
