import { getTranslations } from "next-intl/server"

import { localizedMetadata, pageLocale } from "@/i18n/page"
import { Hero, Nav, Engines, Privacy, Cta } from "@/components/technology"
import {
	MemoryLayersExplainer,
	PipelineExplainer,
	SatellitePickerExplainer,
	SayItExplainer,
	SkillsMapExplainer,
	TopologiesExplainer,
} from "@/components/explainers"
import { BreadcrumbsJsonLd } from "@/components/seo/breadcrumbs"

export const generateMetadata = localizedMetadata("/technology", "technology")

export default async function Technology(
	props: PageProps<"/[locale]/technology">,
) {
	const locale = await pageLocale(props.params)
	const t = await getTranslations({ locale, namespace: "meta" })

	return (
		<div className="flex flex-col">
			<BreadcrumbsJsonLd
				items={[{ name: t("technology.breadcrumb"), path: "/technology" }]}
			/>
			<Hero />
			<Nav />
			<PipelineExplainer tone="alt" />
			<SayItExplainer tone="base" />
			<MemoryLayersExplainer tone="base" />
			<TopologiesExplainer tone="alt" />
			<SatellitePickerExplainer tone="base" />
			<SkillsMapExplainer tone="alt" />
			<Engines />
			<Privacy />
			<Cta />
		</div>
	)
}
