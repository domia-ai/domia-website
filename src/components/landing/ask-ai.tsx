import { ChevronDown, Sparkles } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { Button } from "@/components/ui/button"
import {
	ClaudeIcon,
	GeminiIcon,
	OpenaiIcon,
	PerplexityIcon,
} from "@/components/landing/icons"

import { AskAiCopyButton } from "./ask-ai-copy"
import type { AskAiAssistant } from "./types"

const assistants: AskAiAssistant[] = [
	{ name: "ChatGPT", href: "https://chatgpt.com/?q=", icon: OpenaiIcon },
	{ name: "Claude", href: "https://claude.ai/new?q=", icon: ClaudeIcon },
	{
		name: "Gemini",
		href: "https://gemini.google.com/app?q=",
		icon: GeminiIcon,
	},
	{ name: "Grok", href: "https://grok.com/?q=", icon: Sparkles },
	{
		name: "Perplexity",
		href: "https://www.perplexity.ai/search?q=",
		icon: PerplexityIcon,
	},
]

export async function AskAi() {
	const t = await getTranslations("landing.askAi")
	const prompt = t("prompt")
	const query = encodeURIComponent(prompt)

	return (
		<details className="group w-full max-w-xl">
			<summary className="text-muted-foreground hover:text-foreground focus-visible:ring-ring/50 mx-auto flex w-fit cursor-pointer list-none items-center gap-1.5 rounded-md px-2 py-1 text-sm outline-none focus-visible:ring-[3px] [&::-webkit-details-marker]:hidden">
				{t("trigger")}
				<ChevronDown
					className="size-4 group-open:rotate-180 motion-safe:transition-transform"
					aria-hidden="true"
				/>
			</summary>
			<div className="bg-popover text-popover-foreground ring-foreground/10 mt-3 flex flex-col items-center gap-3 rounded-xl p-4 ring-1">
				<p className="text-muted-foreground text-sm text-balance">
					{t("intro")}
				</p>
				<ul className="flex list-none flex-wrap items-center justify-center gap-2">
					{assistants.map(({ name, href, icon: Icon }) => (
						<li key={name}>
							<Button
								variant="outline"
								size="sm"
								className="rounded-full"
								nativeButton={false}
								render={
									<a
										href={`${href}${query}`}
										target="_blank"
										rel="noopener noreferrer"
									/>
								}
							>
								<Icon data-icon="inline-start" aria-hidden="true" />
								{name}
							</Button>
						</li>
					))}
				</ul>
				<AskAiCopyButton
					prompt={prompt}
					label={t("copy")}
					copiedTitle={t("copiedTitle")}
					copiedDescription={t("copiedDescription")}
					failedTitle={t("copyFailedTitle")}
					failedDescription={t("copyFailedDescription")}
				/>
			</div>
		</details>
	)
}
