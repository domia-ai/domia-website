import {
	ArrowUpRight,
	BookOpen,
	LayoutDashboard,
	ShieldAlert,
} from "lucide-react"
import { getTranslations } from "next-intl/server"

import { LinkButton } from "@/components/sections"
import { consoleRepoUrl, gettingStartedUrl } from "@/constants/run"

export async function InstallNotes() {
	const t = await getTranslations("run.firstTurn.notes")

	return (
		<ul className="grid list-none grid-cols-1 gap-6 md:grid-cols-3">
			<li className="flex items-start gap-3">
				<BookOpen
					aria-hidden="true"
					className="text-tool mt-0.5 size-5 shrink-0"
				/>
				<div className="flex flex-col items-start gap-2">
					<p className="text-muted-foreground text-pretty">{t("guide")}</p>
					<LinkButton
						href={gettingStartedUrl}
						variant="ghost"
						className="-ml-2.5"
					>
						{t("guideLink")}
						<ArrowUpRight data-icon="inline-end" aria-hidden="true" />
					</LinkButton>
				</div>
			</li>
			<li className="flex items-start gap-3">
				<LayoutDashboard
					aria-hidden="true"
					className="text-primary mt-0.5 size-5 shrink-0"
				/>
				<div className="flex flex-col items-start gap-2">
					<p className="text-muted-foreground text-pretty">{t("console")}</p>
					<LinkButton href={consoleRepoUrl} variant="ghost" className="-ml-2.5">
						{t("consoleLink")}
						<ArrowUpRight data-icon="inline-end" aria-hidden="true" />
					</LinkButton>
				</div>
			</li>
			<li className="flex items-start gap-3">
				<ShieldAlert
					aria-hidden="true"
					className="text-mesh mt-0.5 size-5 shrink-0"
				/>
				<p className="text-muted-foreground text-pretty">{t("mesh")}</p>
			</li>
		</ul>
	)
}
