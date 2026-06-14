import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { DemoLink } from "@/components/landing/demo-link"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Latency() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>⏱️ Tune your pipeline with real numbers</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Every Domia conversation logs Time-To-First-Audio and the per-stage
					cost of STT, LLM, and TTS individually. The Console rolls those up
					into a per-device dashboard, so you can see exactly where time is
					going across your fleet — is your wake word slow on one node? Is the
					LLM the bottleneck on another? Is the TTS engine eating budget you
					didn’t expect? Decisions about which model goes where stop being
					guesses.
				</TypographyLarge>

				<DemoLink
					variant="inline"
					path="/analytics"
					label="Open the latency dashboard →"
				/>
			</CardContent>
		</Card>
	)
}
