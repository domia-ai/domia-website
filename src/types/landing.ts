import z from "zod"

import { contactFormSchema, contactFormResponseSchema } from "@/schemas/landing"

export type ContactFormType = z.infer<typeof contactFormSchema>
export type ContactFormResponseType = z.infer<typeof contactFormResponseSchema>
