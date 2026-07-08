import { getTranslations } from "next-intl/server"

import { localizedMetadata, pageLocale } from "@/i18n/page"
import {
	Hero,
	Devices,
	Talk,
	AudioReplay,
	Latency,
	Grading,
	RunAgain,
	Archive,
	Configuration,
	Templates,
	Private,
	Personas,
	WhatsNext,
} from "@/components/experience"
import { BreadcrumbsJsonLd } from "@/components/seo/breadcrumbs"

export const generateMetadata = localizedMetadata("/experience", "experience")

export default async function Experience(
	props: PageProps<"/[locale]/experience">,
) {
	const locale = await pageLocale(props.params)
	const t = await getTranslations({ locale, namespace: "meta" })

	return (
		<div className="flex flex-col gap-10">
			<BreadcrumbsJsonLd
				items={[{ name: t("experience.breadcrumb"), path: "/experience" }]}
			/>
			<Hero />
			<Devices />
			<Talk />
			<AudioReplay />
			<Latency />
			<Grading />
			<RunAgain />
			<Archive />
			<Configuration />
			<Templates />
			<Private />
			<Personas />
			<WhatsNext />
		</div>
	)
}
