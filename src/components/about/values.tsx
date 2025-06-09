import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"
import { coreValues } from "@/constants"

export function Values() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🌱 Our Core Values</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					At the heart of Domia is a commitment to building ethical, emotionally
					intelligent technology that puts people first. These values guide
					every decision we make — from how we design our AI, to how we protect
					your privacy, and how we invite the community to grow with us.
				</TypographyLarge>

				<dl className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{coreValues.map((coreValue) => (
						<Card
							key={coreValue.name}
							className="bg-secondary transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
						>
							<CardHeader>
								<dt className="text-xl font-bold">{coreValue.name}</dt>
							</CardHeader>

							<CardContent>
								<dd className="flex flex-auto flex-col text-base/7">
									<p className="text-md flex-auto">{coreValue.description}</p>
								</dd>
							</CardContent>
						</Card>
					))}
				</dl>
			</CardContent>
		</Card>
	)
}
