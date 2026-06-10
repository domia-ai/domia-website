import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	async redirects() {
		return [
			{
				source: "/nft",
				destination: "/experience#personas",
				permanent: true,
			},
		]
	},
}

export default nextConfig
