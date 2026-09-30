import { getTranslations } from "next-intl/server"

import { InPageNav } from "@/components/sections"

const sectionIds = [
	"turn",
	"routing",
	"memory",
	"topologies",
	"satellites",
	"skills",
	"engines",
	"privacy",
] as const

export async function Nav() {
	const t = await getTranslations("technology.nav")

	return (
		<InPageNav
			label={t("label")}
			items={sectionIds.map((id) => ({ id, label: t(`items.${id}`) }))}
		/>
	)
}
