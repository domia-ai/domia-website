import Image from "next/image"
import Link from "next/link"

export default function NotFound() {
	return (
		<div className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center px-6 text-center">
			<Image
				src="/not-found.webp"
				alt="Domia not found"
				width={320}
				height={320}
				className="mb-6"
				priority
			/>
			<h1 className="mb-2 text-4xl font-bold">Oops! Page not found</h1>
			<p className="text-muted-foreground mb-6 max-w-md">
				Domia couldn’t find what you’re looking for. The page might have moved
				or no longer exists.
			</p>
			<Link
				href="/"
				className="bg-primary text-primary-foreground rounded-md px-5 py-2 text-sm font-medium transition hover:opacity-90"
			>
				🔙 Return Home
			</Link>
		</div>
	)
}
