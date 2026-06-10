import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { PostArticle, PostJsonLd } from "@/components/blog"
import { BreadcrumbsJsonLd } from "@/components/seo/breadcrumbs"
import { getPost, posts } from "@/content/blog"

export function generateStaticParams() {
	return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>
}): Promise<Metadata> {
	const { slug } = await params
	const post = getPost(slug)
	if (!post) return {}
	return {
		title: post.title,
		description: post.description,
		keywords: post.keywords,
		alternates: { canonical: `/blog/${post.slug}` },
		openGraph: {
			type: "article",
			title: post.title,
			description: post.description,
			url: `https://domia.ai/blog/${post.slug}`,
		},
	}
}

export default async function BlogPostPage({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	const post = getPost(slug)
	if (!post) notFound()

	return (
		<>
			<PostJsonLd post={post} />
			<BreadcrumbsJsonLd
				items={[
					{ name: "Blog", path: "/blog" },
					{ name: post.title, path: `/blog/${post.slug}` },
				]}
			/>
			<PostArticle post={post} />
		</>
	)
}
