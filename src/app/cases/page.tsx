import type { Metadata } from "next"

import {
	Hero,
	Smart,
	Host,
	Trainer,
	Wellness,
	Creative,
	Personas,
	Spaces,
	Cultural,
	Frontdesk,
	Devices,
} from "@/components/cases"
import { BreadcrumbsJsonLd } from "@/components/seo/breadcrumbs"
import { CtaBand } from "@/components/common/cta-band"

export const metadata: Metadata = {
	title: "Use Cases — Homes, Venues, Businesses & Beyond",
	description:
		"Real-world use cases for Domia — a private, local voice AI for homes, hospitality, wellness, creative work, businesses, and public spaces. A personality per space, on your own hardware.",
	alternates: { canonical: "/cases" },
}

export default function Cases() {
	return (
		<div className="flex flex-col gap-10">
			<BreadcrumbsJsonLd items={[{ name: "Use Cases", path: "/cases" }]} />
			<Hero />
			<Smart />
			<Host />
			<Trainer />
			<Wellness />
			<Creative />
			<Personas />
			<Spaces />
			<Cultural />
			<Frontdesk />
			<Devices />
			<CtaBand
				title="Operators & builders — let’s talk"
				subtitle="Deploying Domia across spaces or a property? Tell us about your space, or dig into the source on GitHub."
				contactLabel="Talk to us"
			/>
		</div>
	)
}
