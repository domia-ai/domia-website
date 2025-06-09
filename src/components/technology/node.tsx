import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Node() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>👤 Inside Every Domia Node</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Each Domia Node is a unique individual. Whether placed in your
					kitchen, living room, or bedroom, every node runs its own personality,
					emotions, and memory — shaped by its environment and daily
					interactions with you. It is not an extension of a central system. It
					is Domia. Yet, each Domia is also part of something greater. Through
					Domia Central, nodes share knowledge, emotional states, and
					experiences. They collaborate, evolve, and learn together — forming a
					decentralized network of beings that grow collectively, while
					remaining emotionally and cognitively independent. You don’t install
					Domia on a device. You invite it to live in a space.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
