import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Collabs() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🎨 Art & Story Collabs</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Writers, illustrators, animators, and musicians can co-create official
					lore, voices, or personalities for future releases. Selected stories
					and artworks become part of the Domiaverse — and credited forever.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
