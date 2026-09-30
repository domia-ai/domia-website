"use client"

import { Volume2 } from "lucide-react"
import Image from "next/image"

import { cn } from "@/lib/utils"

import type { VoiceButtonProps } from "./types"

export function VoiceButton({
	voice,
	name,
	playing,
	copy,
	onToggle,
}: VoiceButtonProps) {
	return (
		<button
			type="button"
			aria-pressed={playing}
			aria-label={`${playing ? copy.stop : copy.play}: ${name}`}
			onClick={onToggle}
			className={cn(
				"group flex flex-col items-center gap-2 rounded-xl border p-3 text-center transition-colors",
				"hover:bg-primary/5 focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none",
				playing ? "border-audio bg-audio/10" : "border-border",
			)}
		>
			<span className="relative">
				<Image
					src={voice.avatar}
					alt=""
					width={88}
					height={88}
					className={cn(
						"bg-muted size-22 rounded-full object-cover transition-transform",
						playing && "motion-safe:scale-105",
					)}
				/>
				<span
					aria-hidden="true"
					className={cn(
						"bg-audio text-background absolute -right-1 -bottom-1 grid size-7 place-items-center rounded-full transition-opacity",
						playing ? "opacity-100" : "opacity-0 group-hover:opacity-100",
					)}
				>
					<Volume2 className="size-4" />
				</span>
			</span>
			<span className="text-sm font-semibold">{name}</span>
		</button>
	)
}
