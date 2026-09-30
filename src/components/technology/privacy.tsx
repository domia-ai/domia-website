import { KeyRound, ShieldCheck, UserRound } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { ProofGrid, Section } from "@/components/sections"
import { TypographyH2 } from "@/components/ui/typography"

import type { IconItem } from "./types"

const privacyItems: IconItem[] = [
	{ id: "network", icon: ShieldCheck },
	{ id: "mesh", icon: KeyRound },
	{ id: "identities", icon: UserRound },
]

export async function Privacy() {
	const t = await getTranslations("technology.privacy")

	return (
		<Section id="privacy" tone="base" labelledBy="privacy-title">
			<div className="flex flex-col gap-10">
				<TypographyH2 id="privacy-title" className="max-w-3xl">
					{t("title")}
				</TypographyH2>
				<ProofGrid
					items={privacyItems.map(({ id, icon }) => ({
						id,
						icon,
						title: t(`items.${id}.title`),
						body: t(`items.${id}.body`),
					}))}
				/>
			</div>
		</Section>
	)
}
