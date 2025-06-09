import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Build() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🛠️ Custom, or Community-Created</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Domia’s marketplace isn’t just for downloading — it’s for creating.
					Use the Domia Composer to build your own personalities from scratch or
					from templates, complete with emotional baselines and voice
					preferences. Publish them, share them, or keep them private — your
					Domias, your rules.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
