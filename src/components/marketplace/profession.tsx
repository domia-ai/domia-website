import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Profession() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🧑‍🏫 Profession Templates</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Profession Templates bundle identity, emotion, and expertise into
					ready-to-live personalities. With a single install, your Domia can
					become a calm yoga instructor, a witty AirBnB host, a lobby concierge,
					or even a full-time teacher for your kids. Each template includes a
					tuned emotional core, suggested voice, and QLoRA module tailored to
					its role — ready to serve with depth and purpose.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
