import {
	GithubIcon,
	XIcon,
	DiscordIcon,
	EmailIcon,
} from "@/components/landing/icons"

export const contactEmail = "hello@domia.ai"

export const routes = [
	"/technology",
	"/cases",
	"/run",
	"/console",
	"/about",
	"/contact",
] as const

export const socialMediaLinks = [
	{
		name: "X",
		href: "https://x.com/domia_ai",
		icon: XIcon,
	},
	{
		name: "GitHub",
		href: "https://github.com/domia-ai",
		icon: GithubIcon,
	},
	{
		name: "Discord",
		href: "https://discord.gg/Sx4ACEMSyv",
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
