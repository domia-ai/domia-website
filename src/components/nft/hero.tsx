import Image from "next/image"

import { TypographyH1, TypographyXLarge } from "@/components/ui/typography"

export function Hero() {
	return (
		<div className="flex flex-col-reverse lg:flex-row">
			<div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
				<TypographyH1 className="leading-tight">
					Proof of Presence, Memory, and Belonging
				</TypographyH1>

				<TypographyXLarge className="max-w-md">
					Each Domia Founders NFT is a unique mindprint — granting early access,
					deep influence, and a permanent link to the first generation of local
					AI companions.
				</TypographyXLarge>
			</div>

			<div className="flex flex-1 items-center justify-center">
				<div className="relative">
					<div className="animate-halo absolute inset-0 z-0 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90% blur-2xl" />
					<Image
						src="/nft.webp"
						alt="Domia nft logo"
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
