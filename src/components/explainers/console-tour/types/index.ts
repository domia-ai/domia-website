import type { ReactNode } from "react"

import type { SectionTone } from "@/components/sections"
import type { ConsoleHotspot, ConsoleScreen } from "@/data/types"

import type { HintSide } from "@/components/explainers/shared"

export type HotspotCopy = {
	title: string
	body: string
}

export type ScreenCopy = {
	title: string
	summary: string
	imageAlt: string
	hotspots: Record<string, HotspotCopy>
}

export type DemoLinkCopy = {
	openScreen: string
	openHome: string
	caption: string
	notLiveYet: string
}

export type ConsoleTourCopy = {
	title: string
	intro: string
	tabsLabel: string
	moreScreens: string
	hotspotsHeading: string
	demo: DemoLinkCopy
	noscriptHeading: string
	screens: Record<string, ScreenCopy>
}

export type ConsoleTourGroups = {
	lead: ConsoleScreen[]
	more: ConsoleScreen[]
}

export type ConsoleTourState = {
	screen: string
}

export type ConsoleTourExplainerProps = {
	tone?: SectionTone
}

export type ConsoleTourViewProps = {
	groups: ConsoleTourGroups
	copy: ConsoleTourCopy
}

export type ScreenViewProps = {
	screen: ConsoleScreen
	copy: ScreenCopy
	hotspotsHeading: string
	demo: DemoLinkCopy
}

export type ScreenDemoLinkProps = {
	screen: ConsoleScreen
	copy: DemoLinkCopy
}

export type BrowserFrameProps = {
	route: string
	children: ReactNode
}

export type HotspotCropProps = {
	screen: ConsoleScreen
	hotspot: ConsoleHotspot
}

export type ActiveHotspot = string | null

export type ActiveHotspotChange = (id: ActiveHotspot) => void

export type HotspotMarkerProps = {
	hotspot: ConsoleHotspot
	index: number
	copy: HotspotCopy
	describedBy: string
	side: HintSide
	active: boolean
	onActiveChange: ActiveHotspotChange
	onActivate: (id: string) => void
}

export type HotspotListProps = {
	idPrefix: string
	heading: string
	hotspots: ConsoleHotspot[]
	copy: Record<string, HotspotCopy>
	active: ActiveHotspot
	onActiveChange: ActiveHotspotChange
}

export type StackedHotspotListProps = {
	heading: string
	screen: ConsoleScreen
	copy: Record<string, HotspotCopy>
}
