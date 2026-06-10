import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Skills() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🔌 Skills & MCP Servers (Roadmap)</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Beyond personas and voices, the marketplace will offer skills — MCP
					servers that let a Domia actually act: look things up, run tools, and
					connect to local systems like Home Assistant. Add a skill the same way
					you add a persona: pick it, drop it in, and your Domia can do more —
					all local-first, replaceable, and under your control.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
