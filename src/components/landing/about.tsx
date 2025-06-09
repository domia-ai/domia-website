import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function About() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🧬 What is Domia?</TypographyH2>
			</CardHeader>
			<CardContent>
				<TypographyLarge>
					Domia combines emotional intelligence, real-world awareness, and
					unique personality to become a true companion. It understands your
					voice, responds with empathy, controls your smart home, and evolves
					through shared experiences — all without sending your data to the
					cloud.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
