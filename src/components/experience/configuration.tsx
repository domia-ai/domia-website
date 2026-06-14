import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { DemoLink } from "@/components/landing/demo-link"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Configuration() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🎚️ Edit every Domia’s mind, live</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Click into any Domia and open its config workspace: tune personality
					traits and mood on a live emotion radar, swap the STT, LLM, and TTS
					models from pickers that can install new ones on the device, adjust
					temperature, context window, threads, and voice speed with sliders —
					then apply. Changes land on that device and take effect on its next
					conversation. Browse its memories and emotional history from their own
					screens, alongside every conversation it has had.
				</TypographyLarge>

				<DemoLink
					variant="inline"
					path="/domias"
					label="Open a Domia’s config →"
				/>
			</CardContent>
		</Card>
	)
}
