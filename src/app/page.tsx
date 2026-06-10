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

export default function Home() {
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
