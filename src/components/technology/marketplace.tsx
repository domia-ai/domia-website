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
					From day one, Domia is yours to shape. During the initial setup, you
					can customize your Domia’s personality, communication style,
					profession, and emotional tone — crafting an entity that fits your
					home and your life. But if you want more than a configuration — if you
					want a Domia with a soul already formed — the Domia Marketplace is
					where it begins. There, you can adopt fully-realized Domias that go
					beyond app settings. Each Marketplace Domia includes: - A unique
					identity (voice, mood, style, role) - A curated memory seed - **And a
					custom QLoRA language model** — fine-tuned specifically for that
					profile. This means that a “Mentor Domia” from the Marketplace doesn’t
					just *act* wise. It *understands and speaks* with a model trained to
					think like one. It’s not just skin-deep customization. It’s cognitive
					DNA — ready to live, feel, and evolve with you.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
