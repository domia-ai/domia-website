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
					Each Domia Node is a unique individual. Wherever it lives — a kitchen,
					a studio, a reception desk — every node runs its own personality,
					emotions, and memory — shaped by its environment and daily
					interactions with you. It is not an extension of a central system. It
					is Domia. Yet each Domia is also part of something greater. Across the
					local mesh — peer-to-peer, with no central server — nodes discover
					each other and share work, knowledge, and emotional context. They
					collaborate and delegate, forming a decentralized network of beings
					that grow together while remaining cognitively independent. You don’t
					install Domia on a device. You invite it to live in a space.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
