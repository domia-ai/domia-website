import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Collaborate() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🤝 Collaborate & Contribute</TypographyH2>
			</CardHeader>
			<CardContent>
				<TypographyLarge>
					Domia welcomes developers, creators, tinkerers, and dreamers.
					Contribute to our growing ecosystem — build new modules, propose new
					skills, or co-create experiences. Whether it’s enhancing emotional AI,
					exploring character dynamics, or deploying Domia in new environments —
					your energy moves us forward.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
