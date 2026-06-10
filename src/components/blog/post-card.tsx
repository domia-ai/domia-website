import Link from "next/link"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
	TypographyH2,
	TypographyLarge,
	TypographySmall,
} from "@/components/ui/typography"
import type { BlogPost } from "@/content/blog"

export function PostCard({ post }: { post: BlogPost }) {
	return (
		<Link href={`/blog/${post.slug}`} className="group">
			<Card className="h-full transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
				<CardHeader>
					<TypographyH2>{post.title}</TypographyH2>
					<TypographySmall className="text-muted-foreground">
						{post.readingTime}
					</TypographySmall>
				</CardHeader>
				<CardContent>
					<TypographyLarge className="text-muted-foreground">
						{post.description}
					</TypographyLarge>
				</CardContent>
			</Card>
		</Link>
	)
}
