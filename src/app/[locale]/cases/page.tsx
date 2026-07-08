import { getTranslations } from "next-intl/server"

import { localizedMetadata, pageLocale } from "@/i18n/page"
import {
	Hero,
	Smart,
	Host,
	Trainer,
	Wellness,
	Creative,
	Personas,
	Spaces,
	Cultural,
	Frontdesk,
	Devices,
} from "@/components/cases"
import { BreadcrumbsJsonLd } from "@/components/seo/breadcrumbs"
import { CtaBand } from "@/components/common/cta-band"

export const generateMetadata = localizedMetadata("/cases", "cases")

export default async function Cases(props: PageProps<"/[locale]/cases">) {
	const locale = await pageLocale(props.params)
	const t = await getTranslations({ locale, namespace: "meta" })
	const tCta = await getTranslations({ locale, namespace: "cases.ctaBand" })

	return (
		<div className="flex flex-col gap-10">
			<BreadcrumbsJsonLd
				items={[{ name: t("cases.breadcrumb"), path: "/cases" }]}
			/>
			<Hero />
			<Smart />
			<Host />
			<Trainer />
			<Wellness />
			<Creative />
			<Personas />
			<Spaces />
			<Cultural />
			<Frontdesk />
			<Devices />
			<CtaBand
				title={tCta("title")}
				subtitle={tCta("subtitle")}
				contactLabel={tCta("contactLabel")}
			/>
		</div>
	)
}
