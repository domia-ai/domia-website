import type { LucideIcon } from "lucide-react"

import type { SectionTone } from "@/components/sections"

export type PrivacyGroupId = "site" | "product"

export type PrivacyEntry = {
	id: string
	icon: LucideIcon
}

export type PrivacyGroupProps = {
	group: PrivacyGroupId
	tone: SectionTone
}
