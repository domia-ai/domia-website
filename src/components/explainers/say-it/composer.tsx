"use client"

import { useId } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

import { SAY_IT_INPUT_MAX_CHARS } from "./constants"
import type {
	SayItComposerProps,
	SayItFreeTextProps,
	SayItPresetsProps,
} from "./types"

export function SayItPresets({
	label,
	selectedPreset,
	presets,
	onPreset,
}: SayItPresetsProps) {
	const presetsId = useId()

	return (
		<div className="flex min-w-0 flex-col gap-2">
			<span id={presetsId} className="text-muted-foreground text-sm">
				{label}
			</span>
			<ToggleGroup
				value={selectedPreset ? [selectedPreset] : []}
				onValueChange={(next) => {
					const [first] = next
					if (typeof first === "string") onPreset(first)
				}}
				variant="outline"
				size="sm"
				aria-labelledby={presetsId}
				className="w-full max-w-full flex-wrap"
			>
				{presets.map((preset) => (
					<ToggleGroupItem
						key={preset.id}
						value={preset.id}
						className="max-w-full max-sm:h-9"
					>
						<span className="truncate">{preset.text}</span>
					</ToggleGroupItem>
				))}
			</ToggleGroup>
		</div>
	)
}

const statusTextOf = (
	status: SayItFreeTextProps["status"],
	copy: SayItFreeTextProps["copy"],
): string => {
	if (status === "loading") return copy.loading
	if (status === "failed") return copy.failed
	return ""
}

export function SayItFreeText({
	copy,
	draft,
	status,
	onDraftChange,
	onFocus,
	onSubmit,
}: SayItFreeTextProps) {
	const statusId = useId()

	return (
		<form
			className="flex min-w-0 flex-col gap-1"
			onSubmit={(event) => {
				event.preventDefault()
				onSubmit()
			}}
		>
			<div className="flex min-w-0 gap-2">
				<Input
					value={draft}
					onChange={(event) => onDraftChange(event.target.value)}
					onFocus={onFocus}
					placeholder={copy.placeholder}
					aria-label={copy.placeholder}
					aria-describedby={statusId}
					maxLength={SAY_IT_INPUT_MAX_CHARS}
					autoComplete="off"
					className="h-10 min-w-0 flex-1"
				/>
				<Button
					type="submit"
					size="lg"
					disabled={status === "loading" || draft.trim().length === 0}
					className="min-w-24 shrink-0 max-sm:h-10"
				>
					{copy.submit}
				</Button>
			</div>
			<p
				id={statusId}
				aria-live="polite"
				className="text-muted-foreground min-h-4 text-xs"
			>
				{statusTextOf(status, copy)}
			</p>
		</form>
	)
}

export function SayItComposer({
	copy,
	draft,
	status,
	selectedPreset,
	presets,
	onDraftChange,
	onFocus,
	onSubmit,
	onPreset,
}: SayItComposerProps) {
	return (
		<div className="flex min-w-0 flex-col gap-3">
			<SayItFreeText
				copy={copy.input}
				draft={draft}
				status={status}
				onDraftChange={onDraftChange}
				onFocus={onFocus}
				onSubmit={onSubmit}
			/>
			<SayItPresets
				label={copy.presetsLabel}
				selectedPreset={selectedPreset}
				presets={presets}
				onPreset={onPreset}
			/>
		</div>
	)
}
