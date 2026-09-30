"use client"

import { Fragment } from "react"
import type { ComponentType } from "react"
import Image from "next/image"
import { Cpu, Database, Mic, Volume2 } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import type { TopologyNodeKind } from "@/data/types"

import {
	delegatedChipClassName,
	identityChipClassName,
	plainChipClassName,
	routingChipClassName,
	sharedChipClassName,
} from "./classes"
import {
	identitiesOn,
	isPipelineChip,
	nodeHint,
	nodeKey,
	peerLlmMode,
	placementStyle,
} from "./derive"
import { Tip } from "./tip"
import type { IdentityChipProps, NodeCardProps } from "./types"

const avatarSize = 24

const shellClassName: Record<TopologyNodeKind, string> = {
	node: "bg-node-hub ring-foreground/10 flex flex-col gap-2.5 rounded-2xl p-4 shadow-lg ring-1",
	peer: "bg-node-hub ring-foreground/10 flex flex-col gap-2 rounded-2xl p-3.5 shadow-lg ring-1",
	satellite:
		"bg-node-satellite ring-foreground/10 rounded-xl px-3 py-2.5 ring-1",
	peripheral:
		"bg-node-satellite ring-foreground/10 rounded-xl px-3 py-2.5 ring-1",
}

const satelliteDotClassName: Record<string, string> = {
	"sat-esphome": "bg-tool",
	"sat-livekit": "bg-audio",
	"sat-websocket": "bg-fast-path",
	"sat-wyoming": "bg-speech",
}

const peripheralIcon: Record<string, LucideIcon> = {
	mic: Mic,
	speaker: Volume2,
}

function Arrow() {
	return (
		<span aria-hidden="true" className="text-muted-foreground text-[10px]">
			→
		</span>
	)
}

function IdentityChip({ identity, name, hint }: IdentityChipProps) {
	return (
		<Tip hint={hint} className={identityChipClassName}>
			<Image
				src={identity.avatar}
				alt={name}
				width={avatarSize}
				height={avatarSize}
				className="size-6 rounded-full object-cover"
			/>
			<span>{name}</span>
		</Tip>
	)
}

function MainBody({ node, scenario, data, copy }: NodeCardProps) {
	const identities = identitiesOn(data, scenario, node.id)
	const chips = data.pipelineChips.filter(isPipelineChip)
	return (
		<>
			<div className="flex items-center gap-2">
				<Cpu className="text-mesh size-4.5 shrink-0" aria-hidden="true" />
				<Tip hint="node" className="flex min-w-0 flex-1 flex-col">
					<span className="text-sm leading-tight font-semibold">
						{copy.nodes.main.title}
					</span>
					<span className="text-muted-foreground text-[11px]">
						{copy.device[scenario.id]}
					</span>
				</Tip>
			</div>
			<div>
				<div className="text-muted-foreground mb-1 text-[9px] tracking-[0.16em] uppercase">
					{copy.identitiesLabel}
				</div>
				<ul className="flex flex-wrap gap-1.5">
					{identities.map((identity) => (
						<li key={identity.id}>
							<IdentityChip
								identity={identity}
								name={copy.identities[identity.id]}
								hint="identity"
							/>
						</li>
					))}
				</ul>
			</div>
			<div className="flex flex-wrap items-center gap-1">
				{chips.map((chip, index) => (
					<Fragment key={chip}>
						{index > 0 ? <Arrow /> : null}
						<Tip
							hint={chip}
							className={
								chip === "routing" ? routingChipClassName : plainChipClassName
							}
						>
							{copy.chips[chip]}
						</Tip>
					</Fragment>
				))}
			</div>
			<Tip
				hint="memory"
				className="text-muted-foreground flex items-center gap-1.5 text-[11px]"
			>
				<Database className="size-3.5 shrink-0" aria-hidden="true" />
				<span>{copy.chips.memory}</span>
			</Tip>
		</>
	)
}

function PeripheralBody({ node, copy }: NodeCardProps) {
	const Icon = peripheralIcon[node.id]
	return (
		<Tip
			hint={nodeHint(node.id)}
			className="flex w-full items-center gap-2 text-xs text-balance"
		>
			{Icon ? <Icon className="size-3.5 shrink-0" aria-hidden="true" /> : null}
			<span>{copy.nodes[nodeKey(node.id)].title}</span>
		</Tip>
	)
}

function SatelliteBody({ node, scenario, copy }: NodeCardProps) {
	const nodeCopy = copy.nodes[nodeKey(node.id)]
	const binding = copy.bindings[scenario.id][node.id]
	const detail = [nodeCopy.sub, binding].filter(Boolean).join(" · ")
	return (
		<Tip hint={nodeHint(node.id)} className="flex w-full flex-col">
			<span className="flex items-center gap-2 text-xs font-semibold">
				<span
					aria-hidden="true"
					className={cn(
						"size-2 shrink-0 rounded-full",
						satelliteDotClassName[node.id],
					)}
				/>
				<span className="text-balance">{nodeCopy.title}</span>
			</span>
			<span className="text-muted-foreground mt-0.5 text-[10px] text-balance">
				{detail}
			</span>
		</Tip>
	)
}

function PeerBody({ node, scenario, data, copy }: NodeCardProps) {
	const nodeCopy = copy.nodes[nodeKey(node.id)]
	const mode = peerLlmMode(node.id, scenario)
	const identities = identitiesOn(data, scenario, node.id)
	return (
		<>
			<div className="flex items-center gap-2">
				<Tip hint={nodeHint(node.id)} className="flex min-w-0 flex-1 flex-col">
					<span className="text-[13px] leading-tight font-semibold">
						{nodeCopy.title}
					</span>
					<span className="text-muted-foreground text-[10px] text-balance">
						{nodeCopy.sub}
					</span>
				</Tip>
			</div>
			<ul className="flex flex-wrap gap-1.5">
				{identities.map((identity) => (
					<li key={identity.id}>
						<IdentityChip
							identity={identity}
							name={copy.identities[identity.id]}
							hint={mode === "delegated" ? "identityRemote" : "identity"}
						/>
					</li>
				))}
			</ul>
			<div className="flex flex-wrap items-center gap-1">
				<span className={plainChipClassName}>{copy.chips.stt}</span>
				<Arrow />
				<span
					className={
						mode === "delegated" ? delegatedChipClassName : sharedChipClassName
					}
				>
					{mode === "delegated"
						? copy.chips.llmDelegated
						: copy.chips.llmShared}
				</span>
				<Arrow />
				<span className={plainChipClassName}>{copy.chips.tts}</span>
			</div>
		</>
	)
}

const bodies: Record<TopologyNodeKind, ComponentType<NodeCardProps>> = {
	node: MainBody,
	peer: PeerBody,
	satellite: SatelliteBody,
	peripheral: PeripheralBody,
}

export function NodeCard(props: NodeCardProps) {
	const { node, scenario } = props
	const placement = scenario.placements[node.id] ?? null
	const hidden = placement === null
	const Body = bodies[node.kind]
	return (
		<div
			className={cn(
				"absolute box-border origin-top-left motion-safe:transition-[transform,opacity] motion-safe:duration-700 motion-safe:ease-out",
				shellClassName[node.kind],
				hidden && "pointer-events-none",
			)}
			style={{
				left: node.base.x,
				top: node.base.y,
				width: node.base.w,
				minHeight: node.base.h,
				...placementStyle(placement),
			}}
			aria-hidden={hidden || undefined}
			inert={hidden}
		>
			<Body {...props} />
		</div>
	)
}
