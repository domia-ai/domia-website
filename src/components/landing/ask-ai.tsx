"use client"
import type { ComponentType, SVGProps } from "react"
import { Sparkles, Copy } from "lucide-react"
import { toast } from "sonner"
import { useTranslations } from "next-intl"

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
	const t = useTranslations("landing.askAi")
	const prompt = t("prompt")

	const copyPrompt = async () => {
		try {
			await navigator.clipboard.writeText(prompt)
			toast.success(t("copiedTitle"), {
				description: t("copiedDescription"),
			})
		} catch {
			toast.error(t("copyFailedTitle"), {
				description: t("copyFailedDescription"),
			})
		}
	}

	return (
		<Card>
			<CardHeader>
				<TypographyH2>
					<Sparkles className="text-primary mr-2 inline size-6" />
					{t("title")}
				</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>{t("intro")}</TypographyLarge>

				<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
					{ASSISTANTS.map(({ name, href, icon: Icon }) => (
						<a
							key={name}
							href={`${href}${encodeURIComponent(prompt)}`}
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
						{t("copy")}
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}
