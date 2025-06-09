import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Build() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>⏳ Built Before Minted</TypographyH2>
			</CardHeader>
			<CardContent>
				<TypographyLarge>
					No promises. Just progress. We’re not launching the NFT collection
					until a working MVP of Domia Core is live. This isn’t just a vision —
					it’s a functioning local-first AI system already taking shape. Our
					commitment is to ship real value before asking for yours. Domia is
					being built with care, transparency, and tangible results — not hype.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
