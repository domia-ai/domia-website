import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Private() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🛡️ Private by Design, Not Permission</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Domia doesn’t ask for your permission to protect your data — because
					it was built never to take it. All language processing, memory,
					emotional reasoning, and voice generation happen locally, on your own
					devices. There is no cloud fallback, no analytics, no telemetry. You
					don’t need to agree to terms of service to use your Domia — because
					you own it, completely. Even when remote access is enabled via Domia
					Central, all communication is encrypted, peer-to-peer, and under your
					control. You can disconnect any node at any time, and it will continue
					to function independently. Privacy isn’t a setting in Domia. It’s the
					default.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
