import type { Metadata } from "next"

import {
	Hero,
	Devices,
	Talk,
	AudioReplay,
	Latency,
	Grading,
	RunAgain,
	Archive,
	Configuration,
	Private,
	Personas,
	WhatsNext,
} from "@/components/experience"

export const metadata: Metadata = {
	title: "The Domia Console — manage your local voice AI fleet",
	description:
		"The Console is the local web app you run alongside your Domias. See every device, replay any conversation with audio, tune latency, grade interactions, and export your dialogues for fine-tuning — all on your own network.",
	alternates: { canonical: "/experience" },
}

export default function Experience() {
	return (
		<div className="flex flex-col gap-10">
			<Hero />
			<Devices />
			<Talk />
			<AudioReplay />
			<Latency />
			<Grading />
			<RunAgain />
			<Archive />
			<Configuration />
			<Private />
			<Personas />
			<WhatsNext />
		</div>
	)
}
