import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
	TypographyH2,
	TypographyLarge,
	TypographySmall,
} from "@/components/ui/typography"

const upcoming = [
	{
		title: "🗂️ Memory timeline",
		description:
			"Browse facts and significant moments per Domia, not just the recent turns. The schema exists today; the UI is next.",
	},
	{
		title: "📈 Emotion trends",
		description:
			"Plot the Plutchik-8 state over hours and days. Useful for understanding how your Domia is shifting over time.",
	},
	{
		title: "🧩 Skills browser",
		description:
			"Inspect every MCP server wired into the fleet, what tools each exposes, and the tool-calls each has performed.",
	},
	{
		title: "⚙️ Console settings",
		description:
			"Per-Console preferences, archive paths, backup, theme. Small surface, ships when it’s ready.",
	},
	{
		title: "📱 Mobile companion",
		description:
			"Web today, mobile next. Same Console, same network, same data — just on a screen you carry around.",
	},
	{
		title: "🧑‍🏫 Trainer mode",
		description:
			"A guided flow for teaching a Domia a specific role — a host, a guide, a coach — from a handful of examples.",
	},
]

export function WhatsNext() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🛣️ What’s next</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Here’s what we’re building next on top of the Console. Everything in
					this list is either already a placeholder in the app, a schema that’s
					waiting on a UI, or a near-term commitment in our roadmap — not
					aspiration.
				</TypographyLarge>

				<ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{upcoming.map((item) => (
						<li key={item.title}>
							<Card className="bg-secondary h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
								<CardHeader>
									<p className="text-lg font-bold">{item.title}</p>
								</CardHeader>
								<CardContent>
									<TypographySmall className="text-muted-foreground">
										{item.description}
									</TypographySmall>
								</CardContent>
							</Card>
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	)
}
