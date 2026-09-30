"use client"

import { Copy } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

import type { AskAiCopyButtonProps } from "./types"

export function AskAiCopyButton({
	prompt,
	label,
	copiedTitle,
	copiedDescription,
	failedTitle,
	failedDescription,
}: AskAiCopyButtonProps) {
	const copyPrompt = async () => {
		try {
			await navigator.clipboard.writeText(prompt)
			toast.success(copiedTitle, { description: copiedDescription })
		} catch {
			toast.error(failedTitle, { description: failedDescription })
		}
	}

	return (
		<Button variant="ghost" size="sm" onClick={copyPrompt}>
			<Copy data-icon="inline-start" aria-hidden="true" />
			{label}
		</Button>
	)
}
