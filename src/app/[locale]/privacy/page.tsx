import { getTranslations } from "next-intl/server"

import { localizedMetadata, pageLocale } from "@/i18n/page"
import { PrivacyGroup } from "@/components/privacy"
import { CtaBand, SectionHero } from "@/components/sections"
import { BreadcrumbsJsonLd } from "@/components/seo/breadcrumbs"

export const generateMetadata = localizedMetadata("/privacy", "privacy")

export default async function Privacy(props: PageProps<"/[locale]/privacy">) {
	const locale = await pageLocale(props.params)
	const meta = await getTranslations({ locale, namespace: "meta" })
	const t = await getTranslations({ locale, namespace: "privacy" })

	return (
		<div className="flex flex-col">
			<BreadcrumbsJsonLd
				items={[{ name: meta("privacy.breadcrumb"), path: "/privacy" }]}
			/>
			<SectionHero
				eyebrow={t("hero.eyebrow")}
				title={t("hero.title")}
				subtitle={t("hero.subtitle")}
				className="py-10 md:py-14"
			/>
			<PrivacyGroup group="site" tone="alt" />
			<PrivacyGroup group="product" tone="base" />
			<CtaBand
				title={t("cta.title")}
				subtitle={t("cta.subtitle")}
				primary={{ href: "/contact", label: t("cta.primary") }}
				secondary={{ href: "/technology#privacy", label: t("cta.secondary") }}
			/>
		</div>
	)
}
