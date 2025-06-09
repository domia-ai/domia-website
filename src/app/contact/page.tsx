import type { Metadata } from "next"

import { Hero, Form, Faqs } from "@/components/contact"

export const metadata: Metadata = {
	title: "Domia | Contact",
	description:
		"Get in touch with the Domia team. We’re here for questions, collaborations, and support — let’s build the future together.",
}

export default function Contact() {
	return (
		<div className="flex flex-col gap-10">
			<Hero />
			<Form />
			<Faqs />
		</div>
	)
}
