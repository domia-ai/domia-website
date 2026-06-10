import type { ReactElement } from "react"
import Link from "next/link"

import {
	TypographyH2,
	TypographyLarge,
	TypographyP,
} from "@/components/ui/typography"

export type BlogPost = {
	slug: string
	title: string
	description: string
	date: string
	readingTime: string
	keywords: string[]
	Body: () => ReactElement
}

const A = ({ href, children }: { href: string; children: string }) => (
	<Link href={href} className="text-primary underline-offset-4 hover:underline">
		{children}
	</Link>
)

export const posts: BlogPost[] = [
	{
		slug: "what-is-local-speech-to-speech-ai",
		title: "What is local speech-to-speech (S2S) AI?",
		description:
			"Speech-to-speech AI listens, thinks, and talks back. Here's what makes it 'local' — and why running the whole pipeline on your own hardware changes everything about privacy and ownership.",
		date: "2026-06-03",
		readingTime: "5 min read",
		keywords: [
			"local AI",
			"speech to speech AI",
			"on-device voice AI",
			"local LLM",
			"private voice assistant",
		],
		Body: () => (
			<>
				<TypographyLarge>
					“Speech-to-speech” (S2S) AI is the full loop of a spoken conversation:
					you talk, the system understands you, decides what to say, and replies
					out loud. “Local” means every step of that loop runs on hardware you
					own — no audio is streamed to someone else’s servers.
				</TypographyLarge>

				<TypographyH2>The four stages of the loop</TypographyH2>
				<TypographyP>
					A local S2S system is really a pipeline of on-device models:
				</TypographyP>
				<ul className="list-inside list-disc space-y-1">
					<li>
						<strong>Wake word + voice-activity detection</strong> — a tiny model
						listens for its name and figures out when you start and stop
						talking.
					</li>
					<li>
						<strong>Speech-to-text (STT)</strong> — transcribes your words with
						a streaming on-device model.
					</li>
					<li>
						<strong>A language model (LLM)</strong> — decides what to say. Domia
						runs this locally, and the model is swappable — pick one that fits
						your hardware. It never leaves your network.
					</li>
					<li>
						<strong>Text-to-speech (TTS)</strong> — speaks the reply in a voice
						you choose, streaming it sentence by sentence so it starts talking
						back quickly.
					</li>
				</ul>

				<TypographyH2>Why “local” matters</TypographyH2>
				<TypographyP>
					Cloud voice assistants send your audio to a datacenter, transcribe it
					there, and bill you for an account. A local S2S system keeps the
					audio, the transcript, and the memory of the conversation on your own
					machine. That means real privacy (nothing to leak), no subscription or
					API keys, low latency on a local network, and full ownership — you can
					change the voice, the model, and the personality whenever you want.
				</TypographyP>

				<TypographyH2>How Domia does it</TypographyH2>
				<TypographyP>
					Domia is a network of local voice companions. A thin device (like a
					Raspberry Pi) can handle just the microphone and playback and borrow a
					nearby hub’s compute for the heavy stages — yet the reply still comes
					back in that room’s own voice and personality. See the{" "}
					<A href="/technology">architecture</A> for the full picture, or read{" "}
					<A href="/blog/private-voice-assistant-raspberry-pi">
						how to run it on a Raspberry Pi
					</A>
					.
				</TypographyP>
			</>
		),
	},
	{
		slug: "private-voice-assistant-raspberry-pi",
		title: "Run a private voice assistant on a Raspberry Pi (with a local hub)",
		description:
			"A Raspberry Pi can't run a big language model — but it makes a perfect room node. Here's the thin-node + hub model that puts a private, offline voice assistant in every room.",
		date: "2026-06-03",
		readingTime: "6 min read",
		keywords: [
			"Raspberry Pi AI",
			"self-hosted voice assistant",
			"offline AI assistant",
			"private voice assistant",
			"local voice AI",
		],
		Body: () => (
			<>
				<TypographyLarge>
					People often ask whether a Raspberry Pi can run a local voice
					assistant. The honest answer: a Pi can’t comfortably run a full
					language model — but it makes an excellent <em>room node</em>, and
					that’s exactly the role Domia gives it.
				</TypographyLarge>

				<TypographyH2>Thin nodes + a hub</TypographyH2>
				<TypographyP>
					Instead of forcing every device to do everything, Domia splits the
					work. A Raspberry Pi-class device handles the microphone, the wake
					word, voice-activity detection, and playback. The expensive stages —
					speech-to-text, the language model, and text-to-speech — are delegated
					over your local network to a stronger device acting as a hub: a Mac
					mini, a NUC, or a modest workstation.
				</TypographyP>
				<TypographyP>
					The hub runs the heavy models once and serves several rooms in
					parallel using inference pools. Crucially, the identity travels with
					each request — so when the hub answers for your kitchen, it answers in
					the kitchen’s voice and personality, not its own.
				</TypographyP>

				<TypographyH2>Nothing is hardcoded</TypographyH2>
				<TypographyP>
					There’s no fixed “server” and “client.” What each device does is just
					configuration in a local database. A single powerful machine can be a
					hub <em>and</em> a room; a Pi can be purely a node. As your setup
					grows, you change config — not code.
				</TypographyP>

				<TypographyH2>Getting started</TypographyH2>
				<TypographyP>
					Domia’s core is source-available and runs on macOS, Linux, and small
					single-board computers. The hub runs a local model server and a few
					model downloads; a room node needs far less. The{" "}
					<A href="/technology">Technology page</A> walks through the setup, and
					everything lives on <A href="/contact">GitHub</A>. Curious about the
					privacy trade-offs versus a cloud assistant? See{" "}
					<A href="/blog/local-voice-ai-vs-cloud-assistants">
						local voice AI vs cloud assistants
					</A>
					.
				</TypographyP>
			</>
		),
	},
	{
		slug: "local-voice-ai-vs-cloud-assistants",
		title:
			"Local voice AI vs cloud assistants: privacy, ownership, and latency",
		description:
			"Alexa and Google Home stream your voice to the cloud. A local voice AI keeps it on your hardware. Here's an honest comparison of privacy, ownership, multi-room identity, and what you give up either way.",
		date: "2026-06-03",
		readingTime: "5 min read",
		keywords: [
			"local AI vs cloud",
			"private voice assistant",
			"offline AI assistant",
			"Alexa alternative",
			"local voice AI",
		],
		Body: () => (
			<>
				<TypographyLarge>
					Cloud voice assistants are convenient, but the trade is simple: your
					voice goes to someone else’s servers, and your assistant lives in
					their account. A local voice AI flips that. Here’s an honest look at
					the differences.
				</TypographyLarge>

				<TypographyH2>Privacy</TypographyH2>
				<TypographyP>
					A cloud assistant streams your audio to a datacenter to transcribe and
					answer. A local system does the transcription, the thinking, and the
					speaking on your own hardware — so there’s simply no audio leaving
					your home to leak, subpoena, or mine. For families, clinics, and
					hotels, that’s often the whole point.
				</TypographyP>

				<TypographyH2>Ownership & lock-in</TypographyH2>
				<TypographyP>
					Cloud assistants tie you to a vendor’s hardware, voices, and account.
					With a local, source-available system you choose the language model,
					the voice, and the personality, and you can change them whenever you
					like. No subscription, no API keys, no walled garden.
				</TypographyP>

				<TypographyH2>Identity per room</TypographyH2>
				<TypographyP>
					Cloud ecosystems give every speaker the same shared voice. Domia gives
					each room its own personality, voice, emotion, and memory — your
					kitchen and your bedroom can feel like genuinely different companions,
					even when they share one hub.
				</TypographyP>

				<TypographyH2>The honest trade-offs</TypographyH2>
				<TypographyP>
					Local isn’t free of cost: you provide the hardware (a hub plus thin
					room nodes), and you do a little setup. Smart-home control through
					skills is still on the roadmap for Domia, where cloud assistants
					already have broad device support. But for privacy, ownership, and
					per-room identity, local wins clearly. See the side-by-side on the{" "}
					<A href="/">home page</A> or dig into the{" "}
					<A href="/technology">architecture</A>.
				</TypographyP>
			</>
		),
	},
]

export const getPost = (slug: string): BlogPost | undefined =>
	posts.find((post) => post.slug === slug)
