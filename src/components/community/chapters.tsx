import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Chapters() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🫂 Global Chapters</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					We’re launching regional Domia chapters to bring meetups,
					language-specific support, and cultural packs to life. Want to
					represent your country, city, or community? You’ll soon be able to
					apply as a Chapter Lead.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
