"use server"

import { ContactFormType, ContactFormResponseType } from "@/types"
import { contactFormSchema } from "@/schemas"

export async function submitContactForm(
	data: ContactFormType,
): Promise<ContactFormResponseType> {
	try {
		const result = contactFormSchema.safeParse(data)

		if (!result.success) {
			return {
				success: false,
				message: "❌ Oops!",
				description: "Invalid input",
			}
		}

		// const { name, email, subject, message } = result.data

		// TODO: Add your email sending logic here
		// For example: await sendEmail(result.data)

		return {
			success: true,
			message: "✈️ Message sent!",
			description:
				"Thanks for reaching out. Domia and the team have received your message and we’ll get back to you shortly.",
		}
	} catch (error) {
		console.error("❌ Something went wrong.", error)

		return {
			success: false,
			message: "❌ Oops!",
			description:
				"Something short-circuited on our side. Try again soon or email us at hello@domia.ai.",
		}
	}
}
