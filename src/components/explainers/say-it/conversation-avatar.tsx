"use client"

import Image from "next/image"
import { useState } from "react"

import { cn } from "@/lib/utils"

import { SAY_IT_CONVERSATION_AVATAR_SIZE } from "./constants"
import type {
	SayItAvatarFaces,
	SayItConversationAvatarProps,
	SayItConversationState,
} from "./types"

const haloClassName: Record<SayItConversationState, string> = {
	idle: "opacity-30",
	listening: "animate-halo opacity-50",
	deciding:
		"opacity-70 motion-safe:animate-pulse motion-safe:[animation-duration:700ms]",
	acting: "opacity-70 motion-safe:scale-110",
	thinking: "animate-halo opacity-70 motion-safe:scale-105",
	speaking:
		"opacity-70 motion-safe:animate-pulse motion-safe:[animation-duration:1200ms]",
}

const tintClassName: Record<SayItConversationState, string> = {
	idle: "opacity-0",
	listening: "opacity-0",
	deciding: "opacity-0",
	acting: "bg-fast-path/30 opacity-100",
	thinking: "bg-model/30 opacity-100",
	speaking: "bg-audio/30 opacity-100",
}

export function SayItConversationAvatar({
	state,
	persona,
	copy,
}: SayItConversationAvatarProps) {
	const label = state === "idle" ? "" : copy.states[state]
	const [faces, setFaces] = useState<SayItAvatarFaces>(() => ({
		current: persona.face,
		previous: null,
	}))
	if (faces.current.id !== persona.face.id)
		setFaces({ current: persona.face, previous: faces.current })

	return (
		<div className="flex flex-col items-center gap-1">
			<div className="relative size-36">
				<div
					className={cn(
						"from-halo-from via-halo-via to-halo-to absolute inset-0 rounded-full bg-radial-[at_50%_75%] to-90% blur-2xl motion-safe:transition-[opacity,transform] motion-safe:duration-500",
						haloClassName[state],
					)}
				/>
				<div
					className={cn(
						"absolute inset-0 rounded-full blur-2xl motion-safe:transition-opacity motion-safe:duration-500",
						tintClassName[state],
					)}
				/>
				<div className="border-card absolute inset-3 overflow-hidden rounded-full border-4 shadow-md">
					{faces.previous ? (
						<Image
							key={faces.previous.id}
							src={faces.previous.image}
							alt=""
							aria-hidden="true"
							width={SAY_IT_CONVERSATION_AVATAR_SIZE}
							height={SAY_IT_CONVERSATION_AVATAR_SIZE}
							className="absolute inset-0 size-full object-cover"
						/>
					) : null}
					<Image
						key={faces.current.id}
						src={faces.current.image}
						alt={persona.name}
						width={SAY_IT_CONVERSATION_AVATAR_SIZE}
						height={SAY_IT_CONVERSATION_AVATAR_SIZE}
						className="motion-safe:animate-in motion-safe:fade-in absolute inset-0 size-full object-cover motion-safe:duration-300"
					/>
				</div>
			</div>
			<p className="text-2xl font-semibold tracking-tight">{persona.name}</p>
			<p className="text-muted-foreground min-h-5 text-xs font-medium tracking-wide">
				{label}
			</p>
		</div>
	)
}
