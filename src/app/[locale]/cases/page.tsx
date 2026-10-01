import { getTranslations } from "next-intl/server"

import { localizedMetadata, pageLocale } from "@/i18n/page"
import { CaseGroup, Hero, SetupAlso } from "@/components/cases"
import { CtaBand } from "@/components/sections"
import { ListenSection } from "@/components/listen"
import { BreadcrumbsJsonLd } from "@/components/seo/breadcrumbs"
import { DemoVideoJsonLd, DemoVideoSection } from "@/components/video"
import { demoUrl } from "@/constants/landing"

export const generateMetadata = localizedMetadata("/cases", "cases")

export default async function Cases(props: PageProps<"/[locale]/cases">) {
	const locale = await pageLocale(props.params)
	const t = await getTranslations({ locale, namespace: "meta" })
	const tCta = await getTranslations({ locale, namespace: "cases.cta" })

	return (
		<div className="flex flex-col">
			<BreadcrumbsJsonLd
				items={[{ name: t("cases.breadcrumb"), path: "/cases" }]}
			/>
			<DemoVideoJsonLd video="hosting" />
			<Hero />
			<CaseGroup group="home" tone="alt" />
			<CaseGroup group="hospitality" tone="base" />
			<DemoVideoSection video="hosting" tone="alt" />
			<ListenSection video="hosting" tone="base" />
			<CaseGroup group="venues" tone="alt" />
			<SetupAlso tone="base" />
			<CtaBand
				title={tCta("title")}
				subtitle={tCta("subtitle")}
				primary={{ href: "/run", label: tCta("primary") }}
				secondary={{ href: demoUrl, label: tCta("secondary") }}
			/>
		</div>
	)
}
