import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { DemoLink } from "@/components/landing/demo-link"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Templates() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>📦 Capture a mind. Apply it anywhere.</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Templates make a Domia’s whole configuration portable. Build one from
					scratch, capture a live device’s setup — persona, mood, engines,
					models, modules — or clone and tweak an existing one. Then apply it to
					any Domia in the fleet with a click. Spent an evening tuning the
					perfect kitchen companion? Make it a template and your other spaces
					get it in seconds.
				</TypographyLarge>

				<DemoLink
					variant="inline"
					path="/templates"
					label="Browse the template gallery →"
				/>
			</CardContent>
		</Card>
	)
}
