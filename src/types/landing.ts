import z from "zod"

import { contactFormSchema } from "@/schemas/landing"

export type ContactFormType = z.infer<typeof contactFormSchema>
export type ContactFormResponseType = {
	success: boolean
	code: "sent" | "invalid" | "error"
}
