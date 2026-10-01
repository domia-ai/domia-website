import { getLocale, getTranslations } from "next-intl/server"

import type { TurnPath, TurnRoom } from "@/data/types"
import { recordFrom } from "@/lib/record"

import type { ListenCopy } from "./types"

const PATHS: TurnPath[] = [
	"fast",
	"tool",
	"llm",
	"memory",
	"knowledge",
	"routine",
	"skill",
]
const ROOMS: TurnRoom[] = [
	"kitchen",
	"cinema",
	"hallway",
	"guest",
	"entrance",
	"terrace",
]

export const loadListenCopy = async (): Promise<ListenCopy> => {
	const t = await getTranslations("listen")

	return {
		play: t("play"),
		stop: t("stop"),
		phases: {
			idle: t("phases.idle"),
			listening: t("phases.listening"),
			thinking: t("phases.thinking"),
			speaking: t("phases.speaking"),
		},
		paths: recordFrom(PATHS, (path) => t(`paths.${path}`)),
		rooms: recordFrom(ROOMS, (room) => t(`rooms.${room}`)),
		firstAudio: t.raw("firstAudio"),
		locale: await getLocale(),
		more: t("more"),
		less: t("less"),
	}
}
