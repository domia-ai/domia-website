import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts")

const nextConfig: NextConfig = {
	turbopack: {},
	experimental: {
		globalNotFound: true,
	},
	async redirects() {
		return [
			{ source: "/experience", destination: "/console", permanent: true },
			{ source: "/marketplace", destination: "/run", permanent: true },
			{ source: "/community", destination: "/about", permanent: true },
			{ source: "/es/experience", destination: "/es/console", permanent: true },
			{ source: "/es/marketplace", destination: "/es/run", permanent: true },
			{ source: "/es/community", destination: "/es/about", permanent: true },
		]
	},
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{ key: "X-Content-Type-Options", value: "nosniff" },
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
					{
						key: "Permissions-Policy",
						value: "camera=(), microphone=(), geolocation=()",
					},
				],
			},
		]
	},
}

export default withNextIntl(nextConfig)
