import { pageLocale } from "@/i18n/page"
import {
	Hero,
	Proof,
	UseCasesStrip,
	ConsoleTeaser,
	Cta,
} from "@/components/landing"
import {
	PersonaBuilderExplainer,
	TopologiesCompact,
	VoicePathExplainer,
} from "@/components/explainers"

export default async function Home(props: PageProps<"/[locale]">) {
	await pageLocale(props.params)

	return (
		<div className="flex flex-col">
			<Hero />
			<Proof />
			<VoicePathExplainer tone="base" />
			<PersonaBuilderExplainer tone="alt" />
			<UseCasesStrip />
			<TopologiesCompact tone="alt" />
			<ConsoleTeaser />
			<Cta />
		</div>
	)
}
