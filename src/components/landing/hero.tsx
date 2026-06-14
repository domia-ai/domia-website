import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { GithubIcon } from "@/components/landing/icons"
import { DemoLink } from "@/components/landing/demo-link"
import {
	TypographyH1,
	TypographyLarge,
	TypographyXLarge,
} from "@/components/ui/typography"

export function Hero() {
	return (
		<div className="flex flex-col-reverse lg:flex-row">
			<div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
				<span className="border-primary/30 bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold">
					<span className="bg-primary size-2 animate-pulse rounded-full" />
					100% Open Source · Runs fully local
				</span>

				<TypographyLarge className="text-primary font-semibold tracking-wide uppercase">
					The Local AI That Lives With You
				</TypographyLarge>

				<TypographyH1 className="leading-tight">
					A private network of voice AIs. A personality per device.
				</TypographyH1>

				<TypographyXLarge className="max-w-md">
					Domia is a network of local voice companions that share compute and
					run fully on your hardware. Each device — each room — with its own
					personality, voice, and memory. Fully open source. No cloud.
				</TypographyXLarge>

				<div className="flex flex-wrap items-center justify-center gap-3">
					<DemoLink variant="primary" label="Try the live demo" />
					<Button asChild size="lg">
						<a
							href="https://github.com/domia-ai"
							target="_blank"
							rel="noopener noreferrer"
						>
							<GithubIcon className="mr-2 size-4" />
							Explore on GitHub
						</a>
					</Button>
					<Button asChild size="lg" variant="outline">
						<Link href="/technology">See how it works</Link>
					</Button>
				</div>
			</div>

			<div className="flex flex-1 items-center justify-center">
				<div className="relative">
					<div className="animate-halo absolute inset-0 z-0 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90% blur-2xl" />
					<Image
						src="/domia.webp"
						alt="Domia — private local voice AI running on your own hardware"
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
