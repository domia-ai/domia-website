import type { Axis, AxisOptions, AxisTick, FillSpan } from "./types"

const epsilon = 1e-9

export const clamp01 = (u: number) => Math.min(1, Math.max(0, u))

export const smoothstep = (a: number, b: number, u: number) => {
	const x = clamp01((u - a) / (b - a))
	return x * x * (3 - 2 * x)
}

export const createAxis = ({ x0, width, max }: AxisOptions): Axis => {
	const scale = width / max
	const x = (t: number) => x0 + t * scale
	const t = (px: number) => (px - x0) / scale
	const ticks = (step: number): AxisTick[] => {
		const count = Math.floor(max / step + epsilon) + 1
		return Array.from({ length: count }, (_, i) => {
			const tick = i * step
			return { t: tick, x: x(tick) }
		})
	}
	return { x, t, ticks }
}

export const fillBetween = (
	u: number,
	start: number,
	end: number,
	axis: Axis,
): FillSpan => {
	const reached = Math.min(end, Math.max(start, u))
	const x = axis.x(start)
	return { x, width: axis.x(reached) - x }
}

export const loopToTurn = (
	tLoop: number,
	sweepSeconds: number,
	maxSeconds: number,
) => clamp01(tLoop / sweepSeconds) * maxSeconds
