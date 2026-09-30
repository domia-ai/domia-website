import { Gauge, HardDrive, PenLine, RotateCcw } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { ProofGrid, Section } from "@/components/sections"
import { TypographyH2 } from "@/components/ui/typography"

export async function Proof() {
	const t = await getTranslations("experience.proof")

	return (
		<Section tone="base" labelledBy="experience-proof-title">
			<div className="flex flex-col gap-10">
				<TypographyH2 id="experience-proof-title" className="max-w-3xl">
					{t("title")}
				</TypographyH2>
				<ProofGrid
					columns={2}
					items={[
						{
							id: "write",
							icon: PenLine,
							title: t("write.title"),
							body: t("write.body"),
						},
						{
							id: "data",
							icon: HardDrive,
							title: t("data.title"),
							body: t("data.body"),
						},
						{
							id: "rerun",
							icon: RotateCcw,
							title: t("rerun.title"),
							body: t("rerun.body"),
						},
						{
							id: "latency",
							icon: Gauge,
							title: t("latency.title"),
							body: t("latency.body"),
						},
					]}
				/>
			</div>
		</Section>
	)
}
