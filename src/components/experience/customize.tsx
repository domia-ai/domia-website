import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Customize() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🎨 Customize the Look & Voice</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					From avatars and skins to custom voice packs — the Experience App
					gives you full control over Domia’s identity. Choose from a growing
					library of styles or upload your own to create a Domia that feels
					truly yours.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
