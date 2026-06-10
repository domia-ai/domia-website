import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Importable() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>📦 Drop-in Domias — Ready to Just Try</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					A Domia’s whole identity — its persona, voice, emotional baseline, and
					memory — is just data. The marketplace will let you share and import a
					complete “mind” as a single JSON file: drop it into any Domia and it’s
					ready to try in seconds, no setup. Try a chef, a concierge, a tutor,
					or a calm bedtime companion — then tweak it, or roll your own and
					share it back.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
