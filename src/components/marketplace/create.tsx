import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Create() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🧬 How to Create a QLoRA Domia</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					To create your own Domia, you begin by designing its personality:
					define its emotional tone, profession, voice, and behaviors. From
					there, you generate a dataset — questions, answers, interactions, and
					edge cases — that reflect how this Domia should think and feel. With
					that, a custom QLoRA module is trained locally or in a secure
					environment, ready to be embedded into a node. The result? A living
					Domia that’s truly yours.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
