## What changed and why

<!-- One or two paragraphs. Link the issue if there is one. -->

## How it was verified

<!-- Add screenshots in both languages for anything visible. -->

- [ ] `npm run validate`
- [ ] Looked at the page in English and in Spanish
- [ ] Looked at phone width and at desktop width
- [ ] Played the audio or video, if touched

## Checklist

- [ ] All copy is in `messages/en.json` and `messages/es.json` with the same keys — no hardcoded strings
- [ ] Follows the content rules in `AGENTS.md`: describes what exists, nothing staged, no hardware ranges, no sales tone, not home-only
- [ ] No hand edits to `components/ui/*` or generated data
- [ ] No change to `next.config.ts`, environment, headers, redirects or middleware — or it is called out above and is the point of the pull request
- [ ] Functional style: no classes, no mutation of props or data
- [ ] No comments in code; types in the area's `types/index.ts`
- [ ] No secrets or video files in the diff
