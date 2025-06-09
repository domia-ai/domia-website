import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Ambassadors() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🛡️ Ambassadors</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Our Ambassadors help share Domia with the world — organizing meetups,
					testing new features, translating content, or simply helping others
					join the movement. They’re not influencers. They’re catalysts.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
