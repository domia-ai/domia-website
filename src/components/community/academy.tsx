import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Academy() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🎓 Domia Academy </TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					We’re building a learning space for those who want to master Domia —
					from configuring nodes and customizing voices to training emotional
					modules. Tutorials, live sessions, and community-led workshops will
					help beginners and experts grow together.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
