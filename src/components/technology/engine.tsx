import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"
import { engines } from "@/constants"

export function Engine() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🧠 The Modular Mind of Domia</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Domia’s intelligence is not fixed. It’s modular. At the heart of every
					Domia lives `domia-core`: a composable cognitive engine built from a
					set of plug-and-play modules — each responsible for emotions, memory,
					personality, profession, motivation, curiosity, ethics, and more. You
					choose how much of that you want. Every module is optional. Whether
					you want a fully emotional companion, a minimal assistant, or a
					complex multi-role Domia — you can activate only the parts you need.
					Even at first launch, Domia can be configured with a predefined
					personality and profession, or you can discover one in the Domia
					Marketplace — each with their own emotional tone and social style.
					Build your Domia. Or let one choose you.
				</TypographyLarge>

				<ul className="list-inside list-disc text-left">
					{engines?.map((engine) => {
						return (
							<li key={engine?.title}>
								<strong>{engine?.title}</strong> — {engine?.description}
							</li>
						)
					})}
				</ul>
			</CardContent>
		</Card>
	)
}
