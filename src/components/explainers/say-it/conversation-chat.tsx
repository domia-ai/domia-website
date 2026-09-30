"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { SAY_IT_CONVERSATION_CHAT_MIN_HEIGHT } from "./constants"
import type {
	SayItConversationBubbleProps,
	SayItConversationChatProps,
	SayItConversationWaveformProps,
} from "./types"

const enterClassName =
	"motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1 motion-safe:fill-mode-both motion-safe:duration-300"

const waveBars = [
	"h-2 [animation-delay:0ms]",
	"h-3.5 [animation-delay:120ms]",
	"h-4.5 [animation-delay:240ms]",
	"h-3 [animation-delay:360ms]",
	"h-1.5 [animation-delay:480ms]",
]

function Waveform({ live }: SayItConversationWaveformProps) {
	return (
		<span
			aria-hidden="true"
			className="text-primary flex h-5 shrink-0 items-center gap-0.5"
		>
			{waveBars.map((bar) => (
				<span
					key={bar}
					className={cn(
						"w-0.5 rounded-full bg-current",
						bar,
						live ? "motion-safe:animate-pulse" : "opacity-50",
					)}
				/>
			))}
		</span>
	)
}

function Bubble({
	side,
	text,
	italic = false,
	live = false,
}: SayItConversationBubbleProps) {
	const user = side === "user"

	return (
		<div
			className={cn(
				"flex max-w-[88%] items-end gap-2",
				user ? "flex-row-reverse self-end" : "self-start",
				enterClassName,
			)}
		>
			<p
				className={cn(
					"min-w-0 rounded-2xl px-3 py-2 text-sm text-pretty",
					user
						? "bg-primary text-primary-foreground rounded-br-sm"
						: "bg-muted rounded-bl-sm",
					italic && "text-muted-foreground italic",
				)}
			>
				{text}
			</p>
			{user ? <Waveform live={live} /> : null}
		</div>
	)
}

export function SayItConversationChat({
	run,
	turn,
	phase,
	typedChars,
	copy,
	onYes,
}: SayItConversationChatProps) {
	const { answered } = run
	const typing = phase === "listening"
	const firstText =
		answered || !typing ? run.text : run.text.slice(0, typedChars)
	const firstReplied = answered || phase === "speaking" || phase === "done"
	const yesText = typing ? copy.yesSaid.slice(0, typedChars) : copy.yesSaid
	const yesReplied = phase === "speaking" || phase === "done"
	const done = phase === "done"
	const announcement = done
		? [
				run.text,
				turn.reply,
				turn.kind === "ask" && answered
					? `${copy.yesSaid} ${turn.confirmed}`
					: null,
			]
				.filter(Boolean)
				.join(" ")
		: null

	return (
		<div
			className="flex min-w-0 flex-col gap-2"
			style={{ minHeight: SAY_IT_CONVERSATION_CHAT_MIN_HEIGHT }}
		>
			<p aria-live="polite" className="sr-only">
				{announcement}
			</p>
			<Bubble
				key={`${run.id}-user`}
				side="user"
				text={firstText}
				live={!answered && typing}
			/>
			{turn.kind === "think" && (phase === "working" || firstReplied) ? (
				<Bubble key={`${run.id}-pause`} side="domia" text={turn.pause} />
			) : null}
			{firstReplied ? (
				<Bubble
					key={`${run.id}-reply`}
					side="domia"
					text={turn.reply}
					italic={turn.kind === "think"}
				/>
			) : null}
			{turn.kind === "ask" && answered ? (
				<Bubble
					key={`${run.id}-yes`}
					side="user"
					text={yesText}
					live={typing}
				/>
			) : null}
			{turn.kind === "ask" && answered && yesReplied ? (
				<Bubble
					key={`${run.id}-confirmed`}
					side="domia"
					text={turn.confirmed}
				/>
			) : null}
			{done ? (
				<p
					key={`${run.id}-line`}
					className={cn("text-muted-foreground text-xs", enterClassName)}
				>
					{turn.line}
				</p>
			) : null}
			{turn.kind === "ask" && !answered && done ? (
				<Button
					type="button"
					variant="outline"
					size="sm"
					onClick={onYes}
					className={cn("self-end max-sm:h-9", enterClassName)}
				>
					{copy.yes}
				</Button>
			) : null}
		</div>
	)
}
