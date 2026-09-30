import { getTranslations } from "next-intl/server"

import { localizedMetadata, pageLocale } from "@/i18n/page"
import { Hero, Proof, Cta } from "@/components/experience"
import { ConsoleTourExplainer } from "@/components/explainers"
import { BreadcrumbsJsonLd } from "@/components/seo/breadcrumbs"

export const generateMetadata = localizedMetadata("/console", "experience")

export default async function Experience(
	props: PageProps<"/[locale]/console">,
) {
	const locale = await pageLocale(props.params)
	const t = await getTranslations({ locale, namespace: "meta" })

	return (
		<div className="flex flex-col">
			<BreadcrumbsJsonLd
				items={[{ name: t("experience.breadcrumb"), path: "/console" }]}
			/>
			<Hero />
			<ConsoleTourExplainer tone="alt" />
			<Proof />
			<Cta />
		</div>
	)
}
