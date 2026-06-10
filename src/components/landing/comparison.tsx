import Link from "next/link"

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

const ROWS = [
	{ feature: "Audio sent to the cloud", domia: "Never", cloud: "Always" },
	{ feature: "Works fully offline", domia: "Yes", cloud: "No" },
	{
		feature: "A personality & voice per room",
		domia: "Yes",
		cloud: "No — one shared voice",
	},
	{ feature: "Remembers you (memory + emotion)", domia: "Yes", cloud: "No" },
	{
		feature: "Runs on your own hardware",
		domia: "Yes",
		cloud: "No — vendor’s servers",
	},
	{
		feature: "Source-available, no vendor lock-in",
		domia: "Yes",
		cloud: "No",
	},
	{ feature: "Account / subscription required", domia: "No", cloud: "Yes" },
]

export function Comparison() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>⚖️ Domia vs Cloud Voice Assistants</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-6">
				<TypographyLarge>
					Cloud assistants stream your voice to someone else’s servers. Domia
					keeps everything on your own hardware — and gives every room its own
					identity.
				</TypographyLarge>

				<Table>
					<TableHeader>
						<TableRow>
							<TableHead> </TableHead>
							<TableHead className="text-primary font-bold">Domia</TableHead>
							<TableHead>Cloud assistants</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{ROWS.map((row) => (
							<TableRow key={row.feature}>
								<TableCell className="font-medium">{row.feature}</TableCell>
								<TableCell className="text-primary font-semibold">
									{row.domia}
								</TableCell>
								<TableCell className="text-muted-foreground">
									{row.cloud}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>

				<TypographyLarge>
					New to local voice AI?{" "}
					<Link
						href="/blog/local-voice-ai-vs-cloud-assistants"
						className="text-primary underline-offset-4 hover:underline"
					>
						Read the full comparison
					</Link>{" "}
					and more guides on our{" "}
					<Link
						href="/blog"
						className="text-primary underline-offset-4 hover:underline"
					>
						blog
					</Link>
					.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
