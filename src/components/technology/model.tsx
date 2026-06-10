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
					Domia understands, converses, and reflects — all without asking a
					server. Every Domia runs a local language model right on your device.
					From small, fast models for low-memory devices to larger models on a
					capable machine, Domia adapts to the hardware you give it — the model
					is just config, swappable per node, never locked in. Everything from
					conversation to emotional interpretation to internal decision-making
					is powered by local language understanding. That keeps your data
					private, your latency low, and your Domia truly yours.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
