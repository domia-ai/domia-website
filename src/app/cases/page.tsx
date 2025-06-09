import type { Metadata } from "next"

import {
	Hero,
	Smart,
	Host,
	Trainer,
	Wellness,
	Creative,
	Personas,
	Spaces,
	Cultural,
	Frontdesk,
	Devices,
} from "@/components/cases"

export const metadata: Metadata = {
	title: "Domia | Use Cases",
	description:
		"Explore real-world use cases of Domia in smart homes, hotels, and beyond. See how emotional AI transforms everyday life.",
}

export default function Cases() {
	return (
		<div className="flex flex-col gap-10">
			<Hero />
			<Smart />
			<Host />
			<Trainer />
			<Wellness />
			<Creative />
			<Personas />
			<Spaces />
			<Cultural />
			<Frontdesk />
			<Devices />
		</div>
	)
}
