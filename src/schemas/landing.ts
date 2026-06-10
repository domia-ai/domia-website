import {
	zObject,
	zString,
	zStringMax,
	zEmailRequired,
	zBoolean,
	zStringRequired,
} from "./shared"

export const contactFormSchema = zObject({
	name: zStringMax(50),
	email: zEmailRequired,
	audience: zString,
	subject: zStringMax(100),
	message: zStringMax(1000),
})

export const contactFormResponseSchema = zObject({
	success: zBoolean,
	message: zStringRequired,
	description: zStringRequired,
})
