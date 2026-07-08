import { getTranslations } from "next-intl/server"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

const TIER_IDS = ["edge", "hub", "hubPlus"] as const

export async function Hardware() {
	const t = await getTranslations("technology.hardware")

	return (
		<Card>
			<CardHeader>
				<TypographyH2>{t("title")}</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>{t("intro")}</TypographyLarge>

				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>{t("headDevice")}</TableHead>
							<TableHead>{t("headRole")}</TableHead>
							<TableHead>{t("headRuns")}</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{TIER_IDS.map((id) => (
							<TableRow key={id}>
								<TableCell className="font-medium">
									{t(`tiers.${id}.device`)}
								</TableCell>
								<TableCell className="text-primary font-semibold">
									{t(`tiers.${id}.role`)}
								</TableCell>
								<TableCell className="text-muted-foreground">
									{t(`tiers.${id}.runs`)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
}
