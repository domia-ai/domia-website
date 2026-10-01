import { pageLocale } from "@/i18n/page"
import { Hero, UseCasesStrip, ConsoleTeaser, Cta } from "@/components/landing"
import { ListenSection } from "@/components/listen"
import { LISTEN_HOME_FEATURED } from "@/components/listen/constants"
import { DemoVideoJsonLd, DemoVideoSection } from "@/components/video"
import { CharactersSection } from "@/components/characters"
import { VoicePathExplainer } from "@/components/explainers"

export default async function Home(props: PageProps<"/[locale]">) {
	await pageLocale(props.params)

	return (
		<div className="flex flex-col">
			<DemoVideoJsonLd video="evening" />
			<Hero />
			<DemoVideoSection video="evening" tone="alt" />
			<ListenSection
				video="evening"
				tone="base"
				featured={LISTEN_HOME_FEATURED}
			/>
			<CharactersSection tone="alt" />
			<VoicePathExplainer tone="base" />
			<UseCasesStrip />
			<ConsoleTeaser />
			<Cta />
		</div>
	)
}
