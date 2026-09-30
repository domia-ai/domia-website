import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { TypographyFormError } from "@/components/ui/typography"

import { MESSAGE_ROWS } from "./constants"
import type { FormFieldProps } from "./types"

export function FormField({
	id,
	label,
	value,
	onValueChange,
	onBlur,
	placeholder,
	maxLength,
	disabled,
	required = false,
	error,
	hint,
	autoComplete,
	type,
	multiline = false,
	className,
}: FormFieldProps) {
	const errorId = `${id}-error`
	const hintId = `${id}-hint`
	const describedBy =
		[error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") ||
		undefined

	const controlProps = {
		id,
		name: id,
		value,
		placeholder,
		maxLength,
		disabled,
		autoComplete,
		onBlur,
		"aria-invalid": Boolean(error),
		"aria-required": required,
		"aria-describedby": describedBy,
	}

	return (
		<div className={cn("flex flex-col gap-2", className)}>
			<Label htmlFor={id} className="gap-1">
				{label}
				{required ? (
					<span aria-hidden="true" className="text-primary">
						*
					</span>
				) : null}
			</Label>

			{multiline ? (
				<Textarea
					{...controlProps}
					rows={MESSAGE_ROWS}
					onChange={(event) => onValueChange(event.target.value)}
				/>
			) : (
				<Input
					{...controlProps}
					type={type}
					onChange={(event) => onValueChange(event.target.value)}
				/>
			)}

			{hint ? (
				<p id={hintId} className="text-muted-foreground text-right text-sm">
					{hint}
				</p>
			) : null}

			{error ? (
				<TypographyFormError id={errorId} role="alert">
					{error}
				</TypographyFormError>
			) : null}
		</div>
	)
}
