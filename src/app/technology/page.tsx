import type { Metadata } from "next"

import {
	Hero,
	Hardware,
	Node,
	Engine,
	Stt,
	Model,
	Tts,
	App,
	Marketplace,
	Nft,
	Stack,
	Private,
	Local,
} from "@/components/technology"

export const metadata: Metadata = {
	title: "Domia | Technology",
	description:
		"Learn how Domia works under the hood — from emotional engines to local LLMs and privacy-first architecture.",
}

export default function Technology() {
	return (
		<div className="flex flex-col gap-10">
			<Hero />
			<Hardware />
			<Node />
			<Engine />
			<Stt />
			<Model />
			<Tts />
			<App />
			<Marketplace />
			<Nft />
			<Stack />
			<Private />
			<Local />
		</div>
	)
}
