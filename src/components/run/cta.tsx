import { getTranslations } from "next-intl/server"

import { CtaBand } from "@/components/sections"
import { demoUrl } from "@/constants"
import { gettingStartedUrl } from "@/constants/run"

export async function Cta() {
	const t = await getTranslations("run.cta")

	return (
		<CtaBand
			title={t("title")}
			subtitle={t("subtitle")}
			primary={{ href: gettingStartedUrl, label: t("primary") }}
			secondary={{ href: demoUrl, label: t("secondary") }}
		/>
	)
}
