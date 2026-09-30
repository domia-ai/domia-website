import type { CSSProperties } from "react"
import Image from "next/image"
import { getTranslations } from "next-intl/server"

import { LinkButton, Section } from "@/components/sections"
import { DemoLink } from "@/components/landing/demo-link"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

import {
	CONSOLE_OVERVIEW_CROP,
	CONSOLE_SCREENSHOT_SIZES,
} from "./console-teaser-constants"
import type { ImageCrop } from "./types"

const percent = (value: number, total: number) => `${(value / total) * 100}%`

const cropFrameStyle = (crop: ImageCrop): CSSProperties => ({
	aspectRatio: `${crop.width} / ${crop.height}`,
})

const croppedImageStyle = (crop: ImageCrop): CSSProperties => ({
	width: percent(crop.sourceWidth, crop.width),
	left: `-${percent(crop.x, crop.width)}`,
	top: `-${percent(crop.y, crop.height)}`,
})

const themedScreens = [
	{ src: "/console/overview-light.webp", className: "dark:hidden" },
	{ src: "/console/overview-dark.webp", className: "hidden dark:block" },
]

export async function ConsoleTeaser() {
	const t = await getTranslations("landing.consoleTeaser")
	const crop = CONSOLE_OVERVIEW_CROP

	return (
		<Section tone="base" labelledBy="console-teaser-title">
			<div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
				<div className="flex flex-col gap-6">
					<TypographyH2 id="console-teaser-title">{t("title")}</TypographyH2>
					<TypographyLarge className="text-muted-foreground">
						{t("body")}
					</TypographyLarge>
					<div className="flex flex-wrap items-center gap-3">
						<LinkButton href="/console" size="lg" variant="outline">
							{t("link")}
						</LinkButton>
						<DemoLink variant="primary" label={t("demo")} />
					</div>
				</div>
				<Card className="py-0 shadow-sm">
					<div
						className="relative w-full overflow-hidden"
						style={cropFrameStyle(crop)}
					>
						{themedScreens.map(({ src, className }) => (
							<Image
								key={src}
								src={src}
								alt={t("imageAlt")}
								width={crop.sourceWidth}
								height={crop.sourceHeight}
								sizes={CONSOLE_SCREENSHOT_SIZES}
								className={cn("absolute h-auto max-w-none", className)}
								style={croppedImageStyle(crop)}
							/>
						))}
					</div>
				</Card>
			</div>
		</Section>
	)
}
