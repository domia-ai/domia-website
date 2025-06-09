import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Name() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🔤 Behind the Name: What is Domia?</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Domia stands for Domotic Intelligence Assistant — but it’s more than
					that. “Domia” is a word that feels like home, like harmony. A
					companion that lives with you, not just in your devices. Born from the
					fusion of “domus” (Latin for home) and “IA” (Inteligencia Artificial),
					Domia represents the union of heart and code, routine and personality.
					It’s not just what we build — it’s how we live with it.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
