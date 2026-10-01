export type DemoVideoId = "evening" | "hosting" | "console"

export type DemoVideoSpec = {
	src: string
	poster: string
	captions?: string
	width: number
	height: number
	duration: string
	durationLabel: string
	uploadDate: string
}

export type DemoVideoSectionProps = {
	video: DemoVideoId
	tone?: "base" | "alt"
}

export type DemoVideoJsonLdProps = {
	video: DemoVideoId
}

export type DemoVideoCopy = {
	label: string
	play: string
	captions: string
	unsupported: string
}

export type DemoVideoPlayerProps = {
	spec: DemoVideoSpec
	copy: DemoVideoCopy
}
