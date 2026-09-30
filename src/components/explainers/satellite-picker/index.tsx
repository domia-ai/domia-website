import { ArrowRight } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { ExplainerSection, LinkButton } from "@/components/sections"
import { loadSatellites } from "@/data"
import type { SatelliteProtocol, SatelliteProtocolId } from "@/data/types"

import { SatellitePickerIsland } from "./island"
import type {
	SatellitePickerCopy,
	SatellitePickerExplainerProps,
	SatelliteProtocolCopy,
} from "./types"

export async function SatellitePickerExplainer({
	tone,
}: SatellitePickerExplainerProps) {
	const t = await getTranslations("explainers.satellitePicker")
	const data = loadSatellites()
	const followUp = data.followUpDefault ? "on" : "off"

	const protocolCopy = (item: SatelliteProtocol): SatelliteProtocolCopy => ({
		name: t(`protocols.${item.id}.name`),
		device: t(`protocols.${item.id}.device`),
		connection: t(
			item.connectsOut ? "details.nodeConnectsOut" : "details.deviceConnectsIn",
		),
		onDevice: item.onDevice.map((id) => t(`onDevice.${id}`)),
		streams: item.streams.map((id) => t(`streams.${id}`)),
		caveats: item.caveats.map((id) => t(`caveats.${id}`, { followUp })),
	})

	const protocols = data.protocols.reduce(
		(acc, item) => ({ ...acc, [item.id]: protocolCopy(item) }),
		{} as Record<SatelliteProtocolId, SatelliteProtocolCopy>,
	)

	const copy: SatellitePickerCopy = {
		chooseLabel: t("chooseLabel"),
		tabsLabel: t("tabsLabel"),
		stageLabel: t("stageLabel"),
		protocols,
		details: {
			heading: t("details.heading"),
			onDevice: t("details.onDevice"),
			streams: t("details.streams"),
			caveats: t("details.caveats"),
		},
		hub: {
			title: t("hub.title"),
			body: t("hub.body"),
			hint: { title: t("hub.hint.title"), body: t("hub.hint.body") },
		},
		hintIndexHeading: t("hintIndexHeading"),
		realtime: {
			title: t("realtime.title"),
			body: t("realtime.body"),
		},
	}

	return (
		<ExplainerSection
			id="satellites"
			title={t("title")}
			intro={t("intro")}
			tone={tone}
		>
			<div className="flex flex-col gap-6">
				<SatellitePickerIsland data={data} copy={copy} />
				<LinkButton
					href="/run"
					variant="link"
					className="h-auto self-start px-0 text-base"
				>
					{t("link")}
					<ArrowRight data-icon="inline-end" aria-hidden="true" />
				</LinkButton>
			</div>
			<noscript>
				<h3 className="font-medium">{t("noscript.heading")}</h3>
				<ol className="list-decimal pl-5">
					{data.protocols.map((item) => {
						const itemCopy = protocols[item.id]
						return (
							<li key={item.id}>
								<strong>{itemCopy.name}</strong> ({itemCopy.device}).{" "}
								{copy.details.onDevice}: {itemCopy.onDevice.join(", ")}.{" "}
								{copy.details.streams}: {itemCopy.streams.join(", ")}.
							</li>
						)
					})}
				</ol>
				<p>
					{copy.realtime.title}. {copy.realtime.body}
				</p>
			</noscript>
		</ExplainerSection>
	)
}
