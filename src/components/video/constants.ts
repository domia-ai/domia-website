import type { DemoVideoId, DemoVideoSpec } from "./types"

const VIDEO_HOST = process.env.NEXT_PUBLIC_VIDEO_HOST

export const DEMO_VIDEOS: Record<DemoVideoId, DemoVideoSpec> = {
	evening: {
		src: `${VIDEO_HOST}/domia-evening.mp4`,
		poster: "/video/domia-evening-poster.webp",
		width: 1920,
		height: 1080,
		duration: "PT1M16S",
		uploadDate: "2026-09-30",
	},
	console: {
		src: `${VIDEO_HOST}/domia-console.mp4`,
		poster: "/video/domia-console-poster.webp",
		width: 1920,
		height: 1080,
		duration: "PT58S",
		uploadDate: "2026-09-30",
	},
	hosting: {
		src: `${VIDEO_HOST}/domia-hosting.mp4`,
		poster: "/video/domia-hosting-poster.webp",
		width: 1920,
		height: 1080,
		duration: "PT36S",
		uploadDate: "2026-09-30",
	},
}
