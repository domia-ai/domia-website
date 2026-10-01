import { getTranslations } from "next-intl/server"

import { Section, StepList } from "@/components/sections"
import type { StepItem } from "@/components/sections"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"
import { stepIds } from "@/constants/run"

import { Help } from "./help"
import { InstallNotes } from "./install-notes"
import { Requirements } from "./requirements"
import type { StepId } from "./types"

const stepColors: Record<StepId, StepItem["color"]> = {
	install: "model",
	template: "tool",
	bind: "audio",
	speak: "speech",
}

export async function FirstTurn() {
	const t = await getTranslations("run.firstTurn")

	const steps: StepItem[] = stepIds.map((id) => ({
		id,
		title: t(`steps.${id}.title`),
		body: t(`steps.${id}.body`),
		color: stepColors[id],
	}))

	return (
		<Section id="first-turn" tone="alt" labelledBy="first-turn-title">
			<div className="flex flex-col gap-10">
				<div className="flex max-w-3xl flex-col gap-4">
					<TypographyH2 id="first-turn-title">{t("title")}</TypographyH2>
					<TypographyLarge className="text-muted-foreground">
						{t("intro")}
					</TypographyLarge>
				</div>
				<Requirements />
				<StepList steps={steps} />
				<InstallNotes />
				<Help />
			</div>
		</Section>
	)
}
