import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Hardware() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>📦 Limited Edition Hardware Drops</TypographyH2>
			</CardHeader>
			<CardContent>
				<TypographyLarge>
					From custom-designed voice hubs to portable nodes, NFT holders get
					early and discounted access to limited-run Domia hardware. These
					editions include aesthetic matching, preloaded voices, and collectible
					casing.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
