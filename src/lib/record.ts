export const recordFrom = <K extends string, V>(
	keys: readonly K[],
	value: (key: K) => V,
): Record<K, V> =>
	Object.fromEntries(keys.map((key) => [key, value(key)])) as Record<K, V>
