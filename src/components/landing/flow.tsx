import { Fragment } from "react"
import { ArrowDown } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
	TypographyH2,
	TypographyLarge,
	TypographyXLarge,
	TypographyMedium,
	TypographyBlockquote,
} from "@/components/ui/typography"

const STEP_IDS = ["speak", "stt", "llm", "tts", "mesh"] as const

const Step = ({
	title,
	description,
}: {
	title: string
	description: string
}) => {
	return (
		<Card className="bg-secondary mx-auto h-full w-full max-w-md p-4 text-center shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
			<TypographyXLarge className="font-bold">{title}</TypographyXLarge>
			<TypographyMedium>{description}</TypographyMedium>
		</Card>
	)
}

const Divider = () => (
	<div className="flex justify-center">
		<ArrowDown className="animate-pulse text-slate-500 transition-all duration-700" />
	</div>
)

export async function Flow() {
	const t = await getTranslations("landing.flow")

	return (
		<Card>
			<CardHeader>
				<TypographyH2>{t("title")}</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>{t("intro")}</TypographyLarge>

				<div className="flex flex-col items-center gap-4">
					{STEP_IDS.map((id, index) => (
						<Fragment key={id}>
							{index > 0 ? <Divider /> : null}
							<Step
								title={t(`steps.${id}.title`)}
								description={t(`steps.${id}.description`)}
							/>
						</Fragment>
					))}
				</div>

				<TypographyBlockquote>{t("quote")}</TypographyBlockquote>
			</CardContent>
		</Card>
	)
}
