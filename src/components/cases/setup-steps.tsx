import { getTranslations } from "next-intl/server"

import { LinkButton } from "@/components/sections"
import { TypographyH3, TypographyP } from "@/components/ui/typography"
import { caseSetupStepIds } from "@/constants/pages"

export async function SetupSteps() {
	const t = await getTranslations("cases.setup")

	return (
		<div className="flex flex-col gap-5">
			<ol
				aria-labelledby="setup-title"
				className="grid list-none grid-cols-1 gap-6 md:grid-cols-3"
			>
				{caseSetupStepIds.map((id, index) => (
					<li key={id} className="flex gap-4">
						<span
							aria-hidden="true"
							className="border-primary/40 bg-primary/10 text-foreground flex size-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold"
						>
							{index + 1}
						</span>
						<div className="flex flex-col gap-1">
							<TypographyH3 className="text-lg">
								{t(`steps.${id}.title`)}
							</TypographyH3>
							<TypographyP className="text-muted-foreground mt-0 leading-6">
								{t(`steps.${id}.body`)}
							</TypographyP>
							{id === "notes" ? (
								<LinkButton
									href="/console"
									variant="link"
									className="self-start px-0"
								>
									{t("link")}
								</LinkButton>
							) : null}
						</div>
					</li>
				))}
			</ol>
		</div>
	)
}
