// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The canonical origin of the deployed site. Used for the sitemap, canonical
// URLs and absolute Open Graph image URLs.
//
// Deploying to the GitHub user-site repo `PabloFloress2615.github.io` means the
// site is served from the domain root, so `base` stays at its default of '/'.
// When you point a custom domain at this repo, change ONLY this value.
const SITE = 'https://pabloflores2615.github.io';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  output: 'static',
  // Consistent URLs: /case-studies/foo/ everywhere, which keeps canonical tags,
  // the sitemap and GitHub Pages' directory-index serving in agreement.
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap()],
  prefetch: false,
});
