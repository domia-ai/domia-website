import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Mind() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🔐 You Own the Mind. Not Just the Art</TypographyH2>
			</CardHeader>
			<CardContent>
				<TypographyLarge>
					Your Domia NFT doesn’t just represent an image — it’s a full digital
					identity. You can activate it in your local system, and it becomes a
					speaking, feeling, evolving presence. No servers. No lock-in. You can
					back it up, run it offline, and even transfer it to another device.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
