import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Rare() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🧬 30 Ultra-Rare, Handcrafted Domia’s</TypographyH2>
			</CardHeader>
			<CardContent>
				<TypographyLarge>
					Among the 10,000 Domia NFTs, only 30 are 1/1 ultra-rares. Each has a
					custom personality, hand-drawn identity, and backstory crafted by the
					creators. Ten will go to core contributors, ten to early investors,
					and ten will be sold at premium to fund key tech milestones.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
