import type { Metadata } from "next"

import { Hero, PostList } from "@/components/blog"
import { BreadcrumbsJsonLd } from "@/components/seo/breadcrumbs"

export const metadata: Metadata = {
	title: "Blog — Local Voice AI, Privacy & Self-Hosting",
	description:
		"Guides and explainers on local voice AI, speech-to-speech (S2S), self-hosting on small devices, and why private, on-device AI beats the cloud.",
	alternates: { canonical: "/blog" },
}

export default function Blog() {
	return (
		<div className="flex flex-col gap-10">
			<BreadcrumbsJsonLd items={[{ name: "Blog", path: "/blog" }]} />
			<Hero />
			<PostList />
		</div>
	)
}
