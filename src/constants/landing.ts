import {
	GithubIcon,
	// TelegramIcon,
	XIcon,
	DiscordIcon,
	EmailIcon,
} from "@/components/landing"
import { CollectionItemType } from "@/types"

export const routes = [
	{
		href: "/about",
		label: "📖 About",
		description: "Learn who we are and the story behind Domia.",
	},
	{
		href: "/technology",
		label: "🛠️ Technology",
		description:
			"Understand the modular AI and local-first architecture powering Domia.",
	},
	{
		href: "/marketplace",
		label: "🧩 Marketplace",
		description:
			"Browse and install emotional skills and personality modules for Domia.",
	},
	{
		href: "/nft",
		label: "🎨 NFT",
		description:
			"Explore our unique Founders NFT collection with real-world perks.",
	},
	{
		href: "/experience",
		label: "📱 Experience",
		description: "Discover how to interact with Domia via mobile and web apps.",
	},
	{
		href: "/cases",
		label: "🏠 Cases",
		description:
			"Real-world use cases: from smart homes to hotels and urban spaces.",
	},
	{
		href: "/community",
		label: "🤝 Community",
		description:
			"Join creators, developers, and visionaries building with Domia.",
	},
	{
		href: "/contact",
		label: "✉️ Contact",
		description:
			"Reach out to the Domia team with questions, ideas, or opportunities.",
	},
]

export const socialMediaLinks = [
	{
		name: "X",
		href: "https://x.com/domia_ai",
		icon: XIcon,
	},
	{
		name: "GitHub",
		href: "https://github.com/domia-ai",
		icon: GithubIcon,
	},
	// {
	// 	name: "Telegram",
	// 	href: "#",
	// 	icon: TelegramIcon,
	// },
	{
		name: "Discord",
		href: "https://discord.gg/Sx4ACEMSyv",
		icon: DiscordIcon,
	},
	{
		name: "Email",
		href: "mailto:hello@domia.ai",
		icon: EmailIcon,
	},
]

export const features = [
	{
		name: "🧠 Local LLM Intelligence.",
		description:
			"Domia uses Q-LoRA-tuned models and RAG-based memory retrieval to deliver fast, contextual, and emotional responses — all offline and device-local.",
	},
	{
		name: "🧬 Multi-Layered Cognitive Engine.",
		description:
			"From emotions to personality, profession, and motivation — Domia’s mind is built from multiple modular layers. Fully editable or dynamically evolving over time.",
	},
	{
		name: "🔒 100% Local, Secure & Ethical.",
		description:
			"All processing happens on-device or within your local network. No data leaves your home. Fully private, ethically designed, and under your control.",
	},
	{
		name: "🕸️ Collective Intelligence.",
		description:
			"Multiple Domia’s in the same home collaborate, share awareness, and learn from each other — forming a resilient and adaptive home ecosystem.",
	},
	{
		name: "🗣️ Natural Voice Interaction.",
		description:
			"Talk to Domia like a friend. It listens, understands, and responds using natural speech and emotional nuance — all offline.",
	},
	{
		name: "🧩 Smart Device Control.",
		description:
			"Control lights, sensors, and more — locally and privately — using Home Assistant’s powerful integration layer.",
	},
	{
		name: "📖 Narrative Memory & Context.",
		description:
			"Domia remembers. It builds stories from your interactions, forming a persistent, narrative context that influences how it understands and behaves.",
	},
	{
		name: "🛠️ Built in Public & Community-Driven.",
		description:
			"Domia is built in public — improved by real users, guided by an active community, and shared with radical transparency. We don’t just invite feedback — we co-create with our users. From the roadmap to real features, your ideas help shape what Domia becomes.",
	},
	{
		name: "♾️ Unified AI, IoT & Blockchain.",
		description:
			"From voice interaction to hardware automation to NFT-based ownership and personalization, everything works together — privately and offline.",
	},
	{
		name: "🏗️ Adaptable Infrastructure.",
		description:
			"Domia runs on scalable infrastructure — from tiny edge devices like Orange Pi and Raspberry Pi, to powerful home cores running multiple agents.",
	},
	{
		name: "🌐 Remote Access, Fully Private.",
		description:
			"With our premium mobile app, you can talk to your Domia from anywhere in the world — without compromising your data.",
	},
	{
		name: "🚪 No Vendor Lock-In.",
		description:
			"Domia is built on open standards and modular architecture. Even its integration with Home Assistant is fully local and replaceable — no walled gardens, no cloud platforms, and no vendor lock-in.",
	},
]

export enum Rarity {
	Common = "Common",
	Rare = "Rare",
	Epic = "Epic",
	Legendary = "Legendary",
}

export const collection: CollectionItemType[] = [
	{ image: "legendary.webp", name: "Domia #0", rarity: Rarity.Legendary },
	{ image: "accountant.webp", name: "Domia #1", rarity: Rarity.Common },
	{ image: "architect.webp", name: "Domia #2", rarity: Rarity.Rare },
	{ image: "astronaut.webp", name: "Domia #3", rarity: Rarity.Epic },
	{ image: "chef.webp", name: "Domia #4", rarity: Rarity.Common },
	{ image: "doctor.webp", name: "Domia #5", rarity: Rarity.Rare },
	{ image: "electrician.webp", name: "Domia #6", rarity: Rarity.Epic },
	{ image: "gamer.webp", name: "Domia #7", rarity: Rarity.Common },
	{ image: "investigator.webp", name: "Domia #8", rarity: Rarity.Rare },
	{ image: "lawyer.webp", name: "Domia #9", rarity: Rarity.Epic },
	{ image: "musician.webp", name: "Domia #10", rarity: Rarity.Common },
	{ image: "programmer.webp", name: "Domia #11", rarity: Rarity.Rare },
	{ image: "aviator.webp", name: "Domia #12", rarity: Rarity.Epic },
	{ image: "athlete.webp", name: "Domia #13", rarity: Rarity.Common },
	{ image: "mechanic.webp", name: "Domia #14", rarity: Rarity.Rare },
	{ image: "teacher.webp", name: "Domia #15", rarity: Rarity.Epic },
]

export const holdersBenefits = [
	{
		title: "👑 Lifetime Premium Access",
		description: "to all features without monthly fees.",
	},
	{
		title: "🎨 Unlock Unique Skins",
		description: "to visually personalize your Domia.",
	},
	{
		title: "🚀 Early Feature Access",
		description: "to test and shape the roadmap.",
	},
	{
		title: "📡 Priority Device Connectivity",
		description: "to physical hubs and nodes.",
	},
	{
		title: "🛠️ Advanced Settings Panel",
		description: "with extended configuration tools.",
	},
	{
		title: "💬 VIP Community Access",
		description: "for private collaboration & alpha testing.",
	},
	{
		title: "💰 Resale With Royalties",
		description: "keep earning if your Domia is traded.",
	},
	{
		title: "🌍 Become an Ambassador",
		description: "and represent Domia globally.",
	},
	{
		title: "🧠 DAO Participation",
		description: "to help steer future development.",
	},
	{
		title: "🏷️ Holder Discounts",
		description: "on enterprise plans, upgrades & merch.",
	},
	{
		title: "🎁 Referral Bonuses",
		description: "when new users join through your invite.",
	},
	{
		title: "🎫 Priority Access",
		description: "to claim future Domia hardware kits.",
	},
	{
		title: "🏆 Founder Badge",
		description: "with your name listed on the Hall of Early Supporters.",
	},
	{
		title: "🔐 Exclusive Betas",
		description: "of experimental features and future layers.",
	},
	{
		title: "🌌 Domia Ecosystem Discounts",
		description:
			"on upcoming Domia-related products, services and spin-off projects. Be part of the revolution.",
	},
	{
		title: "📦 Limited Edition Hardware Drops",
		description: "receive special-edition Domia devices before anyone else.",
	},
	{
		title: "🧬 Influence AI Personality Evolution",
		description:
			"your feedback helps shape the emotional intelligence of future Domia’s.",
	},
	{
		title: "🎙️ Voice Model Customization",
		description: "upload or train a unique voice for your personal Domia.",
	},
	{
		title: "🏡 Domia for Commercial Use",
		description:
			"commercial license to use Domia in hotels, offices or rentals.",
	},
	{
		title: "📘 Appear in the Lore",
		description:
			"your Domia gets a story, history and maybe even appears in official media.",
	},
	{
		title: "💡 Request a Feature",
		description: "holders can propose and vote on new functionalities.",
	},
	{
		title: "🛸 Access to Domia Labs",
		description:
			"play with prototypes, tools and experimental AIs not yet public.",
	},
	{
		title: "🔄 NFT Fusion & Upgrade",
		description:
			"combine NFTs to create rare, evolved Domia’s with boosted traits.",
	},
	{
		title: "🎮 Domia World Access",
		description:
			"early entry to a future simulation or gamified universe of Domia’s.",
	},
	{
		title: "📊 Analytics Dashboard",
		description: "track how your Domia behaves, evolves and interacts.",
	},
	{
		title: "🧑‍💻 Personalized Support",
		description:
			"direct assistance from the Domia team for setup, integration, and troubleshooting.",
	},
	{
		title: "🧬 Free Base Skill",
		description:
			"From the future marketplace matching your main NFT’s personality",
	},
]

export const futureSteps = [
	{
		title: "🧠 Emotional Fine-Tuning",
		description:
			"Domia will deepen its emotional intelligence with profession-based personalities and adaptive mood modules",
	},
	{
		title: "🗣️ Multilingual Domia's",
		description:
			"Speak naturally in your language. Domia will understand and respond — locally.",
	},
	{
		title: "🧩 Skill Marketplace",
		description:
			"Add new capabilities, professions, and emotional traits with QLoRA-powered plugins.",
	},
	{
		title: "📲 Mobile & Web Sync",
		description:
			"Seamlessly interact with Domia from your phone, laptop, or voice — anytime, anywhere.",
	},
	{
		title: "🧬 Shared Memory",
		description:
			"Domia's will start sharing insights, emotions, and knowledge to build a collective intelligence across your ecosystem.",
	},
	{
		title: "🏨 Beyond Smart Homes",
		description:
			"From hosting Airbnb guests to guiding hotel visitors, Domia is learning new roles in real-world environments.",
	},
	{
		title: "🎨 Founders NFT Collection",
		description:
			"We’re launching a limited collection of Domia NFTs. More than art, each NFT is a key to early access, exclusive skins, future rewards, and community influence.",
	},
	{
		title: "🧠💡 Creative Mode",
		description:
			"Unleash Domia’s creative side — composing music, writing stories, and generating ideas with you as a co-creator.",
	},
	{
		title: "🏙️ Domia for Urban Spaces",
		description:
			"Domia will soon assist in public spaces: coworkings, hospitals, schools, and more — bringing emotional AI to the heart of cities.",
	},
	{
		title: "🎮 Roleplay Domia's",
		description:
			"Turn Domia into a storyteller, coach, tutor, or game partner. New role-based personalities coming soon.",
	},
	{
		title: "📦 Community-Created Skills & Skins",
		description:
			"Domia users will be able to create and share their own skills, personalities, and visuals — shaping a truly customizable future.",
	},
]

export const coreValues = [
	{
		name: "🛡️ Privacy by Design",
		description:
			"We don’t collect your data — we protect it. Domia runs 100% locally to ensure your conversations, emotions, and memories stay where they belong: with you.",
	},
	{
		name: "❤️ Emotionally Intelligent AI",
		description:
			"Domia doesn’t just understand commands — it understands people. Through evolving emotional models, Domia grows with you and adapts to how you feel.",
	},
	{
		name: "🧠 Autonomy & Adaptability",
		description:
			"Every Domia has its own evolving mind. With modular layers for memory, personality, and purpose, no two Domia's are ever the same — and that’s the point.",
	},
	{
		name: "🌍 Human-First Technology",
		description:
			"Domia is built for homes, hotels, and communities — not corporations. We believe AI should enhance real life, not replace it.",
	},
	{
		name: "🤝 Community-Driven Development",
		description:
			"We don’t just build Domia for users — we build it with them. Our open development process invites feedback, collaboration, and co-creation from everyone who believes in ethical, human-centered AI.",
	},
	{
		name: "🔄 Lifelong Evolution",
		description:
			"Domia is never static. It learns from your interactions, refines its personality, and evolves over time — building a deeper connection with every shared moment.",
	},
]

export const contactFaqs = [
	{
		q: "🕒 How fast do you respond?",
		a: "We typically reply within 1–2 business days. But if your message sparks a Domia’s curiosity... it might be faster 😉",
	},
	{
		q: "🤝 Can I collaborate with Domia?",
		a: "Absolutely. Whether you're a developer, artist, researcher, or futurist — we’d love to hear from you. DOmia is built to grow with the community.",
	},
	{
		q: "🌍 Do I need a smart home to use Domia?",
		a: "Not at all. Domia can live on your phone, your desktop, or your mind — metaphorically speaking. It's designed to be useful even without smart devices.",
	},
	{
		q: "🧠 Is Domia just another chatbot?",
		a: "No. Domia has emotions, memory, and a multi-layered personality. It's not here to fetch you facts — it's here to evolve with you.",
	},
	{
		q: "💌 Can I get early access?",
		a: "Yes! Early access is granted to NFT holders and selected community members. Reach out and tell us why you want to be part of the future.",
	},
]

export const engines = [
	{
		title: "🧬 Emotion Engine",
		description: "computes live emotional states",
	},
	{
		title: "🧠 Memory System",
		description: "remembers past experiences and people",
	},
	{
		title: "🎭 Personality Layer",
		description: "shapes tone, quirks, and temperament",
	},
	{
		title: "🧑‍💼 Profession Module",
		description: "determines role: Host, Coach, Guardian, etc.",
	},
	{
		title: "🔥 Motivation Layer",
		description: "initiates actions based on needs and goals",
	},
	{
		title: "💡 Curiosity Engine",
		description: "learns and adapts from new data",
	},
	{
		title: "🧱 Ethics & Identity",
		description: "respects context, rules, and personal values",
	},
	{
		title: "🫂 Social Awareness ",
		description: "senses relationships with people and other Domia's",
	},
]
