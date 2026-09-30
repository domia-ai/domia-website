import { getTranslations } from "next-intl/server"
import { ArrowUpRight } from "lucide-react"

import { Section } from "@/components/sections"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { TypographyH2 } from "@/components/ui/typography"

import { communityLinks } from "./constants"

export async function Community() {
	const t = await getTranslations("about.community")

	return (
		<Section id="community" tone="base" labelledBy="community-title">
			<div className="flex flex-col gap-10">
				<TypographyH2 id="community-title" className="text-center">
					{t("title")}
				</TypographyH2>
				<ul className="grid list-none grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
					{communityLinks.map(({ id, href, icon: Icon }) => (
						<li key={id}>
							<a
								href={href}
								target="_blank"
								rel="noopener noreferrer"
								className="group focus-visible:ring-ring/50 block h-full rounded-xl outline-none focus-visible:ring-3"
							>
								<Card className="group-hover:ring-foreground/25 h-full transition-shadow">
									<CardHeader>
										<span
											aria-hidden="true"
											className="bg-primary/10 text-primary mb-2 flex size-10 items-center justify-center rounded-lg"
										>
											<Icon className="size-5" />
										</span>
										<CardTitle className="text-lg">
											{t(`items.${id}.title`)}
										</CardTitle>
									</CardHeader>
									<CardContent className="flex-1">
										<CardDescription className="text-base">
											{t(`items.${id}.body`)}
										</CardDescription>
									</CardContent>
									<CardFooter className="text-primary gap-1 border-0 bg-transparent pt-0 font-medium group-hover:underline">
										{t(`items.${id}.link`)}
										<ArrowUpRight className="size-4" aria-hidden="true" />
									</CardFooter>
								</Card>
							</a>
						</li>
					))}
				</ul>
			</div>
		</Section>
	)
}
