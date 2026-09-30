import type { Metadata } from "next"
import { outfitSans } from "@/fonts"
import { notFound } from "next/navigation"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import type { AbstractIntlMessages } from "next-intl"
import {
	getMessages,
	getTranslations,
	setRequestLocale,
} from "next-intl/server"
import { SITE_URL } from "@/i18n/urls"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

import { ThemeProvider } from "@/components/providers/theme"
import { Footer, Navbar } from "@/components/landing"
import { Toaster } from "@/components/ui/sonner"
import { routing } from "@/i18n/routing"
import {
	alternatesFor,
	localizedUrl,
	ogAlternateLocale,
	ogLocale,
} from "@/i18n/urls"

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const alternates = alternatesFor("/")
	const t = await getTranslations({ locale, namespace: "meta" })

	return {
		title: {
			default: t("home.title"),
			template: "%s | Domia",
		},
		description: t("home.description"),
		creator: "Domia",
		metadataBase: new URL(SITE_URL),
		alternates: {
			canonical: alternates.canonical(locale),
			languages: alternates.languages,
		},
		openGraph: {
			title: t("home.ogTitle"),
			description: t("home.ogDescription"),
			url: localizedUrl("/", locale),
			siteName: "Domia",
			images: [
				{
					url: "/og-image.png",
					width: 1200,
					height: 630,
					alt: t("home.ogImageAlt"),
				},
			],
			locale: ogLocale(locale),
			alternateLocale: ogAlternateLocale(locale),
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title: t("home.ogTitle"),
			description: t("home.twitterDescription"),
			site: "@domia_ai",
			creator: "@domia_ai",
			images: ["/og-image.png"],
		},
		icons: {
			icon: "/favicon.ico",
			shortcut: "/favicon-16x16.png",
			apple: "/apple-touch-icon.png",
		},
		robots: {
			index: true,
			follow: true,
		},
	}
}

const buildJsonLd = (locale: string, t: (key: string) => string) => ({
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "Organization",
			"@id": `${SITE_URL}/#organization`,
			name: "Domia",
			url: SITE_URL,
			logo: {
				"@type": "ImageObject",
				url: `${SITE_URL}/logo.png`,
				width: 512,
				height: 512,
			},
			sameAs: [
				"https://x.com/domia_ai",
				"https://github.com/domia-ai",
				"https://discord.gg/Sx4ACEMSyv",
			],
		},
		{
			"@type": "WebSite",
			"@id": `${SITE_URL}/#website`,
			name: "Domia",
			url: localizedUrl("/", locale),
			description: t("jsonLd.websiteDescription"),
			publisher: { "@id": `${SITE_URL}/#organization` },
			inLanguage: locale,
		},
		{
			"@type": "SoftwareApplication",
			"@id": `${SITE_URL}/#software`,
			name: "Domia",
			applicationCategory: "UtilitiesApplication",
			description: t("jsonLd.appDescription"),
			url: localizedUrl("/", locale),
			inLanguage: locale,
			publisher: { "@id": `${SITE_URL}/#organization` },
			offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
			isAccessibleForFree: true,
			license: "https://www.apache.org/licenses/LICENSE-2.0",
		},
		{
			"@type": "SoftwareSourceCode",
			"@id": `${SITE_URL}/#sourcecode`,
			name: "Domia",
			codeRepository: "https://github.com/domia-ai/domia-core",
			programmingLanguage: "TypeScript",
			runtimePlatform: "Node.js",
			license: "https://www.apache.org/licenses/LICENSE-2.0",
			about: { "@id": `${SITE_URL}/#organization` },
		},
	],
})

export default async function LocaleLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode
	params: Promise<{ locale: string }>
}>) {
	const { locale } = await params
	if (!hasLocale(routing.locales, locale)) notFound()
	setRequestLocale(locale)
	const t = await getTranslations({ locale, namespace: "meta" })
	const tNav = await getTranslations({ locale, namespace: "nav" })
	const { nav } = (await getMessages({ locale })) as {
		nav: AbstractIntlMessages
	}
	const clientMessages = { nav }

	return (
		<html lang={locale} data-scroll-behavior="smooth" suppressHydrationWarning>
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(buildJsonLd(locale, t)),
					}}
				/>
			</head>
			<body className={`${outfitSans.className} antialiased`}>
				<a
					href="#main"
					className="focus:bg-background focus:ring-ring/50 sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:px-3 focus:py-2 focus:ring-3"
				>
					{tNav("skipToContent")}
				</a>
				<SpeedInsights />
				<Analytics />
				<NextIntlClientProvider messages={clientMessages}>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<Navbar />
						<main id="main" className="flex min-h-[60vh] flex-col">
							{children}
						</main>
						<Toaster />
						<Footer />
					</ThemeProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
