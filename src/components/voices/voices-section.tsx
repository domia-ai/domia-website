import { getTranslations } from "next-intl/server"

import { Section } from "@/components/sections"
import {
	TypographyH2,
	TypographyLarge,
	TypographySmall,
} from "@/components/ui/typography"
import { loadVoices } from "@/data"

import { VoiceSampler } from "./voice-sampler"
import type { VoicesCopy, VoicesSectionProps } from "./types"

export async function VoicesSection({ tone = "base" }: VoicesSectionProps) {
	const t = await getTranslations("voices")
	const faces = await getTranslations("explainers.personaBuilder.faces")
	const { voices } = loadVoices()
	const copy: VoicesCopy = {
		play: t("play"),
		stop: t("stop"),
		faces: Object.fromEntries(
			voices.map((voice) => [voice.face, faces(`${voice.face}.name`)]),
		),
	}

	return (
		<Section tone={tone} labelledBy="voices-title">
			<div className="flex flex-col gap-8">
				<div className="flex max-w-3xl flex-col gap-3">
					<TypographyH2 id="voices-title">{t("title")}</TypographyH2>
					<TypographyLarge className="text-muted-foreground">
						{t("body")}
					</TypographyLarge>
				</div>
				<VoiceSampler voices={voices} copy={copy} />
				<TypographySmall className="text-muted-foreground">
					{t("note")}
				</TypographySmall>
			</div>
		</Section>
	)
}
