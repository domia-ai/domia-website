"use client"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { routes } from "@/constants"

export function Navbar() {
	const [isOpen, setIsOpen] = useState(false)
	const pathname = usePathname()

	return (
		<header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
			<div className="container flex h-16 items-center">
				<div className="mx-4 flex">
					<Link href="/" className="group flex items-center space-x-2">
						<span className="from-primary to-primary/70 group-hover:from-primary/80 group-hover:to-primary bg-gradient-to-r bg-clip-text text-xl font-bold text-transparent transition-all duration-300">
							Domia
						</span>
					</Link>
				</div>

				{/* Desktop navigation */}
				<nav className="mx-6 hidden items-center space-x-1 md:flex lg:space-x-2">
					{routes.map((route) => (
						<Link
							key={route.href}
							href={route.href}
							className={cn(
								"group relative rounded-md px-3 py-2 text-sm font-medium transition-all duration-300",
								"hover:text-primary hover:bg-primary/5",
								pathname === route.href
									? "text-primary bg-primary/10"
									: "text-muted-foreground",
							)}
						>
							<span className="relative z-10">{route.label}</span>

							{/* Active indicator line */}
							<div
								className={cn(
									"bg-primary absolute bottom-0 left-1/2 h-0.5 rounded-full transition-all duration-300",
									pathname === route.href
										? "w-3/4 -translate-x-1/2 opacity-100"
										: "w-0 -translate-x-1/2 opacity-0",
								)}
							/>

							{/* Hover indicator line */}
							<div
								className={cn(
									"bg-primary/60 absolute bottom-0 left-1/2 h-0.5 rounded-full transition-all duration-300",
									"group-hover:w-3/4 group-hover:-translate-x-1/2 group-hover:opacity-100",
									pathname === route.href
										? "opacity-0"
										: "w-0 -translate-x-1/2 opacity-0",
								)}
							/>
						</Link>
					))}
				</nav>

				{/* Mobile navigation button */}
				<div className="flex flex-1 items-center justify-end md:hidden">
					<Button
						variant="ghost"
						size="icon"
						aria-label={isOpen ? "Close menu" : "Open menu"}
						onClick={() => setIsOpen(!isOpen)}
						className="hover:bg-primary/10 transition-colors duration-200"
					>
						<div className="relative h-5 w-5">
							<Menu
								className={cn(
									"absolute inset-0 h-5 w-5 transition-all duration-300",
									isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100",
								)}
							/>
							<X
								className={cn(
									"absolute inset-0 h-5 w-5 transition-all duration-300",
									isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0",
								)}
							/>
						</div>
					</Button>
				</div>
			</div>

			{/* Mobile navigation menu */}
			<div
				className={cn(
					"overflow-hidden transition-all duration-300 ease-in-out md:hidden",
					isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0",
				)}
			>
				<div className="bg-background/50 container grid gap-1 py-4 backdrop-blur-sm">
					{routes.map((route, index) => (
						<Link
							key={route.href}
							href={route.href}
							className={cn(
								"group relative flex items-center overflow-hidden rounded-lg px-4 py-3 text-base font-medium transition-all duration-200",
								"hover:bg-primary/10 hover:text-primary hover:translate-x-1",
								pathname === route.href
									? "bg-primary/15 text-primary border-primary border-l-2"
									: "hover:bg-accent hover:text-accent-foreground",
								"animate-in slide-in-from-left-5 fade-in-0",
							)}
							style={{
								animationDelay: `${index * 50}ms`,
								animationFillMode: "both",
							}}
							onClick={() => setIsOpen(false)}
						>
							<span className="relative z-10">{route.label}</span>
							<div className="from-primary/5 absolute inset-0 bg-gradient-to-r to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
						</Link>
					))}
				</div>
			</div>
		</header>
	)
}
