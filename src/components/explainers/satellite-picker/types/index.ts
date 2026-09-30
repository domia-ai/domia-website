import type { SectionTone } from "@/components/sections"
import type {
	SatelliteProtocol,
	SatelliteProtocolId,
	SatellitesData,
} from "@/data/types"

export type SatelliteProtocolCopy = {
	name: string
	device: string
	connection: string
	onDevice: string[]
	streams: string[]
	caveats: string[]
}

export type SatelliteDetailsCopy = {
	heading: string
	onDevice: string
	streams: string
	caveats: string
}

export type SatelliteHubCopy = {
	title: string
	body: string
	hint: { title: string; body: string }
}

export type SatelliteRealtimeCopy = {
	title: string
	body: string
}

export type SatellitePickerCopy = {
	chooseLabel: string
	tabsLabel: string
	stageLabel: string
	protocols: Record<SatelliteProtocolId, SatelliteProtocolCopy>
	details: SatelliteDetailsCopy
	hub: SatelliteHubCopy
	hintIndexHeading: string
	realtime: SatelliteRealtimeCopy
}

export type SatellitePickerState = {
	protocol: SatelliteProtocolId
}

export type SatellitePickerExplainerProps = {
	tone?: SectionTone
}

export type SatellitePickerIslandProps = {
	data: SatellitesData
	copy: SatellitePickerCopy
}

export type DeviceCardsProps = {
	protocols: SatelliteProtocol[]
	copy: SatellitePickerCopy
}

export type HubCardProps = {
	copy: SatelliteHubCopy
}

export type LinkLinesProps = {
	count: number
	selectedIndex: number
}

export type DetailsPanelProps = {
	protocol: SatelliteProtocol
	copy: SatelliteProtocolCopy
	labels: SatelliteDetailsCopy
}

export type RealtimeCardProps = {
	copy: SatelliteRealtimeCopy
}

export type StackedProps = SatellitePickerIslandProps &
	SatellitePickerState & {
		onProtocolChange: (protocol: SatelliteProtocolId) => void
	}

export type LayoutRect = {
	x: number
	y: number
	width: number
	height: number
}

export type LayoutPoint = {
	x: number
	y: number
}
