import type { Metadata } from "next"

import {
	Hero,
	Talk,
	Feels,
	Configuration,
	Devices,
	Private,
	Customize,
	Nft,
	Memory,
	Trainer,
} from "@/components/experience"

export const metadata: Metadata = {
	title: "Domia | Experience",
	description:
		"Explore the Domia mobile and web apps — control your smart home, talk with your AI companion, and experience local AI with emotion in real-time.",
}

export default function Experience() {
	return (
		<div className="flex flex-col gap-10">
			<Hero />
			<Talk />
			<Feels />
			<Configuration />
			<Devices />
			<Private />
			<Customize />
			<Nft />
			<Memory />
			<Trainer />
		</div>
	)
}
