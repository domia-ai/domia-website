import type { Metadata } from "next"

import {
	Hero,
	Future,
	Building,
	Alive,
	Profile,
	Mind,
	Free,
	Backers,
	Rare,
	Hardware,
	Vision,
	Labs,
	Trust,
	Join,
	Build,
} from "@/components/nft"

export const metadata: Metadata = {
	title: "Domia | Founders NFTs",
	description:
		"Own a piece of Domia’s future with our limited-edition Founders NFTs — unlock early access, perks, and community rewards.",
}

export default function Nft() {
	return (
		<div className="flex flex-col gap-10">
			<Hero />
			<Future />
			<Building />
			<Alive />
			<Profile />
			<Mind />
			<Free />
			<Backers />
			<Rare />
			<Hardware />
			<Vision />
			<Labs />
			<Trust />
			<Join />
			<Build />
		</div>
	)
}
