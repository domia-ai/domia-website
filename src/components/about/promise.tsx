import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Promise() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🫱 Our Promise</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Built for You, Not for Ads, Your data stays with you. Always. No
					hidden tracking, no reselling, no manipulative algorithms. Just
					technology you can trust — and even love.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
