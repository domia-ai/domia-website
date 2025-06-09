import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Configuration() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🧰 Full Configuration Panel</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Want your Domia to be more empathetic? More assertive? Prefer a new
					voice or memory style? The Experience App lets you adjust emotional
					parameters, voice packs, behaviors and even schedule quiet time — all
					in one place.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
