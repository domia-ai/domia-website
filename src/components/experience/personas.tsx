import Image from "next/image"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
	TypographyH2,
	TypographyLarge,
	TypographySmall,
} from "@/components/ui/typography"
import { personasShowcase } from "@/constants"

export function Personas() {
	return (
		<Card id="personas">
			<CardHeader>
				<TypographyH2>🎭 Make your Domia a person</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					A Domia isn’t just a voice. It’s someone — with a name, a temperament,
					a way of speaking. Start from one of these and tweak from there, or
					write your own from scratch. Every persona is just a JSON template you
					import into the Console.
				</TypographyLarge>

				<ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{personasShowcase.map((persona) => (
						<li key={persona.name}>
							<Card className="bg-secondary h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
								<CardContent className="flex flex-col items-center gap-3 p-4 text-center">
									<Image
										src={persona.image}
										alt={persona.name}
										width={200}
										height={200}
										className="aspect-square w-full rounded-xl object-cover"
									/>
									<p className="text-base font-semibold">{persona.name}</p>
									<TypographySmall className="text-muted-foreground">
										{persona.blurb}
									</TypographySmall>
								</CardContent>
							</Card>
						</li>
					))}
				</ul>

				<TypographySmall className="text-muted-foreground">
					More personas — and a community gallery of community-made ones — live
					in the <code>domia-personas</code> repository on GitHub.
				</TypographySmall>
			</CardContent>
		</Card>
	)
}
