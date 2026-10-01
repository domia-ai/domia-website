import { getTranslations } from "next-intl/server"

import { LinkButton, ProofGrid, Section } from "@/components/sections"
import {
	TypographyH2,
	TypographyLarge,
	TypographyP,
} from "@/components/ui/typography"

import { privacyCodeUrls, privacyEntries } from "./constants"
import type { PrivacyGroupProps } from "./types"

export async function PrivacyGroup({ group, tone }: PrivacyGroupProps) {
	const t = await getTranslations(`privacy.${group}`)
	const titleId = `privacy-${group}-title`

	return (
		<Section id={group} tone={tone} labelledBy={titleId}>
			<div className="flex flex-col gap-10">
				<div className="flex max-w-3xl flex-col gap-4">
					<TypographyH2 id={titleId}>{t("title")}</TypographyH2>
					<TypographyLarge className="text-muted-foreground">
						{t("intro")}
					</TypographyLarge>
				</div>
				<ProofGrid
					columns={2}
					items={privacyEntries[group].map(({ id, icon }) => ({
						id,
						icon,
						title: t(`items.${id}.title`),
						body: t(`items.${id}.body`),
					}))}
				/>
				<div className="flex flex-col items-start gap-3">
					<TypographyP className="text-muted-foreground mt-0 max-w-3xl">
						{t("code.body")}
					</TypographyP>
					<LinkButton href={privacyCodeUrls[group]} variant="outline">
						{t("code.link")}
					</LinkButton>
				</div>
			</div>
		</Section>
	)
}
