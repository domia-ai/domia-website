import { LayoutDashboard, LifeBuoy } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { DemoLink } from "@/components/landing/demo-link"
import { LinkButton } from "@/components/sections"
import { Card, CardContent } from "@/components/ui/card"
import { discordUrl } from "@/constants"
import { issuesUrl } from "@/constants/run"

export async function Help() {
	const t = await getTranslations("run.firstTurn.help")

	return (
		<ul className="grid list-none grid-cols-1 gap-4 md:grid-cols-2">
			<li className="flex">
				<Card size="sm" className="w-full">
					<CardContent className="flex flex-col items-start gap-3">
						<p className="flex items-center gap-2 font-medium">
							<LayoutDashboard
								aria-hidden="true"
								className="text-primary size-5"
							/>
							{t("notReady.title")}
						</p>
						<p className="text-muted-foreground text-sm text-pretty">
							{t("notReady.body")}
						</p>
						<DemoLink variant="secondary" label={t("notReady.link")} />
					</CardContent>
				</Card>
			</li>
			<li className="flex">
				<Card size="sm" className="w-full">
					<CardContent className="flex flex-col items-start gap-3">
						<p className="flex items-center gap-2 font-medium">
							<LifeBuoy aria-hidden="true" className="text-primary size-5" />
							{t("stuck.title")}
						</p>
						<p className="text-muted-foreground text-sm text-pretty">
							{t("stuck.body")}
						</p>
						<div className="flex flex-wrap gap-2">
							<LinkButton href={discordUrl} variant="outline" size="sm">
								{t("stuck.discord")}
							</LinkButton>
							<LinkButton href={issuesUrl} variant="outline" size="sm">
								{t("stuck.issues")}
							</LinkButton>
						</div>
					</CardContent>
				</Card>
			</li>
		</ul>
	)
}
