import { getTranslations } from "next-intl/server"

import { localizedMetadata, pageLocale } from "@/i18n/page"
import {
	Hero,
	Find,
	Importable,
	Skills,
	Module,
	Evolve,
	Adopted,
	Build,
	Create,
	Voice,
	Memory,
	Cultural,
	Aesthetic,
	Profession,
} from "@/components/marketplace"
import { BreadcrumbsJsonLd } from "@/components/seo/breadcrumbs"

export const generateMetadata = localizedMetadata("/marketplace", "marketplace")

export default async function Marketplace(
	props: PageProps<"/[locale]/marketplace">,
) {
	const locale = await pageLocale(props.params)
	const t = await getTranslations({ locale, namespace: "meta" })

	return (
		<div className="flex flex-col gap-10">
			<BreadcrumbsJsonLd
				items={[{ name: t("marketplace.breadcrumb"), path: "/marketplace" }]}
			/>
			<Hero />
			<Find />
			<Importable />
			<Skills />
			<Module />
			<Evolve />
			<Adopted />
			<Build />
			<Create />
			<Voice />
			<Memory />
			<Cultural />
			<Aesthetic />
			<Profession />
		</div>
	)
}
