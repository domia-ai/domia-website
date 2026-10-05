# Contributing to domia-website

Thanks for wanting to help. This repository is the public website of Domia. Fixes to wording, translations, accessibility, layout and the interactive explainers are all welcome.

The rules of the codebase and of the content are in [`AGENTS.md`](AGENTS.md). They apply to people and to coding agents alike; read them before a first change — the content rules in particular.

## Set up

Node 24.

```bash
npm install
cp .env.example .env.local   # NEXT_PUBLIC_VIDEO_HOST is required; the mail variables only for the contact form
npm run dev
```

## Make a change

1. Open an issue first for anything larger than a fix, so the direction is agreed before the work.
2. Branch from `main`.
3. Keep the change focused. One concern per pull request.
4. Copy goes in `messages/en.json` and `messages/es.json`, both, with the same keys.
5. Verify it:
   - `npm run validate` — lint, format, production build
   - the page in both languages, at phone and desktop width
   - sound and video played, if you touched them

## Commit messages

Follow [`COMMITS.md`](COMMITS.md): `<emoji> <scope>: <short narrative> — <optional phrase>`, present tense.

## Pull requests

The template asks for three things: what changed and why, how you verified it (with screenshots in both languages for visible changes), and the rule checklist.

## Who decides what

- The maintainer reviews and merges every pull request.
- What the site says about the product, its structure and its tone are the maintainer's call. Proposals are welcome as issues.

## Contributions made with AI tools

Welcome, and held to exactly the same bar. The person opening the pull request is responsible for it: they have read the diff, they looked at the result, and the description says what was actually checked. Do not add tool attribution or `Co-Authored-By` lines for an AI tool.

## Reporting problems

- Something wrong or unclear on the site, or an idea: the issue forms.
- Security problems: never in a public issue — see [`SECURITY.md`](SECURITY.md).

## License

By contributing you agree that your contribution is licensed under the Apache License 2.0, the license of this repository.
