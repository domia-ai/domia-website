import { getTranslations } from "next-intl/server"

import { localizedMetadata, pageLocale } from "@/i18n/page"
import { localizedUrl, SITE_URL } from "@/i18n/urls"
import { demoUrl } from "@/constants"
import { Community, Hero, Values, WhyItExists } from "@/components/about"
import { CtaBand } from "@/components/sections"
import { BreadcrumbsJsonLd } from "@/components/seo/breadcrumbs"
import { JsonLd } from "@/components/seo/json-ld"

export const generateMetadata = localizedMetadata("/about", "about")

export default async function About(props: PageProps<"/[locale]/about">) {
	const locale = await pageLocale(props.params)
	const t = await getTranslations({ locale, namespace: "meta" })
	const cta = await getTranslations({ locale, namespace: "about.cta" })
	const pageUrl = localizedUrl("/about", locale)

	const aboutJsonLd = {
		"@context": "https://schema.org",
		"@type": "AboutPage",
		"@id": `${pageUrl}#webpage`,
		url: pageUrl,
		name: t("about.title"),
		description: t("about.description"),
		inLanguage: locale,
		isPartOf: { "@id": `${SITE_URL}/#website` },
		about: { "@id": `${SITE_URL}/#organization` },
	}

	return (
		<div className="flex flex-col">
			<JsonLd data={aboutJsonLd} />
			<BreadcrumbsJsonLd
				items={[{ name: t("about.breadcrumb"), path: "/about" }]}
			/>
			<Hero />
			<WhyItExists />
			<Values />
			<Community />
			<CtaBand
				title={cta("title")}
				subtitle={cta("subtitle")}
				primary={{ href: "/run", label: cta("run") }}
				secondary={{ href: demoUrl, label: cta("demo") }}
			/>
		</div>
	)
}
