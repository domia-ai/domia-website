"use client"

import { useEffect, useId, useMemo, useRef, useState } from "react"

import { useReducedMotion } from "@/components/explainers/shared"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import { SayItFreeText, SayItPresets } from "./composer"
import {
	SAY_IT_CONVERSATION_CARD_MIN_HEIGHT,
	SAY_IT_CONVERSATION_DECIDE_MS,
	SAY_IT_CONVERSATION_LISTEN_MS,
	SAY_IT_CONVERSATION_SPEAK_MS,
	SAY_IT_CONVERSATION_TYPE_MS,
	SAY_IT_CONVERSATION_VISIBLE_THRESHOLD,
	SAY_IT_CONVERSATION_WORK_MS,
} from "./constants"
import { SayItConversationAvatar } from "./conversation-avatar"
import { SayItConversationChat } from "./conversation-chat"
import { conversationTurnOf } from "./summary"
import { useLazyMatcher } from "./use-lazy-matcher"
import type {
	SayItConversationPhase,
	SayItConversationProps,
	SayItConversationRun,
	SayItConversationState,
	SayItConversationTurn,
	SayItVerdict,
} from "./types"

const stateOf = (
	phase: SayItConversationPhase,
	run: SayItConversationRun,
	turn: SayItConversationTurn,
): SayItConversationState => {
	if (phase === "listening") return "listening"
	if (phase === "deciding") return "deciding"
	if (phase === "speaking") return "speaking"
	if (phase === "done") return "idle"
	if (turn.kind === "think" || turn.kind === "chat") return "thinking"
	if (turn.kind === "ask" && !run.answered) return "deciding"
	return "acting"
}

export function SayItConversation({
	copy,
	language,
	homeNames,
	presets,
	verdicts,
	initial,
	persona,
	replayKey,
}: SayItConversationProps) {
	const reduced = useReducedMotion()
	const freeTextId = useId()
	const cardRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)
	const matcher = useLazyMatcher(language, homeNames)
	const [seen, setSeen] = useState(false)
	const [run, setRun] = useState<SayItConversationRun>(() => ({
		id: 0,
		text: initial.text,
		presetId: initial.presetId,
		verdict: initial.verdict,
		answered: false,
	}))
	const turn = useMemo(
		() => conversationTurnOf(run.verdict, run.presetId, copy, persona.sample),
		[run.verdict, run.presetId, copy, persona.sample],
	)
	const [phase, setPhase] = useState<SayItConversationPhase>("done")
	const [typedChars, setTypedChars] = useState(0)
	const [draft, setDraft] = useState("")
	const [typingOpen, setTypingOpen] = useState(false)

	const target = run.answered ? copy.conversation.yesSaid : run.text

	useEffect(() => {
		const node = cardRef.current
		if (seen || reduced || !node) return
		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry?.isIntersecting) return
				setSeen(true)
				observer.disconnect()
			},
			{ threshold: SAY_IT_CONVERSATION_VISIBLE_THRESHOLD },
		)
		observer.observe(node)
		return () => observer.disconnect()
	}, [seen, reduced])

	useEffect(() => {
		if (!seen || reduced) {
			const timer = window.setTimeout(() => setPhase("done"), 0)
			return () => window.clearTimeout(timer)
		}
		const timers: number[] = []
		const at = (ms: number, step: () => void) =>
			timers.push(window.setTimeout(step, ms))
		const perChar = SAY_IT_CONVERSATION_TYPE_MS / Math.max(1, target.length)
		const typing = window.setInterval(
			() => setTypedChars((n) => Math.min(target.length, n + 1)),
			perChar,
		)
		at(0, () => {
			setTypedChars(0)
			setPhase("listening")
		})
		const deciding = SAY_IT_CONVERSATION_LISTEN_MS
		const working = deciding + SAY_IT_CONVERSATION_DECIDE_MS
		const speaking = working + SAY_IT_CONVERSATION_WORK_MS
		const done = speaking + SAY_IT_CONVERSATION_SPEAK_MS
		at(deciding, () => setPhase("deciding"))
		at(working, () => setPhase("working"))
		at(speaking, () => setPhase("speaking"))
		at(done, () => setPhase("done"))
		return () => {
			window.clearInterval(typing)
			timers.forEach((timer) => window.clearTimeout(timer))
		}
	}, [run.id, replayKey, reduced, seen, target])

	const route = (
		text: string,
		presetId: string | null,
		verdict: SayItVerdict,
	) =>
		setRun((previous) => ({
			id: previous.id + 1,
			text,
			presetId,
			verdict,
			answered: false,
		}))

	const openTyping = () => {
		const opening = !typingOpen
		setTypingOpen(opening)
		if (opening)
			void matcher.load().then((loaded) => {
				if (loaded) inputRef.current?.focus()
			})
	}

	const submit = () => {
		const value = draft.trim()
		if (value.length === 0) return
		void matcher.load().then((loaded) => {
			if (loaded) route(value, null, loaded.run(value))
		})
	}

	const selectedPreset =
		presets.find((preset) => preset.text === run.text)?.id ?? null

	return (
		<Card
			ref={cardRef}
			className="w-full min-w-0 overflow-visible rounded-2xl text-base shadow-sm sm:[--card-spacing:--spacing(5)]"
			style={{ minHeight: SAY_IT_CONVERSATION_CARD_MIN_HEIGHT }}
		>
			<CardContent className="flex flex-1 flex-col gap-4">
				<SayItConversationAvatar
					state={stateOf(phase, run, turn)}
					persona={persona}
					copy={copy.conversation}
				/>
				<SayItConversationChat
					run={run}
					turn={turn}
					phase={phase}
					typedChars={typedChars}
					copy={copy.conversation}
					onYes={() =>
						setRun((previous) => ({
							...previous,
							id: previous.id + 1,
							answered: true,
						}))
					}
				/>
				<SayItPresets
					label={copy.conversation.tryLabel}
					selectedPreset={selectedPreset}
					presets={presets}
					onPreset={(id) => {
						const preset = presets.find((candidate) => candidate.id === id)
						const verdict = verdicts[id]
						if (preset && verdict) route(preset.text, preset.id, verdict)
					}}
				/>
				<div className="flex min-w-0 flex-col gap-2">
					<Button
						type="button"
						variant="ghost"
						size="sm"
						aria-expanded={typingOpen}
						aria-controls={freeTextId}
						onClick={openTyping}
						className="self-start max-sm:h-9"
					>
						{copy.conversation.typeYourOwn}
					</Button>
					{typingOpen ? (
						<div id={freeTextId}>
							<SayItFreeText
								copy={copy.input}
								draft={draft}
								status={matcher.status}
								lockUntilReady
								inputRef={inputRef}
								onDraftChange={setDraft}
								onSubmit={submit}
							/>
						</div>
					) : null}
					<noscript>
						<p className="text-muted-foreground text-xs">
							{copy.conversation.noscript}
						</p>
					</noscript>
				</div>
				<p className="text-muted-foreground text-xs text-balance">
					{copy.conversation.note}
				</p>
			</CardContent>
		</Card>
	)
}
