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

const ROW_IDS = [
	"cloudAudio",
	"offline",
	"personaPerSpace",
	"memory",
	"hardware",
	"openSource",
	"account",
] as const

export async function Comparison() {
	const t = await getTranslations("landing.comparison")

	return (
		<Card>
			<CardHeader>
				<TypographyH2>{t("title")}</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-6">
				<TypographyLarge>{t("intro")}</TypographyLarge>

				<Table>
					<TableHeader>
						<TableRow>
							<TableHead> </TableHead>
							<TableHead className="text-primary font-bold">
								{t("domia")}
							</TableHead>
							<TableHead>{t("cloud")}</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{ROW_IDS.map((id) => (
							<TableRow key={id}>
								<TableCell className="font-medium">
									{t(`rows.${id}.feature`)}
								</TableCell>
								<TableCell className="text-primary font-semibold">
									{t(`rows.${id}.domia`)}
								</TableCell>
								<TableCell className="text-muted-foreground">
									{t(`rows.${id}.cloud`)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
}
