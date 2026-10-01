import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { LocalePagePropsType } from "./types"
import { pageMetadata } from "./urls"

export const localizedMetadata =
	(path: string, page: string) =>
	async ({ params }: LocalePagePropsType): Promise<Metadata> => {
		const { locale } = await params
		const t = await getTranslations({ locale, namespace: "meta" })

		return pageMetadata(path, page, locale, t)
	}

export const pageLocale = async (
	params: LocalePagePropsType["params"],
): Promise<string> => {
	const { locale } = await params
	setRequestLocale(locale)

	return locale
}
