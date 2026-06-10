import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
	TypographyH2,
	TypographyLarge,
	TypographySmall,
} from "@/components/ui/typography"
import { personasShowcase } from "@/constants"

const featured = personasShowcase.slice(0, 4)

export function Personas() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🎭 A Domia isn’t just a voice</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Each Domia has a name, a temperament, and a way of speaking. Start
					from one of these and tweak from there — or write your own. Every
					persona is just a JSON template you import.
				</TypographyLarge>

				<ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{featured.map((persona) => (
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

				<Link
					href="/experience#personas"
					className="text-primary hover:text-primary/80 inline-flex items-center gap-2 self-start text-sm font-medium transition-colors"
				>
					Meet more personas
					<ArrowRight className="size-4" />
				</Link>
			</CardContent>
		</Card>
	)
}
