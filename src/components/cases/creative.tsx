import Image from "next/image"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Creative() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🧑‍🎨 Creative Partner</TypographyH2>
			</CardHeader>

			<CardContent className="flex flex-col-reverse items-center gap-8 lg:flex-row lg:items-start">
				<TypographyLarge>
					Writers, designers, and artists are using Domia to explore characters,
					draft ideas, and test emotional narratives. Its evolving memory and
					modular personality system makes it more than a tool — it becomes your
					co-creator.
				</TypographyLarge>

				<Image
					src="/cases/creative.webp"
					alt="Domia creative logo"
					width={300}
					height={300}
					priority
				/>
			</CardContent>
		</Card>
	)
}
