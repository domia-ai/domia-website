import { ArrowRight, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { demoUrl } from "@/constants"

type DemoLinkVariant = "primary" | "secondary" | "inline"

type DemoLinkProps = {
	path?: string
	label?: string
	variant?: DemoLinkVariant
	className?: string
}

export function DemoLink({
	path = "/",
	label = "Try the live demo",
	variant = "primary",
	className,
}: DemoLinkProps) {
	const href = path.startsWith("/") ? `${demoUrl}${path}` : `${demoUrl}/${path}`

	if (variant === "inline") {
		return (
			<a
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				className={cn(
					"text-primary hover:text-primary/80 inline-flex items-center gap-2 self-start text-sm font-medium transition-colors",
					className,
				)}
			>
				{label}
				<ArrowRight className="size-4" />
			</a>
		)
	}

	return (
		<Button
			size={variant === "primary" ? "lg" : "sm"}
			variant={variant === "primary" ? "default" : "outline"}
			className={className}
			nativeButton={false}
			render={<a href={href} target="_blank" rel="noopener noreferrer" />}
		>
			{label}
			<ExternalLink className="ml-2 size-4" />
		</Button>
	)
}
