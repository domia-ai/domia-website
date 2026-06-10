import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function App() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🎛️ The Domia Console</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					You don’t need the Console to use Domia — every device runs its voice
					pipeline on its own. The Console is the web app you run alongside your
					fleet to see what each Domia is doing: replay any conversation with
					full audio, watch per-stage latency, grade interactions to build a
					fine-tuning corpus, and rerun any past interaction against a different
					model. A small collector daemon discovers Domias over MQTT and mirrors
					traces and audio into a local SQLite + WAV archive, so your history
					stays intact even if a device drops. Web today; a mobile companion is
					on the roadmap.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
