import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Modules() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🧭 Community-Led Modules</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Domia actively features and promotes the best community-created
					personas, voice packs, and identity seeds. Your work could power
					hundreds of Domia’s across the world — with attribution and optional
					revenue sharing.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
