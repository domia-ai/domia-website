import Image from "next/image"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Cultural() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🏛️ Museum & Cultural Guide</TypographyH2>
			</CardHeader>

			<CardContent className="flex flex-col-reverse items-center gap-8 lg:flex-row lg:items-start">
				<TypographyLarge>
					Domia can act as a multilingual, emotionally aware guide in museums,
					galleries, or cultural centers. It adapts its tone based on visitor
					age or interest, answers deep-dive questions, and creates a
					personalized, immersive journey through knowledge and art.
				</TypographyLarge>

				<Image
					src="/cases/cultural.webp"
					alt="Domia cultural logo"
					width={200}
					height={200}
					priority
				/>
			</CardContent>
		</Card>
	)
}
