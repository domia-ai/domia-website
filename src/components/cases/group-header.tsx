import Image from "next/image"

import {
	TypographyH2,
	TypographyLarge,
	TypographyP,
} from "@/components/ui/typography"
import { caseGroupAvatarSide, caseGroupAvatars } from "@/constants/pages"

import type { CaseGroupHeaderProps } from "./types"

export function GroupHeader({ id, title, intro, needs }: CaseGroupHeaderProps) {
	return (
		<div className="flex max-w-3xl flex-col gap-4">
			<div className="flex items-center gap-4">
				<Image
					src={caseGroupAvatars[id]}
					alt=""
					width={caseGroupAvatarSide}
					height={caseGroupAvatarSide}
					className="size-14 shrink-0 rounded-full object-cover"
				/>
				<TypographyH2 id={`${id}-title`}>{title}</TypographyH2>
			</div>
			<TypographyLarge>{intro}</TypographyLarge>
			{needs ? (
				<TypographyP className="text-muted-foreground mt-0 leading-6">
					{needs}
				</TypographyP>
			) : null}
		</div>
	)
}
