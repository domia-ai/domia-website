import { ArrowRight, House, KeyRound } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { LinkButton, ProofGrid, Section } from "@/components/sections"
import { TypographyH2 } from "@/components/ui/typography"

import type { ProofEntry } from "./types"

const useCaseItems: ProofEntry[] = [
	{ id: "home", icon: House },
	{ id: "hosting", icon: KeyRound },
]

export async function UseCasesStrip() {
	const t = await getTranslations("landing.useCases")

	return (
		<Section tone="base" labelledBy="use-cases-title">
			<div className="flex flex-col gap-10">
				<TypographyH2 id="use-cases-title" className="text-center">
					{t("title")}
				</TypographyH2>
				<ProofGrid
					columns={2}
					items={useCaseItems.map(({ id, icon }) => ({
						id,
						icon,
						title: t(`${id}.title`),
						body: t(`${id}.body`),
					}))}
				/>
				<LinkButton href="/cases" variant="outline" className="self-center">
					{t("link")}
					<ArrowRight data-icon="inline-end" aria-hidden="true" />
				</LinkButton>
			</div>
		</Section>
	)
}
