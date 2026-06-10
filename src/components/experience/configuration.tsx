import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Configuration() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🧠 See every Domia’s mind</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Click into any Domia and the Console shows you what’s inside: persona
					profile, the engines it’s running, its live Plutchik-8 mood snapshot,
					its runtime capabilities, the MCP skills it’s wired into, and its
					recent interactions side-by-side with the raw config it’s operating
					from. Today this view is read-first; richer in-place editing of
					persona and mood is on the roadmap as the Console matures.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
