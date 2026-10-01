import type { DemoVideoId, DemoVideoSpec } from "./types"

const VIDEO_HOST = process.env.NEXT_PUBLIC_VIDEO_HOST

if (!VIDEO_HOST) throw new Error("NEXT_PUBLIC_VIDEO_HOST is not set")

export const DEMO_VIDEOS: Record<DemoVideoId, DemoVideoSpec> = {
	evening: {
		src: `${VIDEO_HOST}/domia-evening.mp4`,
		poster: "/video/domia-evening-poster.webp",
		captions: "/video/domia-evening.en.vtt",
		width: 1920,
		height: 1080,
		duration: "PT1M2S",
		durationLabel: "1:02",
		uploadDate: "2026-10-01",
	},
	console: {
		src: `${VIDEO_HOST}/domia-console.mp4`,
		poster: "/video/domia-console-poster.webp",
		width: 1920,
		height: 1080,
		duration: "PT58S",
		durationLabel: "0:58",
		uploadDate: "2026-09-30",
	},
	hosting: {
		src: `${VIDEO_HOST}/domia-hosting.mp4`,
		poster: "/video/domia-hosting-poster.webp",
		captions: "/video/domia-hosting.en.vtt",
		width: 1920,
		height: 1080,
		duration: "PT36S",
		durationLabel: "0:36",
		uploadDate: "2026-09-30",
	},
}
