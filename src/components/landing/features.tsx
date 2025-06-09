import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
	TypographyH2,
	TypographyLarge,
	TypographyBlockquote,
} from "@/components/ui/typography"
import { features } from "@/constants"

export function Features() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>✨ Feature Highlights </TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Discover what makes Domia truly one-of-a-kind. Each feature is
					designed to bring your smart home to life with intelligence, emotion,
					and autonomy — all running privately and locally.
				</TypographyLarge>

				<dl className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{features.map((feature) => (
						<Card
							key={feature.name}
							className="bg-secondary transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
						>
							<CardHeader>
								<dt className="text-xl font-bold">{feature.name}</dt>
							</CardHeader>

							<CardContent>
								<dd className="flex flex-auto flex-col text-base/7">
									<p className="text-md flex-auto">{feature.description}</p>
								</dd>
							</CardContent>
						</Card>
					))}
				</dl>

				<TypographyBlockquote>
					“Every Domia is more than a device — it’s a living presence that grows
					with your home, your needs, and your values.”
				</TypographyBlockquote>
			</CardContent>
		</Card>
	)
}
