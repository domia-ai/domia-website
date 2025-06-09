import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Nft() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🧬 Sync With Your NFT.</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					If you’re a Domia NFT holder, the app brings your collectible to life.
					Watch your NFT evolve visually, emotionally, and socially — becoming
					the face, voice, and soul of your Domia across devices.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
