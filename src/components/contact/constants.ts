import type { ContactFormType } from "@/types"

import type {
	ContactChannelId,
	ContactFaqGroup,
	ContactFaqId,
	ContactFaqPage,
	ContactTextField,
	ContactTextFieldName,
} from "./types"

export const contactFaqGroups: ContactFaqGroup[] = [
	{ id: "basics", faqIds: ["what", "privacy", "cost"] },
	{ id: "running", faqIds: ["hardware", "offline", "rooms", "internet"] },
	{
		id: "skillsAndUse",
		faqIds: ["smartHome", "homeAssistant", "skills", "guests", "interrupt"],
	},
]

export const contactFaqPages: Record<ContactFaqId, ContactFaqPage> = {
	what: "technology",
	privacy: "privacy",
	cost: "run",
	hardware: "run",
	offline: "technology",
	rooms: "console",
	internet: "console",
	smartHome: "technology",
	homeAssistant: "technology",
	skills: "console",
	guests: "cases",
	interrupt: "technology",
}

export const contactChannelIds: ContactChannelId[] = [
	"email",
	"github",
	"discord",
]

export const contactFormDefaults: ContactFormType = {
	name: "",
	email: "",
	subject: "",
	message: "",
}

export const contactTextFields: ContactTextField[] = [
	{ name: "name", autoComplete: "name" },
	{ name: "email", required: true, autoComplete: "email", type: "email" },
	{ name: "subject", wide: true },
	{
		name: "message",
		required: true,
		multiline: true,
		wide: true,
		showCounter: true,
	},
]

export const MESSAGE_ROWS = 6

export const CONTACT_FIELD_LIMITS: Record<ContactTextFieldName, number> = {
	name: 50,
	email: 254,
	subject: 100,
	message: 1000,
}

export const HERO_ART_SIZE = 320
