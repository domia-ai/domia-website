"use server"

import { ContactFormType, ContactFormResponseType } from "@/types"
import { contactFormSchema } from "@/schemas"
import { emailClient, getContactFormMailOptions } from "@/utils/email"

export async function submitContactForm(
	data: ContactFormType,
): Promise<ContactFormResponseType> {
	try {
		const result = contactFormSchema.safeParse(data)

		if (!result.success) {
			return { success: false, code: "invalid" }
		}

		await emailClient.sendMail(getContactFormMailOptions(result.data))

		return { success: true, code: "sent" }
	} catch (error) {
		console.error("❌ Something went wrong.", error)

		return { success: false, code: "error" }
	}
}
