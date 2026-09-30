import type { ComponentType } from "react"

export type ValueId = "localFirst" | "anyPlace" | "oneSoftware" | "public"

export type CommunityLinkId = "github" | "discord" | "x" | "contribute"

export type CommunityIcon = ComponentType<{ className?: string }>

export type CommunityLink = {
	id: CommunityLinkId
	href: string
	icon: CommunityIcon
}
