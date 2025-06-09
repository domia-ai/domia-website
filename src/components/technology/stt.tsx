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
					Domia begins by listening — but not just for words. Using offline
					voice recognition engines like Whisper or Vosk, each Domia node can
					transcribe your voice into text without sending anything to the cloud.
					It detects your tone, rhythm, and even ambient noise to build context.
					No internet. No latency. No leaks. With multi-language support and
					local wake-word detection, Domia is always attentive, never invasive —
					ready to respond when you need it, and silent when you don’t.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
