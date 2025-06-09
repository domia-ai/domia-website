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
	title: "Domia | The Local AI That Lives With You",
	description:
		"Domia is a fully local AI assistant with emotions, memory, and unique personality. Control your smart home, evolve with time, and stay 100% private.",
	keywords: [
		"Domia",
		"local AI",
		"AI assistant",
		"smart home",
		"emotion engine",
		"privacy AI",
		"offline AI",
		"home automation",
	],
	creator: "Domia Team",
	metadataBase: new URL("https://domia.ai"),
	openGraph: {
		title: "Domia | The Local AI That Lives With You",
		description:
			"The AI assistant with emotions and full offline control. Built for privacy. Made for you.",
		url: "https://domia.ai",
		siteName: "Domia",
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "Domia - Your Local AI Assistant",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Domia | The Local AI That Lives With You",
		description:
			"Offline AI assistant with emotion engine and smart home control.",
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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
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
