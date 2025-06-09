import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { Rarity } from "@/constants"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function getRarityColor(rarity: Rarity) {
	switch (rarity) {
		case Rarity.Common:
			return "bg-gray-500"
		case Rarity.Rare:
			return "bg-blue-500"
		case Rarity.Epic:
			return "bg-purple-500"
		case Rarity.Legendary:
			return "bg-yellow-500"
		default:
			return "bg-gray-500"
	}
}
