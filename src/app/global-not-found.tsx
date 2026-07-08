import "./globals.css"
import { outfitSans } from "@/fonts"

import Image from "next/image"
import Link from "next/link"
import { getLocale, getTranslations } from "next-intl/server"

import { localizedUrl, SITE_URL } from "@/i18n/urls"

export default async function GlobalNotFound() {
	const locale = await getLocale()
	const t = await getTranslations({ locale, namespace: "notFound" })
	const homeHref = localizedUrl("/", locale).replace(SITE_URL, "") || "/"

	return (
		<html lang={locale} suppressHydrationWarning>
			<body className={`${outfitSans.className} antialiased`}>
				<div className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center px-6 text-center">
					<Image
						src="/not-found.webp"
						alt={t("title")}
						width={320}
						height={320}
						className="mb-6"
						priority
					/>
					<h1 className="mb-2 text-4xl font-bold">{t("title")}</h1>
					<p className="text-muted-foreground mb-6 max-w-md">
						{t("description")}
					</p>
					<Link
						href={homeHref}
						className="bg-primary text-primary-foreground rounded-md px-5 py-2 text-sm font-medium transition hover:opacity-90"
					>
						{t("backHome")}
					</Link>
				</div>
			</body>
		</html>
	)
}
