// ── EN Knowledge articles (Astro content collection, markdown). ──
// One markdown file per article in src/content/knowledge/. Rendered by
// /en/knowledge/[slug].astro; listed by /en/knowledge/index.astro.
//
// Voice/standard mirrors the DE Wissen articles + EN condition/therapy pages:
// "you", honest, evidence-aware, no cure claims, no Qi/Yin-Yang/energetic
// language. relatedConditions/relatedTherapies hold EN slugs (see data/*.ts).
//
// hreflang: EN-only by default (self-canonical, x-default=en). If a DE Wissen
// article on the SAME topic exists, set deWissenUrl to its absolute URL to pair
// them — do NOT invent a fake DE twin.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const knowledge = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/knowledge' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    datePublished: z.string(),       // ISO date, static (no Date.now())
    dateModified: z.string(),
    author: z.string(),
    reviewer: z.string(),            // shown with EMR/ASCA credential
    deWissenUrl: z.string().url().optional(), // explicit DE twin, if one exists
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    relatedConditions: z.array(z.string()).default([]), // EN condition slugs
    relatedTherapies: z.array(z.string()).default([]),  // EN therapy slugs
  }),
});

export const collections = { knowledge };
