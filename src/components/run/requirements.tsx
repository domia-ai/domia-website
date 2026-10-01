import { Check } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { requirementIds } from "@/constants/run"

export async function Requirements() {
	const t = await getTranslations("run.firstTurn.requirements")

	return (
		<Card size="sm">
			<CardHeader>
				<CardTitle>
					<h3 id="requirements-title" className="text-lg font-medium">
						{t("title")}
					</h3>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<ul
					aria-labelledby="requirements-title"
					className="grid list-none grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2"
				>
					{requirementIds.map((id) => (
						<li key={id} className="flex items-start gap-2 text-sm">
							<Check
								aria-hidden="true"
								className="text-tool mt-0.5 size-4 shrink-0"
							/>
							<span className="text-pretty">{t(`items.${id}`)}</span>
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	)
}
