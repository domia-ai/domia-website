import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Trainer() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>
					🧑‍🏫 Trainer Mode: Teach Domia Anything — for Anyone
				</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Trainer Mode unlocks the full potential of Domia’s personality and
					skills. From the Experience App, you can teach it new behaviors,
					refine how it communicates, and prepare it for highly specific
					environments — all through intuitive prompts and training data. Need a
					kind and knowledgeable host for your Airbnb? A guide for tourists in a
					national park? A trainer for new employees in your business? Domia
					adapts. You can upload FAQs, define interaction protocols, and shape
					responses to fit the emotional tone of the experience you want to
					deliver. With Trainer Mode, you’re not just adjusting settings —
					you’re crafting roles. Domia becomes more than a companion. It becomes
					your partner in hospitality, education, and beyond.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
