import { ArrowRight } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { Section } from "@/components/sections"
import { TypographyH2, TypographyH3 } from "@/components/ui/typography"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { Link } from "@/i18n/navigation"

import { contactFaqGroups, contactFaqPages } from "./constants"

export async function Faqs() {
	const t = await getTranslations("contact.faqs")

	return (
		<Section id="faqs" tone="alt" labelledBy="contact-faqs-title">
			<div className="flex flex-col gap-10">
				<TypographyH2 id="contact-faqs-title">{t("title")}</TypographyH2>

				{contactFaqGroups.map((group) => (
					<div key={group.id} className="flex flex-col gap-4">
						<TypographyH3 className="text-2xl">
							{t(`groups.${group.id}`)}
						</TypographyH3>

						<Accordion multiple={false} className="flex flex-col gap-4">
							{group.faqIds.map((id) => {
								const page = contactFaqPages[id]

								return (
									<AccordionItem
										key={id}
										value={id}
										className="bg-background rounded-lg border px-6 py-2"
									>
										<AccordionTrigger className="text-left hover:no-underline">
											<span className="text-lg font-medium">
												{t(`items.${id}.q`)}
											</span>
										</AccordionTrigger>
										<AccordionContent className="text-muted-foreground flex flex-col gap-3 pt-2 pb-4">
											<p className="text-base leading-relaxed">
												{t(`items.${id}.a`)}
											</p>
											<Link
												href={`/${page}`}
												className="text-primary inline-flex w-fit items-center gap-1 font-medium underline-offset-4 hover:underline"
											>
												{t(`links.${page}`)}
												<ArrowRight aria-hidden="true" className="size-4" />
											</Link>
										</AccordionContent>
									</AccordionItem>
								)
							})}
						</Accordion>
					</div>
				))}
			</div>
		</Section>
	)
}
