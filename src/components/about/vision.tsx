import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Vision() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🌍 Our Vision</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Domia is just the beginning. We envision a world where every space is
					enhanced by intelligent companions that understand mood, respect
					boundaries, and evolve with you — running on hardware you own, in a
					network you control. From solo living to family life, from a single
					room to a whole property — Domia becomes who you need, wherever you
					are.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
