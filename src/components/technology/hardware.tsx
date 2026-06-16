import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

const TIERS = [
	{
		device: "Any small device",
		role: "Edge node",
		runs: "Mic, wake word, voice-activity detection, playback — delegates the heavy stages to a hub",
	},
	{
		device: "A capable machine",
		role: "Hub",
		runs: "Full on-device speech-to-speech pipeline; serves several spaces in parallel",
	},
	{
		device: "A powerful machine",
		role: "Hub +",
		runs: "Larger models, deeper memory, richer real-time emotion",
	},
]

export function Hardware() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>💡 Hardware That Adapts to You</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Domia runs across a wide hardware spectrum. The role isn’t hardcoded —
					what each device does is just configuration, so the same code fits the
					hardware you already have.
				</TypographyLarge>

				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Device</TableHead>
							<TableHead>Role</TableHead>
							<TableHead>What it runs locally</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{TIERS.map((tier) => (
							<TableRow key={tier.device}>
								<TableCell className="font-medium">{tier.device}</TableCell>
								<TableCell className="text-primary font-semibold">
									{tier.role}
								</TableCell>
								<TableCell className="text-muted-foreground">
									{tier.runs}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
}
