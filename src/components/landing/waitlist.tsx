import Link from "next/link"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Waitlist() {
	return (
		<Card id="waitlist">
			<CardHeader>
				<TypographyH2>📨 Stay in the loop</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col items-start gap-6">
				<TypographyLarge>
					Domia’s core is open and you can run it today. Want updates on the
					apps, hardware kits, and the Founder Pass — or interested in a pilot
					for your home or hotel? Tell us how you’d use it and we’ll reach out.
				</TypographyLarge>
				<Button asChild size="lg">
					<Link href="/contact">Get in touch</Link>
				</Button>
			</CardContent>
		</Card>
	)
}
