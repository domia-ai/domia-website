import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Backers() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🏛️ Backers, Not Buyers</TypographyH2>
			</CardHeader>
			<CardContent>
				<TypographyLarge>
					By minting a Domia NFT, you’re not just acquiring access — you’re
					becoming part of the founding force behind a new kind of AI:
					emotional, local-first, and truly yours. You’re funding independence
					from the cloud, championing ethical AI, and giving power back to
					users.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
