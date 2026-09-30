import { Badge } from "@/components/ui/badge"
import { TypographyH3 } from "@/components/ui/typography"
import { cn } from "@/lib/utils"

import { laneTone } from "./geometry"
import { pickCopy } from "./selection"
import type {
	FooterChipsProps,
	HeadlineProps,
	LegendProps,
	SourceCaptionProps,
} from "./types"

export function Headline({ copy, selection, override }: HeadlineProps) {
	return (
		<TypographyH3 className="max-w-3xl text-2xl text-balance sm:text-3xl">
			{override ?? pickCopy(copy.headline, selection)}
		</TypographyH3>
	)
}

export function SourceCaption({
	copy,
	selection,
	override,
}: SourceCaptionProps) {
	return (
		<p className="text-muted-foreground max-w-3xl text-xs text-balance">
			{override ?? pickCopy(copy.source, selection)}
		</p>
	)
}

export function Legend({ copy }: LegendProps) {
	const items = [
		{ id: "audio", swatch: laneTone.audio.swatch, label: copy.legend.audio },
		{
			id: "model",
			swatch: laneTone.thinking.swatch,
			label: copy.legend.model,
		},
		{
			id: "fastPath",
			swatch: laneTone.fastPath.swatch,
			label: copy.legend.fastPath,
		},
	]

	return (
		<ul className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
			{items.map((item) => (
				<li key={item.id} className="flex items-center gap-2">
					<span
						aria-hidden="true"
						className={cn("size-2.5 shrink-0 rounded-[3px]", item.swatch)}
					/>
					{item.label}
				</li>
			))}
		</ul>
	)
}

export function FooterChips({ copy }: FooterChipsProps) {
	return (
		<ul className="flex flex-wrap gap-2">
			{copy.footer.map((chip) => (
				<li key={chip}>
					<Badge
						variant="outline"
						className="text-muted-foreground h-auto py-1 text-xs font-normal whitespace-normal"
					>
						{chip}
					</Badge>
				</li>
			))}
		</ul>
	)
}
