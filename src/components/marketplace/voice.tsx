import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Voice() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🎙️ Voice Packs</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Choose from a wide range of locally compatible voices — calm,
					energetic, warm, witty, or anything in between. Each pack is crafted
					to match emotional tones, professions, and cultural nuances. Your
					Domia doesn’t just talk — it speaks like it means it.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
