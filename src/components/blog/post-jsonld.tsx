import type { BlogPost } from "@/content/blog"

export function PostJsonLd({ post }: { post: BlogPost }) {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: post.title,
		description: post.description,
		datePublished: post.date,
		dateModified: post.date,
		author: { "@type": "Organization", name: "Domia" },
		publisher: { "@id": "https://domia.ai/#organization" },
		mainEntityOfPage: `https://domia.ai/blog/${post.slug}`,
		keywords: post.keywords.join(", "),
	}

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
		/>
	)
}
