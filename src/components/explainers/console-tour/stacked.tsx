import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { TypographyH3 } from "@/components/ui/typography"

import { HotspotCrop } from "./hotspot-crop"
import { ScreenDemoLink } from "./screen-demo-link"
import type {
	ConsoleTourViewProps,
	ScreenViewProps,
	StackedHotspotListProps,
} from "./types"

function StackedHotspotList({
	heading,
	screen,
	copy,
}: StackedHotspotListProps) {
	return (
		<div className="flex flex-col gap-3">
			<p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
				{heading}
			</p>
			<ol className="flex flex-col gap-5">
				{screen.hotspots.map((hotspot) => (
					<li key={hotspot.id} className="flex flex-col gap-2">
						<HotspotCrop screen={screen} hotspot={hotspot} />
						<span className="font-medium">{copy[hotspot.id].title}</span>
						<span className="text-muted-foreground">
							{copy[hotspot.id].body}
						</span>
					</li>
				))}
			</ol>
		</div>
	)
}

function StackedScreenBody({
	screen,
	copy,
	hotspotsHeading,
	demo,
}: ScreenViewProps) {
	return (
		<div className="flex flex-col gap-5">
			<p className="text-muted-foreground text-base">{copy.summary}</p>
			<StackedHotspotList
				heading={hotspotsHeading}
				screen={screen}
				copy={copy.hotspots}
			/>
			<ScreenDemoLink screen={screen} copy={demo} />
		</div>
	)
}

export function ConsoleTourStacked({ groups, copy }: ConsoleTourViewProps) {
	return (
		<div className="flex flex-col gap-12 md:hidden">
			{groups.lead.map((screen) => (
				<section key={screen.key} className="flex flex-col gap-4">
					<TypographyH3>{copy.screens[screen.key].title}</TypographyH3>
					<StackedScreenBody
						screen={screen}
						copy={copy.screens[screen.key]}
						hotspotsHeading={copy.hotspotsHeading}
						demo={copy.demo}
					/>
				</section>
			))}
			<section className="flex flex-col gap-2">
				<TypographyH3>{copy.moreScreens}</TypographyH3>
				<Accordion>
					{groups.more.map((screen) => (
						<AccordionItem key={screen.key} value={screen.key}>
							<AccordionTrigger className="min-h-11 text-base">
								{copy.screens[screen.key].title}
							</AccordionTrigger>
							<AccordionContent>
								<StackedScreenBody
									screen={screen}
									copy={copy.screens[screen.key]}
									hotspotsHeading={copy.hotspotsHeading}
									demo={copy.demo}
								/>
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</section>
		</div>
	)
}
