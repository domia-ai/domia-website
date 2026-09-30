import { getTranslations } from "next-intl/server"

import { CtaBand } from "@/components/sections"

export async function Cta() {
	const t = await getTranslations("technology.cta")

	return (
		<CtaBand
			title={t("title")}
			subtitle={t("subtitle")}
			primary={{ href: "https://github.com/domia-ai", label: t("primary") }}
			secondary={{ href: "/run", label: t("secondary") }}
		/>
	)
}
