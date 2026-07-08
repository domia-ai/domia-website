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
		keywords: [
			"local voice AI",
			"open source voice AI",
			"open source Alexa alternative",
			"local speech-to-speech AI",
			"private voice assistant",
			"offline AI assistant",
			"on-device LLM",
			"self-hosted voice AI",
			"networked voice AI",
			"multi-room voice AI",
			"multi-room",
			"voice satellite",
			"ESPHome",
			"Wyoming protocol",
			"AI mesh",
			"voice AI delegation",
			"local AI companion",
			"voice AI personality",
			"Home Assistant voice AI",
			"MCP voice assistant",
			"TypeScript voice AI",
			"sherpa-onnx",
			"Ollama voice assistant",
			"Domia",
		],
		creator: "Domia Team",
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
			"@id": "https://domia.ai/#organization",
			name: "Domia",
			url: "https://domia.ai",
			logo: "https://domia.ai/og-image.png",
			sameAs: ["https://x.com/domia_ai", "https://github.com/domia-ai"],
		},
		{
			"@type": "WebSite",
			"@id": "https://domia.ai/#website",
			name: "Domia",
			url: localizedUrl("/", locale),
			description: t("jsonLd.websiteDescription"),
			publisher: { "@id": "https://domia.ai/#organization" },
			inLanguage: locale,
		},
		{
			"@type": "SoftwareApplication",
			name: "Domia",
			applicationCategory: "MultimediaApplication",
			operatingSystem: "macOS, Linux, Raspberry Pi OS",
			description: t("jsonLd.appDescription"),
			url: localizedUrl("/", locale),
			inLanguage: locale,
			publisher: { "@id": "https://domia.ai/#organization" },
			offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
			isAccessibleForFree: true,
			license: "https://www.apache.org/licenses/LICENSE-2.0",
		},
		{
			"@type": "SoftwareSourceCode",
			"@id": "https://domia.ai/#sourcecode",
			name: "Domia",
			codeRepository: "https://github.com/domia-ai/domia-core",
			programmingLanguage: "TypeScript",
			runtimePlatform: "Node.js",
			license: "https://www.apache.org/licenses/LICENSE-2.0",
			about: { "@id": "https://domia.ai/#organization" },
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
	const { nav, landing, contact } = (await getMessages({ locale })) as {
		nav: AbstractIntlMessages
		landing: { askAi: AbstractIntlMessages }
		contact: { form: AbstractIntlMessages }
	}
	const clientMessages = {
		nav,
		landing: { askAi: landing.askAi },
		contact: { form: contact.form },
	}

	return (
		<html lang={locale} suppressHydrationWarning>
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(buildJsonLd(locale, t)),
					}}
				/>
			</head>
			<body className={`${outfitSans.className} antialiased`}>
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
						<main className="flex justify-center px-2">
							<div className="w-full max-w-7xl">{children}</div>
						</main>
						<Toaster />
						<Footer />
					</ThemeProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
