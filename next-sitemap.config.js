/** @type {import('next-sitemap').IConfig} */
const PRIORITIES = {
	"/": 1.0,
	"/technology": 0.9,
	"/cases": 0.9,
	"/experience": 0.8,
	"/marketplace": 0.8,
	"/nft": 0.8,
	"/blog": 0.8,
}

module.exports = {
	siteUrl: "https://domia.ai",
	generateRobotsTxt: true,
	changefreq: "weekly",
	transform: async (config, path) => ({
		loc: path,
		changefreq: path.startsWith("/blog") ? "weekly" : config.changefreq,
		priority: PRIORITIES[path] ?? 0.7,
		lastmod: new Date().toISOString(),
	}),
}
