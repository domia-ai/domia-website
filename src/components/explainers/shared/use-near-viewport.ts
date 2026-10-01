"use client"

import { useEffect, useRef, useState } from "react"

import { NEAR_VIEWPORT_MARGIN } from "./constants"

export function useNearViewport<T extends Element>() {
	const ref = useRef<T>(null)
	const [near, setNear] = useState(false)

	useEffect(() => {
		const node = ref.current
		if (near || !node) return
		const observer = new IntersectionObserver(
			(entries) => {
				if (!entries.some((entry) => entry.isIntersecting)) return
				setNear(true)
				observer.disconnect()
			},
			{ rootMargin: NEAR_VIEWPORT_MARGIN },
		)
		observer.observe(node)
		return () => observer.disconnect()
	}, [near])

	return { ref, near }
}
