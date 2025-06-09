import Image from "next/image"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Host() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🏨 Airbnb & Hotel Host</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col-reverse items-center gap-8 lg:flex-row lg:items-start">
				<TypographyLarge>
					As a Host, Domia can answer FAQs, explain house rules, recommend local
					gems, and provide Wi-Fi info — all while adapting to your tone and
					brand. Add a touchscreen, a voice avatar, or just let Domia greet them
					as they enter the room.
				</TypographyLarge>

				<Image
					src="/cases/host.webp"
					alt="Domia host logo"
					width={300}
					height={300}
					priority
				/>
			</CardContent>
		</Card>
	)
}
