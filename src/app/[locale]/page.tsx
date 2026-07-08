import { pageLocale } from "@/i18n/page"
import {
	Hero,
	About,
	Why,
	Network,
	Features,
	Flow,
	Personas,
	Console,
	Comparison,
	AskAi,
	Collaborate,
	Waitlist,
} from "@/components/landing"

export default async function Home(props: PageProps<"/[locale]">) {
	await pageLocale(props.params)

	return (
		<div className="flex flex-col gap-10">
			<Hero />
			<About />
			<Why />
			<Flow />
			<Features />
			<Network />
			<Personas />
			<Console />
			<Comparison />
			<AskAi />
			<Waitlist />
			<Collaborate />
		</div>
	)
}
