"use client"
import { useForm } from "@tanstack/react-form"
import { Mail } from "lucide-react"
import { toast } from "sonner"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { submitContactForm } from "@/actions/contact"
import { contactFormSchema } from "@/schemas"
import {
	TypographyFormError,
	TypographyH2,
	TypographyH3,
	TypographyLarge,
	TypographyP,
	TypographyBlockquote,
} from "../ui/typography"

export function Form() {
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
			onSubmit: contactFormSchema,
		},
		onSubmit: async ({ value, formApi }) => {
			const result = await submitContactForm(value)

			if (result.success) {
				formApi.reset()
				toast.success(result?.message, {
					description: result?.description,
				})
			} else {
				toast.error(result?.message, {
					description: result?.description,
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
					<TypographyH2>💬 Send us a message</TypographyH2>
				</CardHeader>

				<CardContent className="flex flex-col gap-8">
					<TypographyLarge>
						Our team is always open to ideas, feedback, and opportunities.
						Whether you’re a developer, early adopter, investor, hotelier, or
						just curious about emotional AI — Domia is here for you.
					</TypographyLarge>

					<TypographyLarge>
						📬 Other ways to reach us If forms aren’t your thing, feel free to
						send us an email directly at{" "}
						<a
							href="mailto:hello@domia.ai"
							className="hover:text-primary underline transition-colors"
						>
							hello@domia.ai
						</a>
					</TypographyLarge>

					<div className="grid gap-12 lg:grid-cols-2">
						<div className="flex flex-col gap-8">
							<TypographyH3>Contact Information</TypographyH3>

							<div className="flex items-center gap-3">
								<div className="bg-primary/10 rounded-lg p-2">
									<Mail className="text-primary h-5 w-5" />
								</div>

								<div>
									<TypographyP className="font-medium">Email</TypographyP>
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
							<TypographyH3>Contact Form</TypographyH3>

							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<Field
									name="name"
									children={({ name, state, handleChange, handleBlur }) => {
										return (
											<div className="flex flex-col gap-2">
												<Label htmlFor={name}>Name</Label>

												<Input
													id={name}
													name={name}
													value={state.value}
													onBlur={handleBlur}
													onChange={(e) => handleChange(e.target.value)}
													placeholder="What's your name?"
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
												<Label htmlFor={name}>Email</Label>

												<Input
													id={name}
													name={name}
													value={state.value}
													onBlur={handleBlur}
													onChange={(e) => handleChange(e.target.value)}
													placeholder="hello@domia.ai"
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
											<Label htmlFor={name}>Subject</Label>

											<Input
												id={name}
												name={name}
												value={state.value}
												onBlur={handleBlur}
												onChange={(e) => handleChange(e.target.value)}
												placeholder="What is this regarding?"
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
											<Label htmlFor={name}>Message</Label>

											<Textarea
												id={name}
												name={name}
												value={state.value}
												onBlur={handleBlur}
												onChange={(e) => handleChange(e.target.value)}
												placeholder="What would you like to share?"
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
										{isSubmitting ? "Sending..." : "Send Message 🚀"}
									</Button>
								)}
							/>
						</div>
					</div>

					<TypographyBlockquote>
						“Domia listens - always 💌.”
					</TypographyBlockquote>
				</CardContent>
			</Card>
		</form>
	)
}
