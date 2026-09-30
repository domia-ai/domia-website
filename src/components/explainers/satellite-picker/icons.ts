import {
	AudioLines,
	CheckCheck,
	Cpu,
	Dot,
	Ear,
	Globe,
	Lightbulb,
	Megaphone,
	Mic,
	Radio,
	Speaker,
	Volume2,
	type LucideIcon,
} from "lucide-react"

import type { SatelliteProtocolId } from "@/data/types"

export const protocolIcons: Record<SatelliteProtocolId, LucideIcon> = {
	esphome: Speaker,
	wyoming: Radio,
	livekit: Globe,
	websocket: Cpu,
}

const onDeviceIcons: Record<string, LucideIcon> = {
	wakeWord: Ear,
	audioIn: Mic,
	audioOut: Volume2,
	leds: Lightbulb,
}

const streamIcons: Record<string, LucideIcon> = {
	audioIn: Mic,
	replyAudio: Volume2,
	replyAudioAdvertisedFormat: AudioLines,
	announcements: Megaphone,
	audioPlayedStamp: CheckCheck,
}

export const onDeviceIcon = (id: string) => onDeviceIcons[id] ?? Dot
export const streamIcon = (id: string) => streamIcons[id] ?? Dot
