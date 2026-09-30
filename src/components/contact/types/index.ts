import type { ReactNode } from "react"

import type { contactFaqIds } from "@/constants/landing"
import type { ContactFormType } from "@/types"

export type ContactFaqId = (typeof contactFaqIds)[number]

export type ContactFaqPage = "technology" | "run" | "cases" | "console"

export type ContactFaqGroup = {
	id: "basics" | "running" | "skillsAndUse"
	faqIds: ContactFaqId[]
}

export type ContactChannelId = "email" | "github" | "discord"

export type ContactTextFieldName = keyof ContactFormType

export type ContactTextField = {
	name: ContactTextFieldName
	required?: boolean
	autoComplete?: string
	type?: "email"
	multiline?: boolean
	wide?: boolean
	showCounter?: boolean
}

export type FormFieldProps = {
	id: string
	label: string
	value: string
	onValueChange: (value: string) => void
	onBlur: () => void
	placeholder: string
	maxLength: number
	disabled: boolean
	required?: boolean
	error?: string
	hint?: ReactNode
	autoComplete?: string
	type?: "email"
	multiline?: boolean
	className?: string
}
