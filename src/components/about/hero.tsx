import Image from "next/image"

import { TypographyH1, TypographyXLarge } from "@/components/ui/typography"

export function Hero() {
	return (
		<div className="flex w-full flex-1 flex-col-reverse lg:flex-row">
			<div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
				<TypographyH1 className="leading-tight">
					Meet the Minds Behind Domia
				</TypographyH1>

				<TypographyXLarge className="max-w-md">
					We believe the future of AI isn’t just smart — it’s emotional,
					relational, and deeply human. Domia is more than a smart assistant.
					It’s a companion, a storyteller, a thinker, a host — built by
					passionate creators to live with you, not just serve you. Get to know
					the vision, the mission, and the journey behind the Domia movement.
				</TypographyXLarge>
			</div>

			<div className="flex flex-1 items-center justify-center">
				<div className="relative">
					<div className="animate-halo absolute inset-0 z-0 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90% blur-2xl" />
					<Image
						src="/about.webp"
						alt="Domia about logo"
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
