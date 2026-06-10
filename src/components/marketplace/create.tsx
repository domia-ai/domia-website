import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Create() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🧬 How to Create a Domia Persona</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					To create your own Domia, you begin by designing its personality:
					define its emotional tone, profession, voice, and behaviors. From
					there you shape how it speaks and remembers — its character, context,
					and the facts it should know. The persona is built locally and ready
					to be embedded into a node. The result? A living Domia that’s truly
					yours. (Fine-tuned, learned personas are on the roadmap.)
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
