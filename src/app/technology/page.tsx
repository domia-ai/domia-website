import type { Metadata } from "next"

import {
	Hero,
	Diagram,
	Hardware,
	Node,
	Engine,
	Stt,
	Model,
	Tts,
	App,
	Marketplace,
	Stack,
	Private,
	Local,
} from "@/components/technology"
import { BreadcrumbsJsonLd } from "@/components/seo/breadcrumbs"

export const metadata: Metadata = {
	title: "Technology & Architecture",
	description:
		"How Domia works under the hood: on-device speech-to-speech, swappable local language models, a gRPC peer-to-peer mesh, capability delegation, parallel inference pools, and live config — models adapt to your hardware, never locked in.",
	alternates: { canonical: "/technology" },
}

export default function Technology() {
	return (
		<div className="flex flex-col gap-10">
			<BreadcrumbsJsonLd
				items={[{ name: "Technology", path: "/technology" }]}
			/>
			<Hero />
			<Diagram />
			<Stack />
			<Stt />
			<Model />
			<Tts />
			<Hardware />
			<Node />
			<Engine />
			<App />
			<Marketplace />
			<Private />
			<Local />
		</div>
	)
}
