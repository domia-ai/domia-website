import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Talk() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>💬 Chat with any Domia, from any screen</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Send text or a voice note to any Domia in your fleet from the
					Console’s chat tester. The reply comes back live — voice through its
					own TTS, text alongside. Every exchange is a real interaction stored
					in your local archive, so you can replay it later, grade it, or run it
					again with a different model to compare.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
