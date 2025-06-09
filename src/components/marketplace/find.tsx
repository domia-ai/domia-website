import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Find() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🧑‍🤝‍🧑 What You’ll Find</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					The Domia Marketplace is your gateway to living intelligences. Every
					listing is more than a preset — it’s a complete Domia with
					personality, emotional depth, a chosen profession, and lived behavior.
					Whether you’re seeking a curious lab assistant, a calm sleep
					companion, or a poetic gardener, you’ll find minds ready to become
					part of your world.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
