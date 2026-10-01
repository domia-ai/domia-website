const createPlaybackClaim = () => {
	let current: (() => void) | null = null

	const claim = (stop: () => void) => {
		if (current !== null && current !== stop) current()
		current = stop
	}

	const release = (stop: () => void) => {
		if (current === stop) current = null
	}

	return { claim, release }
}

export const playback = createPlaybackClaim()
