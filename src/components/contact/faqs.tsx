import { getTranslations } from "next-intl/server"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2 } from "@/components/ui/typography"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { contactFaqIds } from "@/constants"

export async function Faqs() {
	const t = await getTranslations("contact.faqs")

	return (
		<Card>
			<CardHeader>
				<TypographyH2>{t("title")}</TypographyH2>
			</CardHeader>

			<CardContent>
				<Accordion multiple={false} className="flex flex-col gap-4">
					{contactFaqIds.map((id) => (
						<AccordionItem
							key={id}
							value={id}
							className="bg-secondary rounded-lg border px-6 py-2"
						>
							<AccordionTrigger className="text-left hover:no-underline">
								<span className="text-lg font-medium">
									{t(`items.${id}.q`)}
								</span>
							</AccordionTrigger>
							<AccordionContent className="text-muted-foreground pt-2 pb-4">
								<p className="text-base leading-relaxed">
									{t(`items.${id}.a`)}
								</p>
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</CardContent>
		</Card>
	)
}
