import { getTranslations } from "next-intl/server"

import { Section } from "@/components/sections"
import { Card } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

import { DEMO_VIDEOS } from "./constants"
import { DemoVideoPlayer } from "./demo-video-player"
import type { DemoVideoSectionProps } from "./types"

export async function DemoVideoSection({
	video,
	tone = "alt",
}: DemoVideoSectionProps) {
	const t = await getTranslations("videos")
	const spec = DEMO_VIDEOS[video]
	const titleId = `demo-video-${video}-title`

	return (
		<Section tone={tone} labelledBy={titleId}>
			<div className="flex flex-col items-center gap-8">
				<div className="flex max-w-3xl flex-col items-center gap-4 text-center">
					<TypographyH2 id={titleId}>{t(`${video}.title`)}</TypographyH2>
					<TypographyLarge className="text-muted-foreground">
						{t(`${video}.body`)}
					</TypographyLarge>
				</div>
				<Card className="w-full max-w-5xl overflow-hidden py-0 shadow-sm">
					<DemoVideoPlayer
						spec={spec}
						copy={{
							label: t(`${video}.videoLabel`),
							play: t("play"),
							captions: t("captions"),
							unsupported: t("unsupported"),
						}}
					/>
				</Card>
			</div>
		</Section>
	)
}
