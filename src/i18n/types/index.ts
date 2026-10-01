import type { ReactNode } from "react"

export type LocaleParamsType = Promise<{ locale: string }>

export type LocalePagePropsType = {
	params: LocaleParamsType
}

export type LocaleLayoutPropsType = Readonly<{
	children: ReactNode
	params: LocaleParamsType
}>
