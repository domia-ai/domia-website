import { getTranslations } from "next-intl/server"

import { ExplainerSection } from "@/components/sections"
import { loadVoicePath } from "@/data"
import type { VoiceHop } from "@/data/types"

import { VoicePathLazy } from "./lazy"
import { hopItemLabel } from "./layout"
import { PathComparison } from "./path-comparison"
import type { VoicePathCopy, VoicePathExplainerProps } from "./types"

const uniqueIds = (hops: VoiceHop[]) => [...new Set(hops.map((hop) => hop.id))]

const storesOf = (hops: VoiceHop[], kind: VoiceHop["kind"]) =>
	hops.filter((hop) => hop.kind === kind).flatMap((hop) => hop.stores ?? [])

export async function VoicePathExplainer({ tone }: VoicePathExplainerProps) {
	const t = await getTranslations("explainers.voicePath")
	const data = loadVoicePath()
	const allHops = [...data.paths.cloud.hops, ...data.paths.local.hops]
	const questions = data.comparison.questions
	const entries = (prefix: string, keys: string[]) =>
		Object.fromEntries(keys.map((key) => [key, t(`${prefix}.${key}`)]))

	const copy: VoicePathCopy = {
		title: t("title"),
		intro: t("intro"),
		switchLabel: t("switchLabel"),
		paths: { cloud: t("paths.cloud"), local: t("paths.local") },
		hops: entries("hops", uniqueIds(allHops)),
		vendorItems: entries("vendor", storesOf(allHops, "vendor")),
		nodeItems: entries("node", storesOf(allHops, "node")),
		networkLabel: t("networkLabel"),
		offlineTag: t("offlineTag"),
		offlineNote: t("offlineNote"),
		note: t("note"),
		comparison: {
			caption: t("comparison.caption"),
			questions: entries("comparison.questions", questions),
			answers: {
				cloud: entries("comparison.cloud", questions),
				local: entries("comparison.local", questions),
			},
		},
		hints: {
			heading: t("hints.heading"),
			vendor: {
				id: "voice-path-vendor",
				title: t("hints.vendor.title"),
				body: t("hints.vendor.body"),
			},
			node: {
				id: "voice-path-node",
				title: t("hints.node.title"),
				body: t("hints.node.body"),
			},
		},
		noscriptHeading: t("noscript.heading"),
		stageLabel: t("stageLabel"),
	}

	const describeHop = (hop: VoiceHop) => {
		const label = copy.hops[hop.id] ?? hop.id
		const items = hop.stores
			?.map((item) => hopItemLabel(hop, item, copy.vendorItems, copy.nodeItems))
			.join(", ")
		return items ? `${label} (${items})` : label
	}

	return (
		<ExplainerSection
			id="voice-path"
			title={copy.title}
			intro={copy.intro}
			tone={tone}
		>
			<div className="flex flex-col gap-6">
				<VoicePathLazy data={data} copy={copy} />
				<PathComparison questions={questions} copy={copy} />
			</div>
			<noscript>
				<p className="font-medium">{copy.noscriptHeading}</p>
				<p>{copy.paths.cloud}</p>
				<ol>
					{data.paths.cloud.hops.map((hop) => (
						<li key={hop.id}>{describeHop(hop)}</li>
					))}
				</ol>
				<p>
					{copy.paths.local} ({copy.networkLabel})
				</p>
				<ol>
					{data.paths.local.hops.map((hop) => (
						<li key={hop.id}>{describeHop(hop)}</li>
					))}
				</ol>
				<p>{copy.note}</p>
			</noscript>
		</ExplainerSection>
	)
}
