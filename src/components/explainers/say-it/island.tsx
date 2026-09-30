"use client"

import { useState } from "react"

import { SayItComposer } from "./composer"
import { SayItFork } from "./fork"
import { useLazyMatcher } from "./use-lazy-matcher"
import type { SayItForkShown, SayItIslandProps, SayItVerdict } from "./types"

export function SayItIsland({
	copy,
	language,
	locale,
	homeNames,
	presets,
	verdicts,
	initial,
}: SayItIslandProps) {
	const matcher = useLazyMatcher(language, homeNames)
	const [draft, setDraft] = useState(initial.text)
	const [shown, setShown] = useState<SayItForkShown>(() => ({
		run: 0,
		text: initial.text,
		verdict: initial.verdict,
	}))

	const selectedPreset =
		presets.find((preset) => preset.text === shown.text)?.id ?? null

	const show = (text: string, verdict: SayItVerdict) => {
		setDraft(text)
		setShown((previous) => ({ run: previous.run + 1, text, verdict }))
	}

	const submit = () => {
		const value = draft.trim()
		if (value.length === 0) return
		const preset = presets.find((candidate) => candidate.text === value)
		const known = preset ? verdicts[preset.id] : undefined
		if (known) {
			show(value, known)
			return
		}
		void matcher.load().then((loaded) => {
			if (loaded) show(value, loaded.run(value))
		})
	}

	return (
		<div className="flex min-w-0 flex-col gap-8">
			<SayItComposer
				copy={copy}
				draft={draft}
				status={matcher.status}
				selectedPreset={selectedPreset}
				presets={presets}
				onDraftChange={setDraft}
				onFocus={() => void matcher.load()}
				onSubmit={submit}
				onPreset={(id) => {
					const preset = presets.find((candidate) => candidate.id === id)
					const verdict = verdicts[id]
					if (preset && verdict) show(preset.text, verdict)
				}}
			/>
			<SayItFork
				copy={copy}
				locale={locale}
				text={shown.text}
				verdict={shown.verdict}
				run={shown.run}
			/>
		</div>
	)
}
