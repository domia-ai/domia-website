import { getTranslations } from "next-intl/server"

import { CtaBand } from "@/components/sections"
import { demoUrl } from "@/constants"

export async function Cta() {
	const t = await getTranslations("experience.cta")

	return (
		<CtaBand
			title={t("title")}
			subtitle={t("subtitle")}
			primary={{ href: demoUrl, label: t("primary") }}
			secondary={{ href: "/run", label: t("secondary") }}
		/>
	)
}
