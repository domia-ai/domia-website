export const fillTemplate = (
	template: string,
	values: Record<string, unknown>,
): string =>
	template.replace(/\{(\w+)\}/g, (_, name: string) =>
		name in values ? String(values[name]) : "",
	)
