import Image from "next/image"

import {
	TypographyH1,
	TypographyLarge,
	TypographyXLarge,
} from "@/components/ui/typography"

export function Hero() {
	return (
		<div className="flex flex-col-reverse lg:flex-row">
			<div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
				<TypographyLarge className="text-primary font-semibold tracking-wide uppercase">
					Coming soon
				</TypographyLarge>

				<TypographyH1 className="leading-tight">
					Where Minds Will Be Found
				</TypographyH1>

				<TypographyXLarge className="max-w-md">
					A glimpse into how the Domia Marketplace will let you discover, adopt,
					and live with custom-crafted personas. You can already shape your own
					personas today — the marketplace just makes them shareable.
				</TypographyXLarge>
			</div>

			<div className="flex flex-1 items-center justify-center">
				<div className="relative">
					<div className="animate-halo absolute inset-0 z-0 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90% blur-2xl" />
					<Image
						src="/marketplace.webp"
						alt="Domia marketplace of personas, voices and skills"
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
