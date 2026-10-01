import {
	BarChart3,
	Clock,
	Cookie,
	HardDrive,
	Mail,
	PlayCircle,
	Plug,
	Trash2,
} from "lucide-react"

import { coreRepoUrl, websiteRepoUrl } from "@/constants"

import type { PrivacyEntry, PrivacyGroupId } from "./types"

export const privacyEntries: Record<PrivacyGroupId, PrivacyEntry[]> = {
	site: [
		{ id: "form", icon: Mail },
		{ id: "analytics", icon: BarChart3 },
		{ id: "language", icon: Cookie },
		{ id: "media", icon: PlayCircle },
	],
	product: [
		{ id: "local", icon: HardDrive },
		{ id: "retention", icon: Clock },
		{ id: "erase", icon: Trash2 },
		{ id: "skills", icon: Plug },
	],
}

export const privacyCodeUrls: Record<PrivacyGroupId, string> = {
	site: websiteRepoUrl,
	product: coreRepoUrl,
}
