import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Feels() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🧠 Visualize What Your Domia Feels</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					The app lets you peek into Domia’s mind — from current emotional state
					to recent memory shifts. Track happiness, stress, curiosity, or love
					as they change in response to daily life. It’s not data. It’s
					presence.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
