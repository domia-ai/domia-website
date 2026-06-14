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
import { CtaBand } from "@/components/common/cta-band"

export const metadata: Metadata = {
	title: "Open-Source Community",
	description:
		"Join the Domia community — builders, creators, and privacy advocates shaping an open-source, local-first voice AI. Connect, contribute, and steer the roadmap.",
	alternates: { canonical: "/community" },
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
			<CtaBand
				title="Build with us"
				subtitle="Domia is open source. Add personas and skills, propose features, or hack the architecture — start on GitHub or say hi."
				contactLabel="Say hi"
			/>
		</div>
	)
}
