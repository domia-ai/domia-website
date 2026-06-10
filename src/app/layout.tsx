import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

import { ThemeProvider } from "@/components/providers/theme"
import "./globals.css"
import { Footer, Navbar } from "@/components/landing"
import { Toaster } from "@/components/ui/sonner"

const outfitSans = Outfit({
	variable: "--font-outfit-sans",
	subsets: ["latin"],
	display: "swap",
})

export const metadata: Metadata = {
	title: {
		default:
			"Domia — Private Local Voice AI for Homes, Hotels & Intelligent Spaces",
		template: "%s | Domia",
	},
	description:
		"Domia is a private, local voice AI: on-device speech-to-speech with a personality, voice, and memory per room. Multi-room smart hub, no cloud audio. Runs on Raspberry Pi to Mac mini.",
	keywords: [
		"local voice AI",
		"local speech-to-speech AI",
		"private voice assistant",
		"offline AI assistant",
		"multi-room voice assistant",
		"on-device LLM",
		"AI concierge for hotels",
		"private AI for hotels",
		"Home Assistant voice AI",
		"Raspberry Pi AI assistant",
		"local AI companion",
		"Domia",
	],
	creator: "Domia Team",
	metadataBase: new URL("https://domia.ai"),
	alternates: {
		canonical: "/",
	},
	openGraph: {
		title:
			"Domia — Private Local Voice AI for Homes, Hotels & Intelligent Spaces",
		description:
			"On-device speech-to-speech voice AI with a personality and voice per room. One private smart hub, many rooms, no cloud audio.",
		url: "https://domia.ai",
		siteName: "Domia",
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "Domia — Private local voice AI for homes, hotels, and intelligent spaces",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Domia — Private Local Voice AI for Homes, Hotels & Spaces",
		description:
			"On-device speech-to-speech voice AI. A personality and voice per room. One private hub, no cloud audio.",
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

const jsonLd = {
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
			url: "https://domia.ai",
			description:
				"Private, local voice AI for homes, hotels, and intelligent spaces — on-device speech-to-speech, a personality per room, no cloud audio.",
			publisher: { "@id": "https://domia.ai/#organization" },
			inLanguage: "en",
		},
		{
			"@type": "SoftwareApplication",
			name: "Domia",
			applicationCategory: "BusinessApplication",
			operatingSystem: "macOS, Linux, Raspberry Pi OS",
			description:
				"Private, local voice AI: on-device speech-to-speech with a personality, voice, and memory per room. Multi-room smart hub, no cloud audio.",
			url: "https://domia.ai",
			publisher: { "@id": "https://domia.ai/#organization" },
			offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
		},
	],
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			</head>
			<body className={`${outfitSans.className} antialiased`}>
				<SpeedInsights />
				<Analytics />
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
			</body>
		</html>
	)
}
