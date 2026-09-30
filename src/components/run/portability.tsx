import { ArrowLeftRight, LayoutTemplate } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { ProofGrid, Section } from "@/components/sections"
import type { ProofItem } from "@/components/sections"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

import type { PortabilityItemId } from "./types"

const itemIcons: Record<PortabilityItemId, ProofItem["icon"]> = {
	mind: ArrowLeftRight,
	templates: LayoutTemplate,
}

const itemIds: PortabilityItemId[] = ["mind", "templates"]

export async function Portability() {
	const t = await getTranslations("run.portability")

	const items: ProofItem[] = itemIds.map((id) => ({
		id,
		title: t(`items.${id}.title`),
		body: t(`items.${id}.body`),
		icon: itemIcons[id],
	}))

	return (
		<Section id="portability" tone="base" labelledBy="portability-title">
			<div className="flex flex-col gap-10">
				<div className="flex max-w-3xl flex-col gap-4">
					<TypographyH2 id="portability-title">{t("title")}</TypographyH2>
					<TypographyLarge className="text-muted-foreground">
						{t("intro")}
					</TypographyLarge>
				</div>
				<ProofGrid items={items} columns={2} />
			</div>
		</Section>
	)
}
