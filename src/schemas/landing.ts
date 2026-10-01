import z from "zod"

export const contactFormSchema = z.object({
	name: z.string().max(50, "Must be at most 50 characters"),
	email: z.string().min(1, "Email is required").email("Invalid email address"),
	subject: z.string().max(100, "Must be at most 100 characters"),
	message: z
		.string()
		.trim()
		.min(1, "Message is required")
		.max(1000, "Must be at most 1000 characters"),
})

export const buildContactFormSchema = (t: (key: string) => string) =>
	z.object({
		name: z.string().max(50, t("errors.nameMax")),
		email: z
			.string()
			.min(1, t("errors.emailRequired"))
			.email(t("errors.emailInvalid")),
		subject: z.string().max(100, t("errors.subjectMax")),
		message: z
			.string()
			.trim()
			.min(1, t("errors.messageRequired"))
			.max(1000, t("errors.messageMax")),
	})
