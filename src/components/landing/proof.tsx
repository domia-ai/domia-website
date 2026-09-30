import { Brain, Ear, MessagesSquare, Plug } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { ProofGrid, Section } from "@/components/sections"
import { TypographyH2 } from "@/components/ui/typography"

import type { ProofEntry } from "./types"

const proofItems: ProofEntry[] = [
	{ id: "converses", icon: MessagesSquare },
	{ id: "acts", icon: Plug },
	{ id: "remembers", icon: Brain },
	{ id: "interrupt", icon: Ear },
]

export async function Proof() {
	const t = await getTranslations("landing.proof")

	return (
		<Section tone="alt" labelledBy="proof-title">
			<div className="flex flex-col gap-10">
				<TypographyH2 id="proof-title" className="text-center">
					{t("title")}
				</TypographyH2>
				<ProofGrid
					columns={2}
					items={proofItems.map(({ id, icon }) => ({
						id,
						icon,
						title: t(`${id}.title`),
						body: t(`${id}.body`),
					}))}
				/>
			</div>
		</Section>
	)
}
