"use client"

import { useId, useState } from "react"

import { SayItConversation } from "@/components/explainers/say-it/conversation"
import type { PersonaFaceId, PersonaTemplateId } from "@/data/types"

import { FaceGrid } from "./face-grid"
import { TemperamentPills } from "./temperament-pills"
import type { PersonaBuilderIslandProps, PersonaBuilderState } from "./types"

export function PersonaBuilderIsland({
	data,
	copy,
	conversation,
}: PersonaBuilderIslandProps) {
	const faceLabelId = useId()
	const temperamentLabelId = useId()
	const [first] = data.templates
	const [state, setState] = useState<PersonaBuilderState>(() => ({
		face: first?.defaultFace ?? data.faces[0].id,
		template: first?.id ?? "warmHost",
	}))

	const face =
		data.faces.find((candidate) => candidate.id === state.face) ?? data.faces[0]
	const template =
		data.templates.find((candidate) => candidate.id === state.template) ??
		data.templates[0]
	const templateCopy = copy.templates[template.id]

	const selectFace = (next: PersonaFaceId) =>
		setState((previous) => ({ ...previous, face: next }))

	const selectTemplate = (next: PersonaTemplateId) => {
		const picked = data.templates.find((candidate) => candidate.id === next)
		setState((previous) => ({
			face: picked?.defaultFace ?? previous.face,
			template: next,
		}))
	}

	return (
		<div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-12">
			<div className="flex flex-col gap-8">
				<div className="flex flex-col gap-3">
					<p id={faceLabelId} className="text-sm font-medium">
						{copy.pickFace}
					</p>
					<FaceGrid
						faces={data.faces}
						value={face.id}
						onValueChange={selectFace}
						labelledBy={faceLabelId}
						copy={copy}
					/>
				</div>
				<div className="flex flex-col gap-3">
					<p id={temperamentLabelId} className="text-sm font-medium">
						{copy.pickTemperament}
					</p>
					<TemperamentPills
						templates={data.templates}
						value={template.id}
						onValueChange={selectTemplate}
						labelledBy={temperamentLabelId}
						copy={copy}
					/>
				</div>
				<p className="text-muted-foreground max-w-md text-sm text-balance">
					{copy.examplesNote}
				</p>
			</div>
			<div className="flex">
				<SayItConversation
					{...conversation}
					persona={{
						face,
						name: templateCopy.persona,
						sample: templateCopy.sample,
					}}
					replayKey={template.id}
				/>
			</div>
		</div>
	)
}
