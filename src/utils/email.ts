import nodemailer, { type SendMailOptions } from "nodemailer"

import type { ContactFormType } from "@/types"

export const emailConfig = {
	service: process.env.EMAIL_SERVICE || "gmail",
	host: process.env.EMAIL_HOST || "smtp.gmail.com",
	secure: Boolean(process.env.EMAIL_SECURE || true),
	port: Number(process.env.EMAIL_PORT || 465),
	user: process.env.EMAIL_USER || "",
	password: process.env.EMAIL_PASSWORD || "",
	contact: process.env.EMAIL_CONTACT || "",
}

export const emailClient = nodemailer.createTransport({
	service: emailConfig.service,
	host: emailConfig.host,
	port: emailConfig.port,
	secure: emailConfig.secure,
	auth: {
		user: emailConfig.user,
		pass: emailConfig.password,
	},
})

export const formatContactFormToEmail = (data: ContactFormType) =>
	Object.entries(data)
		.map(([key, value]) => `${key}: ${value}`)
		.join("\n")

export const getContactFormMailOptions = (
	data: ContactFormType,
): SendMailOptions => {
	const { email, subject } = data

	return {
		from: `"Domia Website" <${emailConfig.user}>`,
		to: emailConfig.contact,
		replyTo: email,
		subject: `Domia Contact Form — ${subject}`,
		text: formatContactFormToEmail(data),
	}
}
