"use client"
import { useState } from "react"
import Image from "next/image"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
	TypographyBlockquote,
	TypographyH2,
	TypographyLarge,
	TypographySmall,
} from "@/components/ui/typography"
import { Badge } from "@/components/ui/badge"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { collection, holdersBenefits } from "@/constants"
import { getRarityColor } from "@/lib/utils"
import { CollectionItemType } from "@/types"

export function Nft() {
	const [selectedNFT, setSelectedNFT] = useState<CollectionItemType>()

	return (
		<>
			<Card>
				<CardHeader>
					<TypographyH2>🎫 Domia NFT Collection & Utility</TypographyH2>
				</CardHeader>
				<CardContent className="flex flex-col gap-8">
					<TypographyLarge>
						We’re launching an exclusive collection of 10,000 Domia NFTs — each
						one representing a unique personality, identity core, and gateway to
						future functionality. These NFTs are more than collectibles. They
						act as persistent identity tokens that carry your Domia’s evolution,
						memory, and emotional footprint across devices and environments.
						Only verified holders will see their personalized, evolving Domia
						NFT within the Domia ecosystem, while non-holders experience a
						default assistant. Your NFT becomes your Domia’s face, voice, and
						emotional mirror. Early holders — especially the first 3,000 —
						unlock:
					</TypographyLarge>

					<ul className="list-inside list-disc text-left">
						{holdersBenefits?.map((benefit) => {
							return (
								<li key={benefit?.title}>
									<strong>{benefit?.title}</strong> — {benefit?.description}
								</li>
							)
						})}
					</ul>

					<TypographySmall>
						The illustrations shown below are conceptual examples and do not
						represent the final Domia NFTs. Actual NFT designs, traits, and
						metadata will be announced during the official launch.
					</TypographySmall>
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{collection.map((item) => (
							<Card
								key={item.name}
								className="group cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
								onClick={() => setSelectedNFT(item)}
							>
								<div className="relative aspect-square overflow-hidden">
									<Image
										src={`/collection/${item.image}`}
										alt={item.name}
										fill
										sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
										className="object-cover transition-transform duration-300 group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
									<div className="absolute top-3 left-3">
										<Badge
											className={`${getRarityColor(item.rarity)} border-0 text-white`}
										>
											{item.rarity}
										</Badge>
									</div>
								</div>
								<CardContent className="p-4">
									<h3 className="mb-2 truncate text-lg font-semibold">
										{item.name}
									</h3>
									<Badge
										className={`${getRarityColor(item.rarity)} border-0 text-white`}
									>
										{item.rarity}
									</Badge>
								</CardContent>
							</Card>
						))}
					</div>

					<TypographyBlockquote>
						“Together, we’re building the world’s first emotional AI collective
						— one unique soul at a time.”
					</TypographyBlockquote>
				</CardContent>
			</Card>

			<Dialog
				open={!!selectedNFT}
				onOpenChange={(open) => !open && setSelectedNFT(undefined)}
			>
				<DialogContent className="max-h-[90vh] overflow-auto sm:max-w-[800px]">
					<DialogHeader>
						<DialogTitle className="text-2xl font-bold">
							{selectedNFT?.name}
						</DialogTitle>
					</DialogHeader>
					<div className="flex flex-col items-center gap-6 py-4">
						<div className="relative mx-auto aspect-square w-full max-w-[600px]">
							{selectedNFT && (
								<Image
									src={`/collection/${selectedNFT.image}`}
									alt={selectedNFT.name}
									fill
									sizes="(max-width: 600px) 100vw, 600px"
									className="object-contain"
									priority
								/>
							)}
						</div>
						<div className="flex items-center justify-center gap-4">
							{selectedNFT && (
								<Badge
									className={`${getRarityColor(selectedNFT.rarity)} border-0 px-3 py-1 text-lg text-white`}
								>
									{selectedNFT.rarity}
								</Badge>
							)}
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</>
	)
}
