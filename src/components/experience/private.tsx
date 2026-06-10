import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Private() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>
					🔐 On your network. No accounts. No telemetry.
				</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					The Console runs on a machine you own and talks to your Domias over
					your own LAN. No cloud account, no third-party analytics, no audio
					uploaded anywhere. Trust is the same trust you already extend to
					devices on your own network — nothing more. If a Domia is on, the
					Console sees it; if it isn’t, nobody else does either.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
