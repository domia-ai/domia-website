import { ExplainerSection } from "@/components/sections"
import { loadTopologies } from "@/data"

import { buildTopologiesCopy } from "./copy"
import { TopologiesIsland } from "./island"
import type { TopologiesBlockProps, TopologiesExplainerProps } from "./types"

async function TopologiesBlock({ id, variant, tone }: TopologiesBlockProps) {
	const data = loadTopologies()
	const copy = await buildTopologiesCopy(data)

	return (
		<ExplainerSection
			id={id}
			title={variant === "full" ? copy.title : copy.titleCompact}
			intro={copy.intro}
			tone={tone}
		>
			<TopologiesIsland data={data} copy={copy} variant={variant} />
			<noscript>
				<h3 className="mt-6 text-base font-semibold">{copy.noscriptHeading}</h3>
				<ol className="text-muted-foreground mt-2 list-decimal pl-5 text-sm">
					{data.scenarios.map((scenario) => (
						<li key={scenario.id}>
							<span className="text-foreground font-medium">
								{copy.tabs[scenario.id]}
							</span>
							: {copy.captions[scenario.id]}
						</li>
					))}
				</ol>
			</noscript>
		</ExplainerSection>
	)
}

export async function TopologiesExplainer({ tone }: TopologiesExplainerProps) {
	return <TopologiesBlock id="topologies" variant="full" tone={tone} />
}

export async function TopologiesCompact({ tone }: TopologiesExplainerProps) {
	return (
		<TopologiesBlock id="topologies-compact" variant="compact" tone={tone} />
	)
}
