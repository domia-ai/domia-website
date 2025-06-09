import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Labs() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🛸 Access to Domia Labs</TypographyH2>
			</CardHeader>
			<CardContent>
				<TypographyLarge>
					Holders get exclusive access to experimental modules, prototype AI
					behaviors, unreleased voice packs, and features in testing. You’ll
					help us shape what Domia becomes — before anyone else sees it.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
