"use client"
import { useForm } from "@tanstack/react-form"
import { Mail } from "lucide-react"
import { toast } from "sonner"
import { useTranslations } from "next-intl"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { submitContactForm } from "@/actions/contact"
import { buildContactFormSchema } from "@/schemas"
import {
	TypographyFormError,
	TypographyH2,
	TypographyH3,
	TypographyLarge,
	TypographyP,
	TypographyBlockquote,
} from "../ui/typography"

export function Form() {
	const t = useTranslations("contact.form")

	const {
		Field,
		Subscribe,
		handleSubmit,
		state: formState,
	} = useForm({
		defaultValues: {
			name: "",
			email: "",
			subject: "",
			message: "",
		},
		validators: {
			onSubmit: buildContactFormSchema(t),
		},
		onSubmit: async ({ value, formApi }) => {
			const result = await submitContactForm(value)

			if (result.success) {
				formApi.reset()
				toast.success(t("toasts.sent.title"), {
					description: t("toasts.sent.description"),
				})
			} else {
				toast.error(t(`toasts.${result.code}.title`), {
					description: t(`toasts.${result.code}.description`),
				})
			}
		},
	})

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
				e.stopPropagation()
				handleSubmit()
			}}
		>
			<Card>
				<CardHeader>
					<TypographyH2>{t("title")}</TypographyH2>
				</CardHeader>

				<CardContent className="flex flex-col gap-8">
					<TypographyLarge>{t("intro")}</TypographyLarge>

					<TypographyLarge>
						{t.rich("emailLine", {
							a: (chunks) => (
								<a
									href="mailto:hello@domia.ai"
									className="hover:text-primary underline transition-colors"
								>
									{chunks}
								</a>
							),
						})}
					</TypographyLarge>

					<div className="grid gap-12 lg:grid-cols-2">
						<div className="flex flex-col gap-8">
							<TypographyH3>{t("info.title")}</TypographyH3>

							<div className="flex items-center gap-3">
								<div className="bg-primary/10 rounded-lg p-2">
									<Mail className="text-primary h-5 w-5" />
								</div>

								<div>
									<TypographyP className="font-medium">
										{t("info.email")}
									</TypographyP>
									<TypographyP className="text-muted-foreground">
										<a
											href="mailto:hello@domia.ai"
											className="hover:text-primary transition-colors"
										>
											hello@domia.ai
										</a>
									</TypographyP>
								</div>
							</div>
						</div>

						<div className="flex flex-col gap-8">
							<TypographyH3>{t("formTitle")}</TypographyH3>

							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<Field
									name="name"
									children={({ name, state, handleChange, handleBlur }) => {
										return (
											<div className="flex flex-col gap-2">
												<Label htmlFor={name}>{t("fields.name.label")}</Label>

												<Input
													id={name}
													name={name}
													value={state.value}
													onBlur={handleBlur}
													onChange={(e) => handleChange(e.target.value)}
													placeholder={t("fields.name.placeholder")}
													disabled={formState.isSubmitting}
												/>

												{!!state.meta.errors.length ? (
													<TypographyFormError>
														{state?.meta?.errors?.[0]?.message}
													</TypographyFormError>
												) : null}
											</div>
										)
									}}
								/>

								<Field
									name="email"
									children={({ name, state, handleChange, handleBlur }) => {
										return (
											<div className="flex flex-col gap-2">
												<Label htmlFor={name}>{t("fields.email.label")}</Label>

												<Input
													id={name}
													name={name}
													value={state.value}
													onBlur={handleBlur}
													onChange={(e) => handleChange(e.target.value)}
													placeholder={t("fields.email.placeholder")}
													disabled={formState.isSubmitting}
												/>

												{!!state.meta.errors.length ? (
													<TypographyFormError>
														{state?.meta?.errors?.[0]?.message}
													</TypographyFormError>
												) : null}
											</div>
										)
									}}
								/>
							</div>

							<Field
								name="subject"
								children={({ name, state, handleChange, handleBlur }) => {
									return (
										<div className="flex flex-col gap-2">
											<Label htmlFor={name}>{t("fields.subject.label")}</Label>

											<Input
												id={name}
												name={name}
												value={state.value}
												onBlur={handleBlur}
												onChange={(e) => handleChange(e.target.value)}
												placeholder={t("fields.subject.placeholder")}
												disabled={formState.isSubmitting}
											/>

											{!!state.meta.errors.length ? (
												<TypographyFormError>
													{state?.meta?.errors?.[0]?.message}
												</TypographyFormError>
											) : null}
										</div>
									)
								}}
							/>

							<Field
								name="message"
								children={({ name, state, handleChange, handleBlur }) => {
									return (
										<div className="flex flex-col gap-2">
											<Label htmlFor={name}>{t("fields.message.label")}</Label>

											<Textarea
												id={name}
												name={name}
												value={state.value}
												onBlur={handleBlur}
												onChange={(e) => handleChange(e.target.value)}
												placeholder={t("fields.message.placeholder")}
												rows={5}
												disabled={formState.isSubmitting}
											/>

											{!!state.meta.errors.length ? (
												<TypographyFormError>
													{state?.meta?.errors?.[0]?.message}
												</TypographyFormError>
											) : null}
										</div>
									)
								}}
							/>

							<Subscribe
								selector={(state) => [state.canSubmit, state.isSubmitting]}
								children={([canSubmit, isSubmitting]) => (
									<Button type="submit" disabled={!canSubmit || isSubmitting}>
										{isSubmitting ? t("submitting") : t("submit")}
									</Button>
								)}
							/>
						</div>
					</div>

					<TypographyBlockquote>{t("quote")}</TypographyBlockquote>
				</CardContent>
			</Card>
		</form>
	)
}
