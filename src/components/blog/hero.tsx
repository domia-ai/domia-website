import { TypographyH1, TypographyLarge } from "@/components/ui/typography"

export function Hero() {
	return (
		<div className="flex flex-col items-center gap-4 py-6 text-center">
			<TypographyH1 className="leading-tight">
				Local voice AI, explained
			</TypographyH1>
			<TypographyLarge className="max-w-2xl">
				Guides and explainers on speech-to-speech AI, self-hosting, and private,
				on-device voice — no cloud required.
			</TypographyLarge>
		</div>
	)
}
