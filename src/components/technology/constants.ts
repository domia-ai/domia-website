import type { EngineStageId } from "./types"

export const ENGINE_FAMILIES: Record<EngineStageId, string[]> = {
	wakeWord: ["sherpa-onnx keyword spotting"],
	stt: [
		"Whisper",
		"Moonshine",
		"Zipformer",
		"Parakeet",
		"Nemotron",
		"NeMo-Speech",
		"OpenAI-compatible server",
	],
	turn: ["Silero VAD", "Smart Turn"],
	llm: ["Ollama", "llama.cpp", "OpenAI-compatible server"],
	tts: ["Kokoro", "Pocket", "VITS", "Kitten", "Matcha", "Supertonic"],
	memory: ["SQLite", "local embeddings"],
}

export const WORKS_WITH = [
	"Home Assistant",
	"Music Assistant",
	"MCP servers",
	"ESPHome",
	"Wyoming",
	"LiveKit",
]
