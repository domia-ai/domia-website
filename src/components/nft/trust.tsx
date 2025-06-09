import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Trust() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🤝 Trust-First Commitment</TypographyH2>
			</CardHeader>
			<CardContent>
				<TypographyLarge>
					Every NFT minted helps us build Domia’s local-first infrastructure,
					including offline voice packs, QLoRA training tools, and multi-node
					synchronization. None of the funds go to hype or vanity — only to
					creating emotionally intelligent AI that respects your data, your
					space, and your values.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
