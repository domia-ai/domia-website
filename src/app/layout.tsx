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
		default: "Domia — Private local voice AI: a network of personalities",
		template: "%s | Domia",
	},
	description:
		"Domia is a private, open-source network of local voice AIs that share compute and run fully on your hardware. A personality, voice, and memory per device. Delegated inference, no cloud audio. Adapts to your hardware — better hardware, better experience.",
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
	metadataBase: new URL("https://domia.ai"),
	alternates: {
		canonical: "/",
	},
	openGraph: {
		title: "Domia — Private local voice AI: a network of personalities",
		description:
			"A networked voice AI built around delegated compute and a personality per device. On-device speech-to-speech, no cloud audio. Works for a single space, a whole home, a venue, or anything in between.",
		url: "https://domia.ai",
		siteName: "Domia",
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "Domia — Private local voice AI: a network of personalities, on-device speech-to-speech, no cloud audio",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Domia — Private local voice AI: a network of personalities",
		description:
			"On-device speech-to-speech with delegated compute and a personality per device. No cloud audio. Adapts to your hardware — better hardware, better experience.",
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
				"A networked private voice AI: on-device speech-to-speech, delegated inference, and a personality per device. No cloud audio.",
			publisher: { "@id": "https://domia.ai/#organization" },
			inLanguage: "en",
		},
		{
			"@type": "SoftwareApplication",
			name: "Domia",
			applicationCategory: "MultimediaApplication",
			operatingSystem: "macOS, Linux, Raspberry Pi OS",
			description:
				"A networked local voice AI built around delegated compute and a personality per device. On-device speech-to-speech with sherpa-onnx and Ollama. Adapts to your hardware — better hardware, better experience.",
			url: "https://domia.ai",
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
