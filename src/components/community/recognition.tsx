import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Recognition() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🏆 Community Reputation System</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Every meaningful contribution — from bug fixes and ideas to answering
					questions — builds your reputation. Unlock badges, roles, early
					access, and visibility. In Domia, we don’t just value presence. We
					reward contribution.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
