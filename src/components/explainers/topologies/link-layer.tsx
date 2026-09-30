import type {
	TopologyLink,
	TopologyLinkKind,
	TopologyNodeKind,
	TopologyPoint,
} from "@/data/types"
import { cn } from "@/lib/utils"

import type { LinkLayerProps, LinkShapeProps } from "./types"

const markerId = "topo-arrow"
const audibleKinds: TopologyLinkKind[] = ["audio", "satellite"]

const strokeClassName: Record<TopologyLinkKind, string> = {
	audio: "stroke-audio",
	satellite: "stroke-audio",
	stage: "stroke-mesh",
	discovery: "stroke-mesh",
}

const strokeWidth: Record<TopologyLinkKind, number> = {
	audio: 1.5,
	satellite: 1.5,
	stage: 1.5,
	discovery: 1,
}

const strokeOpacity: Record<TopologyLinkKind, number> = {
	audio: 0.7,
	satellite: 0.7,
	stage: 0.6,
	discovery: 0.4,
}

const dashArray: Record<TopologyLinkKind, string> = {
	audio: "1 8",
	satellite: "1 8",
	stage: "7 7",
	discovery: "3 6",
}

const arrowStrokeWidth = 2.2
const arrowStrokeOpacity = 0.9
const dotRadius = 2.5
const dotOpacity = 0.8

const anchorKinds: TopologyNodeKind[] = ["node", "peer"]

function LinkShape({ link, dotAt }: LinkShapeProps) {
	const common = {
		className: cn(
			link.arrow ? "stroke-model" : strokeClassName[link.kind],
			link.dashed && "animate-mesh-dash",
		),
		strokeWidth: link.arrow ? arrowStrokeWidth : strokeWidth[link.kind],
		strokeOpacity: link.arrow ? arrowStrokeOpacity : strokeOpacity[link.kind],
		strokeDasharray: link.dashed ? dashArray[link.kind] : undefined,
		markerEnd: link.arrow ? `url(#${markerId})` : undefined,
	}
	if (link.path) return <path d={link.path} {...common} />
	if (!link.points) return null
	const [[x1, y1], [x2, y2]] = link.points
	return (
		<>
			<line x1={x1} y1={y1} x2={x2} y2={y2} {...common} />
			{dotAt ? (
				<circle
					cx={dotAt[0]}
					cy={dotAt[1]}
					r={dotRadius}
					className="fill-audio"
					fillOpacity={dotOpacity}
				/>
			) : null}
		</>
	)
}

export function LinkLayer({ data, active }: LinkLayerProps) {
	const kinds = new Map(data.nodes.map((node) => [node.id, node.kind]))
	const isAnchor = (id: string) => {
		const kind = kinds.get(id)
		return kind !== undefined && anchorKinds.includes(kind)
	}
	const dotFor = (link: TopologyLink): TopologyPoint | null => {
		if (!link.points || !audibleKinds.includes(link.kind)) return null
		if (isAnchor(link.to)) return link.points[1]
		if (isAnchor(link.from)) return link.points[0]
		return null
	}
	return (
		<svg
			className="pointer-events-none absolute inset-0 overflow-visible"
			width={data.canvas.w}
			height={data.canvas.h}
			viewBox={`0 0 ${data.canvas.w} ${data.canvas.h}`}
			aria-hidden="true"
		>
			<defs>
				<marker
					id={markerId}
					viewBox="0 0 10 10"
					refX="8"
					refY="5"
					markerWidth="7"
					markerHeight="7"
					orient="auto-start-reverse"
				>
					<path
						d="M1,1 L9,5 L1,9"
						fill="none"
						className="stroke-model"
						strokeWidth="1.6"
						strokeLinecap="round"
					/>
				</marker>
			</defs>
			{data.scenarios.map((scenario) => (
				<g
					key={scenario.id}
					className="motion-safe:transition-opacity motion-safe:duration-500"
					style={{ opacity: scenario.id === active ? 1 : 0 }}
					fill="none"
					strokeLinecap="round"
				>
					{scenario.links.map((link) => (
						<LinkShape key={link.id} link={link} dotAt={dotFor(link)} />
					))}
				</g>
			))}
		</svg>
	)
}
