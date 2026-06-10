import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Contributors() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🧑‍💻 Contributors</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Developers, researchers, writers, designers and tinkerers are all
					welcome. Whether you’re building personas and skills, designing
					voices, creating tools, or improving the core — Domia is open by
					design. Every contribution matters and is credited.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
