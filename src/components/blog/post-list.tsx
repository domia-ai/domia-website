import { posts } from "@/content/blog"
import { PostCard } from "./post-card"

export function PostList() {
	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
			{posts.map((post) => (
				<PostCard key={post.slug} post={post} />
			))}
		</div>
	)
}
