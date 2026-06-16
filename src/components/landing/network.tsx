import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
	TypographyBlockquote,
	TypographyH2,
	TypographyLarge,
} from "@/components/ui/typography"

export function Network() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🕸️ The Domia Network</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Domia devices don’t operate in isolation — they form a resilient
					peer-to-peer mesh. There’s no central server and no fixed roles: any
					capable Domia can lend its compute to the others, and what each device
					does is simply configuration. Together they share work, memory, and
					emotional context across the network. Each Domia keeps its own
					emotional state and personality, which may evolve independently or
					harmonize with others. One Domia might be calm and quiet, tuned for
					focus and reflection; another a cheerful guide that narrates and
					suggests; another an energetic host that greets and reacts. This
					flexibility creates emotionally aware micro-environments and allows
					for immersive, character-driven experiences across every space you put
					a Domia in.
				</TypographyLarge>

				<TypographyBlockquote>“They think together.”</TypographyBlockquote>
			</CardContent>
		</Card>
	)
}
