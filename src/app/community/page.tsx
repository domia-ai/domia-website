import type { Metadata } from "next"

import {
	Hero,
	Contributors,
	Ambassadors,
	Spaces,
	Partners,
	Academy,
	Chapters,
	Open,
	Recognition,
	Modules,
	Collabs,
} from "@/components/community"

export const metadata: Metadata = {
	title: "Domia | Community",
	description:
		"Join the growing Domia community — connect with other creators, share feedback, and shape the future of local AI.",
}

export default function Community() {
	return (
		<div className="flex flex-col gap-10">
			<Hero />
			<Contributors />
			<Ambassadors />
			<Spaces />
			<Partners />
			<Academy />
			<Chapters />
			<Open />
			<Recognition />
			<Modules />
			<Collabs />
		</div>
	)
}
