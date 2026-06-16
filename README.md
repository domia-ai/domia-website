# Domia — Website

The marketing site for **Domia**, a private network of local voice AIs with a personality, voice, and memory per device. The whole speech-to-speech loop — wake word, voice-activity detection, speech-to-text, a local language model, and text-to-speech — runs on your own hardware. No cloud audio, no accounts, no telemetry.

This repo is just the website (the thing you see at [domia.ai](https://domia.ai)). The product lives in separate repos:

- **[domia-core](https://github.com/domia-ai/domia-core)** — the voice AI itself: the S2S pipeline, the peer-to-peer mesh, capability delegation, the persona/emotion/memory engines, and MCP skills.
- **[domia-app](https://github.com/domia-ai/domia-app)** — the Domia Console: a local web app to manage a fleet (audio replay, per-stage latency, grading + export, config templates). Read-only demo at [console.domia.ai](https://console.domia.ai).

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack) + [React 19](https://react.dev)
- [Tailwind CSS 4](https://tailwindcss.com) + shadcn/ui
- [TanStack Form](https://tanstack.com/form) + [Zod](https://zod.dev) for the contact form
- TypeScript throughout
- `next-sitemap` for sitemap/robots, JSON-LD + `llms.txt` for SEO/AEO

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build (regenerates the sitemap on `postbuild`) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run format` / `format:fix` | Prettier check / write |
| `npm run validate` | lint + format + build |

## Layout

```
src/
  app/            # routes (/, /technology, /experience, /cases, /community, /contact, /blog)
  components/     # landing/, experience/, technology/, cases/, about/, community/, ui/
  constants/      # landing copy + data (single source of truth for sections)
  content/        # blog posts
  schemas/        # zod schemas (contact form)
  actions/        # server actions (contact submit)
public/           # images, og-image, llms.txt, generated sitemap/robots
```

Most copy lives in `src/constants/landing.ts` and the per-section components — edit there.

## Links

- Website: [domia.ai](https://domia.ai)
- Console demo: [console.domia.ai](https://console.domia.ai)
- GitHub: [github.com/domia-ai](https://github.com/domia-ai)
- X: [@domia_ai](https://x.com/domia_ai)
- Discord: [join](https://discord.gg/Sx4ACEMSyv)

## License

Open source under the [Apache License 2.0](./LICENSE). Read it, run it, fork it, and contribute — Domia is built in public.
