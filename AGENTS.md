# Working on this repo

Personal portfolio site for Pablo Flores. Astro, static output, deployed to
GitHub Pages. See `README.md` for architecture and setup.

## Content rules — these are hard requirements

- **Never name a client.** Case studies describe the client generically via the
  `clientDescriptor` frontmatter field ("a healthcare data company").
- **Never invent metrics, projects or experience.** Only facts Pablo has
  supplied belong in `src/content/case-studies/`. Where context is missing,
  leave a `> **TODO:**` blockquote instead of writing something plausible.
- **Never add a phone number** anywhere in the repo.
- Placeholders are written as `TODO_SCREAMING_SNAKE` in `src/data/site.ts` and
  render as a visible chip. `npm run check:todo` must report zero.

## Conventions

- All links, skills and certifications live in `src/data/site.ts`. Do not
  hard-code them into components.
- Styling is plain CSS. Colours, spacing and type come from the custom
  properties in `src/styles/tokens.css`; do not introduce hard-coded colours.
- Dark mode resolves as: `prefers-color-scheme` by default, overridden by
  `data-theme` on `<html>` when the toggle has been used. Any new colour needs a
  value in all three blocks of `tokens.css`.
- No UI framework, no animation library, no webfonts. The site ships almost no
  JavaScript and the Lighthouse scores depend on keeping it that way.
  Third-party badge snippets get inlined as components with their webfont
  imports stripped — see `src/components/ToptalBadge.astro` for the pattern.
- Badge artwork is self-hosted in `public/images/badges/` at 320x320 and lazy
  loaded. Never hot-link a badge from images.credly.com or any other CDN: it
  adds a third-party request, and the Lighthouse scores depend on there being
  none.
- Architecture diagrams are **inline SVG** in `src/diagrams/`, drawn with the
  primitives in `src/styles/diagram.css` (`.d-box`, `.d-edge`, `.d-title`, …)
  so they follow the theme. Never add a diagram as PNG or JPG: a raster diagram
  keeps a fixed background and reads as a bright slab in dark mode. Each SVG is
  `aria-hidden`; the `alt` string in the case study frontmatter is what a screen
  reader receives, so it must describe the architecture in prose.
- Adding a case study means adding a Markdown file — never a new route.

## Before pushing

```bash
npm run check      # TypeScript + Astro diagnostics, must be 0 errors
npm run build      # must succeed
npm run check:todo # must report zero placeholders
```

Pushing to `main` deploys. There is no staging environment, so a broken build
on `main` is a broken public site.

## Dev server

```
astro dev --background
```

Manage it with `astro dev stop`, `astro dev status`, `astro dev logs`.

## Astro documentation

- [Content collections](https://docs.astro.build/en/guides/content-collections/)
- [Routing](https://docs.astro.build/en/guides/routing/)
- [Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Deploy to GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)
