import z from "zod"

import { zObject, zStringMax, zEmailRequired } from "./shared"

export const contactFormSchema = zObject({
	name: zStringMax(50),
	email: zEmailRequired,
	subject: zStringMax(100),
	message: zStringMax(1000),
})

export const buildContactFormSchema = (t: (key: string) => string) =>
	zObject({
		name: z.string().max(50, t("errors.nameMax")),
		email: z
			.string()
			.min(1, t("errors.emailRequired"))
			.email(t("errors.emailInvalid")),
		subject: z.string().max(100, t("errors.subjectMax")),
		message: z.string().max(1000, t("errors.messageMax")),
	})
