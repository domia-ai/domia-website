# Domia — Website

The public website of **Domia**, a private network of local voice AIs with a personality, voice, and memory per device. The whole speech-to-speech loop — wake word, voice-activity detection, speech-to-text, a local language model, and text-to-speech — runs on your own hardware. No cloud audio, no accounts, no telemetry.

This repo is just the website (the thing you see at [domia.ai](https://domia.ai)). The product lives in separate repos:

- **[domia-core](https://github.com/domia-ai/domia-core)** — the voice AI itself: the S2S pipeline, the peer-to-peer mesh, capability delegation, the persona/emotion/memory engines, and MCP skills.
- **[domia-app](https://github.com/domia-ai/domia-app)** — the Domia Console: a local web app to manage a fleet (audio replay, per-stage latency, grading + export, config templates). Read-only demo at [console.domia.ai](https://console.domia.ai).

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack) + [React 19](https://react.dev)
- [Tailwind CSS 4](https://tailwindcss.com) + shadcn/ui (Base UI)
- [next-intl](https://next-intl.dev) — English and Spanish, every word of copy in `messages/`
- [TanStack Form](https://tanstack.com/form) + [Zod](https://zod.dev) for the contact form
- TypeScript throughout
- Native `sitemap.ts` / `robots.ts`, JSON-LD + `llms.txt` for SEO/AEO
- Light and dark themes (`next-themes`); Vercel Analytics and Speed Insights on the site itself

## Getting started

```bash
npm install
cp .env.example .env.local   # NEXT_PUBLIC_VIDEO_HOST is required; mail variables only for the contact form
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command                         | What it does               |
| ------------------------------- | -------------------------- |
| `npm run dev`                   | Dev server (Turbopack)     |
| `npm run build`                 | Production build           |
| `npm run start`                 | Serve the production build |
| `npm run lint`                  | ESLint                     |
| `npm run format` / `format:fix` | Prettier check / write     |
| `npm run validate`              | lint + format + build      |

## Layout

```
messages/             # en.json, es.json — all copy
src/
  app/[locale]/       # pages: /, /technology, /cases, /console, /run, /about, /contact, /privacy
  app/                # sitemap.ts, robots.ts, globals.css (design tokens)
  components/<area>/  # one folder per page or section (components, constants.ts, types/, index.ts)
  components/explainers/  # interactive explainers
  components/ui/      # shadcn primitives
  data/               # JSON behind the explainers and replays (real turns and timings)
  i18n/               # next-intl routing
  actions/, schemas/  # contact form (server action + zod)
public/               # posters, captions, turn audio, console screenshots, og-image, llms.txt
```

Copy lives in `messages/en.json` and `messages/es.json` — edit both. Videos are served from the host in `NEXT_PUBLIC_VIDEO_HOST`, not from this repository.

## Contributing

Read [CONTRIBUTING.md](./CONTRIBUTING.md) for how changes are made and checked. The rules of the codebase and of the content — for people and for coding agents — are in [AGENTS.md](./AGENTS.md); commits follow [COMMITS.md](./COMMITS.md). Security reports go through [SECURITY.md](./SECURITY.md).

## Links

- Website: [domia.ai](https://domia.ai)
- Console demo: [console.domia.ai](https://console.domia.ai)
- GitHub: [github.com/domia-ai](https://github.com/domia-ai)
- X: [@domia_ai](https://x.com/domia_ai)
- Discord: [join](https://discord.gg/Sx4ACEMSyv)

## License

Open source under the [Apache License 2.0](./LICENSE). Read it, run it, fork it, and contribute — Domia is built in public.
