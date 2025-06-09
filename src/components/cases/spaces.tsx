import Image from "next/image"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Spaces() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🎢 Theme Parks & Interactive Spaces</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col-reverse items-center gap-8 lg:flex-row lg:items-start">
				<TypographyLarge>
					In theme parks or educational attractions, Domia becomes a recurring
					presence — guiding guests, delivering narratives, and even reacting to
					prior visits. With memory and emotional tracking, every interaction
					feels like part of a shared story.
				</TypographyLarge>

				<Image
					src="/cases/spaces.webp"
					alt="Domia spaces logo"
					width={200}
					height={200}
					priority
				/>
			</CardContent>
		</Card>
	)
}
