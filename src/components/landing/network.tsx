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
					Domia devices don’t operate in isolation — they form a resilient mesh
					of shared intelligence. A central Domia collaborates with smaller
					nodes throughout your home, enabling distributed control, shared
					memory, and emotional synchronization. Each Domia can have its own
					emotional state and personality, which may evolve independently or
					harmonize with others. For example, your bedroom Domia might remain
					calm and quiet, tuned for relaxation and reflection, while the kitchen
					Domia takes on the role of a cheerful chef — suggesting recipes,
					narrating steps, or playing upbeat music. In the living room, your
					Domia might become a sports commentator, reacting with excitement
					during a game night. This flexibility creates emotionally aware
					micro-environments and allows for immersive character-driven
					experiences throughout the space.
				</TypographyLarge>

				<TypographyBlockquote>
					“Your home thinks together.”
				</TypographyBlockquote>
			</CardContent>
		</Card>
	)
}
