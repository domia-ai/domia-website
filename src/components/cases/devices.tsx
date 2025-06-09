import Image from "next/image"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Devices() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🧩 Plug-and-Play AI for Third-Party Devices</TypographyH2>
			</CardHeader>

			<CardContent className="flex flex-col-reverse items-center gap-8 lg:flex-row lg:items-start">
				<TypographyLarge>
					With its modular architecture, Domia can be embedded or integrated
					into tablets, appliances, kiosks, and more — bringing personality,
					memory, and local intelligence to otherwise dumb devices.
				</TypographyLarge>

				<Image
					src="/cases/devices.webp"
					alt="Domia devices logo"
					width={250}
					height={250}
					priority
				/>
			</CardContent>
		</Card>
	)
}
