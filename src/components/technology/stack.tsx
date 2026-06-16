import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Stack() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🛠️ Built with Tools You Trust</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Domia is a modular, local-first architecture written entirely in
					TypeScript on Node.js. Speech inference runs in-process and the
					language model runs locally — but the models themselves are a choice,
					not a lock-in. Speech-to-text, text-to-speech, and the language model
					are all swappable, so you can fit a small, fast model to a low-power
					device or a larger one to a capable machine. Each Domia keeps its
					config and state in a local database, so engines, voices,
					personalities, and behavior are all data you can change live — no
					restart, no hardcoded roles. A new Domia even boots neutral: it gets
					its purpose from a template, and you can reshape it at any time.
				</TypographyLarge>
				<TypographyLarge>
					Domias talk to each other peer-to-peer over gRPC streaming, discover
					each other with MQTT, and delegate work by capability: a thin edge
					node can hand its speech-to-text, LLM, and text-to-speech to a
					stronger hub, which serves several spaces in parallel through
					child-process inference pools. The same backend adapts to your
					hardware — every layer hackable, composable, and transparent.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
