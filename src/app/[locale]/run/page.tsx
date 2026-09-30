import { getTranslations } from "next-intl/server"

import { localizedMetadata, pageLocale } from "@/i18n/page"
import { localizedUrl } from "@/i18n/urls"
import {
	ConnectSkills,
	Cta,
	FirstTurn,
	Hero,
	Portability,
} from "@/components/run"
import { ArchetypeSelectorExplainer } from "@/components/explainers"
import { BreadcrumbsJsonLd } from "@/components/seo/breadcrumbs"
import { requirementIds, stepIds } from "@/constants/run"

export const generateMetadata = localizedMetadata("/run", "run")

export default async function Run(props: PageProps<"/[locale]/run">) {
	const locale = await pageLocale(props.params)
	const t = await getTranslations({ locale, namespace: "meta" })
	const firstTurn = await getTranslations({
		locale,
		namespace: "run.firstTurn",
	})
	const stepsUrl = `${localizedUrl("/run", locale)}#first-turn`

	const howTo = {
		"@context": "https://schema.org",
		"@type": "HowTo",
		name: firstTurn("title"),
		description: t("run.description"),
		tool: requirementIds.map((id) => ({
			"@type": "HowToTool",
			name: firstTurn(`requirements.items.${id}`),
		})),
		step: stepIds.map((id, index) => ({
			"@type": "HowToStep",
			position: index + 1,
			name: firstTurn(`steps.${id}.title`),
			text: firstTurn(`steps.${id}.body`),
			url: stepsUrl,
		})),
	}

	return (
		<div className="flex flex-col">
			<BreadcrumbsJsonLd
				items={[{ name: t("run.breadcrumb"), path: "/run" }]}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo) }}
			/>
			<Hero />
			<FirstTurn />
			<ArchetypeSelectorExplainer tone="base" />
			<ConnectSkills />
			<Portability />
			<Cta />
		</div>
	)
}
