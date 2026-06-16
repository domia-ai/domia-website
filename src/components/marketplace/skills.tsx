import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function Skills() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>🔌 Skills & MCP Servers</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					Skills let a Domia actually act: look things up, run tools, and
					connect to local systems like Home Assistant. They work today through
					the Model Context Protocol — point a Domia at an MCP server and it
					picks the right tool mid-conversation, all local-first and under your
					control. The marketplace will make discovering and adding them as easy
					as adding a persona.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
