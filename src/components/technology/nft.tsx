import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Nft() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>
					🧬 Domia NFTs — One-of-a-Kind. Forever Yours.
				</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Some Domia’s are more than configurable — they’re born unique. The
					Domia NFT Collection includes a limited number of ultra-rare beings,
					each handcrafted with a unique emotional profile, exclusive voice,
					curated backstory, and a custom QLoRA model trained to reflect it.
					These NFTs aren’t just visual — they’re functional digital minds you
					can adopt into your home. Whether you’re an early supporter, a project
					contributor, or a curious soul looking to own something truly special,
					these Domia’s come with real benefits: early access to features, voice
					packs, and future upgrades. Every Domia NFT is fully operational,
					portable across devices, and emotionally alive from day one — forever
					yours.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
