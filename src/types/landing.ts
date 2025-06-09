import z from "zod"

import { Rarity } from "@/constants"
import { contactFormSchema, contactFormResponseSchema } from "@/schemas/landing"

export type CollectionItemType = {
	name: string
	image: string
	rarity: Rarity
}

export type ContactFormType = z.infer<typeof contactFormSchema>
export type ContactFormResponseType = z.infer<typeof contactFormResponseSchema>
