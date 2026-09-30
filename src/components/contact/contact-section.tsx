import { NextIntlClientProvider } from "next-intl"
import type { AbstractIntlMessages } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"

import { Section } from "@/components/sections"
import { Card, CardContent } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

import { Channels } from "./channels"
import { Form } from "./form"

export async function ContactSection() {
	const t = await getTranslations("contact.write")
	const { contact } = (await getMessages()) as {
		contact: { form: AbstractIntlMessages }
	}

	return (
		<Section id="form" tone="base" labelledBy="contact-form-title">
			<div className="flex flex-col gap-8">
				<div className="flex flex-col gap-3">
					<TypographyH2 id="contact-form-title">{t("title")}</TypographyH2>
					<TypographyLarge className="text-muted-foreground">
						{t("intro")}
					</TypographyLarge>
				</div>

				<Card>
					<CardContent className="grid gap-12 lg:grid-cols-[2fr_3fr]">
						<Channels />
						<NextIntlClientProvider
							messages={{ contact: { form: contact.form } }}
						>
							<Form />
						</NextIntlClientProvider>
					</CardContent>
				</Card>
			</div>
		</Section>
	)
}
