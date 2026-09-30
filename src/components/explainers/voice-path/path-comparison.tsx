import { Card, CardContent } from "@/components/ui/card"

import { COMPARISON_CAPTION_ID } from "./layout"
import type { PathComparisonProps, VoicePathKey } from "./types"

const sides: VoicePathKey[] = ["cloud", "local"]

const answerClassName: Record<VoicePathKey, string> = {
	cloud: "text-muted-foreground",
	local: "text-foreground",
}

export function PathComparison({ questions, copy }: PathComparisonProps) {
	return (
		<section
			aria-labelledby={COMPARISON_CAPTION_ID}
			className="flex flex-col gap-3"
		>
			<h3 id={COMPARISON_CAPTION_ID} className="sr-only">
				{copy.comparison.caption}
			</h3>
			<div className="grid gap-3 md:grid-cols-3">
				{questions.map((question) => (
					<Card key={question} size="sm">
						<CardContent className="flex flex-col gap-2">
							<p className="text-sm font-semibold text-balance">
								{copy.comparison.questions[question] ?? question}
							</p>
							<dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
								{sides.map((side) => (
									<div key={side} className="contents">
										<dt className="text-muted-foreground min-w-0">
											{copy.paths[side]}
										</dt>
										<dd className={answerClassName[side]}>
											{copy.comparison.answers[side][question] ?? question}
										</dd>
									</div>
								))}
							</dl>
						</CardContent>
					</Card>
				))}
			</div>
		</section>
	)
}
