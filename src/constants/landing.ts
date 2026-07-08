import {
	GithubIcon,
	XIcon,
	DiscordIcon,
	EmailIcon,
} from "@/components/landing/icons"

export const routes = [
	"/about",
	"/technology",
	"/marketplace",
	"/experience",
	"/cases",
	"/community",
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
		href: "mailto:hello@domia.ai",
		icon: EmailIcon,
	},
]

export const demoUrl = "https://console.domia.ai"

export const personasShowcase = [
	{
		id: "chef",
		image: "/collection/chef.webp",
		name: "The Chef",
	},
	{
		id: "teacher",
		image: "/collection/teacher.webp",
		name: "The Teacher",
	},
	{
		id: "musician",
		image: "/collection/musician.webp",
		name: "The Musician",
	},
	{
		id: "doctor",
		image: "/collection/doctor.webp",
		name: "The Doctor",
	},
	{
		id: "investigator",
		image: "/collection/investigator.webp",
		name: "The Investigator",
	},
	{
		id: "gamer",
		image: "/collection/gamer.webp",
		name: "The Gamer",
	},
	{
		id: "explorer",
		image: "/collection/astronaut.webp",
		name: "The Explorer",
	},
	{
		id: "architect",
		image: "/collection/architect.webp",
		name: "The Architect",
	},
]

export const consoleCapabilityIds = [
	"fleet",
	"chat",
	"replay",
	"latency",
	"grading",
	"private",
] as const

export const featureIds = [
	"s2s",
	"personaPerSpace",
	"oneMind",
	"private",
	"mesh",
	"satellites",
	"multiTenant",
	"memory",
	"followUp",
	"bornMinimal",
	"tuned",
	"shape",
	"hardware",
	"openSource",
	"skills",
] as const

export const futureStepIds = [
	"multilingual",
	"episodicMemory",
	"voiceEngines",
	"mobile",
	"trainer",
] as const

export const coreValueIds = [
	"privacy",
	"emotional",
	"autonomy",
	"humanFirst",
	"community",
	"evolution",
] as const

export const contactFaqIds = [
	"speed",
	"collaborate",
	"smartHome",
	"chatbot",
	"earlyAccess",
] as const

export const engineIds = [
	"emotion",
	"memory",
	"personality",
	"profession",
	"motivation",
	"curiosity",
	"ethics",
	"social",
] as const
