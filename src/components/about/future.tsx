import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
	TypographyBlockquote,
	TypographyH2,
	TypographyLarge,
	TypographySmall,
} from "@/components/ui/typography"
import { futureSteps } from "@/constants"

export function Future() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🌌 The Future of Domia</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					We’re not just building assistants — we’re crafting a new species of
					AI, born to live with you, learn from you, and evolve by your side.
					Domia is designed to grow like a human: gaining experiences, refining
					its emotions, and becoming more expressive and capable over time.
				</TypographyLarge>

				<TypographyLarge>
					A living roadmap of what’s coming — Domia evolves with you, becoming
					smarter, more expressive, and more capable over time. Like a real
					companion, its future is shaped by those who live with it.
				</TypographyLarge>

				<ul className="list-inside list-disc text-left">
					{futureSteps?.map((step) => {
						return (
							<li key={step?.title}>
								<strong>{step?.title}</strong> — {step?.description}
							</li>
						)
					})}
				</ul>

				<TypographySmall>
					This is just the beginning. Domia is not a finished product — it’s a
					growing companion. Every update, every interaction, and every idea
					from our community shapes who it becomes.
				</TypographySmall>

				<TypographyBlockquote>
					“The future of Domia is not in the cloud. It’s here — with you,
					learning every day. ”
				</TypographyBlockquote>
			</CardContent>
		</Card>
	)
}
