import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH3, TypographyP } from "@/components/ui/typography"

import { CaseBadge } from "./case-badge"
import type { CaseCardProps, CaseNoteCardProps } from "./types"

export function CaseCard({ line, happens, routeLabel, badges }: CaseCardProps) {
	return (
		<li className="flex">
			<Card className="w-full">
				<CardHeader className="gap-3">
					<TypographyH3 className="text-lg font-medium tracking-normal">
						{line}
					</TypographyH3>
					<p className="flex flex-wrap items-center gap-2">
						<span className="sr-only">{routeLabel}</span>
						{badges.map((badge) => (
							<CaseBadge key={badge.id} {...badge} />
						))}
					</p>
				</CardHeader>
				<CardContent>
					<TypographyP className="text-muted-foreground mt-0 leading-6">
						{happens}
					</TypographyP>
				</CardContent>
			</Card>
		</li>
	)
}

export function CaseNoteCard({ title, children }: CaseNoteCardProps) {
	return (
		<li className="flex">
			<Card className="bg-muted/40 w-full">
				<CardHeader>
					<TypographyH3 className="text-lg font-medium tracking-normal">
						{title}
					</TypographyH3>
				</CardHeader>
				<CardContent className="text-muted-foreground leading-6">
					{children}
				</CardContent>
			</Card>
		</li>
	)
}
