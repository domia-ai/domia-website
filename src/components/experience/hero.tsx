import Image from "next/image"

import { TypographyH1, TypographyXLarge } from "@/components/ui/typography"

export function Hero() {
	return (
		<div className="flex flex-col-reverse lg:flex-row">
			<div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
				<TypographyH1 className="leading-tight">
					Your fleet, your audio, your data — in one place.
				</TypographyH1>

				<TypographyXLarge className="max-w-md">
					The Console is the web app you run alongside your Domias. See every
					device in your mesh, replay any conversation with its real audio, tune
					latency, grade interactions, and export your dialogues for fine-tuning
					— all on your own hardware. Web today; a mobile companion is on the
					roadmap.
				</TypographyXLarge>
			</div>

			<div className="flex flex-1 items-center justify-center">
				<div className="relative">
					<div className="animate-halo absolute inset-0 z-0 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90% blur-2xl" />
					<Image
						src="/experience.webp"
						alt="The Domia Console — local web app for managing a fleet of Domia voice AIs"
						width={500}
						height={500}
						priority
						className="animate-domia-pulse relative z-10"
					/>
				</div>
			</div>
		</div>
	)
}
