import { GitPullRequest } from "lucide-react"

import { socialMediaLinks } from "@/constants/landing"

import type { CommunityIcon, CommunityLink, ValueId } from "./types"

export const valueIds: readonly ValueId[] = [
	"localFirst",
	"anyPlace",
	"oneSoftware",
	"public",
]

const socialLink = (name: string): { href: string; icon: CommunityIcon } => {
	const link = socialMediaLinks.find((candidate) => candidate.name === name)
	if (!link) throw new Error(`Missing social link: ${name}`)
	return { href: link.href, icon: link.icon }
}

const github = socialLink("GitHub")

const gettingStartedUrl = `${github.href}/domia-core/blob/main/GETTING_STARTED.md`

export const communityLinks: CommunityLink[] = [
	{ id: "github", ...github },
	{ id: "discord", ...socialLink("Discord") },
	{ id: "x", ...socialLink("X") },
	{ id: "contribute", href: gettingStartedUrl, icon: GitPullRequest },
]
