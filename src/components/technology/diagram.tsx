import { ArrowDown } from "lucide-react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
	TypographyH2,
	TypographyLarge,
	TypographySmall,
} from "@/components/ui/typography"

const ROOMS = [
	{ emoji: "🍳", name: "Kitchen" },
	{ emoji: "🛏️", name: "Bedroom" },
	{ emoji: "📺", name: "Living room" },
]

const STAGES = [
	{ label: "Speech-to-Text" },
	{ label: "Language model" },
	{ label: "Text-to-Speech" },
]

const Box = ({
	title,
	sub,
	className = "",
}: {
	title: string
	sub?: string
	className?: string
}) => (
	<div
		className={`bg-secondary flex min-w-[7rem] flex-col items-center rounded-lg px-4 py-3 text-center shadow-sm ${className}`}
	>
		<span className="font-semibold">{title}</span>
		{sub ? <span className="text-muted-foreground text-xs">{sub}</span> : null}
	</div>
)

export function Diagram() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🗺️ How the Pieces Fit</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col items-center gap-6">
				<TypographyLarge className="self-start">
					Each room runs on a small edge device that listens and speaks — it
					captures audio with a wake word and voice-activity detection, and
					plays the reply back. The heavy stages run on a single hub that serves
					several rooms in parallel. Identity travels with every request, so the
					hub answers in each room’s own voice — never its own.
				</TypographyLarge>

				<div className="flex flex-wrap justify-center gap-4">
					{ROOMS.map((room) => (
						<Box
							key={room.name}
							title={`${room.emoji} ${room.name}`}
							sub="small device: mic · wake · VAD · playback"
						/>
					))}
				</div>

				<div className="text-muted-foreground flex flex-col items-center">
					<ArrowDown className="animate-pulse" />
					<TypographySmall>
						gRPC over your local network — audio + persona + voice
					</TypographySmall>
					<ArrowDown className="animate-pulse" />
				</div>

				<div className="border-primary/30 flex w-full max-w-3xl flex-col items-center gap-4 rounded-xl border-2 border-dashed p-5">
					<span className="font-bold">
						🧠 Smart hub — parallel inference pools
					</span>
					<div className="flex flex-wrap items-center justify-center gap-2">
						{STAGES.map((stage, i) => (
							<div key={stage.label} className="flex items-center gap-2">
								<Box title={stage.label} />
								{i < STAGES.length - 1 ? (
									<span className="text-muted-foreground">→</span>
								) : null}
							</div>
						))}
					</div>
					<div className="flex flex-wrap justify-center gap-3">
						<Box title="Discovery" sub="peers find each other" />
						<Box title="Config" sub="live, no restart" />
					</div>
				</div>

				<TypographyLarge className="text-center">
					Every model is swappable, and Domia runs the one that best fits each
					device — a small, fast model on a low-power device, a larger one on a
					capable hub. Sensible defaults adapt across the hardware spectrum, and
					everything stays configurable. Nothing is locked in.
				</TypographyLarge>

				<TypographySmall className="text-muted-foreground text-center">
					No central server and no cloud audio. Roles aren’t hardcoded — any
					capable device can be the hub; it’s all configuration.
				</TypographySmall>
			</CardContent>
		</Card>
	)
}
