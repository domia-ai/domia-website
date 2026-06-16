import Image from "next/image"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Smart() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🏠 A Companion for the Home</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col-reverse items-center gap-8 lg:flex-row lg:items-start">
				<TypographyLarge>
					Domia was born as a privacy-first alternative to cloud assistants. It
					talks with you, senses your routines, and reacts emotionally to your
					presence — from morning greetings to nighttime wind-downs, all fully
					offline with a human touch. And it can control your smart devices
					through local skills — point it at a Home Assistant (or any) MCP
					server and it picks the right tool and acts. Opt-in.
				</TypographyLarge>

				<Image
					src="/cases/smart.webp"
					alt="Domia smart logo"
					width={300}
					height={300}
					priority
				/>
			</CardContent>
		</Card>
	)
}
