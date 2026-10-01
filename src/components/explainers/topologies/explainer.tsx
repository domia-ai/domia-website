import { ExplainerSection } from "@/components/sections"
import { loadTopologies } from "@/data"

import { buildTopologiesCopy } from "./copy"
import { TopologiesIsland } from "./island"
import type { TopologiesExplainerProps } from "./types"

export async function TopologiesExplainer({ tone }: TopologiesExplainerProps) {
	const data = loadTopologies()
	const copy = await buildTopologiesCopy(data)

	return (
		<ExplainerSection
			id="topologies"
			title={copy.title}
			intro={copy.intro}
			tone={tone}
		>
			<TopologiesIsland data={data} copy={copy} />
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
