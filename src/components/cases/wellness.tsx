import Image from "next/image"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Wellness() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🏡 Wellness Companion</TypographyH2>
			</CardHeader>

			<CardContent className="flex flex-col-reverse items-center gap-8 lg:flex-row lg:items-start">
				<TypographyLarge>
					Domia’s emotional awareness makes it a powerful mental health
					companion. Whether you live alone or with others, Domia can sense
					changes in mood, listen without judgment, and support daily rituals
					that bring you balance — all 100% private.
				</TypographyLarge>

				<Image
					src="/cases/wellness.webp"
					alt="Domia wellness logo"
					width={250}
					height={250}
					priority
				/>
			</CardContent>
		</Card>
	)
}
