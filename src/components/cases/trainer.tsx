import Image from "next/image"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Trainer() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🧑‍🏫 Knowledge Trainer for Businesses</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col-reverse items-center gap-8 lg:flex-row lg:items-start">
				<TypographyLarge>
					Forget static manuals. Domia can be trained with your company’s
					knowledge and turn it into live, personalized onboarding sessions.
					Answer questions, guide processes, and evolve with your workflows —
					without ever leaking your IP to the cloud.
				</TypographyLarge>

				<Image
					src="/cases/trainer.webp"
					alt="Domia trainer logo"
					width={300}
					height={300}
					priority
				/>
			</CardContent>
		</Card>
	)
}
