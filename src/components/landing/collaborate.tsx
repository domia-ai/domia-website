import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"
import { socialMediaLinks } from "@/constants"

export function Collaborate() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🤝 Collaborate & Contribute</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Domia welcomes developers, creators, tinkerers, and dreamers.
					Contribute to our growing ecosystem — build new modules, propose new
					skills, or co-create experiences. Whether it’s enhancing emotional AI,
					exploring character dynamics, or deploying Domia in new environments —
					your energy moves us forward.
				</TypographyLarge>

				<div className="flex flex-wrap gap-3">
					{socialMediaLinks.map((link) => (
						<Button key={link.name} asChild variant="outline">
							<a
								href={link.href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={link.name}
							>
								<link.icon className="mr-2 size-4" />
								{link.name}
							</a>
						</Button>
					))}
				</div>
			</CardContent>
		</Card>
	)
}
