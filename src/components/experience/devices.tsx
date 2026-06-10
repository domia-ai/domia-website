import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Devices() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🗺️ Your fleet, at a glance</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Open the Console and you see every Domia in your network at once —
					which room each one is in, whether it’s online, the persona it’s
					running, the engines it loaded for STT, LLM, TTS and wake word, its
					current Plutchik-8 mood, the MCP skills it has, and the last few
					conversations it handled. Each one keeps its own identity; you
					navigate them all from one screen.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
