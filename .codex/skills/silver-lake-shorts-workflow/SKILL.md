---
name: silver-lake-shorts-workflow
description: Guide beginner-friendly changes to the Silver Lake Shorts static website and publish approved work automatically. Use when editing or updating a page, text, image, navigation link, sponsor asset, site styling, or site behavior in this repository; when asked to update the website, push and commit, publish, go live, or push to the live website; and when previewing or checking a contribution.
---

# Silver Lake Shorts Workflow

Keep every contribution small, understandable, and easy to review. Explain actions in plain language and preserve existing design and content unless the user asks for a redesign.

## Find the right file

- Use `index.html` for the home page.
- Use the matching root HTML file for each section: `events.html`, `fellowships.html`, `newsletter.html`, `restorations.html`, `team.html`, `sponsors.html`, `donate.html`, or `submit.html`.
- Use `images/` for photos, logos, and sponsor marks; keep existing filenames when replacing an asset.
- Use `css/slsdev.webflow.shared.2e75f2317.min.css` only for site-wide styling changes.
- Keep navigation links as relative `.html` links so the static site works on GitHub Pages.

## Update sponsors everywhere

Treat the sponsor roster as site-wide content, not a one-page change.

1. Update the correct Gold, Silver, or Bronze section in `sponsors.html`.
2. For Gold sponsors and the sponsor carousel, update the shared roster in `js/sponsor-roster.js`. It updates every gold grid and all three carousel loops on every page at runtime.
3. Keep `sponsors.html` as the no-JavaScript fallback and update its Gold grid to match the shared roster.
4. Use the shared `.new-gold-partner-card img` sizing rule for Gold logos. It gives every card the Sony Pictures Animation-sized frame (`70%` width × `60%` height with `object-fit: contain`); do not add one-off size rules for individual Gold logos.
5. Treat Content for Change as permanently retired. Never restore `images/asset-202002.svg` to an HTML page or carousel.
6. Confirm the sponsor’s name, tier, asset filename, accessible alt text, and sizing before handoff.
7. State explicitly which pages and repeated placements were updated.

## Make one change at a time

1. Restate the requested change in one plain sentence.
2. Inspect the target page and only the assets it uses.
3. Edit the smallest practical set of files.
4. Do not remove images, pages, or sponsor content unless the user explicitly requests it.
5. For new links, use descriptive visible text and verify the destination.

## Preview and check

Run a local preview from the repository root:

```sh
ruby -run -ehttpd . -p4173
```

Open `http://127.0.0.1:4173/`, visit the changed page, and check that its primary heading, images, and navigation appear. Before handoff, check for broken local asset paths and unintended host-root navigation links:

```sh
rg -n 'href="/(events|fellowships|newsletter|restorations|team|sponsors|donate|submit|)"|href="/"' *.html
```

An empty result is expected. If the preview server is still needed by the user, leave it running; otherwise stop it after checking.

## Publish website updates by default

Treat an implemented website change as ready to publish unless the user specifically asks to keep it local, create a draft, only preview it, or not commit/push it.

1. Validate the changed page and run `git diff --check`.
2. Review `git status` and stage only the files that belong to the requested change.
3. Commit with a short, user-facing message.
4. Push the commit to `origin/main`.
5. State that Cloudflare Pages deploys `main` automatically and report any GitHub or deployment limitation.

Do not create a commit or push for a question, diagnosis, review-only request, or a task that made no website changes. Respect any explicit request to defer publishing and any system-required approval before an external action.

## Hand off a contribution

1. Summarize what changed and name the affected pages/assets.
2. Show the user what was checked and any limitations.
3. State the commit and GitHub push that were made, plus the Cloudflare deployment status when available.
4. If GitHub authentication is missing, stop and tell the user how to authenticate; never request or expose a personal access token in chat.

## Example requests

- “Update the next screening date on the Events page.”
- “Replace the sponsor logo on the home page.”
- “Change the Donate button text and show me a preview.”
- “Review my changes and prepare them for GitHub.”
