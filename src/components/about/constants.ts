import { GitPullRequest } from "lucide-react"

import { gettingStartedUrl, socialMediaLinks } from "@/constants"

import type { CommunityLink, CommunityLinkTarget, ValueId } from "./types"

export const valueIds: readonly ValueId[] = [
	"localFirst",
	"anyPlace",
	"oneSoftware",
	"public",
]

const socialLink = (name: string): CommunityLinkTarget => {
	const link = socialMediaLinks.find((candidate) => candidate.name === name)
	if (!link) throw new Error(`Missing social link: ${name}`)
	return { href: link.href, icon: link.icon }
}

const github = socialLink("GitHub")

export const communityLinks: CommunityLink[] = [
	{ id: "github", ...github },
	{ id: "discord", ...socialLink("Discord") },
	{ id: "x", ...socialLink("X") },
	{ id: "contribute", href: gettingStartedUrl, icon: GitPullRequest },
]
