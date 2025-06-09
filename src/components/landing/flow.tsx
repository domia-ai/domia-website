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
						title="Step 1 - You Speak"
						description="You speak naturally to Domia. Audio is captured 100% locally through an onboard mic array — ensuring privacy and zero cloud reliance."
					/>

					<Divider />

					<Step
						title="Step 2 - STT + Intent Detection"
						description="Speech is transcribed using a local Whisper or Vosk model. Domia then classifies your intent into either a smart action or an open conversation using embedded intent parsing."
					/>

					<Divider />

					<div className="grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
						<Step
							title="Step 3a - If Action"
							description="The intent triggers Home Assistant integration. Domia communicates locally via MQTT or API to control lights, sensors, switches, and more — instantly and offline."
						/>
						<Step
							title="Step 3b - If Conversation"
							description="Domia activates its cognitive stack: Emotion Engine, Narrative Memory, Character Profile, and Context modules. RAG (Retrieval-Augmented Generation) is used to construct a dynamic prompt."
						/>
					</div>

					<Divider />

					<Step
						title="Step 4 - Local Q-LoRA Inference"
						description="The enriched prompt is passed into a fine-tuned, quantized Q-LoRA model in GGUF format. This enables fast, context-aware inference fully on-device."
					/>
					<Divider />

					<Step
						title="Step 5 - TTS Response"
						description="The model’s response is spoken using a local TTS engine — emotionally tuned, latency-free, and adapted to your relationship with Domia."
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
