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
					Domia is powered by a modular, local-first architecture built entirely
					with TypeScript and designed for extensibility. Each node runs
					independently using lightweight Docker containers, with core features
					— like emotional state, memory, personality, and motivation — managed
					by plug-and-play cognitive modules. Domia Central coordinates
					communication using MQTT, enabling low-latency, secure synchronization
					across nodes. On-device inference is powered by Ollama for local LLMs,
					with support for Whisper or Vosk for STT, and Piper for TTS — all
					running offline. Domia’s full backend is built on Node.js, optimized
					for embedded systems but scalable to NUCs and GPUs. Every layer, from
					emotion engine to profession modules, is hackable, composable, and
					fully transparent.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
