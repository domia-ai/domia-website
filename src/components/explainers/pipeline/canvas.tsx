import { cn } from "@/lib/utils"

import { laneTone, layout } from "./geometry"
import type { CanvasProps } from "./types"

export function PipelineCanvas({ data, copy, frame, labels }: CanvasProps) {
	const { w, h } = data.axis.viewBox
	const { axis, laneY, routing, markers, playhead } = frame
	const lastTick = frame.ticks.length - 1
	const midX = axis.x(frame.maxSeconds / 2)
	const anchorEnd = (x: number) => x > midX
	const labelX = (x: number, offset: number) =>
		anchorEnd(x) ? x - offset : x + offset
	const anchor = (x: number) => (anchorEnd(x) ? "end" : "start")
	const sequenceY =
		laneY.routing + layout.bar.height + layout.checkpoint.labelOffset
	const micMarkerY = laneY.mic + layout.markers.endOfSpeech.labelY
	const firstAudioTop = laneY.hear - layout.markers.firstAudio.above
	const skillBar = frame.lanes.find((lane) => lane.id === "skill")?.fills[0]

	return (
		<svg
			viewBox={`0 0 ${w} ${h}`}
			width={w}
			height={h}
			aria-hidden="true"
			className="absolute inset-0 font-sans"
		>
			<g>
				{frame.ticks.map((tick, i) => (
					<g key={tick.t}>
						<line
							x1={tick.x}
							x2={tick.x}
							y1={layout.grid.top}
							y2={layout.grid.bottom}
							strokeWidth={1}
							className="stroke-border"
						/>
						<text
							x={tick.x}
							y={layout.grid.labelY}
							textAnchor="middle"
							className="fill-muted-foreground text-[12px]"
						>
							{i === lastTick ? `${tick.t} ${copy.unit}` : `${tick.t}`}
						</text>
					</g>
				))}
			</g>

			<g className="fill-foreground/8">
				{frame.lanes.map((lane) =>
					lane.ghosts.map((bar, i) => (
						<rect
							key={`${lane.id}-${i}`}
							x={bar.x}
							y={bar.y}
							width={bar.width}
							height={bar.height}
							rx={bar.radius}
						/>
					)),
				)}
			</g>

			{frame.lanes.map((lane) => {
				const tone = laneTone[lane.color]
				return (
					<g key={lane.id}>
						{lane.id === "mic" ? (
							<g className={tone.fill}>
								{frame.wave.map((bar, i) => (
									<rect
										key={i}
										x={bar.x}
										y={bar.y}
										width={layout.wave.width}
										height={bar.height}
										rx={layout.wave.width / 2}
										opacity={bar.opacity}
									/>
								))}
							</g>
						) : (
							lane.fills.map((bar, i) => (
								<rect
									key={i}
									x={bar.x}
									y={bar.y}
									width={bar.width}
									height={bar.height}
									rx={bar.radius}
									className={cn(tone.fill, "opacity-90")}
								/>
							))
						)}
						{lane.id === "hear"
							? lane.fills.map((bar, i) => (
									<rect
										key={`glow-${i}`}
										x={bar.x}
										y={bar.y - layout.hear.glowPad}
										width={bar.width}
										height={bar.height + layout.hear.glowPad * 2}
										rx={bar.radius + layout.hear.glowPad}
										opacity={layout.hear.glowOpacity}
										className={tone.fill}
									/>
								))
							: null}
						{lane.id === "llm" ? (
							<g className="stroke-background" strokeWidth={1.6}>
								{frame.tokenTicks.map((tick, i) => (
									<line
										key={i}
										x1={tick.x}
										x2={tick.x}
										y1={lane.y + layout.tokens.inset}
										y2={lane.y + layout.bar.height - layout.tokens.inset}
										opacity={tick.opacity}
									/>
								))}
							</g>
						) : null}
					</g>
				)
			})}

			<g>
				<text
					x={routing.fastPathLabel.x}
					y={laneY.routing - layout.fastPathLabel.offsetY}
					opacity={routing.fastPathLabel.opacity}
					className="fill-fast-path-text text-[12px] font-semibold"
				>
					{labels.fastPath}
				</text>
				{routing.checkpoints.map((checkpoint) => (
					<circle
						key={checkpoint.id}
						cx={checkpoint.x}
						cy={laneY.routing + layout.bar.height / 2}
						r={layout.checkpoint.radius}
						opacity={checkpoint.opacity}
						className="fill-fast-path"
					/>
				))}
				<text className="fill-muted-foreground text-[12px]">
					{routing.checkpoints.map((checkpoint, i) => (
						<tspan
							key={checkpoint.id}
							x={routing.fastPathLabel.x}
							y={sequenceY + i * layout.checkpoint.lineGap}
							opacity={checkpoint.opacity}
						>
							{copy.routing.checkpoints[checkpoint.id]}
						</tspan>
					))}
				</text>
			</g>

			{frame.chips.map((chip) => (
				<g key={chip.index} opacity={chip.opacity}>
					<rect
						x={chip.x}
						y={chip.y}
						width={layout.chip.width}
						height={layout.chip.height}
						rx={layout.chip.radius}
						strokeWidth={1}
						className="fill-card stroke-model/70"
					/>
					<text
						x={chip.x + layout.chip.width / 2}
						y={chip.y + layout.chip.textBaseline}
						textAnchor="middle"
						className="fill-model text-[12px]"
					>
						{copy.routing.reply}
					</text>
				</g>
			))}

			<g opacity={markers.endOfSpeech.opacity}>
				<line
					x1={markers.endOfSpeech.x}
					x2={markers.endOfSpeech.x}
					y1={laneY.mic - layout.markers.endOfSpeech.above}
					y2={laneY.routing + layout.bar.height}
					strokeWidth={1}
					strokeDasharray="3 3"
					className="stroke-audio/60"
				/>
				<circle
					cx={markers.endOfSpeech.x}
					cy={laneY.mic + layout.bar.height / 2}
					r={layout.markers.endOfSpeech.dot}
					className="fill-audio"
				/>
				<text
					x={markers.endOfSpeech.x + layout.markers.endOfSpeech.labelX}
					y={micMarkerY}
					className="fill-audio-text text-[13px] font-semibold"
				>
					{copy.markers.endOfSpeech.title}
				</text>
				<text
					x={markers.endOfSpeech.x + layout.markers.endOfSpeech.labelX}
					y={micMarkerY + layout.markers.endOfSpeech.noteGap}
					className="fill-muted-foreground text-[12px]"
				>
					{copy.markers.endOfSpeech.note}
				</text>
			</g>

			{markers.firstToken ? (
				<g opacity={markers.firstToken.opacity}>
					<line
						x1={markers.firstToken.x}
						x2={markers.firstToken.x}
						y1={laneY.llm - layout.markers.firstToken.above}
						y2={laneY.llm}
						strokeWidth={1}
						className="stroke-model"
					/>
					<text
						x={labelX(markers.firstToken.x, layout.markers.firstToken.labelX)}
						y={laneY.llm - layout.markers.firstToken.labelY}
						textAnchor={anchor(markers.firstToken.x)}
						className="fill-model text-[12px] font-semibold"
					>
						{copy.markers.firstToken}
					</text>
				</g>
			) : null}

			{skillBar && skillBar.width > 0 ? (
				<text
					x={skillBar.x + skillBar.width + layout.label.gap}
					y={skillBar.y + layout.bar.height - layout.label.offsetY}
					className="fill-tool text-[12px] font-semibold"
				>
					{copy.routing.skillCall}
				</text>
			) : null}

			<g opacity={markers.firstAudio.opacity}>
				<line
					x1={markers.firstAudio.x}
					x2={markers.firstAudio.x}
					y1={firstAudioTop}
					y2={laneY.hear}
					strokeWidth={1}
					className="stroke-audio/70"
				/>
				<circle
					cx={markers.firstAudio.x}
					cy={firstAudioTop}
					r={layout.markers.firstAudio.dot}
					className="fill-audio"
				/>
				<text
					x={labelX(markers.firstAudio.x, layout.markers.firstAudio.labelX)}
					y={firstAudioTop + layout.markers.firstAudio.labelY}
					textAnchor={anchor(markers.firstAudio.x)}
					className="fill-audio-text text-sm font-bold"
				>
					{copy.markers.firstAudio.title}
				</text>
				<text
					x={labelX(markers.firstAudio.x, layout.markers.firstAudio.labelX)}
					y={
						firstAudioTop +
						layout.markers.firstAudio.labelY +
						layout.markers.firstAudio.noteGap
					}
					textAnchor={anchor(markers.firstAudio.x)}
					className="fill-muted-foreground text-[12px]"
				>
					{labels.firstAudioNote}
				</text>
			</g>

			<g opacity={playhead.opacity}>
				<line
					x1={playhead.x}
					x2={playhead.x}
					y1={layout.grid.top}
					y2={layout.grid.bottom}
					strokeWidth={1}
					className="stroke-foreground/60"
				/>
				<path
					d={`M ${playhead.x - layout.playhead.half} ${layout.grid.top} L ${playhead.x + layout.playhead.half} ${layout.grid.top} L ${playhead.x} ${layout.grid.top + layout.playhead.tip} Z`}
					className="fill-foreground/80"
				/>
			</g>
		</svg>
	)
}
