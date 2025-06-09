import {
	Hero,
	About,
	Why,
	Network,
	Features,
	Flow,
	Collaborate,
	Nft,
} from "@/components/landing"

export default function Home() {
	return (
		<div className="flex flex-col gap-10">
			<Hero />
			<About />
			<Why />
			<Network />
			<Features />
			<Flow />
			<Collaborate />
			<Nft />
		</div>
	)
}
