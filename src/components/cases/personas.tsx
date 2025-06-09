import Image from "next/image"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Personas() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🧑‍💼 Brand Personas, Powered by Domia</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col-reverse items-center gap-8 lg:flex-row lg:items-start">
				<TypographyLarge>
					Bring your character, mascot, or ambassador to life with real memory,
					emotion, and voice. Domia can be fully aligned with your brand’s tone,
					mission, and philosophy — becoming a persistent, emotionally aware AI
					that greets, guides, entertains, and teaches across physical and
					digital spaces. Whether embedded in tourism kiosks, museum exhibits,
					retail touchpoints or theme parks, your Domia evolves with your
					audience — offline or via a private cloud — while preserving your
					values, your identity, and your data.
				</TypographyLarge>

				<Image
					src="/cases/personas.webp"
					alt="Domia personas logo"
					width={400}
					height={400}
					priority
				/>
			</CardContent>
		</Card>
	)
}
