import type { Metadata } from "next"

import {
	Hero,
	Mission,
	Vision,
	Values,
	Promise,
	Join,
	Manifesto,
	Name,
	Future,
} from "@/components/about"

export const metadata: Metadata = {
	title: "Domia | About",
	description:
		"Discover the mission, vision, and people behind Domia — the local AI that lives, learns, and evolves with you.",
}

export default function About() {
	return (
		<div className="flex flex-col gap-10">
			<Hero />
			<Name />
			<Mission />
			<Vision />
			<Values />
			<Promise />
			<Join />
			<Manifesto />
			<Future />
		</div>
	)
}
