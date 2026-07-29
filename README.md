# Silver Lake Shorts

Self-contained static website for Silver Lake Shorts. The project preserves the original site content, photos, logos, sponsor marks, and nine public pages while removing the original host-specific navigation and email-protection dependency.

## Pages

- `index.html` — home
- `events.html`, `fellowships.html`, `newsletter.html`, `restorations.html`
- `team.html`, `sponsors.html`, `donate.html`, `submit.html`

## Local preview

On macOS, from this directory run:

```sh
ruby -run -ehttpd . -p4173
```

Then visit `http://localhost:4173`.

## Deployment

This is a plain static site: publish the repository root with GitHub Pages. No build step or server runtime is required.

