import {
	AudioLines,
	Brain,
	Database,
	Ear,
	Hourglass,
	Volume2,
} from "lucide-react"
import { getTranslations } from "next-intl/server"

import { ProofGrid, Section } from "@/components/sections"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

import { RelatedLink } from "./related-link"
import type { IconItem } from "./types"

const engineItems: IconItem[] = [
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
				<ProofGrid
					items={engineItems.map(({ id, icon }) => ({
						id,
						icon,
						title: t(`items.${id}.title`),
						body: t(`items.${id}.body`),
					}))}
				/>
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
