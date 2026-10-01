import {
	AudioLines,
	Brain,
	Database,
	Ear,
	Hourglass,
	Volume2,
} from "lucide-react"
import { getTranslations } from "next-intl/server"

import { Section } from "@/components/sections"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

import { ENGINE_FAMILIES, WORKS_WITH } from "./constants"
import { RelatedLink } from "./related-link"
import type { EngineStage } from "./types"

const engineStages: EngineStage[] = [
	{ id: "wakeWord", icon: Ear },
	{ id: "stt", icon: AudioLines },
	{ id: "turn", icon: Hourglass },
	{ id: "llm", icon: Brain },
	{ id: "tts", icon: Volume2 },
	{ id: "memory", icon: Database },
]

export async function Engines() {
	const t = await getTranslations("technology.engines")

	return (
		<Section id="engines" tone="base" labelledBy="engines-title">
			<div className="flex flex-col gap-10">
				<div className="flex max-w-3xl flex-col gap-4">
					<TypographyH2 id="engines-title">{t("title")}</TypographyH2>
					<TypographyLarge className="text-muted-foreground">
						{t("intro")}
					</TypographyLarge>
				</div>
				<ul className="grid list-none grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
					{engineStages.map(({ id, icon: Icon }) => (
						<li key={id} className="flex">
							<Card size="sm" className="w-full">
								<CardContent className="flex flex-col gap-3">
									<h3 className="flex items-center gap-2 text-base font-medium">
										<Icon aria-hidden="true" className="text-primary size-5" />
										{t(`items.${id}.title`)}
									</h3>
									<div className="flex flex-col gap-3">
										<p className="text-muted-foreground text-sm text-pretty">
											{t(`items.${id}.body`)}
										</p>
										<ul className="flex list-none flex-wrap gap-1.5">
											{ENGINE_FAMILIES[id].map((name) => (
												<li key={name}>
													<Badge variant="secondary" className="font-normal">
														{name}
													</Badge>
												</li>
											))}
										</ul>
									</div>
								</CardContent>
							</Card>
						</li>
					))}
				</ul>
				<div className="flex flex-col gap-3">
					<p id="works-with-title" className="text-base font-medium">
						{t("worksWith")}
					</p>
					<ul
						aria-labelledby="works-with-title"
						className="flex list-none flex-wrap gap-2"
					>
						{WORKS_WITH.map((name) => (
							<li key={name}>
								<Badge variant="outline" size="lg">
									{name}
								</Badge>
							</li>
						))}
					</ul>
				</div>
				<div className="flex max-w-3xl flex-col gap-6">
					<TypographyLarge className="font-medium">
						{t("invariant")}
					</TypographyLarge>
					<RelatedLink href="/run" label={t("link")} />
				</div>
			</div>
		</Section>
	)
}
