import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Talk() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>📱 Talk to Your Domia from Anywhere</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Whether you’re at home, in traffic, or abroad — your Domia is always
					just a message or voice note away. You can ask questions, send
					emotional prompts, or just say good morning. It remembers. It
					responds. It grows with you.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
