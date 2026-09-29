import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';

/**
 * Case studies.
 *
 * Adding one means adding a Markdown file under src/content/case-studies/.
 * The filename becomes the URL slug; no route or navigation edit is needed.
 *
 * Hard rule: `clientDescriptor` is a generic description of the client's
 * industry — never a company name.
 */
const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
  schema: z.object({
    /** Full title, shown as the <h1> on the case study page. */
    title: z.string(),
    /** One- or two-sentence blurb for the card and the meta description. */
    summary: z.string(),
    /** Generic industry description, e.g. "a healthcare data company". */
    clientDescriptor: z.string(),
    /** Ascending sort order in the card grid. */
    order: z.number().int().positive(),
    /** Technologies listed on the card and in the page header. */
    stack: z.array(z.string()).min(1),
    /**
     * Optional architecture diagram rendered above the prose.
     *
     * `file` is the basename of an SVG in src/diagrams/, which is inlined at
     * build time so it inherits the theme tokens. `alt` carries the meaning for
     * anyone who cannot see it, so it describes the architecture rather than
     * saying "architecture diagram".
     */
    diagram: z
      .object({
        file: z.string(),
        alt: z.string(),
        caption: z.string().optional(),
      })
      .optional(),
    /** Draft entries are excluded from production builds. */
    draft: z.boolean().default(false),
  }),
});

export const collections = { caseStudies };
