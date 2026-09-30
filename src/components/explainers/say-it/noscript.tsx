import { forkOutcomeOf } from "./summary"
import type { SayItNoScriptProps } from "./types"

export function SayItNoScript({ copy, locale, initial }: SayItNoScriptProps) {
	const outcome = forkOutcomeOf(initial.verdict, copy, locale)
	const branch = copy.branches[outcome.branch]

	return (
		<noscript>
			<p>{copy.noscript.note}</p>
			<p>
				<strong>{copy.noscript.heading}</strong>: {initial.text}
			</p>
			<p>
				{copy.fork.question} {branch.label}: {branch.title}. {outcome.text}
				{outcome.note ? ` ${outcome.note}` : ""}
			</p>
		</noscript>
	)
}
