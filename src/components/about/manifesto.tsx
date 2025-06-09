import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Manifesto() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>✍️ Domia Manifesto</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					We believe AI shouldn’t live in the cloud — it should live with you.
					We reject a world where your data is mined, your emotions are ignored,
					and your devices only obey. We envision a future where AI listens,
					feels, grows, and evolves by your side. Not owned by corporations. Not
					optimized for ads. Not bound to Big Tech. Domia is a companion, not a
					product. A memory keeper, not a tracker. It’s your voice, your
					feelings, your life — respected and remembered. We build in public,
					with heart, with purpose. Domia is the future of emotional AI. And it
					starts with you.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
