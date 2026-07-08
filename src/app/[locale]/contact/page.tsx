import { getTranslations } from "next-intl/server"

import { Hero, Form, Faqs } from "@/components/contact"
import { BreadcrumbsJsonLd } from "@/components/seo/breadcrumbs"
import { contactFaqIds } from "@/constants"
import { localizedMetadata, pageLocale } from "@/i18n/page"

export const generateMetadata = localizedMetadata("/contact", "contact")

export default async function Contact(props: PageProps<"/[locale]/contact">) {
	const locale = await pageLocale(props.params)

	const t = await getTranslations({ locale, namespace: "contact.faqs" })
	const tMeta = await getTranslations({ locale, namespace: "meta" })

	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: contactFaqIds.map((id) => ({
			"@type": "Question",
			name: t(`items.${id}.q`).replace(/^\p{Extended_Pictographic}+\s*/u, ""),
			acceptedAnswer: { "@type": "Answer", text: t(`items.${id}.a`) },
		})),
	}

	return (
		<div className="flex flex-col gap-10">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>
			<BreadcrumbsJsonLd
				items={[{ name: tMeta("contact.breadcrumb"), path: "/contact" }]}
			/>
			<Hero />
			<Form />
			<Faqs />
		</div>
	)
}
