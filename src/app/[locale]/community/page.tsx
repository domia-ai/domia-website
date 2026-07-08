import { getTranslations } from "next-intl/server"

import { localizedMetadata, pageLocale } from "@/i18n/page"
import {
	Hero,
	Contributors,
	Ambassadors,
	Spaces,
	Partners,
	Academy,
	Chapters,
	Open,
	Recognition,
	Modules,
	Collabs,
} from "@/components/community"
import { CtaBand } from "@/components/common/cta-band"
import { BreadcrumbsJsonLd } from "@/components/seo/breadcrumbs"

export const generateMetadata = localizedMetadata("/community", "community")

export default async function Community(
	props: PageProps<"/[locale]/community">,
) {
	const locale = await pageLocale(props.params)
	const t = await getTranslations({ locale, namespace: "meta" })
	const tCta = await getTranslations({ locale, namespace: "community.ctaBand" })

	return (
		<div className="flex flex-col gap-10">
			<BreadcrumbsJsonLd
				items={[{ name: t("community.breadcrumb"), path: "/community" }]}
			/>
			<Hero />
			<Contributors />
			<Ambassadors />
			<Spaces />
			<Partners />
			<Academy />
			<Chapters />
			<Open />
			<Recognition />
			<Modules />
			<Collabs />
			<CtaBand
				title={tCta("title")}
				subtitle={tCta("subtitle")}
				contactLabel={tCta("contactLabel")}
			/>
		</div>
	)
}
