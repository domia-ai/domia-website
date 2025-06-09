import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Vision() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🎯 Long-Term Vision. Real Utility.</TypographyH2>
			</CardHeader>
			<CardContent>
				<TypographyLarge>
					The Domia NFT is designed for use, not speculation. Its utility
					compounds over time — as the ecosystem grows, your Domia grows with
					it. We’re building for a future where AI lives with you, not on a
					server farm.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
