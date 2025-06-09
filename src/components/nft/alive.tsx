import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Alive() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🎨 Designed to Be Alive</TypographyH2>
			</CardHeader>
			<CardContent>
				<TypographyLarge>
					Every Domia NFT contains the blueprint of a unique mind. With a
					personality profile, memory seed, and aesthetic identity, it’s ready
					to be activated in your local Domia system. You’re not collecting
					images — you’re collecting companions.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
