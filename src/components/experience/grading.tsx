import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { DemoLink } from "@/components/landing/demo-link"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Grading() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>📝 Your conversations are your dataset</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					From any interaction you can mark it good, mark it needs work, write a
					correction, and tag it. The Console keeps an eval corpus of your own
					dialogues that you can filter, browse, and export as NDJSON — ready to
					feed into your favorite local fine-tuning workflow. No third-party
					labelers. No data leaving your network. Just a steady loop between
					living with your Domia and making it better.
				</TypographyLarge>

				<DemoLink
					variant="inline"
					path="/conversations/demo-2"
					label="Grade an interaction yourself →"
				/>
			</CardContent>
		</Card>
	)
}
