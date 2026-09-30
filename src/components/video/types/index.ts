export type DemoVideoId = "evening" | "hosting" | "console"

export type DemoVideoSpec = {
	src: string
	poster: string
	width: number
	height: number
	duration: string
	uploadDate: string
}

export type DemoVideoSectionProps = {
	video: DemoVideoId
	tone?: "base" | "alt"
}

export type DemoVideoJsonLdProps = {
	video: DemoVideoId
}
