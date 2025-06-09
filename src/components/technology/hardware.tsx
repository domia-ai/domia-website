import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Hardware() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>💡 Hardware That Adapts to You</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Domia is engineered to run on minimal local hardware — whether it’s a
					Raspberry Pi, an Orange Pi, or even a small ESP32 module. Each Domia
					node becomes part of a decentralized ecosystem, capable of sensing,
					speaking, and evolving alongside you — all without the cloud. But give
					Domia Central more power — a NUC, a mini PC, or even a server — and it
					becomes something else entirely. With increased resources, Domia
					unlocks larger language models, deeper memory, collective
					consciousness, and real-time emotional simulation. Built to be
					efficient. Ready to grow.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
