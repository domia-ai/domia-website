import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Archive() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🗄️ A local archive that outlives any device</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					The Console runs a small collector daemon alongside the web UI. It
					discovers your Domias over MQTT, pulls every new interaction from them
					as it happens, and mirrors the traces and audio into a local SQLite +
					WAV archive on your own disk. A device gets unplugged or reformatted —
					your fleet’s history is intact. The Console talks to the live devices
					for control and to the archive for everything else: two planes, one
					screen, no cloud in either of them.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
