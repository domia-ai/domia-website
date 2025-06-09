import {
	zObject,
	zStringRange,
	zEmailRequired,
	zBoolean,
	zStringRequired,
} from "./shared"

export const contactFormSchema = zObject({
	name: zStringRange(2, 50),
	email: zEmailRequired,
	subject: zStringRange(5, 100),
	message: zStringRange(5, 1000),
})

export const contactFormResponseSchema = zObject({
	success: zBoolean,
	message: zStringRequired,
	description: zStringRequired,
})
