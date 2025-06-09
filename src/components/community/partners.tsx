import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Partners() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🤝 Partners & Integrators</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					From smart hardware brands to schools and health centers — Domia
					partners with ethical organizations looking to embed local AI with
					emotional depth. Let’s build something lasting, together.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
