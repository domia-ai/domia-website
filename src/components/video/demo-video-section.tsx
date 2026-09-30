import { getTranslations } from "next-intl/server"

import { Section } from "@/components/sections"
import { Card } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

import { DEMO_VIDEOS } from "./constants"
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
					<video
						controls
						playsInline
						preload="none"
						poster={spec.poster}
						width={spec.width}
						height={spec.height}
						aria-label={t(`${video}.videoLabel`)}
						className="aspect-video w-full bg-black"
					>
						<source src={spec.src} type="video/mp4" />
						{t("unsupported")}
					</video>
				</Card>
			</div>
		</Section>
	)
}
