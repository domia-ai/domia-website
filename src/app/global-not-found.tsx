import "./globals.css"
import { outfitSans } from "@/fonts"

import Image from "next/image"
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages, getTranslations } from "next-intl/server"

import { ThemeProvider } from "@/components/providers/theme"
import { Footer, Navbar } from "@/components/landing"
import { LinkButton } from "@/components/sections"
import { Link } from "@/i18n/navigation"

const suggestedRoutes = ["/technology", "/cases", "/run", "/contact"] as const

export default async function GlobalNotFound() {
	const locale = await getLocale()
	const t = await getTranslations({ locale, namespace: "notFound" })
	const tNav = await getTranslations({ locale, namespace: "nav" })
	const messages = await getMessages({ locale })

	return (
		<html lang={locale} suppressHydrationWarning>
			<head>
				<title>{`${t("title")} | Domia`}</title>
				<meta name="description" content={t("description")} />
			</head>
			<body className={`${outfitSans.className} antialiased`}>
				<a
					href="#main"
					className="focus:bg-background focus:ring-ring/50 sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:px-3 focus:py-2 focus:ring-3"
				>
					{tNav("skipToContent")}
				</a>
				<NextIntlClientProvider
					locale={locale}
					messages={{ nav: messages.nav }}
				>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<div className="bg-background text-foreground flex min-h-dvh flex-col">
							<Navbar />
							<main
								id="main"
								className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center"
							>
								<Image
									src="/not-found.webp"
									alt=""
									width={320}
									height={320}
									sizes="(min-width: 768px) 320px, 240px"
									className="mb-6 w-60 md:w-80"
									priority
								/>
								<h1 className="mb-2 text-4xl font-bold">{t("title")}</h1>
								<p className="text-muted-foreground mb-6 max-w-md">
									{t("description")}
								</p>
								<LinkButton href="/" size="lg">
									{t("backHome")}
								</LinkButton>
								<nav aria-label={t("sectionsLabel")} className="mt-8">
									<ul className="flex list-none flex-wrap justify-center gap-x-4">
										{suggestedRoutes.map((route) => (
											<li key={route}>
												<Link
													href={route}
													className="text-primary inline-flex min-h-10 items-center px-1 text-sm font-medium underline-offset-4 hover:underline"
												>
													{tNav(route.slice(1))}
												</Link>
											</li>
										))}
									</ul>
								</nav>
							</main>
							<Footer />
						</div>
					</ThemeProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
