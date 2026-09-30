"use client"

import Image from "next/image"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

import { FACE_IMAGE_SIZE, FACE_TOOLTIP_DELAY_MS } from "./constants"
import type { FaceGridProps } from "./types"

export function FaceGrid({
	faces,
	value,
	onValueChange,
	labelledBy,
	copy,
}: FaceGridProps) {
	const select = (next: unknown[]) => {
		const [first] = next
		const face = faces.find((candidate) => candidate.id === first)
		if (face) onValueChange(face.id)
	}

	return (
		<TooltipProvider delay={FACE_TOOLTIP_DELAY_MS}>
			<ToggleGroup
				value={[value]}
				onValueChange={select}
				aria-labelledby={labelledBy}
				spacing={0}
				className="grid w-full grid-cols-6 gap-2 sm:grid-cols-8 lg:grid-cols-6 xl:grid-cols-8"
			>
				{faces.map((face) => {
					const active = face.id === value
					const name = copy.faces[face.id]
					return (
						<Tooltip key={face.id}>
							<TooltipTrigger
								render={
									<ToggleGroupItem
										value={face.id}
										aria-label={name}
										className={cn(
											"aspect-square h-auto w-full min-w-0 rounded-full p-0 group-data-[spacing=0]/toggle-group:rounded-full group-data-[spacing=0]/toggle-group:px-0 hover:bg-transparent data-[state=on]:bg-transparent motion-safe:transition-[transform,opacity] motion-safe:duration-300 motion-safe:hover:scale-105",
											active ? "scale-105" : "opacity-80 hover:opacity-100",
										)}
									/>
								}
							>
								<span
									className={cn(
										"ring-offset-background relative block size-full overflow-hidden rounded-full ring-offset-2",
										active
											? "ring-primary ring-2"
											: "ring-border group-hover/toggle:ring-primary/50 ring-1",
									)}
								>
									<Image
										src={face.image}
										alt=""
										width={FACE_IMAGE_SIZE}
										height={FACE_IMAGE_SIZE}
										className="size-full object-cover"
									/>
								</span>
							</TooltipTrigger>
							<TooltipContent>{name}</TooltipContent>
						</Tooltip>
					)
				})}
			</ToggleGroup>
		</TooltipProvider>
	)
}
