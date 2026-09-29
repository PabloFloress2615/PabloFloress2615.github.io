# pabloflores.dev — portfolio

Static portfolio site for **Pablo Flores**, Cloud & DevOps Engineer. Built with
Astro, deployed to GitHub Pages by GitHub Actions on every push to `main`.

Live: <https://pabloflores2615.github.io/> *(after the one-time setup below)*

---

## Architecture

| Concern | Choice | Why |
|---|---|---|
| Framework | **Astro 7**, `output: 'static'` | Ships zero JavaScript by default; every page is pre-rendered HTML |
| Content | **Content collections** + Markdown | A new case study is one `.md` file, validated against a schema at build time |
| Styling | **Plain CSS** with custom properties | No build step beyond Astro, no framework to audit or upgrade |
| Fonts | **System font stack** | No webfont request, so no render-blocking round trip and no layout shift |
| Toptal badge | Inlined as a component | The snippet Toptal supplies `@import`s a Typekit webfont; that import is dropped — see `src/components/ToptalBadge.astro` |
| Sitemap | `@astrojs/sitemap` | The only integration in the project |
| Hosting | **GitHub Pages** via `actions/deploy-pages` | No `gh-pages` branch, no deploy key — OIDC only |
| Link checking | **lychee** on pull requests | Verifies the *built* HTML, including in-page anchors |

Total client-side JavaScript: one inline theme script plus a small toggle
handler. Nothing is hydrated.

### Measured results

Lighthouse against `npm run preview`, Chrome headless, mobile and desktop
presets, home page and a case study page:

```
Performance 100 · Accessibility 100 · Best Practices 100 · SEO 100
```

### Project layout

```
astro.config.mjs              site URL, sitemap, trailingSlash
lychee.toml                   link-checker rules and exclusions
CNAME.example                 template for the custom-domain file (not published)
scripts/check-todo.mjs        pre-launch gate for unfilled placeholders
.github/workflows/
  deploy.yml                  build + deploy to Pages on push to main
  links.yml                   broken-link check on PRs, plus a weekly sweep
public/
  robots.txt  favicon.svg  CNAME.example
  images/                     og-default.png, azure-ha-dr.png
    badges/                   certification artwork, 320x320, self-hosted
src/
  content.config.ts           case study collection + schema
  content/case-studies/*.md   one file per case study  <- add new work here
  data/site.ts                name, links, skills, certifications
  layouts/BaseLayout.astro    <head>, header, footer, theme script
  components/                 Seo, Header, Footer, ThemeToggle, Section,
                              cards, ToptalBadge
  pages/
    index.astro               the single-page site
    case-studies/[...slug].astro
    404.astro
  styles/
    tokens.css                colours, type scale, spacing, light/dark
    global.css                reset, layout, components, prose
```

---

## Running it locally

Requires Node 22.12 or newer.

```bash
npm install
npm run dev        # http://localhost:4321, hot reload
```

Other scripts:

```bash
npm run build      # static build into dist/
npm run preview    # serve dist/ exactly as Pages will
npm run check      # TypeScript + Astro diagnostics
npm run check:todo # list unfilled TODO_ placeholders in src/data/site.ts
npm run check:links # lychee over dist/ (needs lychee installed locally)
```

`check:links` needs the lychee binary (`brew install lychee`). It is optional
locally — CI runs it on every pull request regardless.

---

## Adding a case study

1. Copy an existing file in `src/content/case-studies/`. **The filename becomes
   the URL slug**, so `eks-security-hardening.md` publishes at
   `/case-studies/eks-security-hardening/`.
2. Fill in the frontmatter:

   ```yaml
   ---
   title: 'Full title, used as the page <h1>'
   summary: 'One or two sentences. Used on the card and as the meta description.'
   clientDescriptor: 'a healthcare data company'   # generic — never a company name
   order: 5                                        # position in the card grid
   stack:
     - Terraform
     - Amazon EKS
   diagram:                                        # optional
     src: '/images/your-diagram.png'
     alt: 'Describe what the diagram shows, not that it is a diagram.'
     caption: 'Optional caption.'
     width: 1200
     height: 675
   draft: false                                    # true hides it from the build
   ---
   ```

3. Write the body using the five standard headings, in this order:

   ```markdown
   ## Context
   ## Challenge
   ## Decisions & trade-offs
   ## Results
   ## Tech stack
   ```

4. `npm run build`. The schema in `src/content.config.ts` fails the build if a
   required field is missing or the wrong type. No route, navigation or index
   page needs editing — the card grid and the sitemap pick it up automatically.

### Content rules

These are deliberate and enforced by review, not by the schema:

- **No client names.** Use `clientDescriptor` for a generic industry description.
- **No invented metrics.** Every number must be one you can defend in an
  interview. Where context is missing, leave a `> **TODO:**` blockquote rather
  than filling the gap with plausible-sounding detail. Two such markers are in
  the content today.
- **No phone number**, anywhere in the repo.

---

## How the deploy works

`.github/workflows/deploy.yml` runs on every push to `main` (and on demand via
*Actions → Deploy to GitHub Pages → Run workflow*):

1. `withastro/action` installs dependencies, runs `astro build`, and uploads
   `dist/` as a Pages artifact.
2. `actions/deploy-pages` publishes that artifact.

Authentication is OIDC (`id-token: write`) — there is no token or deploy key to
rotate. The `concurrency: pages` group with `cancel-in-progress: false` means two
pushes in quick succession deploy in order rather than cancelling each other
mid-publish.

### Link checking

`.github/workflows/links.yml` builds the site and runs lychee over the generated
HTML on every pull request, failing the PR on a dead link. It also runs weekly
and opens an issue if a link rots after merge.

Two exclusions in `lychee.toml` are worth knowing about:

- **LinkedIn and Credly** reject requests from datacenter IPs regardless of user
  agent, so a GitHub runner can never verify them. Check those by hand when you
  change them.
- **Toptal** is excluded because the resume link ends in `#Wao9W7`, which is
  Toptal's referral token rather than an in-page anchor — fragment checking
  reports it as missing on a page that is perfectly healthy.
- **The site's own origin** is excluded because canonical tags and `og:url`
  point at the deployed URL, which on a pull request is the *previous* version.
  Those same paths are verified as local files instead.

---

## What you need to configure manually

### 1. Create the repository (required)

The site is configured for a GitHub **user site**, which must live in a repo
named exactly:

```
PabloFloress2615.github.io
```

```bash
gh repo create PabloFloress2615.github.io --public --source=. --remote=origin
git push -u origin main
```

If you use a different repo name, the site is served from
`https://PabloFloress2615.github.io/<repo>/` instead, and you must set
`base: '/<repo>/'` in `astro.config.mjs` as well as updating `SITE`.

### 2. Turn on Pages (required)

**Settings → Pages → Build and deployment → Source: GitHub Actions.**

Do *not* pick "Deploy from a branch" — the workflow uploads an artifact, so a
branch-based source would serve nothing. The first deploy runs on the next push
to `main`.

### 3. Placeholders — done

`npm run check:todo` reports zero. All profile links and all ten certification
credentials are wired up in `src/data/site.ts`.

Note that not every credential lives on Credly: Oracle issues through its own
CertView and Microsoft through Microsoft Learn, so those two point at their
respective platforms.

Placeholders render as a visible `TODO:` chip rather than a broken link, and
they are excluded from the JSON-LD `sameAs` list so they cannot harm SEO. To
confirm none are left:

```bash
npm run check:todo
```

What *is* still a placeholder is `public/images/azure-ha-dr.png` — a generated
stand-in, not the real architecture diagram.

#### Certification badge artwork

Badge images are **self-hosted** under `public/images/badges/`, downloaded once
from `images.credly.com` (and Oracle/Microsoft for the two non-Credly ones)
rather than hot-linked. Hot-linking would add a third-party request per badge
and put the page's rendering at the mercy of another CDN. They are normalised to
320x320 and lazy-loaded, which is why they cost nothing in Lighthouse.

To add or refresh one: drop a square PNG or SVG in `public/images/badges/` and
point the `badge` field at it in `src/data/site.ts`. A certification with no
`badge` field renders a neutral medal outline instead, at the same size, so the
grid stays even.

### 4. Custom domain (optional)

1. Copy `CNAME.example` to `public/CNAME` and replace its contents with
   the bare domain only — no `https://`, no trailing slash, no comments:

   ```
   pabloflores.dev
   ```

2. Update `SITE` in `astro.config.mjs` and the `Sitemap:` line in
   `public/robots.txt` to the new domain. Update the origin exclusion in
   `lychee.toml` too.
3. Create the DNS records at your registrar:

   **Apex domain** (`pabloflores.dev`) — four `A` records and four `AAAA`
   records:

   ```
   A     185.199.108.153
   A     185.199.109.153
   A     185.199.110.153
   A     185.199.111.153
   AAAA  2606:50c0:8000::153
   AAAA  2606:50c0:8001::153
   AAAA  2606:50c0:8002::153
   AAAA  2606:50c0:8003::153
   ```

   **Subdomain** (`www.pabloflores.dev`) — one `CNAME` instead:

   ```
   CNAME  pabloflores2615.github.io.
   ```

4. **Settings → Pages → Custom domain**, enter the domain, wait for the DNS
   check to pass, then tick **Enforce HTTPS** once the certificate is issued
   (usually a few minutes, occasionally up to 24 hours).

> Verify these IP addresses against GitHub's current documentation before
> relying on them — GitHub has changed its Pages IPs before.
