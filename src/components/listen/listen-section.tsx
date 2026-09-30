import { getTranslations } from "next-intl/server"

import { Section } from "@/components/sections"
import {
	TypographyH2,
	TypographyLarge,
	TypographySmall,
} from "@/components/ui/typography"
import { loadTurns } from "@/data"
import type { TurnPath, TurnRoom } from "@/data/types"

import { LISTEN_DEFAULT_LIMIT } from "./constants"
import { ListenStrip } from "./listen-strip"
import type { ListenCopy, ListenSectionProps } from "./types"

const PATHS: TurnPath[] = [
	"fast",
	"tool",
	"llm",
	"memory",
	"knowledge",
	"routine",
]
const ROOMS: TurnRoom[] = [
	"kitchen",
	"cinema",
	"hallway",
	"guest",
	"entrance",
	"terrace",
]

export async function ListenSection({
	video,
	tone = "alt",
	limit = LISTEN_DEFAULT_LIMIT,
}: ListenSectionProps) {
	const t = await getTranslations("listen")
	const all = loadTurns().turns
	const turns = (
		video ? all.filter((turn) => turn.video === video) : all
	).slice(0, limit)
	if (turns.length === 0) return null

	const copy: ListenCopy = {
		play: t("play"),
		stop: t("stop"),
		phases: {
			idle: t("phases.idle"),
			listening: t("phases.listening"),
			thinking: t("phases.thinking"),
			speaking: t("phases.speaking"),
		},
		paths: Object.fromEntries(
			PATHS.map((p) => [p, t(`paths.${p}`)]),
		) as ListenCopy["paths"],
		rooms: Object.fromEntries(
			ROOMS.map((r) => [r, t(`rooms.${r}`)]),
		) as ListenCopy["rooms"],
		firstAudio: t("firstAudio"),
		replayNote: t("replayNote"),
	}

	return (
		<Section tone={tone} labelledBy="listen-title">
			<div className="flex flex-col gap-8">
				<div className="flex max-w-3xl flex-col gap-3">
					<TypographyH2 id="listen-title">{t("title")}</TypographyH2>
					<TypographyLarge className="text-muted-foreground">
						{t("body")}
					</TypographyLarge>
				</div>
				<ListenStrip turns={turns} copy={copy} />
				<TypographySmall className="text-muted-foreground">
					{copy.replayNote}
				</TypographySmall>
			</div>
		</Section>
	)
}
