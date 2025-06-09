import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Profile() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🧩 How It Works</TypographyH2>
			</CardHeader>
			<CardContent>
				<TypographyLarge>
					After minting, you can choose to activate your Domia in your local
					node. Each NFT includes a ready-to-use profile, and some also come
					with an optional QLoRA module that tailors its responses to its
					backstory and role. Prefer to keep it dormant as a collectible? That
					works too.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
