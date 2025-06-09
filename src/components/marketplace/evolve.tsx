import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Evolve() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🌱 Built to Evolve</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Marketplace Domia’s are designed to learn. Over time, they build
					emotional memories, adjust behaviors, and reshape their identities
					based on how you interact with them. What starts as a cheerful fitness
					coach may become a reflective life advisor — because Domia grows with
					you.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
