import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"
import prettierConfig, { rules } from "eslint-config-prettier"
import prettierPlugin from "eslint-plugin-prettier/recommended"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname,
})

const eslintConfig = [
	...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
	prettierConfig,
	prettierPlugin,
	{
		rules: {
			"react/no-children-prop": 0,
		},
	},
]

export default eslintConfig
