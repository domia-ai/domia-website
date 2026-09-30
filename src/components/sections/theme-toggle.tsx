"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import type { ThemeToggleProps } from "@/components/sections/types"

export function ThemeToggle({ label }: ThemeToggleProps) {
	const { resolvedTheme, setTheme } = useTheme()
	const toggle = () => setTheme(resolvedTheme === "dark" ? "light" : "dark")

	return (
		<Button variant="ghost" size="icon" aria-label={label} onClick={toggle}>
			<Sun className="dark:hidden" />
			<Moon className="hidden dark:block" />
		</Button>
	)
}
