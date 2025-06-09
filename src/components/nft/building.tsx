import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Building() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🧱 Built to Last, Not to Flip</TypographyH2>
			</CardHeader>
			<CardContent>
				<TypographyLarge>
					Unlike most NFT projects, Domia isn’t built around hype. It’s built
					around purpose. We’re using this collection to fund the development of
					open-source local AI infrastructure, emotional cognition modules,
					real-world integrations, and tools for the community. Your support
					helps us keep Domia ethical, local, and independent — without needing
					cloud APIs or venture capital strings. This is how we fund the future:
					with those who believe in it.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
