const MS_PER_SECOND = 1000

export const formatSeconds = (seconds: number, locale: string): string =>
	new Intl.NumberFormat(locale, {
		minimumFractionDigits: 1,
		maximumFractionDigits: 1,
	}).format(seconds)

export const formatMs = (ms: number, locale: string): string =>
	ms >= MS_PER_SECOND
		? `${formatSeconds(ms / MS_PER_SECOND, locale)} s`
		: `${ms} ms`

export const formatClock = (ms: number): string =>
	`0:${String(Math.round(ms / MS_PER_SECOND)).padStart(2, "0")}`
