"use client"

import { useState } from "react"
import { preload } from "react-dom"
import { getImageProps } from "next/image"
import { useTheme } from "next-themes"

import { HintProvider } from "@/components/explainers/shared"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ConsoleScreen } from "@/data/types"

import { ScreenPanel } from "./screen-panel"
import { CAPTURE_IMAGE_QUALITY, CAPTURE_IMAGE_SIZES } from "./constants"
import type { ConsoleTourState, ConsoleTourViewProps } from "./types"

const preloadCapture = (src: string) => {
	const { props } = getImageProps({
		src,
		alt: "",
		fill: true,
		sizes: CAPTURE_IMAGE_SIZES,
		quality: CAPTURE_IMAGE_QUALITY,
	})
	preload(props.src, {
		as: "image",
		imageSrcSet: props.srcSet,
		imageSizes: props.sizes,
		fetchPriority: "low",
	})
}

export function ConsoleTourIsland({ groups, copy }: ConsoleTourViewProps) {
	const screens = [...groups.lead, ...groups.more]
	const [state, setState] = useState<ConsoleTourState>({
		screen: screens[0].key,
	})
	const { resolvedTheme } = useTheme()
	const active =
		screens.find((screen) => screen.key === state.screen) ?? screens[0]

	const warmScreen = (screen: ConsoleScreen) =>
		preloadCapture(
			resolvedTheme === "dark" ? screen.image.dark : screen.image.light,
		)

	const trigger = (screen: ConsoleScreen, lead: boolean) => (
		<TabsTrigger
			key={screen.key}
			value={screen.key}
			variant={lead ? "solid" : "default"}
			onPointerEnter={() => warmScreen(screen)}
			onFocus={() => warmScreen(screen)}
			className={
				lead
					? "h-9 flex-none px-3"
					: "border-foreground/15 h-7 flex-none px-2 text-xs"
			}
		>
			{copy.screens[screen.key].title}
		</TabsTrigger>
	)

	return (
		<HintProvider>
			<Tabs
				value={active.key}
				onValueChange={(screen) => setState({ screen: String(screen) })}
				className="hidden md:flex"
			>
				<TabsList
					aria-label={copy.tabsLabel}
					className="w-full flex-col items-start gap-3 bg-transparent p-0 group-data-horizontal/tabs:h-auto md:group-data-horizontal/tabs:h-auto"
				>
					<div className="bg-muted border-foreground/15 flex flex-wrap gap-1 rounded-lg border p-[3px]">
						{groups.lead.map((screen) => trigger(screen, true))}
					</div>
					<div className="flex flex-wrap items-center gap-1">
						<span
							aria-hidden
							className="text-muted-foreground mr-1 text-xs font-medium tracking-wide uppercase"
						>
							{copy.moreScreens}
						</span>
						{groups.more.map((screen) => trigger(screen, false))}
					</div>
				</TabsList>
				<TabsContent value={active.key} className="pt-4">
					<ScreenPanel
						key={active.key}
						screen={active}
						copy={copy.screens[active.key]}
						hotspotsHeading={copy.hotspotsHeading}
						demo={copy.demo}
					/>
				</TabsContent>
			</Tabs>
		</HintProvider>
	)
}
