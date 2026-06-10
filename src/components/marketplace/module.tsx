import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Module() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🧠 The Persona Behind Every Domia</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Every Domia is shaped by a local persona — its character, profession,
					emotional range, voice, and memory. When you install one, you’re not
					just loading settings. You’re giving a space its own identity: a way
					of thinking, feeling, and responding like no other. (Fine-tuned,
					learned personas are on the roadmap.)
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
