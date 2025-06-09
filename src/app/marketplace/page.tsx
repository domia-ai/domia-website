import type { Metadata } from "next"

import {
	Hero,
	Find,
	Module,
	Evolve,
	Adopted,
	Build,
	Create,
	Voice,
	Memory,
	Cultural,
	Aesthetic,
	Profession,
} from "@/components/marketplace"

export const metadata: Metadata = {
	title: "Domia | Marketplace",
	description:
		"Discover voice packs, memory seeds, cultural plugins, and more to personalize and expand your Domia experience.",
}

export default function Marketplace() {
	return (
		<div className="flex flex-col gap-10">
			<Hero />
			<Find />
			<Module />
			<Evolve />
			<Adopted />
			<Build />
			<Create />
			<Voice />
			<Memory />
			<Cultural />
			<Aesthetic />
			<Profession />
		</div>
	)
}
