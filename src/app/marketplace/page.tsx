import type { Metadata } from "next"

import {
	Hero,
	Find,
	Importable,
	Skills,
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
	title: "Persona & Voice Marketplace",
	description:
		"Personas, voices, skills, and importable Domia minds (persona + memory as JSON) for your local voice AI — ready to drop in and try.",
	alternates: { canonical: "/marketplace" },
}

export default function Marketplace() {
	return (
		<div className="flex flex-col gap-10">
			<Hero />
			<Find />
			<Importable />
			<Skills />
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
