import { getTranslations } from "next-intl/server"

import { ContactSection, Faqs, Hero } from "@/components/contact"
import { contactFaqGroups } from "@/components/contact/constants"
import { CtaBand } from "@/components/sections"
import { BreadcrumbsJsonLd } from "@/components/seo/breadcrumbs"
import { demoUrl } from "@/constants"
import { localizedMetadata, pageLocale } from "@/i18n/page"

export const generateMetadata = localizedMetadata("/contact", "contact")

export default async function Contact(props: PageProps<"/[locale]/contact">) {
	const locale = await pageLocale(props.params)

	const t = await getTranslations({ locale, namespace: "contact" })
	const tMeta = await getTranslations({ locale, namespace: "meta" })

	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: contactFaqGroups
			.flatMap((group) => group.faqIds)
			.map((id) => ({
				"@type": "Question",
				name: t(`faqs.items.${id}.q`),
				acceptedAnswer: { "@type": "Answer", text: t(`faqs.items.${id}.a`) },
			})),
	}

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>
			<BreadcrumbsJsonLd
				items={[{ name: tMeta("contact.breadcrumb"), path: "/contact" }]}
			/>
			<Hero />
			<Faqs />
			<ContactSection />
			<CtaBand
				title={t("closing.title")}
				subtitle={t("closing.subtitle")}
				primary={{ href: demoUrl, label: t("closing.primary") }}
				secondary={{ href: "/technology", label: t("closing.secondary") }}
			/>
		</>
	)
}
