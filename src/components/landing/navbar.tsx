"use client"
import { useId, useState } from "react"
import type { CSSProperties } from "react"
import { useTranslations } from "next-intl"
import { Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { GithubIcon } from "@/components/landing/icons"
import { DemoLink } from "@/components/landing/demo-link"
import { LanguageSwitcher } from "@/components/landing/language-switcher"
import { MOBILE_MENU_STAGGER_MS } from "@/components/landing/constants"
import { ThemeToggle } from "@/components/sections/theme-toggle"
import { Link, usePathname } from "@/i18n/navigation"
import { routes } from "@/constants"
import { githubUrl } from "@/constants/run"

export function Navbar() {
	const [isOpen, setIsOpen] = useState(false)
	const pathname = usePathname()
	const menuId = useId()
	const t = useTranslations("nav")

	return (
		<header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
			<div className="mx-auto flex h-16 w-full max-w-7xl items-center px-4">
				<div className="mr-4 flex">
					<Link href="/" className="group flex items-center space-x-2">
						<span className="from-primary to-primary/70 group-hover:from-primary/80 group-hover:to-primary bg-gradient-to-r bg-clip-text text-xl font-bold text-transparent transition-colors duration-300">
							Domia
						</span>
					</Link>
				</div>

				<nav
					aria-label={t("mainNav")}
					className="mx-2 hidden items-center lg:flex xl:mx-6 xl:space-x-1"
				>
					{routes.map((route) => {
						const current = pathname === route
						return (
							<Link
								key={route}
								href={route}
								aria-current={current ? "page" : undefined}
								className={cn(
									"group relative rounded-md px-2 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-300 xl:px-3",
									"hover:text-primary hover:bg-primary/5",
									current
										? "text-primary bg-primary/10"
										: "text-muted-foreground",
								)}
							>
								<span className="relative z-10">{t(route.slice(1))}</span>
								<span
									aria-hidden="true"
									className={cn(
										"absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 rounded-full duration-300 motion-safe:transition-all",
										current
											? "bg-primary w-3/4 opacity-100"
											: "bg-primary/60 w-0 opacity-0 group-hover:w-3/4 group-hover:opacity-100",
									)}
								/>
							</Link>
						)
					})}
				</nav>

				<div className="hidden flex-1 items-center justify-end gap-1 lg:flex xl:gap-2">
					<LanguageSwitcher />
					<ThemeToggle label={t("toggleTheme")} />
					<Button
						size="sm"
						variant="outline"
						nativeButton={false}
						className="size-7 px-0 xl:w-auto xl:px-2.5"
						render={
							<a
								href={githubUrl}
								target="_blank"
								rel="noopener noreferrer"
								role={undefined}
							/>
						}
					>
						<GithubIcon aria-hidden="true" className="size-4" />
						<span aria-hidden="true" className="hidden xl:inline">
							GitHub
						</span>
						<span className="sr-only">
							{t("githubAria")} {t("opensInNewTab")}
						</span>
					</Button>
					<DemoLink variant="secondary" label={t("consoleDemo")} />
				</div>

				<div className="flex flex-1 items-center justify-end lg:hidden">
					<Button
						variant="ghost"
						size="icon"
						aria-label={isOpen ? t("closeMenu") : t("openMenu")}
						aria-expanded={isOpen}
						aria-controls={menuId}
						onClick={() => setIsOpen(!isOpen)}
						className="hover:bg-primary/10 size-10 transition-colors duration-200"
					>
						<div className="relative h-5 w-5">
							<Menu
								className={cn(
									"absolute inset-0 h-5 w-5 duration-300 motion-safe:transition-all",
									isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100",
								)}
							/>
							<X
								className={cn(
									"absolute inset-0 h-5 w-5 duration-300 motion-safe:transition-all",
									isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0",
								)}
							/>
						</div>
					</Button>
				</div>
			</div>

			<div
				id={menuId}
				inert={!isOpen}
				className={cn(
					"overflow-hidden duration-300 ease-in-out motion-safe:transition-all lg:hidden",
					isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0",
				)}
			>
				<div className="bg-background/50 mx-auto grid w-full max-w-7xl gap-1 px-4 py-4 backdrop-blur-sm">
					<DemoLink
						variant="primary"
						label={t("openConsoleDemo")}
						className="mb-2 w-full"
					/>
					{routes.map((route, index) => (
						<Link
							key={route}
							href={route}
							aria-current={pathname === route ? "page" : undefined}
							className={cn(
								"group relative flex items-center overflow-hidden rounded-lg px-4 py-3 text-base font-medium duration-200 motion-safe:transition-all",
								"hover:bg-primary/10 hover:text-primary motion-safe:hover:translate-x-1",
								pathname === route
									? "bg-primary/15 text-primary border-primary border-l-2"
									: "hover:bg-accent hover:text-accent-foreground",
								"motion-safe:animate-in motion-safe:slide-in-from-left-5 motion-safe:fade-in-0 motion-safe:fill-mode-both motion-safe:[animation-delay:var(--stagger)]",
							)}
							style={
								{
									"--stagger": `${index * MOBILE_MENU_STAGGER_MS}ms`,
								} as CSSProperties
							}
							onClick={() => setIsOpen(false)}
						>
							<span className="relative z-10">{t(route.slice(1))}</span>
							<div className="from-primary/5 absolute inset-0 bg-gradient-to-r to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
						</Link>
					))}
					<div className="mt-2 flex items-center justify-center gap-2">
						<LanguageSwitcher />
						<ThemeToggle label={t("toggleTheme")} />
					</div>
				</div>
			</div>
		</header>
	)
}
