import { ArrowRight } from "lucide-react"

import { LinkButton } from "@/components/sections"

import type { RelatedLinkProps } from "./types"

export function RelatedLink({ href, label }: RelatedLinkProps) {
	return (
		<LinkButton
			href={href}
			variant="link"
			className="h-auto self-start px-0 text-base"
		>
			{label}
			<ArrowRight data-icon="inline-end" aria-hidden="true" />
		</LinkButton>
	)
}
