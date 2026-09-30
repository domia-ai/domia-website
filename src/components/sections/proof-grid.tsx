import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"

import { LinkButton } from "./link-button"
import type { ProofGridProps, ProofItem } from "./types"

const columnsClassName: Record<2 | 3, string> = {
	2: "lg:grid-cols-2",
	3: "lg:grid-cols-3",
}

function ProofCard({ title, body, icon: Icon, href, hrefLabel }: ProofItem) {
	return (
		<Card className="h-full">
			<CardHeader>
				{Icon ? (
					<div className="bg-primary/10 text-primary mb-2 flex size-10 items-center justify-center rounded-lg">
						<Icon className="size-5" aria-hidden="true" />
					</div>
				) : null}
				<CardTitle className="text-lg">{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<CardDescription className="text-base">{body}</CardDescription>
			</CardContent>
			{href && hrefLabel ? (
				<CardFooter className="border-0 bg-transparent pt-0">
					<LinkButton href={href} variant="ghost" className="-ml-2.5">
						{hrefLabel}
						<ArrowUpRight data-icon="inline-end" aria-hidden="true" />
					</LinkButton>
				</CardFooter>
			) : null}
		</Card>
	)
}

export function ProofGrid({ items, columns = 3 }: ProofGridProps) {
	return (
		<ul
			className={cn(
				"grid list-none grid-cols-1 gap-6 md:grid-cols-2",
				columnsClassName[columns],
			)}
		>
			{items.map((item) => (
				<li key={item.id}>
					<ProofCard {...item} />
				</li>
			))}
		</ul>
	)
}
