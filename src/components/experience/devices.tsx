import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Devices() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🌐 Works Across Devices. Feels Like One.</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Whether you’re connected to Domia Central or a satellite node, your
					Domia’s identity and memory remain intact. The app acts as your
					emotional bridge — a unified view of every Domia you host.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
