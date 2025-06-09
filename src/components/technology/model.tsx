import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Model() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🤖 Local Intelligence, On Your Terms</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Domia understands, converses, and reflects — all without needing to
					ask a server. Thanks to integrated support for Ollama, every Domia can
					run a local language model directly on your device. From small, fast
					models optimized for low-memory chips, to advanced QLoRA-tuned models
					running on NUCs and GPUs — Domia adapts to what you give it.
					Everything from conversation to emotional interpretation to internal
					decision-making is powered by local language understanding. This keeps
					your data private, your latency low, and your Domia truly yours. You
					can even swap models, fine-tune them, or use multiple ones per node —
					giving each Domia its own voice, tone, and expertise.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
