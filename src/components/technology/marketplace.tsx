import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Marketplace() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🎨 Build or Adopt Your Perfect Domia</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					From day one, Domia is yours to shape. During setup you can customize
					your Domia’s personality, communication style, profession, and
					emotional tone — crafting an entity that fits your home and your life.
					But if you want more than a configuration — a Domia with a soul
					already formed — the Domia Marketplace is where it begins. There you
					can adopt fully-realized personas that go beyond app settings. Each
					includes a unique identity (voice, mood, style, role) and a curated
					memory seed, so a “Mentor Domia” doesn’t just act wise — it speaks and
					remembers like one. (Fine-tuned, learned personas are on the roadmap.)
					It’s not skin-deep customization. It’s an identity ready to live,
					feel, and evolve with you.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
