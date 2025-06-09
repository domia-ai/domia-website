import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Local() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🧭 Why Local-First Matters</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Domia isn’t just local for performance. It’s local for principle. In a
					world where AI lives on servers you don’t control, Domia gives you
					something rare: ownership. It runs entirely on your hardware. It
					forgets what you want it to forget. It listens only when you allow it
					to. No third-party analytics. No background connections. No silent
					updates. Local-first means your AI doesn’t report to anyone but you —
					and when infrastructure fails, Domia doesn’t. It’s resilient, private,
					transparent, and accountable. It also consumes dramatically less
					energy than cloud-based AI, reducing your carbon footprint. And by
					design, it avoids the extractive practices of centralized systems,
					embracing a form of AI that is ethical, consent-based, and
					human-aligned.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
