import { getTranslations } from "next-intl/server"

import { localizedMetadata, pageLocale } from "@/i18n/page"
import {
	Hero,
	Mission,
	Vision,
	Values,
	Promise,
	Join,
	Manifesto,
	Name,
	Future,
} from "@/components/about"
import { CtaBand } from "@/components/common/cta-band"
import { BreadcrumbsJsonLd } from "@/components/seo/breadcrumbs"

export const generateMetadata = localizedMetadata("/about", "about")

export default async function About(props: PageProps<"/[locale]/about">) {
	const locale = await pageLocale(props.params)
	const t = await getTranslations({ locale, namespace: "meta" })

	return (
		<div className="flex flex-col gap-10">
			<BreadcrumbsJsonLd
				items={[{ name: t("about.breadcrumb"), path: "/about" }]}
			/>
			<Hero />
			<Name />
			<Mission />
			<Vision />
			<Values />
			<Promise />
			<Join />
			<Manifesto />
			<Future />
			<CtaBand />
		</div>
	)
}
