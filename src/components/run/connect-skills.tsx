import { ArrowRight, House, Music, Plug } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { LinkButton, ProofGrid, Section } from "@/components/sections"
import type { ProofItem } from "@/components/sections"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"
import { connectSkillIds, skillsMapHref } from "@/constants/run"

import type { ConnectSkillId } from "./types"

const skillIcons: Record<ConnectSkillId, ProofItem["icon"]> = {
	homeAssistant: House,
	musicAssistant: Music,
	mcp: Plug,
}

export async function ConnectSkills() {
	const t = await getTranslations("run.connectSkills")

	const items: ProofItem[] = connectSkillIds.map((id) => ({
		id,
		title: t(`items.${id}.title`),
		body: t(`items.${id}.body`),
		icon: skillIcons[id],
	}))

	return (
		<Section id="connect-skills" tone="alt" labelledBy="connect-skills-title">
			<div className="flex flex-col gap-10">
				<div className="flex max-w-3xl flex-col gap-4">
					<TypographyH2 id="connect-skills-title">{t("title")}</TypographyH2>
					<TypographyLarge className="text-muted-foreground">
						{t("intro")}
					</TypographyLarge>
				</div>
				<ProofGrid items={items} columns={3} />
				<div>
					<LinkButton href={skillsMapHref} variant="outline">
						{t("link")}
						<ArrowRight data-icon="inline-end" aria-hidden="true" />
					</LinkButton>
				</div>
			</div>
		</Section>
	)
}
