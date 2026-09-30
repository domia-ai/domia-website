import { getTranslations } from "next-intl/server"

import { ExplainerSection } from "@/components/sections"
import { loadConsoleTour } from "@/data"

import { ConsoleTourIsland } from "./island"
import { ConsoleTourStacked } from "./stacked"
import type {
	ConsoleTourCopy,
	ConsoleTourExplainerProps,
	ConsoleTourGroups,
} from "./types"

export async function ConsoleTourExplainer({
	tone,
}: ConsoleTourExplainerProps) {
	const data = loadConsoleTour()
	const t = await getTranslations("explainers.consoleTour")

	const groups: ConsoleTourGroups = {
		lead: data.screens.filter((screen) => screen.lead),
		more: data.screens.filter((screen) => !screen.lead),
	}

	const copy: ConsoleTourCopy = {
		title: t("title"),
		intro: t("intro"),
		tabsLabel: t("tabsLabel"),
		moreScreens: t("moreScreens"),
		hotspotsHeading: t("hotspotsHeading"),
		demo: {
			openScreen: t("openDemo"),
			openHome: t("openDemoHome"),
			caption: t("caption"),
			notLiveYet: t("notLiveYet"),
		},
		noscriptHeading: t("noscriptHeading"),
		screens: Object.fromEntries(
			data.screens.map((screen) => {
				const title = t(`screens.${screen.key}.title`)
				return [
					screen.key,
					{
						title,
						summary: t(`screens.${screen.key}.summary`),
						imageAlt: t("imageAlt", { screen: title }),
						hotspots: Object.fromEntries(
							screen.hotspots.map((hotspot) => [
								hotspot.id,
								{
									title: t(
										`screens.${screen.key}.hotspots.${hotspot.id}.title`,
									),
									body: t(`screens.${screen.key}.hotspots.${hotspot.id}.body`),
								},
							]),
						),
					},
				]
			}),
		),
	}

	return (
		<ExplainerSection
			id="console-tour"
			title={copy.title}
			intro={copy.intro}
			tone={tone}
		>
			<ConsoleTourIsland groups={groups} copy={copy} />
			<ConsoleTourStacked groups={groups} copy={copy} />
			<noscript>
				<p className="mt-6 hidden font-medium md:block">
					{copy.noscriptHeading}
				</p>
				<ol className="mt-2 hidden list-decimal space-y-1 pl-5 md:block">
					{data.screens.map((screen) => (
						<li key={screen.key}>
							<span className="font-medium">
								{copy.screens[screen.key].title}
							</span>
							{": "}
							{copy.screens[screen.key].summary}
						</li>
					))}
				</ol>
			</noscript>
		</ExplainerSection>
	)
}
