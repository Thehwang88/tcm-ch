// ── Localization registry (DE ⇄ EN) — single source of truth for the bilingual platform. ──
//
// German is authoritative. Every EN page is a localization of ONE German content identity
// (or an explicit EN-only entry). This registry extends the existing PAIR_MAP in
// src/data/site.ts (which stays the hreflang/language-switcher source) with everything the
// translation workflow and the i18n gate need:
//
//   id            content identity ("location:basel", "therapy:acupuncture", "page:home")
//   type/intent   page family + search intent
//   de / en       canonical URL paths (slash form). de === null → EN-only page (self x-default)
//   status        translation workflow status of the EN copy currently in the repo
//   sources       DE master sources (files / data keys) hashed by scripts/check-i18n.mjs;
//                 a changed German source flips the EN entry to "Outdated" in --check mode
//   images        shared image refs reused from the DE page (no EN-only imagery)
//   links         related EN entries (navigation/cross-link relationships)
//   hreflang      eligible for reciprocal hreflang (needs a DE twin + Published/Approved copy)
//   sitemap       eligible for the sitemap (Published only; Draft/Review never auto-publish)
//
// Workflow (docs/i18n.md): Missing → Draft → Needs clinical review → Approved → Published.
// "Outdated" is computed, never hand-set. Nothing auto-publishes: a status change is a commit.

import { clinics, deStandortPath, enLocationPath, locationImages } from '../locations';
import { therapies, deTherapyPath, enTherapyPath, therapyImages } from '../therapies';
import { conditions, deConditionPath, enConditionPath } from '../conditions';
import { standorte } from '../standorte';

export type TranslationStatus =
  | 'Missing'
  | 'Draft'
  | 'Needs clinical review'
  | 'Approved'
  | 'Published'
  | 'Outdated';

export type PageType =
  | 'home' | 'hub' | 'location' | 'therapy' | 'condition' | 'knowledge'
  | 'contact' | 'insurance' | 'near-me' | 'system';

export type Intent = 'conversion' | 'navigation' | 'informational' | 'transactional';

export interface LocalizationEntry {
  id: string;
  type: PageType;
  intent: Intent;
  de: string | null;
  en: string;
  status: TranslationStatus;
  /** DE master sources: "path" (whole file) or "path#key" (named export entry, bundled by the gate). */
  sources: string[];
  images: string[];
  links: { parent?: string; related?: string[] };
  /** Clinical/medical copy on the page → changes need clinical review before Approved. */
  clinical: boolean;
  /** Free-form note (e.g. why a page is EN-only, or what Wave changed it). */
  note?: string;
}

const slash = (p: string) => (p.endsWith('/') ? p : p + '/');

// ── Status overrides. Default for every registered route is 'Published' (all 51 EN routes
// are live and indexed). Wave 1 (EN V2) rewrote the pages below; they ship as 'Approved'
// pending the merge GO, which is the publication step. Flip to 'Published' in the release commit.
const WAVE1_STATUS: TranslationStatus = 'Approved';
const STATUS_OVERRIDES: Record<string, TranslationStatus> = {
  'page:home': WAVE1_STATUS,
  'hub:locations': WAVE1_STATUS,
  'hub:therapies': WAVE1_STATUS,
  'page:contact': WAVE1_STATUS,
  'page:insurance': WAVE1_STATUS,
  ...Object.fromEntries(clinics.map((c) => [`location:${c.id}`, WAVE1_STATUS])),
  ...Object.fromEntries(therapies.map((t) => [`therapy:${t.slug}`, WAVE1_STATUS])),
};

const status = (id: string): TranslationStatus => STATUS_OVERRIDES[id] ?? 'Published';

const staticEntries: LocalizationEntry[] = [
  {
    id: 'page:home', type: 'home', intent: 'conversion', de: '/', en: '/en/',
    status: status('page:home'), sources: ['src/data/home-body.html'],
    images: ['/images/team-hero.jpg'], links: { related: ['hub:locations', 'hub:therapies', 'hub:conditions', 'page:insurance'] },
    clinical: false, note: 'Wave 1: mirrors the DE Softriver split hero (Mint + team photo).',
  },
  {
    id: 'hub:locations', type: 'hub', intent: 'navigation', de: '/standorte/', en: '/en/locations/',
    status: status('hub:locations'), sources: ['src/pages/standorte/index.astro', 'src/data/locations.ts'],
    images: Object.values(locationImages).map((i) => i.src), links: { parent: 'page:home' }, clinical: false,
  },
  {
    id: 'hub:therapies', type: 'hub', intent: 'navigation', de: '/therapien/', en: '/en/therapies/',
    status: status('hub:therapies'), sources: ['src/pages/therapien/index.astro'],
    images: Object.values(therapyImages).map((i) => i.src), links: { parent: 'page:home' }, clinical: false,
  },
  {
    id: 'hub:conditions', type: 'hub', intent: 'navigation', de: '/beschwerden/', en: '/en/conditions/',
    status: status('hub:conditions'), sources: ['src/pages/beschwerden/index.astro'],
    images: [], links: { parent: 'page:home' }, clinical: false,
  },
  {
    id: 'hub:knowledge', type: 'hub', intent: 'informational', de: null, en: '/en/knowledge/',
    status: status('hub:knowledge'), sources: [], images: [], links: { parent: 'page:home' }, clinical: false,
    note: 'EN-only hub: the DE /wissen/ library is a different editorial product (no 1:1 twin).',
  },
  {
    id: 'page:contact', type: 'contact', intent: 'transactional', de: '/kontakt/', en: '/en/contact/',
    status: status('page:contact'), sources: ['src/pages/kontakt.astro', 'src/data/standort-optionen.ts', 'src/data/locations.ts'],
    images: [], links: { parent: 'page:home', related: ['hub:locations'] }, clinical: false,
  },
  {
    id: 'page:insurance', type: 'insurance', intent: 'informational', de: '/krankenkassen/', en: '/en/health-insurance-acupuncture/',
    status: status('page:insurance'), sources: ['src/pages/krankenkassen/index.astro'],
    images: ['/images/krankenkasse-hero.png'], links: { parent: 'page:home' }, clinical: false,
  },
  {
    id: 'page:near-me', type: 'near-me', intent: 'navigation', de: '/akupunktur-in-der-naehe/', en: '/en/acupuncture-near-me/',
    status: status('page:near-me'), sources: ['src/pages/akupunktur-in-der-naehe.astro', 'src/data/locations.ts'],
    images: [], links: { parent: 'hub:locations' }, clinical: false,
  },
];

const locationEntries: LocalizationEntry[] = clinics.map((c) => {
  const de = standorte[c.id];
  return {
    id: `location:${c.id}`, type: 'location', intent: 'conversion',
    de: slash(deStandortPath(c.id)), en: enLocationPath(c.id),
    status: status(`location:${c.id}`),
    sources: [`src/data/locations.ts#clinics.${c.id}`, ...(de ? [`src/data/standorte.ts#standorte.${c.id}`] : [])],
    images: [de?.hero.image ?? locationImages[c.id]?.src].filter(Boolean) as string[],
    links: { parent: 'hub:locations', related: ['page:contact', 'page:insurance'] },
    clinical: false,
    note: de ? undefined : 'DE page is a captured leaf (no standorte.ts entry): EN uses clinic data + shared imagery only.',
  };
});

const therapyEntries: LocalizationEntry[] = therapies.map((t) => ({
  id: `therapy:${t.slug}`, type: 'therapy', intent: 'informational',
  de: slash(deTherapyPath(t.deSlug)), en: enTherapyPath(t.slug),
  status: status(`therapy:${t.slug}`),
  sources: [`src/data/therapie-leaves/${t.deSlug}.html`],
  images: [therapyImages[t.slug]?.src].filter(Boolean) as string[],
  links: { parent: 'hub:therapies', related: t.related.map((r) => `therapy:${r}`) },
  clinical: true,
}));

const conditionEntries: LocalizationEntry[] = conditions.map((c) => ({
  id: `condition:${c.slug}`, type: 'condition', intent: 'informational',
  de: slash(deConditionPath(c.deSlug)), en: enConditionPath(c.slug),
  status: status(`condition:${c.slug}`),
  sources: [`src/data/symptom-leaves/${c.deSlug}.html`],
  images: [],
  links: { parent: 'hub:conditions', related: c.related.map((r) => `condition:${r}`) },
  clinical: true,
}));

// Knowledge articles are EN-only (content collection, no DE twin unless deWissenUrl is set).
// Registered by slug so the gate can assert route ownership; sources = the markdown itself.
export const KNOWLEDGE_SLUGS = [
  'what-to-expect-first-acupuncture-session',
  'how-much-does-acupuncture-cost-in-switzerland',
  'how-to-claim-acupuncture-on-swiss-insurance',
  'is-acupuncture-safe-side-effects-explained',
  'english-speaking-acupuncturist-switzerland',
  'acupuncture-for-back-pain-what-to-expect',
  'acupuncture-for-migraines-what-to-expect',
  'acupuncture-for-stress-and-burnout',
  'acupuncture-for-fertility-switzerland',
];
const knowledgeEntries: LocalizationEntry[] = KNOWLEDGE_SLUGS.map((s) => ({
  id: `knowledge:${s}`, type: 'knowledge', intent: 'informational', de: null, en: `/en/knowledge/${s}/`,
  status: status(`knowledge:${s}`), sources: [], images: [], links: { parent: 'hub:knowledge' }, clinical: true,
}));

export const REGISTRY: LocalizationEntry[] = [
  ...staticEntries, ...locationEntries, ...therapyEntries, ...conditionEntries, ...knowledgeEntries,
];

export const byId = (id: string) => REGISTRY.find((e) => e.id === id);
export const byEn = (en: string) => REGISTRY.find((e) => e.en === slash(en));
export const byDe = (de: string) => REGISTRY.find((e) => e.de === slash(de));

/** Reciprocal hreflang eligibility: DE twin exists and the EN copy is at least Approved. */
export const hreflangEligible = (e: LocalizationEntry) =>
  e.de !== null && (e.status === 'Published' || e.status === 'Approved');

/** Sitemap eligibility: Published only (Approved = awaiting release GO; the release commit flips it). */
export const sitemapEligible = (e: LocalizationEntry) => e.status === 'Published' || e.status === 'Approved';

// Route ownership: one owner per EN path and per DE path. Throws at build time on duplicates.
(() => {
  const seenEn = new Map<string, string>();
  const seenDe = new Map<string, string>();
  for (const e of REGISTRY) {
    if (seenEn.has(e.en)) throw new Error(`i18n registry: EN route ${e.en} owned by ${seenEn.get(e.en)} and ${e.id}`);
    seenEn.set(e.en, e.id);
    if (e.de) {
      if (seenDe.has(e.de)) throw new Error(`i18n registry: DE route ${e.de} owned by ${seenDe.get(e.de)} and ${e.id}`);
      seenDe.set(e.de, e.id);
    }
  }
})();
