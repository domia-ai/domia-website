# AGENTS.md — domia-website

Rules and map for any coding agent (and any person) working in this repository. `CLAUDE.md` imports this file; there is no second copy. If a rule here conflicts with what the code does, say so instead of guessing which one is right.

## What this is

Domia is a voice agent that lives entirely on the user's own hardware: you talk to it and it talks back in character, it acts through skills, it remembers, and voice, memory and configuration stay on the device. One device can work alone, serve several rooms as a hub, or be a thin microphone-and-speaker for a stronger one. The product is [`domia-core`](https://github.com/domia-ai/domia-core).

This repository is the **public website** ([domia.ai](https://domia.ai)). It explains what Domia is, shows how a turn works with interactive explainers, and lets people hear real conversations. It is not a control panel: fleet management is the console, [`domia-app`](https://github.com/domia-ai/domia-app).

Next.js 16 (App Router) with React 19, Tailwind CSS 4 and shadcn components, localized in English and Spanish with next-intl. The only server code is the contact form.

## Layout

```
messages/           en.json, es.json — every word of copy on the site
src/
  app/[locale]/     the pages: home, technology, cases, console, run, about, contact, privacy
  app/              robots.ts, sitemap.ts, global-not-found.tsx, globals.css (design tokens)
  components/<area>/  one folder per page or section: components, plus constants.ts and types/index.ts when it has any, and an index.ts barrel
  components/explainers/  interactive explainers (how a turn flows, topologies, skills, memory, …)
  components/ui/    shadcn primitives (style base-nova, on Base UI)
  data/             JSON behind the explainers and replays (real turns, timings, skills)
  i18n/             next-intl routing: en and es, English without a prefix
  constants/        site-wide lists: routes for the nav, footer and sitemap, case and section ids
  lib/, types/, fonts/   shared helpers, shared types, the typeface
  actions/, schemas/, utils/   the contact form (server action, Zod schema, mail)
  proxy.ts          next-intl middleware
public/             posters, captions, turn audio, console screenshots, llms.txt
```

Videos are not in the repository; they are served from the host named by `NEXT_PUBLIC_VIDEO_HOST`. The build fails without that variable. Any URL lets you run and build locally (the films simply will not load); the real host is set in the deployment.

## Commands

| Command              | What it does                                                                                                                            |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`        | dev server on :3000                                                                                                                     |
| `npm run validate`   | lint + Prettier check of `src/**/*.{ts,tsx}` + production build — must be clean before you call anything done                           |
| `npm run format:fix` | apply Prettier to the source; for `messages/*.json`, Markdown and YAML run `npx prettier --write <file>` (the commit hook also does it) |

## Rules

Scope of a change

- **Interface and content work stays in the interface and the content.** Do not touch server logic, `next.config.ts`, environment variables, security headers, redirects or the middleware as part of a design or copy task. If an audit finds something there, write it up as a proposal.
- **Prefer the general fix** over a special case for one page or one screen size.

Functional style

- **Functions and data, never classes.** No `class`, no `this`. Components are functions; stateful helpers (a player, a timer) are factories that return functions closed over their state.
- **Pure by default.** A component renders from its props and its messages; helpers in `lib/` take arguments and return results.
- **Do not mutate what you were given** — props, message objects, data files. Return a new value.
- **`const` always; `let` only for the private state of a closure.** Never build a value by reassigning through branches — write an expression.

Code shape

- **No comments in code.** Names and short components carry the intent.
- **Named types live in the area's `types/index.ts`**; constants in its `constants.ts`; the area's `index.ts` only re-exports. `type`, not `interface`.
- **`components/ui/*` are shadcn primitives.** Add or update them with the shadcn CLI; never hand-edit them. Build with the existing primitives and the tokens in `globals.css` before adding a new one-off style.
- **No dead code and no leftovers** from removed sections.

Copy and languages

- **Every word of copy lives in `messages/en.json` and `messages/es.json`**, with the same keys and placeholders in both. No hardcoded strings in components, and no language branches: a new language is a new file.
- Spanish is written as Spanish, not translated word for word. Domia is feminine in Spanish.
- Explainer and replay content lives in `src/data/*.json`. `fast-path.json`, `skills.json` and `public/data/fast-path.*.json` are generated from the product (their `meta.generator` field says so): they are regenerated in a `domia-core` checkout with `npm run evals -- gen-website-data`, never hand-edited.

## Content rules

These decide what the site may say. They matter more than any style preference.

- **Domia is a voice agent for any place people talk**, not a home gadget. The home is one setting among several (hospitality, attractions and guides, workplaces are all fair ground); never present Domia as home-only, and when a section lists settings the home is not the only one.
- **The site describes what exists.** It is not a roadmap: no "coming soon", no "not built yet", no promises.
- **Everything shown is real.** Audio, transcripts and timings come from real turns of the real pipeline. Nothing is staged or sped up, and numbers are never rounded in Domia's favour.
- **Do not list hardware ranges** ("from a small board to a workstation") and do not name device models as requirements. Domia adapts to the hardware it runs on; describe roles (a thin device, a capable machine, a hub), not a shopping list. A measured latency range taken from real turns is fine.
- **Do not present the supported languages as a feature list.** The site simply works in each language.
- **The model decides** whether a sentence needs a skill or an answer. Explaining that a known command takes a faster path is accurate and welcome; describing Domia as a system that matches commands is not — conversation is the default, commands are a shortcut.
- **No sales tone.** Plain, specific, calm. No superlatives, no urgency, no "team" or "we at Domia" wording.
- **Privacy claims are exact.** Say what stays on the device and only what is true of the code today. Voice, memory and configuration stay local; a skill the user connects talks to the service it controls. When a sentence is absolute ("nothing leaves"), make sure the page also says what a connected skill does.
- Managing a fleet, broadcasting and configuration belong to the console; the website shows them, it does not offer them.

## Common tasks

**Change copy.** Find the text in `messages/en.json` (keys follow the page and section, for example `landing.hero.title`), and edit the same key in `messages/es.json`. A headline usually has a twin under `meta.<page>` (title, description, social text); keep them consistent.

**Add a section to a page.** Components in the page's area folder, ids and lists in its `constants.ts` (or `src/constants/` when several pages use them), text under the page's key in both message files. A new setting or use case needs real material — real turns, real audio — before it goes on the site; open an issue first.

**Add a page.** A folder under `src/app/[locale]/` whose `page.tsx` exports `generateMetadata = localizedMetadata(path, key)`, with a matching `meta.<key>` block in both message files (the key is usually the route name; the home page takes its metadata from the layout). Add the route to `routes` in `src/constants/landing.ts` — that list feeds the nav, the footer (`footerRoutes`) and `sitemap.ts`. Add the structured data other pages use (`components/seo/`). A removed or renamed page needs a redirect, which is a config change — propose it.

## Verifying a change

1. `npm run validate`.
2. Open the page you changed in both languages, at phone width and at desktop width, in the light and the dark theme.
3. For anything with sound or video, play it.
4. Check that links, the sitemap and the redirects still resolve if you added, renamed or removed a page.
5. Report what you ran and what you looked at. If something could not be checked, say that.

## Git

- An agent working in a maintainer's checkout does not commit, push, amend, rebase or tag unless asked in that conversation: it leaves the work in the tree and says what changed. (A contributor working on their own fork commits to their own branch as usual — see `CONTRIBUTING.md`.)
- No destructive commands (`reset --hard`, `checkout --` over someone's changes, force push) without an explicit request.
- No `Co-Authored-By` lines and no tool attribution in commit messages or pull requests.
- Commit messages follow `COMMITS.md`.

## Never

- Commit `.env*` files or video files (`public/video/*.mp4` is ignored on purpose).
- Print or log the mail credentials.
- Copy a pinned dependency version from an example; install the current release.
- Hand-edit shadcn primitives or generated data files.
- Publish a recording of a real person who has not agreed to it.
