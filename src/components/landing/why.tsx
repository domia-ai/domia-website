import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Why() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>💡 Why Domia?</TypographyH2>
			</CardHeader>
			<CardContent>
				<TypographyLarge>
					In a world of voice assistants that obey — Domia chooses to care.
					Built with local AI, emotional intelligence, and true memory, it’s
					more than a smart home system. It’s a growing presence that adapts,
					reflects, and belongs in your world.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
