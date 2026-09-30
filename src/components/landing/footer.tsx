import { getTranslations } from "next-intl/server"

import { Link } from "@/i18n/navigation"
import { routes, socialMediaLinks } from "@/constants"

const isWebLink = (href: string) => href.startsWith("http")

export async function Footer() {
	const t = await getTranslations("nav")

	return (
		<footer className="border-t">
			<div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
				<div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-between">
					<div className="flex flex-col items-center gap-2 md:items-start">
						<Link href="/" className="py-2 text-xl font-bold">
							Domia
						</Link>
						<p className="text-muted-foreground max-w-xs text-center text-sm md:text-left">
							{t("tagline")}
						</p>
					</div>

					<nav
						aria-label={t("footerNav")}
						className="flex flex-wrap justify-center gap-x-4"
					>
						{routes.map((route) => (
							<Link
								key={route}
								href={route}
								className="text-muted-foreground hover:text-primary inline-flex min-h-10 items-center px-1 text-sm transition-colors"
							>
								{t(route.slice(1))}
							</Link>
						))}
					</nav>
				</div>

				<div className="mt-8 flex flex-col items-center gap-4 border-t pt-8 md:flex-row md:justify-between">
					<p className="text-muted-foreground text-sm">{t("copyright")}</p>
					<ul className="flex list-none gap-x-2">
						{socialMediaLinks.map((item) => {
							const external = isWebLink(item.href)
							return (
								<li key={item.name}>
									<a
										href={item.href}
										target={external ? "_blank" : undefined}
										rel={external ? "noopener noreferrer" : undefined}
										className="text-muted-foreground hover:text-primary hover:bg-primary/5 flex size-10 items-center justify-center rounded-md transition-colors"
									>
										<span className="sr-only">
											{external
												? `${item.name} ${t("opensInNewTab")}`
												: item.name}
										</span>
										<item.icon aria-hidden="true" className="size-5" />
									</a>
								</li>
							)
						})}
					</ul>
				</div>
			</div>
		</footer>
	)
}
