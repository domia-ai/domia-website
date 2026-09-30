import { pageLocale } from "@/i18n/page"
import {
	Hero,
	Proof,
	UseCasesStrip,
	ConsoleTeaser,
	Cta,
} from "@/components/landing"
import { ListenSection } from "@/components/listen"
import { DemoVideoJsonLd, DemoVideoSection } from "@/components/video"
import { VoicesSection } from "@/components/voices"
import {
	PersonaBuilderExplainer,
	TopologiesCompact,
	VoicePathExplainer,
} from "@/components/explainers"

export default async function Home(props: PageProps<"/[locale]">) {
	await pageLocale(props.params)

	return (
		<div className="flex flex-col">
			<DemoVideoJsonLd video="evening" />
			<Hero />
			<DemoVideoSection video="evening" tone="alt" />
			<ListenSection tone="base" />
			<Proof />
			<VoicePathExplainer tone="base" />
			<PersonaBuilderExplainer tone="alt" />
			<VoicesSection tone="base" />
			<UseCasesStrip />
			<TopologiesCompact tone="alt" />
			<ConsoleTeaser />
			<Cta />
		</div>
	)
}
