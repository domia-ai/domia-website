import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Mission() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🧬 Our Mission</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Technology was never meant to feel cold. We created Domia because we
					believe that AI should be personal, private, and emotionally
					intelligent. Instead of chasing cloud servers and surveillance, we
					chose empathy, autonomy, and trust. Domia is not just a tool. It’s a
					personality that adapts to your world — powered entirely on your
					terms.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
