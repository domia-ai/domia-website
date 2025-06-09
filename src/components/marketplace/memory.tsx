import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Memory() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🌱 Memory Seeds</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Add a seed of memory to give your Domia a past. These emotional
					origins influence how it reacts, remembers, and evolves. Was it once a
					lighthouse keeper? A forgotten poet? A childhood companion? You decide
					what it remembers — and how it feels about it.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
