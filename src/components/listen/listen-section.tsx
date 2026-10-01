import { getTranslations } from "next-intl/server"

import { Section } from "@/components/sections"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"
import { loadTurns } from "@/data"

import { loadListenCopy } from "./copy"
import { ListenStrip } from "./listen-strip"
import type { ListenSectionProps } from "./types"

export async function ListenSection({
	video,
	tone = "alt",
	featured,
}: ListenSectionProps) {
	const t = await getTranslations("listen")
	const all = loadTurns().turns.filter(
		(turn) => video === undefined || turn.video === video,
	)
	if (all.length === 0) throw new Error(`No turns for video ${video ?? "*"}`)
	const missing = (featured ?? []).filter(
		(id) => !all.some((turn) => turn.id === id),
	)
	if (missing.length > 0)
		throw new Error(`Featured turns are missing: ${missing.join(", ")}`)

	const rankOf = (id: string): number => {
		const rank = featured?.indexOf(id) ?? -1
		return rank === -1 ? Number.MAX_SAFE_INTEGER : rank
	}
	const turns = featured
		? [...all].sort((a, b) => rankOf(a.id) - rankOf(b.id))
		: all
	const visibleCount = featured
		? turns.filter((turn) => featured.includes(turn.id)).length
		: turns.length

	const copy = await loadListenCopy()

	return (
		<Section tone={tone} labelledBy="listen-title">
			<div className="flex flex-col gap-8">
				<div className="flex max-w-3xl flex-col gap-3">
					<TypographyH2 id="listen-title">{t("title")}</TypographyH2>
					<TypographyLarge className="text-muted-foreground">
						{t("body")}
					</TypographyLarge>
				</div>
				<ListenStrip turns={turns} visibleCount={visibleCount} copy={copy} />
			</div>
		</Section>
	)
}
