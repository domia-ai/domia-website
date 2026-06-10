"use client"
import type { ComponentType, SVGProps } from "react"
import { Sparkles, Copy } from "lucide-react"
import { toast } from "sonner"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
	OpenaiIcon,
	ClaudeIcon,
	GeminiIcon,
	XIcon,
	PerplexityIcon,
} from "@/components/landing/icons"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"
import { cn } from "@/lib/utils"

const PROMPT = `I just discovered a project called Domia and I want to really get it. Website: https://domia.ai — source: https://github.com/domia-ai (if you can browse, please open them). Here's the full context so you understand it 100%:

Domia is a private, local voice AI — a network of voice companions that live in your home, hotel, or any intelligent space. Everything runs on your own hardware, with zero cloud: the whole speech-to-speech loop (wake word, voice-activity detection, speech-to-text, a local language model, and text-to-speech) happens on-device, so no audio ever leaves the building.

What makes it special:
- A real personality, voice, emotion, and memory PER room — your kitchen could be a cheerful chef that suggests recipes, your bedroom a calm companion that winds you down, the living room an excited movie buff. Each one remembers you and evolves.
- It's a peer-to-peer mesh: a thin little device in each room handles the mic and speaker and borrows compute from one stronger "hub" that runs the heavy models and serves many rooms at once — yet every reply still comes back in that room's own voice and character. No central server; what each device does is just configuration, nothing hardcoded.
- The models are swappable and adapt to the hardware — a small fast model on a tiny device, a bigger one on a capable hub. No lock-in.
- It's source-available, privacy-first, and deeply customizable: you can shape a persona, extend its knowledge, and even import a whole "mind" (persona + memory) as a JSON file that's ready to try in seconds. Coming soon: skills via the Model Context Protocol (MCP) so it can actually act (e.g. control a smart home).

Please explain it back to me with genuine enthusiasm: what Domia is, everything it's capable of, how it works in simple terms, and the coolest real use cases (a family home, an Airbnb or hotel, a small business). Help me feel why this is exciting and what I could build with it.`

const ASSISTANTS: {
	name: string
	href: string
	icon: ComponentType<SVGProps<SVGSVGElement>>
}[] = [
	{ name: "ChatGPT", href: "https://chatgpt.com/?q=", icon: OpenaiIcon },
	{ name: "Claude", href: "https://claude.ai/new?q=", icon: ClaudeIcon },
	{
		name: "Gemini",
		href: "https://gemini.google.com/app?q=",
		icon: GeminiIcon,
	},
	{ name: "Grok", href: "https://grok.com/?q=", icon: XIcon },
	{
		name: "Perplexity",
		href: "https://www.perplexity.ai/search?q=",
		icon: PerplexityIcon,
	},
]

export function AskAi() {
	const copyPrompt = async () => {
		try {
			await navigator.clipboard.writeText(PROMPT)
			toast.success("Prompt copied", {
				description: "Paste it into any AI assistant.",
			})
		} catch {
			toast.error("Couldn’t copy", {
				description: "Select the text and copy it manually.",
			})
		}
	}

	return (
		<Card>
			<CardHeader>
				<TypographyH2>
					<Sparkles className="text-primary mr-2 inline size-6" />
					Ask any AI about Domia
				</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Short on time? Let your favorite AI summarize Domia for you — we’ve
					written the prompt with full context, just pick an assistant.
				</TypographyLarge>

				<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
					{ASSISTANTS.map(({ name, href, icon: Icon }) => (
						<a
							key={name}
							href={`${href}${encodeURIComponent(PROMPT)}`}
							target="_blank"
							rel="noopener noreferrer"
							className={cn(
								"bg-secondary hover:border-primary hover:bg-secondary/70",
								"flex flex-col items-center justify-center gap-3 rounded-xl border p-5",
								"transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
							)}
						>
							<Icon className="size-8" />
							<span className="text-sm font-semibold">{name}</span>
						</a>
					))}
				</div>

				<div>
					<Button variant="ghost" size="sm" onClick={copyPrompt}>
						<Copy className="mr-2 size-4" />
						Copy the prompt
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}
