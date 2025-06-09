import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Spaces() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>💬 Community Spaces</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Join the official Discord, community forum, or upcoming regional hubs
					to share feedback, ask for help, or participate in design discussions.
					Whether you’re technical or not, there’s always a space for your
					voice.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
