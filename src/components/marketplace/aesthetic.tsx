import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Aesthetic() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🧑‍🎨 Aesthetic Identities</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Customize your Domia’s visual projection with unique avatars,
					illustrations, or symbolic identities. Whether minimal, playful,
					futuristic or hand-drawn, aesthetic identities give your Domia a face
					— and a presence — in web or the mobile app.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
