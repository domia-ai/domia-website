import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Private() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🔐 Private by Default. Always Local.</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Everything runs locally — even remote messaging is routed through your
					own secure Domia Core. You control what Domia remembers, when it
					listens, and how it responds. No third-party analytics. Ever.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
