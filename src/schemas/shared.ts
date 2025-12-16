import z from "zod"

// Basic string schemas
export const zString = z.string()
export const zStringRequired = z.string().min(1, "This field is required")
export const zStringMin = (min: number) =>
	z.string().min(min, `Must be at least ${min} characters`)
export const zStringMax = (max: number) =>
	z.string().max(max, `Must be at most ${max} characters`)
export const zStringLength = (length: number) =>
	z.string().length(length, `Must be exactly ${length} characters`)
export const zStringRange = (min: number, max: number) =>
	z
		.string()
		.min(min, `Must be at least ${min} characters`)
		.max(max, `Must be at most ${max} characters`)

// Email schema
export const zEmail = z.string().email("Invalid email address")
export const zEmailRequired = z
	.string()
	.min(1, "Email is required")
	.email("Invalid email address")

// Password schema with common requirements
export const zPassword = z
	.string()
	.min(8, "Password must be at least 8 characters")
	.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
	.regex(/[a-z]/, "Password must contain at least one lowercase letter")
	.regex(/[0-9]/, "Password must contain at least one number")
	.regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")

// URL schema
export const zUrl = z.string().url("Invalid URL")

// Number schemas
export const zNumber = z.number()
export const zNumberRequired = z.number().min(0, "Must be a positive number")
export const zNumberMin = (min: number) =>
	z.number().min(min, `Must be at least ${min}`)
export const zNumberMax = (max: number) =>
	z.number().max(max, `Must be at most ${max}`)
export const zNumberRange = (min: number, max: number) =>
	z
		.number()
		.min(min, `Must be at least ${min}`)
		.max(max, `Must be at most ${max}`)

// Date schemas
export const zDate = z.date()
export const zDateRequired = z.date().min(new Date(0), "Invalid date")
export const zDateMin = (min: Date) =>
	z.date().min(min, `Must be after ${min.toLocaleDateString()}`)
export const zDateMax = (max: Date) =>
	z.date().max(max, `Must be before ${max.toLocaleDateString()}`)
export const zDateRange = (min: Date, max: Date) =>
	z
		.date()
		.min(min, `Must be after ${min.toLocaleDateString()}`)
		.max(max, `Must be before ${max.toLocaleDateString()}`)

// Boolean schemas
export const zBoolean = z.boolean()
export const zBooleanRequired = z
	.boolean()
	.refine((val) => val === true, "This field must be checked")

// Array schemas
export const zArray = <T extends z.ZodTypeAny>(schema: T) => z.array(schema)
export const zArrayMin = <T extends z.ZodTypeAny>(schema: T, min: number) =>
	z.array(schema).min(min, `Must have at least ${min} items`)
export const zArrayMax = <T extends z.ZodTypeAny>(schema: T, max: number) =>
	z.array(schema).max(max, `Must have at most ${max} items`)
export const zArrayLength = <T extends z.ZodTypeAny>(
	schema: T,
	length: number,
) => z.array(schema).length(length, `Must have exactly ${length} items`)

// Object schemas
export const zObject = <T extends z.ZodRawShape>(shape: T) => z.object(shape)
export const zObjectStrict = <T extends z.ZodRawShape>(shape: T) =>
	z.object(shape).strict()

// Optional and nullable schemas
export const zOptional = <T extends z.ZodTypeAny>(schema: T) =>
	schema.optional()
export const zNullable = <T extends z.ZodTypeAny>(schema: T) =>
	schema.nullable()
export const zOptionalNullable = <T extends z.ZodTypeAny>(schema: T) =>
	schema.optional().nullable()

// Enum schemas
export const zEnum = <T extends [string, ...string[]]>(values: T) =>
	z.enum(values)
export const zEnumRequired = <T extends [string, ...string[]]>(values: T) =>
	z.enum(values, { message: "This field is required" })

// UUID schema
export const zUuid = z.string().uuid("Invalid UUID")

// Phone number schema (basic validation)
export const zPhone = z
	.string()
	.regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")

// Currency amount schema
export const zCurrency = z
	.number()
	.min(0)
	.multipleOf(0.01, "Must be a valid currency amount")

// Percentage schema
export const zPercentage = z
	.number()
	.min(0)
	.max(100, "Must be between 0 and 100")

// File size schema (in bytes)
export const zFileSize = (maxSizeInBytes: number) =>
	z
		.number()
		.max(maxSizeInBytes, `File size must be less than ${maxSizeInBytes} bytes`)

// Common regex patterns
export const zRegex = {
	alphanumeric: z
		.string()
		.regex(/^[a-zA-Z0-9]+$/, "Must contain only letters and numbers"),
	username: z
		.string()
		.regex(
			/^[a-zA-Z0-9_-]+$/,
			"Username can only contain letters, numbers, underscores and hyphens",
		),
	hexColor: z
		.string()
		.regex(
			/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
			"Must be a valid hex color code",
		),
	slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Must be a valid slug"),
}
