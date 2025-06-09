import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Cultural() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🌍 Cultural Packs</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Infuse your Domia with cultural knowledge and behavior. From idiomatic
					expressions to social norms and humor, each pack tunes your Domia to
					live like someone from a specific region or heritage. Perfect for
					bilingual homes or culturally rich interactions.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
