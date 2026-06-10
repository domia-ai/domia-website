import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Stt() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🎙️ It Starts With Listening</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Domia begins by listening — but not just for words. Using streaming
					on-device speech recognition, each Domia node transcribes your voice
					into text without sending anything to the cloud. No cloud audio. Low
					latency. No leaks. The speech model is swappable and sized to the
					device. With local wake-word and voice-activity detection, Domia is
					always attentive, never invasive — ready to respond when you need it,
					and silent when you don’t.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
