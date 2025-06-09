import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Free() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>💡 Why NFTs? Why Not Subscriptions?</TypographyH2>
			</CardHeader>
			<CardContent>
				<TypographyLarge>
					For our first 3,000 NFTs, we’re doing something bold: no
					subscriptions, no monthly fees, no centralized paywalls. You mint a
					Domia, and it’s fully yours — personality, memory, voice, and updates
					included. This model is only for early supporters. It helps us fund
					development while rewarding those who believe in local-first AI before
					anyone else. Future activations may require different models — but
					these first 3,000 Domia’s are permanently yours, no strings attached.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
