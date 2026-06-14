import type { Metadata } from "next"

import { Hero, Form, Faqs } from "@/components/contact"
import { contactFaqs } from "@/constants"

export const metadata: Metadata = {
	title: "Contact & Early Access",
	description:
		"Get in touch with the Domia team — questions, collaborations, pilots, or early access to a private local voice AI. Let’s build the future together.",
	alternates: { canonical: "/contact" },
}

const faqJsonLd = {
	"@context": "https://schema.org",
	"@type": "FAQPage",
	mainEntity: contactFaqs.map((faq) => ({
		"@type": "Question",
		name: faq.q.replace(/^[^\w]+\s*/, ""),
		acceptedAnswer: { "@type": "Answer", text: faq.a },
	})),
}

export default function Contact() {
	return (
		<div className="flex flex-col gap-10">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>
			<Hero />
			<Form />
			<Faqs />
		</div>
	)
}
