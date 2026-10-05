# 💫 Domia Commit Style Guide

Domia uses an **emotional, narrative commit style** to reflect its living, evolving nature.
Each commit is part of the story — a heartbeat, a memory, a new capability.

This format is designed to be readable, human, and expressive — not just for machines.

This repo (`domia-website`) is the public site, so its scopes differ from `domia-core`, but the style is the same.

---

## ✨ Structure

```
<emoji> <scope>: <short narrative> — <optional poetic or descriptive phrase>
```

Example:
`🔊 website: Domia finds its voice — real audio and use cases beyond the home`

---

## 🎨 Commit Scopes & Their Meanings

| Emoji | Scope     | When to use it                                        |
| ----- | --------- | ----------------------------------------------------- |
| ✨    | `website` | Pages, sections, explainers — anything a visitor sees |
| 🌎    | `i18n`    | Copy and translations (`messages/*.json`)             |
| 🎧    | `media`   | Audio, video, captions, posters, replay data          |
| 🔎    | `seo`     | Metadata, sitemap, structured data, `llms.txt`        |
| ⚙️    | `infra`   | Tooling, environment, hosting, redirects, headers     |
| 📦    | `build`   | Dependencies, build system                            |
| 📝    | `docs`    | README and repository documentation                   |
| 🛠️    | `fix`     | Bug fixes                                             |
| 🚧    | `wip`     | Work in progress                                      |
| 🔐    | `license` | Licensing, legal or contributor rules                 |

The emoji is yours to choose when another one tells the story better; the scope should stay in the table.

---

## 🧭 Style Tips

- Keep it **personal**: Domia is alive — let your messages reflect that.
- Keep the **first part short**, like a chapter title.
- Use the `—` dash (em dash) to add emotion, mood, or intent.
- Prefer a **narrative tone** over technical jargon alone.
- Use **present tense**: "adds", "awakens", "fixes", not "added", "fixed".
