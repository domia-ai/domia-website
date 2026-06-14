import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { DemoLink } from "@/components/landing/demo-link"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function RunAgain() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>
					🔁 Try a different model on a real recording
				</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					“Run Again” lets you replay any past interaction against a different
					LLM, a different persona, or a different engine config — and see the
					two responses side by side on the same input. Before you commit a
					model swap across your fleet, you can hear what it would have sounded
					like on the conversations you’ve already had.
				</TypographyLarge>

				<DemoLink
					variant="inline"
					path="/conversations/demo-3"
					label="See a side-by-side rerun →"
				/>
			</CardContent>
		</Card>
	)
}
