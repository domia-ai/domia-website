import { getLocale, getTranslations } from "next-intl/server"

import { ExplainerSection, LinkButton } from "@/components/sections"
import { loadTurns } from "@/data"
import type { Turn } from "@/data/types"
import { recordFrom } from "@/lib/record"

import { CHARACTERS_VIDEO, CHARACTER_IDS } from "./constants"
import { CharactersIsland } from "./island"
import type {
	CharacterId,
	CharacterQuestion,
	CharactersCopy,
	CharactersSectionProps,
} from "./types"

const turnOf = (turns: Turn[], id: CharacterId, index: number): Turn => {
	const turn = turns.find(
		(candidate) => candidate.id === `${CHARACTERS_VIDEO}-${id}-${index}`,
	)
	if (!turn) throw new Error(`Character turn ${id}-${index} is missing`)
	return turn
}

export async function CharactersSection({ tone }: CharactersSectionProps) {
	const t = await getTranslations("characters")
	const turns = loadTurns().turns.filter(
		(turn) => turn.video === CHARACTERS_VIDEO,
	)
	const [first] = CHARACTER_IDS
	const questionCount = turns.filter((turn) =>
		turn.id.startsWith(`${CHARACTERS_VIDEO}-${first}-`),
	).length
	if (questionCount === 0) throw new Error("Character turns are missing")
	const questions: CharacterQuestion[] = Array.from(
		{ length: questionCount },
		(_, index) => ({
			text: turnOf(turns, first, index).userText,
			turns: recordFrom(CHARACTER_IDS, (id) => turnOf(turns, id, index)),
		}),
	)

	const copy: CharactersCopy = {
		questionLabel: t("questionLabel"),
		play: t("play"),
		stop: t("stop"),
		firstAudio: t.raw("firstAudio"),
		locale: await getLocale(),
		traits: recordFrom(CHARACTER_IDS, (id) => t(`traits.${id}`)),
		yours: { title: t("yours.title"), body: t("yours.body") },
	}

	return (
		<ExplainerSection
			id="personas"
			title={t("title")}
			intro={t("intro")}
			tone={tone}
		>
			<div className="flex flex-col gap-8">
				<CharactersIsland questions={questions} copy={copy} />
				<div className="flex flex-wrap gap-2">
					<LinkButton href="/console#console-tour" variant="secondary">
						{t("seeRadar")}
					</LinkButton>
					<LinkButton href="/run" variant="outline">
						{t("runIt")}
					</LinkButton>
				</div>
			</div>
		</ExplainerSection>
	)
}
