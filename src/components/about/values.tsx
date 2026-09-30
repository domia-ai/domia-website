import { getTranslations } from "next-intl/server"
import { Globe, HardDrive, Layers, MapPin } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { ProofGrid, Section } from "@/components/sections"
import { TypographyH2 } from "@/components/ui/typography"

import { valueIds } from "./constants"
import type { ValueId } from "./types"

const valueIcons: Record<ValueId, LucideIcon> = {
	localFirst: HardDrive,
	anyPlace: MapPin,
	oneSoftware: Layers,
	public: Globe,
}

export async function Values() {
	const t = await getTranslations("about.values")

	return (
		<Section id="values" tone="base" labelledBy="values-title">
			<div className="flex flex-col gap-10">
				<TypographyH2 id="values-title" className="text-center">
					{t("title")}
				</TypographyH2>
				<ProofGrid
					columns={2}
					items={valueIds.map((id) => ({
						id,
						title: t(`items.${id}.title`),
						body: t(`items.${id}.body`),
						icon: valueIcons[id],
					}))}
				/>
			</div>
		</Section>
	)
}
