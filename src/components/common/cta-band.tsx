import Link from "next/link"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GithubIcon } from "@/components/landing/icons"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function CtaBand({
	title = "Ready to bring Domia home?",
	subtitle = "Domia’s core is open and runs on your own hardware today. Explore the code, or tell us how you’d use it.",
	contactLabel = "Get in touch",
}: {
	title?: string
	subtitle?: string
	contactLabel?: string
}) {
	return (
		<Card>
			<CardContent className="flex flex-col items-center gap-6 py-8 text-center">
				<TypographyH2>{title}</TypographyH2>
				<TypographyLarge className="max-w-2xl">{subtitle}</TypographyLarge>
				<div className="flex flex-wrap items-center justify-center gap-3">
					<Button asChild size="lg">
						<a
							href="https://github.com/domia-ai"
							target="_blank"
							rel="noopener noreferrer"
						>
							<GithubIcon className="mr-2 size-4" />
							Explore on GitHub
						</a>
					</Button>
					<Button asChild size="lg" variant="outline">
						<Link href="/contact">{contactLabel}</Link>
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}
