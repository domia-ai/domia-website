import { ArrowDown } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
	TypographyH2,
	TypographyLarge,
	TypographySmall,
} from "@/components/ui/typography"

const SPACES = [
	{ id: "kitchen", emoji: "🍳" },
	{ id: "studio", emoji: "🎨" },
	{ id: "frontDesk", emoji: "🛎️" },
] as const

const STAGE_IDS = ["stt", "llm", "tts"] as const

const Box = ({
	title,
	sub,
	className = "",
}: {
	title: string
	sub?: string
	className?: string
}) => (
	<div
		className={`bg-secondary flex min-w-[7rem] flex-col items-center rounded-lg px-4 py-3 text-center shadow-sm ${className}`}
	>
		<span className="font-semibold">{title}</span>
		{sub ? <span className="text-muted-foreground text-xs">{sub}</span> : null}
	</div>
)

export async function Diagram() {
	const t = await getTranslations("technology.diagram")

	return (
		<Card>
			<CardHeader>
				<TypographyH2>{t("title")}</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col items-center gap-6">
				<TypographyLarge className="self-start">{t("intro")}</TypographyLarge>

				<div className="flex flex-wrap justify-center gap-4">
					{SPACES.map((space) => (
						<Box
							key={space.id}
							title={`${space.emoji} ${t(`spaces.${space.id}`)}`}
							sub={t("spaceSub")}
						/>
					))}
				</div>

				<div className="text-muted-foreground flex flex-col items-center">
					<ArrowDown className="animate-pulse" />
					<TypographySmall>{t("transport")}</TypographySmall>
					<ArrowDown className="animate-pulse" />
				</div>

				<div className="border-primary/30 flex w-full max-w-3xl flex-col items-center gap-4 rounded-xl border-2 border-dashed p-5">
					<span className="font-bold">{t("hub")}</span>
					<div className="flex flex-wrap items-center justify-center gap-2">
						{STAGE_IDS.map((id, index) => (
							<div key={id} className="flex items-center gap-2">
								<Box title={t(`stages.${id}`)} />
								{index < STAGE_IDS.length - 1 ? (
									<span className="text-muted-foreground">→</span>
								) : null}
							</div>
						))}
					</div>
					<div className="flex flex-wrap justify-center gap-3">
						<Box title={t("discovery.title")} sub={t("discovery.sub")} />
						<Box title={t("config.title")} sub={t("config.sub")} />
					</div>
				</div>

				<TypographyLarge className="text-center">{t("models")}</TypographyLarge>

				<TypographySmall className="text-muted-foreground text-center">
					{t("footnote")}
				</TypographySmall>
			</CardContent>
		</Card>
	)
}
