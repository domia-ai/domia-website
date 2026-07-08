import { getTranslations } from "next-intl/server"

import { localizedMetadata, pageLocale } from "@/i18n/page"
import {
	Hero,
	Diagram,
	Hardware,
	Node,
	Satellites,
	Engine,
	Stt,
	Model,
	Tts,
	App,
	Marketplace,
	Stack,
	Private,
	Local,
} from "@/components/technology"
import { BreadcrumbsJsonLd } from "@/components/seo/breadcrumbs"

export const generateMetadata = localizedMetadata("/technology", "technology")

export default async function Technology(
	props: PageProps<"/[locale]/technology">,
) {
	const locale = await pageLocale(props.params)
	const t = await getTranslations({ locale, namespace: "meta" })

	return (
		<div className="flex flex-col gap-10">
			<BreadcrumbsJsonLd
				items={[{ name: t("technology.breadcrumb"), path: "/technology" }]}
			/>
			<Hero />
			<Diagram />
			<Stack />
			<Stt />
			<Model />
			<Tts />
			<Hardware />
			<Node />
			<Satellites />
			<Engine />
			<App />
			<Marketplace />
			<Private />
			<Local />
		</div>
	)
}
