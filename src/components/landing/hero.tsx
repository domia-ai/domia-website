import Image from "next/image"
import { getTranslations } from "next-intl/server"

import { Button } from "@/components/ui/button"
import { GithubIcon } from "@/components/landing/icons"
import { DemoLink } from "@/components/landing/demo-link"
import { Link } from "@/i18n/navigation"
import {
	TypographyH1,
	TypographyLarge,
	TypographyXLarge,
} from "@/components/ui/typography"

export async function Hero() {
	const t = await getTranslations("landing.hero")

	return (
		<div className="flex flex-col-reverse lg:flex-row">
			<div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
				<span className="border-primary/30 bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold">
					<span className="bg-primary size-2 animate-pulse rounded-full" />
					{t("badge")}
				</span>

				<TypographyLarge className="text-primary font-semibold tracking-wide uppercase">
					{t("kicker")}
				</TypographyLarge>

				<TypographyH1 className="leading-tight">{t("title")}</TypographyH1>

				<TypographyXLarge className="max-w-md">
					{t("subtitle")}
				</TypographyXLarge>

				<div className="flex flex-wrap items-center justify-center gap-3">
					<DemoLink variant="primary" label={t("demo")} />
					<Button
						size="lg"
						nativeButton={false}
						render={
							<a
								href="https://github.com/domia-ai"
								target="_blank"
								rel="noopener noreferrer"
							/>
						}
					>
						<GithubIcon className="mr-2 size-4" />
						{t("github")}
					</Button>
					<Button
						size="lg"
						variant="outline"
						nativeButton={false}
						render={<Link href="/technology" />}
					>
						{t("how")}
					</Button>
				</div>
			</div>

			<div className="flex flex-1 items-center justify-center">
				<div className="relative">
					<div className="animate-halo absolute inset-0 z-0 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90% blur-2xl" />
					<Image
						src="/domia.webp"
						alt={t("imageAlt")}
						width={500}
						height={500}
						priority
						className="animate-domia-pulse relative z-10"
					/>
				</div>
			</div>
		</div>
	)
}
