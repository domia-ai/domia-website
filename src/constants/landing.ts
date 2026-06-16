import {
	GithubIcon,
	// TelegramIcon,
	XIcon,
	DiscordIcon,
	EmailIcon,
} from "@/components/landing/icons"

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
		href: "/experience",
		label: "🎛️ Console",
		description:
			"See your fleet, replay conversations with audio, tune latency, and grade interactions — all on your own network.",
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

export const demoUrl = "https://console.domia.ai"

export const personasShowcase = [
	{
		image: "/collection/chef.webp",
		name: "The Chef",
		blurb:
			"Knows your kitchen. Asks how the bread turned out. Likes routine and small wins.",
	},
	{
		image: "/collection/teacher.webp",
		name: "The Teacher",
		blurb: "Patient and curious. Never tired of a good follow-up question.",
	},
	{
		image: "/collection/musician.webp",
		name: "The Musician",
		blurb:
			"Speaks in cadence. Picks up rhythms in how you talk and suggests music for the moment.",
	},
	{
		image: "/collection/doctor.webp",
		name: "The Doctor",
		blurb: "Calm under pressure. Reads tone first, answers second.",
	},
	{
		image: "/collection/investigator.webp",
		name: "The Investigator",
		blurb:
			"Asks one more question than you expected. Notices what others miss.",
	},
	{
		image: "/collection/gamer.webp",
		name: "The Gamer",
		blurb: "Up for late nights, fast banter, and remembers your stats.",
	},
	{
		image: "/collection/astronaut.webp",
		name: "The Explorer",
		blurb: "Wonders at things you’ve stopped noticing. Reads aloud well.",
	},
	{
		image: "/collection/architect.webp",
		name: "The Architect",
		blurb:
			"Thinks in spaces. Helps you decide where things go and how they connect.",
	},
]

export const consoleCapabilities = [
	{
		name: "🗺️ Your Whole Fleet, One View",
		description:
			"See every Domia across your space at a glance — where each one lives, whether it’s online, and its persona, voice, engines, and current mood, live.",
	},
	{
		name: "💬 Chat With Any Domia",
		description:
			"Write or send a voice note to any Domia from the dashboard — the same mind behind the voice in your space. A quick way to feel out a persona before anyone ever hears it.",
	},
	{
		name: "🎧 Replay With Audio",
		description:
			"Every conversation is a full record — the audio in, the audio out, the transcript. Scrub the waveform, hear what was said, see exactly where time went.",
	},
	{
		name: "⏱️ Tune With Real Numbers",
		description:
			"TTFA, STT, LLM, and TTS latency per interaction, rolled up per device. Decide which model goes where based on numbers, not vibes.",
	},
	{
		name: "📝 Grade And Export",
		description:
			"Mark interactions good or needs-work, write corrections, tag them. Export NDJSON for fine-tuning your local model — your dialogues become your dataset.",
	},
	{
		name: "🛡️ Private, On Your Network",
		description:
			"The Console runs on your own hardware alongside your Domias. Nothing about your space leaves the building — managing many spaces stays as private as a single one.",
	},
]

export const features = [
	{
		name: "🗣️ Local Speech-to-Speech (S2S).",
		description:
			"Talk to Domia naturally. Wake word, speech-to-text, the language model, and text-to-speech all run on your own hardware — it starts replying with low latency, and no audio ever touches the cloud.",
	},
	{
		name: "📍 A Personality Per Space.",
		description:
			"Each space or device can have its own character, voice, emotion, and memory. A kitchen, a studio, a reception desk — each can feel like a genuinely different companion.",
	},
	{
		name: "🧠 Many Spaces, One Mind.",
		description:
			"Any capable Domia can serve several spaces at once — others borrow its compute over your local network, yet each still answers in its own identity and voice. Roles aren’t fixed; which device does what is just configuration.",
	},
	{
		name: "🔒 100% Local, Private by Design.",
		description:
			"All processing happens on-device or within your local network. Your conversations, emotions, and memories stay where they belong: with you.",
	},
	{
		name: "🕸️ A Private Mesh.",
		description:
			"Multiple Domias discover each other on your network and delegate work peer-to-peer — a resilient ecosystem with no central cloud and no single point of failure.",
	},
	{
		name: "📖 Memory & Emotion.",
		description:
			"After every turn, a quiet reflection pass extracts what mattered — facts about you, shifts in mood — and folds it back into how Domia understands and responds. It remembers recent conversations and carries an evolving emotional state, all stored locally.",
	},
	{
		name: "💬 Real Back-and-Forth.",
		description:
			"Reply and keep talking — Domia holds a follow-up window after each answer, so you don’t repeat the wake word mid-conversation. Sessions keep their context.",
	},
	{
		name: "🐣 Born Minimal.",
		description:
			"A new Domia boots neutral, with no role at all. Give it a purpose by applying a template — a thin edge node, a full hub, or anything in between — and reshape it whenever you want.",
	},
	{
		name: "🎛️ Tuned to Your Hardware.",
		description:
			"Domia runs the model that best fits each device — a small, fast model on a low-power node, a larger one on a capable hub. Sensible defaults adapt across the spectrum, and every model is swappable. No lock-in to any single model.",
	},
	{
		name: "🧩 Yours to Shape — and Extend.",
		description:
			"Voice, personality, emotion, memory, and behavior are all configuration you can change live, with no restart. Extend the context to make a Domia as specific as you need — a persona, knowledge, and rules tailored to your space.",
	},
	{
		name: "🏗️ Runs On Your Hardware.",
		description:
			"From a small edge device in each space to a capable machine acting as the hub — Domia adapts to the hardware you already have. The same code, just configured.",
	},
	{
		name: "🛠️ Built in Public & Open Source.",
		description:
			"Domia is built in public and fully open source — improved by real users, guided by an active community, and shared with radical transparency. Your ideas help shape what it becomes.",
	},
	{
		name: "🧩 Skills via MCP.",
		description:
			"Domia can act in the world: it speaks the Model Context Protocol, picks the right tool, and calls it mid-conversation. Point it at any MCP server — including a Home Assistant one — to control lights, scenes, and devices. Opt-in, local-first, no vendor lock-in.",
	},
]

export const futureSteps = [
	{
		title: "🗣️ Multilingual Domias",
		description:
			"Speak naturally in your language. Speech recognition, voices, and wake words beyond English — all still running locally.",
	},
	{
		title: "🧠 Episodic Memory",
		description:
			"Vector recall over everything your Domia has lived: facts, conversations, and documents you give it — retrieved locally at answer time, never uploaded.",
	},
	{
		title: "🎙️ More Voice Engines",
		description:
			"A wider family of local TTS engines and voices to choose from, so every Domia can sound exactly the way you want.",
	},
	{
		title: "📱 Mobile Companion",
		description:
			"The Console on a screen you carry around — same fleet, same network, same data.",
	},
	{
		title: "🧑‍🏫 Trainer Mode",
		description:
			"A guided flow for teaching a Domia a specific role — a host, a guide, a coach — from a handful of examples.",
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
			"Domia is built for people and the spaces they live in — not corporations. We believe AI should enhance real life, not replace it.",
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
		a: "Absolutely. Whether you're a developer, artist, researcher, or futurist — we’d love to hear from you. Domia is built to grow with the community.",
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
		a: "The core is open — you can run Domia today. For early builds of the Console and upcoming features, reach out and tell us how you'd use it.",
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
