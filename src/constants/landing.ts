import {
	GithubIcon,
	XIcon,
	DiscordIcon,
	EmailIcon,
} from "@/components/landing/icons"

import { githubUrl } from "./run"

export const contactEmail = "hello@domia.ai"

export const routes = [
	"/technology",
	"/cases",
	"/run",
	"/console",
	"/about",
	"/contact",
] as const

export const footerRoutes = [...routes, "/privacy"] as const

export const discordUrl = "https://discord.gg/Sx4ACEMSyv"

export const xUrl = "https://x.com/domia_ai"

export const socialMediaLinks = [
	{
		name: "X",
		href: xUrl,
		icon: XIcon,
	},
	{
		name: "GitHub",
		href: githubUrl,
		icon: GithubIcon,
	},
	{
		name: "Discord",
		href: discordUrl,
		icon: DiscordIcon,
	},
	{
		name: "Email",
		href: `mailto:${contactEmail}`,
		icon: EmailIcon,
	},
]

export const demoUrl = "https://console.domia.ai"

export const contactFaqIds = [
	"what",
	"privacy",
	"hardware",
	"offline",
	"cost",
	"smartHome",
	"homeAssistant",
	"skills",
	"guests",
	"rooms",
	"interrupt",
	"internet",
] as const
