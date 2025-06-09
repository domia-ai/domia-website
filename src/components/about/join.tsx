import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Join() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🧑‍💻 Join the Mission</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Be Part of the Evolution, Whether you’re a developer, a designer, or
					simply a dreamer, Domia is open to your energy. Help shape how
					emotional AI grows and integrates into real-world environments.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
