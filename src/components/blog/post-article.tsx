import { TypographyH1, TypographySmall } from "@/components/ui/typography"
import type { BlogPost } from "@/content/blog"

export function PostArticle({ post }: { post: BlogPost }) {
	const { Body } = post

	return (
		<article className="mx-auto flex max-w-3xl flex-col gap-6 py-6">
			<div className="flex flex-col gap-2">
				<TypographyH1 className="text-4xl leading-tight">
					{post.title}
				</TypographyH1>
				<TypographySmall className="text-muted-foreground">
					{post.readingTime}
				</TypographySmall>
			</div>
			<div className="flex flex-col gap-4">
				<Body />
			</div>
		</article>
	)
}
