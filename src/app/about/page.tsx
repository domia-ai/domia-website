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
import { CtaBand } from "@/components/common/cta-band"

export const metadata: Metadata = {
	title: "About — Local-First Voice AI",
	description:
		"The mission, vision, and people behind Domia — a private, local voice AI companion that lives, learns, and evolves with you, on your own hardware.",
	alternates: { canonical: "/about" },
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
			<CtaBand />
		</div>
	)
}
