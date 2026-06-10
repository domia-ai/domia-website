import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
	TypographyH2,
	TypographyLarge,
	TypographyBlockquote,
} from "@/components/ui/typography"
import { consoleCapabilities } from "@/constants"

export function Console() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🎛️ One Console for Every Domia</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					As your space grows from one Domia to many — a single room, a whole
					home, a multi-room workshop or studio — managing them stays simple.
					The Domia Console is one place to see every Domia you run, replay what
					they’ve done, and shape what they do next, all on your own network. A
					handful of rooms or a hundred, it feels like one.
				</TypographyLarge>

				<dl className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{consoleCapabilities.map((capability) => (
						<Card
							key={capability.name}
							className="bg-secondary transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
						>
							<CardHeader>
								<dt className="text-xl font-bold">{capability.name}</dt>
							</CardHeader>

							<CardContent>
								<dd className="flex flex-auto flex-col text-base/7">
									<p className="text-md flex-auto">{capability.description}</p>
								</dd>
							</CardContent>
						</Card>
					))}
				</dl>

				<TypographyBlockquote>
					“One screen for every room.”
				</TypographyBlockquote>
			</CardContent>
		</Card>
	)
}
