import Link from "next/link"

import { GithubIcon } from "@/components/landing/icons"
import { routes, socialMediaLinks } from "@/constants"

export function Footer() {
	return (
		<footer className="mt-24 border-t lg:mt-32">
			<div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
				<div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-between">
					<div className="flex flex-col items-center gap-2 md:items-start">
						<Link href="/" className="text-xl font-bold">
							Domia
						</Link>
						<p className="text-muted-foreground max-w-xs text-center text-sm md:text-left">
							Private local voice AI for homes, hotels, and intelligent spaces.
						</p>
					</div>

					<nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
						{routes.map((route) => (
							<Link
								key={route.href}
								href={route.href}
								className="text-muted-foreground hover:text-primary text-sm transition-colors"
							>
								{route.label}
							</Link>
						))}
						<a
							href="https://github.com/domia-ai"
							target="_blank"
							rel="noopener noreferrer"
							className="text-muted-foreground hover:text-primary inline-flex items-center gap-1 text-sm transition-colors"
						>
							<GithubIcon className="size-4" />
							GitHub
						</a>
					</nav>
				</div>

				<div className="mt-8 flex flex-col items-center gap-4 border-t pt-8 md:flex-row md:justify-between">
					<p className="text-muted-foreground text-sm">
						&copy; 2026 Domia, Inc. All rights reserved.
					</p>
					<div className="flex gap-x-6">
						{socialMediaLinks.map((item) => (
							<a
								key={item.name}
								href={item.href}
								target="_blank"
								rel="noopener noreferrer"
								className="text-muted-foreground hover:text-primary transition-colors"
							>
								<span className="sr-only">{item.name}</span>
								<item.icon aria-hidden="true" className="size-5" />
							</a>
						))}
					</div>
				</div>
			</div>
		</footer>
	)
}
