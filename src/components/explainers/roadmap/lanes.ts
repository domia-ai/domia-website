import type { RoadmapEntry } from "@/data/types"

import { areaOrder } from "./constants"
import type { RoadmapAreaEntries } from "./types"

export const groupByArea = (entries: RoadmapEntry[]): RoadmapAreaEntries[] =>
	areaOrder
		.map((area) => ({
			area,
			ids: entries
				.filter((entry) => entry.area === area)
				.map((entry) => entry.id),
		}))
		.filter((group) => group.ids.length > 0)
