import Image from "next/image"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Frontdesk() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🏢 Reception & Frontdesk AI</TypographyH2>
			</CardHeader>

			<CardContent className="flex flex-col-reverse items-center gap-8 lg:flex-row lg:items-start">
				<TypographyLarge>
					In offices, clinics, or coworking spaces, Domia can greet, onboard,
					and orient visitors. Its customizable voice, tone, and knowledge base
					make it feel like a real team member — but one that works 24/7, speaks
					multiple languages, and never forgets a name.
				</TypographyLarge>

				<Image
					src="/cases/frontdesk.webp"
					alt="Domia host logo"
					width={200}
					height={200}
					priority
				/>
			</CardContent>
		</Card>
	)
}
