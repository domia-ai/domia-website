"use client"

import { useState } from "react"
import { useForm } from "@tanstack/react-form"
import { CircleCheck } from "lucide-react"
import { toast } from "sonner"
import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
	TypographyLarge,
	TypographyP,
	TypographySmall,
} from "@/components/ui/typography"
import { submitContactForm } from "@/actions/contact"
import { contactEmail } from "@/constants/landing"
import { buildContactFormSchema } from "@/schemas"

import {
	CONTACT_FIELD_LIMITS,
	contactFormDefaults,
	contactTextFields,
} from "./constants"
import { FormField } from "./form-field"

export function Form() {
	const t = useTranslations("contact.form")
	const [sent, setSent] = useState(false)

	const form = useForm({
		defaultValues: contactFormDefaults,
		validators: {
			onSubmit: buildContactFormSchema(t),
		},
		onSubmitInvalid: ({ formApi }) => {
			const firstInvalid = contactTextFields.find(
				({ name }) => (formApi.getFieldMeta(name)?.errors.length ?? 0) > 0,
			)

			if (firstInvalid) {
				document.getElementById(firstInvalid.name)?.focus()
			}
		},
		onSubmit: async ({ value, formApi }) => {
			const result = await submitContactForm(value)

			if (result.success) {
				formApi.reset()
				setSent(true)
				toast.success(t("toasts.sent.title"), {
					description: t("toasts.sent.description"),
				})
			} else {
				toast.error(t(`toasts.${result.code}.title`), {
					description: t(`toasts.${result.code}.description`, {
						email: contactEmail,
					}),
				})
			}
		},
	})

	const sendAnother = () => setSent(false)

	return (
		<div className="flex flex-col gap-6">
			<div role="status">
				{sent ? (
					<div className="bg-primary/5 flex flex-col items-start gap-4 rounded-lg border p-6">
						<CircleCheck aria-hidden="true" className="text-primary size-8" />
						<TypographyLarge className="font-semibold">
							{t("toasts.sent.title")}
						</TypographyLarge>
						<TypographyP className="text-muted-foreground">
							{t("toasts.sent.description")}
						</TypographyP>
						<Button variant="outline" onClick={sendAnother}>
							{t("sendAnother")}
						</Button>
					</div>
				) : null}
			</div>

			{sent ? null : (
				<form
					noValidate
					aria-labelledby="contact-form-title"
					className="flex flex-col gap-6"
					onSubmit={(event) => {
						event.preventDefault()
						event.stopPropagation()
						form.handleSubmit()
					}}
				>
					<TypographySmall className="text-muted-foreground">
						{t("requiredNote")}
					</TypographySmall>

					<form.Subscribe
						selector={(state) => state.isSubmitting}
						children={(isSubmitting) => (
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								{contactTextFields.map((config) => (
									<form.Field
										key={config.name}
										name={config.name}
										children={(field) => (
											<FormField
												id={config.name}
												label={t(`fields.${config.name}.label`)}
												placeholder={t(`fields.${config.name}.placeholder`)}
												value={field.state.value}
												onValueChange={field.handleChange}
												onBlur={field.handleBlur}
												maxLength={CONTACT_FIELD_LIMITS[config.name]}
												disabled={isSubmitting}
												required={config.required}
												autoComplete={config.autoComplete}
												type={config.type}
												multiline={config.multiline}
												error={field.state.meta.errors[0]?.message}
												hint={
													config.showCounter
														? t("fields.message.counter", {
																count: field.state.value.length,
																max: CONTACT_FIELD_LIMITS[config.name],
															})
														: undefined
												}
												className={cn(config.wide && "sm:col-span-2")}
											/>
										)}
									/>
								))}
							</div>
						)}
					/>

					<form.Subscribe
						selector={(state) => state.isSubmitting}
						children={(isSubmitting) => (
							<Button type="submit" size="lg" disabled={isSubmitting}>
								{isSubmitting ? t("submitting") : t("submit")}
							</Button>
						)}
					/>

					<TypographySmall className="text-muted-foreground">
						{t("privacy")}
					</TypographySmall>
				</form>
			)}
		</div>
	)
}
