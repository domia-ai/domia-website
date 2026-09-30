import Image from "next/image"
import { Waypoints } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
	TypographyH3,
	TypographyP,
	TypographySmall,
} from "@/components/ui/typography"

import { identityAvatars } from "./constants"
import { StageChip } from "./stage-chip"
import type { NodeCardProps, StageColumnProps } from "./types"

function StageColumn({ heading, stages, placement, copy }: StageColumnProps) {
	return (
		<div className="flex min-w-0 flex-1 flex-col gap-3">
			<TypographySmall className="text-muted-foreground font-medium">
				{heading}
			</TypographySmall>
			{stages.length > 0 ? (
				<ul className="flex list-none flex-wrap gap-2">
					{stages.map((stage) => (
						<StageChip
							key={stage}
							label={copy.stages[stage]}
							placement={placement}
						/>
					))}
				</ul>
			) : (
				<TypographySmall className="text-muted-foreground font-normal">
					{copy.emptyColumn}
				</TypographySmall>
			)}
		</div>
	)
}

export function NodeCard({ archetype, copy }: NodeCardProps) {
	const { description, chooseIf, panelTitle, templateLine } =
		copy.archetypes[archetype.id]
	const needsPeer = archetype.delegates.length > 0
	const visibleAvatars =
		archetype.identities === "several" ? identityAvatars.length : 1

	return (
		<Card className="w-full">
			<CardHeader>
				<TypographyH3 className="text-balance">{panelTitle}</TypographyH3>
			</CardHeader>
			<CardContent className="flex flex-col gap-6">
				<div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
					<StageColumn
						heading={copy.columns.here}
						stages={archetype.onBoard}
						placement="here"
						copy={copy}
					/>
					<StageColumn
						heading={copy.columns.elsewhere}
						stages={archetype.delegates}
						placement="elsewhere"
						copy={copy}
					/>
				</div>
				<div className="flex flex-col gap-2">
					<TypographyP className="text-muted-foreground mt-0 text-balance">
						{description}
					</TypographyP>
					<TypographyP className="mt-0 font-medium text-balance">
						{chooseIf}
					</TypographyP>
					{needsPeer ? (
						<TypographySmall className="text-mesh font-medium">
							{copy.needsPeer}
						</TypographySmall>
					) : null}
				</div>
				<div className="flex flex-wrap items-center gap-x-6 gap-y-3">
					<div className="flex items-center gap-3">
						<ul
							className="flex list-none items-center -space-x-2"
							aria-hidden="true"
						>
							{identityAvatars.map((character, index) => (
								<li
									key={character}
									className={cn(
										"border-card size-8 overflow-hidden rounded-full border-2 motion-safe:transition-[opacity,transform] motion-safe:duration-500",
										index < visibleAvatars
											? "scale-100 opacity-100"
											: "scale-50 opacity-0",
									)}
								>
									<Image
										src={`/collection/${character}.webp`}
										alt=""
										width={32}
										height={32}
										className="size-full object-cover"
									/>
								</li>
							))}
						</ul>
						<TypographySmall className="font-medium">
							{copy.identities[archetype.identities]}
						</TypographySmall>
					</div>
					{archetype.sharesStages ? (
						<Badge
							variant="outline"
							className="text-mesh border-mesh/40 bg-mesh/10 h-auto gap-1.5 px-3 py-1"
						>
							<Waypoints aria-hidden="true" />
							{copy.sharesPill}
						</Badge>
					) : null}
				</div>
			</CardContent>
			<CardFooter>
				<TypographySmall className="text-muted-foreground font-normal">
					{templateLine}
				</TypographySmall>
			</CardFooter>
		</Card>
	)
}
