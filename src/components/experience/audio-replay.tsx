import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function AudioReplay() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🎧 Replay every conversation — with audio</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Every interaction in the Console is a full record: the audio the Domia
					heard, the audio it spoke back, and the transcript of each. Open one
					and a WaveSurfer-powered waveform lets you scrub through both — the
					user side and the TTS reply — synced to the moments where STT, the
					LLM, and TTS each took their time. Voice AI is hard to tune without
					ears; the Console gives you yours back.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
