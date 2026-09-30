"use client"

import { useCallback, useRef, useState } from "react"

import type { FastPathLanguagePack } from "@/data/types"

import { SAY_IT_PACK_PATH_PREFIX } from "./constants"
import type {
	SayItHomeNames,
	SayItLazyMatcher,
	SayItMatcher,
	SayItMatcherStatus,
} from "./types"

const fetchPack = async (language: string): Promise<FastPathLanguagePack> => {
	const response = await fetch(`${SAY_IT_PACK_PATH_PREFIX}${language}.json`)
	if (!response.ok)
		throw new Error(`fast-path pack ${language}: ${response.status}`)
	return (await response.json()) as FastPathLanguagePack
}

export function useLazyMatcher(
	language: string,
	homeNames: SayItHomeNames,
): SayItLazyMatcher {
	const [status, setStatus] = useState<SayItMatcherStatus>("idle")
	const pending = useRef<Promise<SayItMatcher | null> | null>(null)

	const load = useCallback(() => {
		if (pending.current) return pending.current
		setStatus("loading")
		const next = Promise.all([import("./matcher"), fetchPack(language)])
			.then(([{ createMatcher }, pack]) => {
				const matcher = createMatcher(pack, homeNames)
				setStatus("ready")
				return matcher
			})
			.catch(() => {
				pending.current = null
				setStatus("failed")
				return null
			})
		pending.current = next
		return next
	}, [language, homeNames])

	return { status, load }
}
