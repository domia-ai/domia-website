import localFont from "next/font/local"

export const outfitSans = localFont({
	src: "./outfit-variable-latin.woff2",
	weight: "100 900",
	style: "normal",
	variable: "--font-outfit-sans",
	display: "swap",
})
