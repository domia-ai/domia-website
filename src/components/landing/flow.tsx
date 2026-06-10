import { ArrowDown } from "lucide-react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
	TypographyH2,
	TypographyLarge,
	TypographyXLarge,
	TypographyMedium,
	TypographyBlockquote,
} from "@/components/ui/typography"

const Step = ({
	title,
	description,
}: {
	title: string
	description: string
}) => {
	return (
		<Card className="bg-secondary mx-auto h-full w-full max-w-md p-4 text-center shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
			<TypographyXLarge className="font-bold">{title}</TypographyXLarge>
			<TypographyMedium>{description}</TypographyMedium>
		</Card>
	)
}

const Divider = () => (
	<div className="flex justify-center">
		<ArrowDown className="animate-pulse text-slate-500 transition-all duration-700" />
	</div>
)

export function Flow() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>⚙️ How Domia Works</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Domia doesn’t just process commands. It listens, feels, and decides
					whether you want to control something, chat, or just be understood.
				</TypographyLarge>

				<div className="flex flex-col items-center gap-4">
					<Step
						title="Step 1 — You Speak"
						description="You speak naturally to Domia. Audio is captured 100% locally — wake word and voice-activity detection run on-device, so nothing leaves your space."
					/>

					<Divider />

					<Step
						title="Step 2 — On-device Speech-to-Text"
						description="Your speech is transcribed locally with a streaming on-device model. No audio is ever sent to the cloud."
					/>

					<Divider />

					<Step
						title="Step 3 — Local LLM, with personality & skills"
						description="Domia builds a prompt from its character, emotion, and memory, then runs a local language model in the personality of the room you're talking to — a small, fast model on a small device, a larger one on a capable hub. Soon it will also call skills through MCP — looking things up or acting in your space (e.g. Home Assistant)."
					/>

					<Divider />

					<Step
						title="Step 4 — Streaming Text-to-Speech"
						description="The reply is spoken with an on-device TTS voice. Domia synthesizes sentence by sentence as the model writes, so it starts talking back with low latency."
					/>

					<Divider />

					<Step
						title="Step 5 — One mind, many rooms"
						description="A thin device can borrow compute from a stronger Domia hub over your local network — yet still answers in its own voice and identity. Skills like Home Assistant control are on the roadmap."
					/>
				</div>

				<TypographyBlockquote>
					“Domia redefines interaction — not just automating tasks, but
					cultivating relationships. It’s the beginning of a new kind of
					presence in your home.”
				</TypographyBlockquote>
			</CardContent>
		</Card>
	)
}
