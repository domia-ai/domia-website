import { getTranslations } from "next-intl/server"

import { TypographyH3, TypographyP } from "@/components/ui/typography"
import { contactEmail, socialMediaLinks } from "@/constants/landing"

import { contactChannelIds } from "./constants"

const channels = contactChannelIds.flatMap((id) =>
	socialMediaLinks
		.filter((link) => link.name.toLowerCase() === id)
		.map((link) => ({ id, href: link.href, Icon: link.icon })),
)

export async function Channels() {
	const t = await getTranslations("contact.channels")

	return (
		<div className="flex flex-col gap-6">
			<TypographyH3 className="text-2xl">{t("title")}</TypographyH3>

			<ul className="flex flex-col gap-3">
				{channels.map(({ id, href, Icon }) => {
					const external = !href.startsWith("mailto:")

					return (
						<li key={id}>
							<a
								href={href}
								target={external ? "_blank" : undefined}
								rel={external ? "noopener noreferrer" : undefined}
								className="hover:bg-muted focus-visible:ring-ring flex items-center gap-4 rounded-lg border p-4 transition-colors focus-visible:ring-2 focus-visible:outline-none"
							>
								<span className="bg-primary/10 text-primary rounded-lg p-2">
									<Icon aria-hidden="true" className="size-5" />
								</span>
								<span className="flex min-w-0 flex-col">
									<TypographyP className="font-medium">
										{t(`${id}.label`)}
									</TypographyP>
									<TypographyP className="text-muted-foreground text-sm break-words">
										{id === "email" ? contactEmail : t(`${id}.description`)}
									</TypographyP>
								</span>
							</a>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
