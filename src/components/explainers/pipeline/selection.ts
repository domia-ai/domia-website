import type {
	PipelineData,
	PipelineMachineId,
	PipelineMode,
	PipelineModeId,
} from "@/data/types"

import type { ByMachineAndMode, PipelineSelection } from "./types"

export const machineIds: PipelineMachineId[] = ["hub", "fastDesktop"]

export const modeIds: PipelineModeId[] = ["command", "conversation"]

export const isMachine = (value: string): value is PipelineMachineId =>
	machineIds.some((id) => id === value)

export const isMode = (value: string): value is PipelineModeId =>
	modeIds.some((id) => id === value)

export const selectedMode = (
	data: PipelineData,
	selection: PipelineSelection,
): PipelineMode => {
	const modes = data.machines[selection.machine].modes
	return modes[selection.mode] ?? modes.conversation
}

export const pickCopy = <T>(
	copy: ByMachineAndMode<T>,
	selection: PipelineSelection,
): T =>
	copy[selection.machine][selection.mode] ??
	copy[selection.machine].conversation

export const withMachine = (
	data: PipelineData,
	prev: PipelineSelection,
	machine: PipelineMachineId,
): PipelineSelection => ({
	machine,
	mode: data.machines[machine].modes[prev.mode] ? prev.mode : "conversation",
})

export const withMode = (
	data: PipelineData,
	prev: PipelineSelection,
	mode: PipelineModeId,
): PipelineSelection => ({
	mode,
	machine: data.machines[prev.machine].modes[mode]
		? prev.machine
		: (machineIds.find((id) => data.machines[id].modes[mode]) ?? prev.machine),
})
