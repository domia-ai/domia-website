import type { TimeStore } from "./types"

export const createTimeStore = (): TimeStore => {
	const listeners = new Set<() => void>()
	let time = 0

	return {
		get: () => time,
		set: (next: number) => {
			time = next
			listeners.forEach((listener) => listener())
		},
		subscribe: (listener: () => void) => {
			listeners.add(listener)
			return () => {
				listeners.delete(listener)
			}
		},
	}
}
