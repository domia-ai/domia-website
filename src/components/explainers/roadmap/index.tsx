import { CalendarCheckIcon } from "lucide-react"
import { getFormatter, getTranslations } from "next-intl/server"

import { Badge } from "@/components/ui/badge"
import { ExplainerSection } from "@/components/sections"
import { loadRoadmap } from "@/data"

import { laneOrder } from "./constants"
import { RoadmapLaneBlock } from "./lane"
import { groupByArea } from "./lanes"
import type { RoadmapExplainerProps, RoadmapLane } from "./types"

export async function RoadmapExplainer({ tone }: RoadmapExplainerProps) {
	const data = loadRoadmap()
	const t = await getTranslations("explainers.roadmap")
	const format = await getFormatter()
	const verifiedDate = format.dateTime(new Date(data.verifiedAt), {
		dateStyle: "long",
		timeZone: "UTC",
	})
	const lanes: RoadmapLane[] = laneOrder.map((key) => ({
		key,
		label: t(`lanes.${key}`),
		areas: groupByArea(data.lanes[key]).map(({ area, ids }) => ({
			area,
			label: t(`areas.${area}`),
			items: ids.map((id) => ({
				id,
				label: t(`items.${id}.label`),
				note: t(`items.${id}.note`),
			})),
		})),
	}))

	return (
		<ExplainerSection
			id="roadmap"
			title={t("title")}
			intro={t("intro")}
			tone={tone}
		>
			<div className="flex flex-col gap-10">
				<Badge
					variant="outline"
					className="text-muted-foreground h-auto gap-1.5 self-start px-2.5 py-1"
				>
					<CalendarCheckIcon aria-hidden="true" />
					{t("verified", { date: verifiedDate })}
				</Badge>
				{lanes.map((lane) => (
					<RoadmapLaneBlock key={lane.key} lane={lane} />
				))}
			</div>
		</ExplainerSection>
	)
}
