import * as React from "react"

import { cn } from "@/lib/utils"

function TypographyH1({ className, ...props }: React.ComponentProps<"h1">) {
	return (
		<h1
			className={cn(
				"text-5xl font-extrabold tracking-tight text-balance",
				className,
			)}
			{...props}
		/>
	)
}

function TypographyH2({ className, ...props }: React.ComponentProps<"h2">) {
	return (
		<h2
			className={cn("text-4xl font-semibold tracking-tight", className)}
			{...props}
		/>
	)
}

function TypographyH3({ className, ...props }: React.ComponentProps<"h3">) {
	return (
		<h3
			className={cn("text-3xl font-semibold tracking-tight", className)}
			{...props}
		/>
	)
}

function TypographyH4({ className, ...props }: React.ComponentProps<"h4">) {
	return (
		<h4
			className={cn("text-2xl font-semibold tracking-tight", className)}
			{...props}
		/>
	)
}

function TypographyP({ className, ...props }: React.ComponentProps<"p">) {
	return <p className={cn("leading-7", className)} {...props} />
}

function TypographyXLarge({ className, ...props }: React.ComponentProps<"p">) {
	return <p className={cn("text-xl", className)} {...props} />
}

function TypographyLarge({ className, ...props }: React.ComponentProps<"p">) {
	return <p className={cn("text-lg", className)} {...props} />
}

function TypographyMedium({ className, ...props }: React.ComponentProps<"p">) {
	return <p className={cn("text-md", className)} {...props} />
}

function TypographySmall({ className, ...props }: React.ComponentProps<"p">) {
	return <p className={cn("text-sm", className)} {...props} />
}

function TypographyBlockquote({
	className,
	...props
}: React.ComponentProps<"blockquote">) {
	return (
		<blockquote
			className={cn("text-md border-l-2 pl-6 italic", className)}
			{...props}
		/>
	)
}

function TypographyInlineCode({
	className,
	...props
}: React.ComponentProps<"code">) {
	return (
		<code
			className={cn(
				"bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
				className,
			)}
			{...props}
		/>
	)
}

function TypographyFormError({
	className,
	...props
}: React.ComponentProps<"p">) {
	return <p className={cn("text-destructive text-sm", className)} {...props} />
}

export {
	TypographyH1,
	TypographyH2,
	TypographyH3,
	TypographyH4,
	TypographyP,
	TypographyXLarge,
	TypographyLarge,
	TypographyMedium,
	TypographySmall,
	TypographyBlockquote,
	TypographyInlineCode,
	TypographyFormError,
}
