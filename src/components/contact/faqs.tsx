import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2 } from "@/components/ui/typography"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { contactFaqs } from "@/constants"

export function Faqs() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🙋 Frequently Asked Questions</TypographyH2>
			</CardHeader>

			<CardContent>
				<Accordion type="single" collapsible className="flex flex-col gap-4">
					{contactFaqs.map((faq, index) => (
						<AccordionItem
							key={index}
							value={`item-${index}`}
							className="bg-secondary rounded-lg border px-6 py-2"
						>
							<AccordionTrigger className="text-left hover:no-underline">
								<span className="text-lg font-medium">{faq.q}</span>
							</AccordionTrigger>
							<AccordionContent className="text-muted-foreground pt-2 pb-4">
								<p className="text-base leading-relaxed">{faq.a}</p>
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</CardContent>
		</Card>
	)
}
