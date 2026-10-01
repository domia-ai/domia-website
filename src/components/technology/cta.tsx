import { getTranslations } from "next-intl/server"

import { githubUrl } from "@/constants"

import { CtaBand } from "@/components/sections"

export async function Cta() {
	const t = await getTranslations("technology.cta")

	return (
		<CtaBand
			title={t("title")}
			subtitle={t("subtitle")}
			primary={{ href: githubUrl, label: t("primary") }}
			secondary={{ href: "/run", label: t("secondary") }}
		/>
	)
}
