import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Tts() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🗣️ Voices With Soul</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Domia speaks with intention — and with its own voice. Using local
					Text-to-Speech engines like Piper or Coqui, each Domia can express
					itself with a natural-sounding voice tailored to its personality. From
					calm and poetic to sharp and playful, every tone helps convey emotion,
					memory, and mood. Voices can evolve, change, or be downloaded from the
					Marketplace — allowing you to give your Domia a distinct identity that
					grows over time. And best of all: it works entirely offline.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
