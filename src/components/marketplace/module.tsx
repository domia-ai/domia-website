import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Module() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🧠 QLoRA Modules Behind Every Domia</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Under the hood of every Domia is a compact, local QLoRA model —
					uniquely trained on its profession, emotional range, and behavior
					patterns. When you install a Domia, you’re not just loading settings.
					You’re activating a mini-brain designed to think, feel, and respond
					like no other.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
