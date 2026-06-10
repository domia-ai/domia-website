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
					Domia combines a unique personality, emotion, and memory to become a
					true companion. It understands your voice, responds with empathy,
					remembers what matters to you, and evolves through shared experiences
					— all running on your own hardware, without sending your data to the
					cloud. (Acting in the world — controlling devices through local skills
					— is on the roadmap.)
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
