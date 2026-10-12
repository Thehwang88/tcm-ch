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
//   editorial     translation workflow status of the EN copy in the repo (people decide this)
//   publication   deployment state of the EN URL on production (release commits flip this)
//   sources       DE master sources (files / data keys) hashed by scripts/check-i18n.mjs;
//                 a changed German source flips the entry to "Outdated" in --check mode
//   images        shared image refs reused from the DE page (no EN-only imagery)
//   links         related EN entries (navigation/cross-link relationships)
//
// Two axes, deliberately separate:
//   editorial:   Missing → Draft → Needs clinical review → Approved        (+ computed: Outdated)
//   publication: Unpublished | Published                                   (= live on main / tcm.ch)
// Gate semantics (scripts/check-i18n.mjs):
//   - built in dist           ⇔ editorial ≠ Missing
//   - Draft / Needs review in dist → WARN (never on main; --strict fails)
//   - hreflang reciprocal      ⇔ de !== null && editorial === 'Approved'
//   - sitemap                  ⇔ editorial === 'Approved'
//   - publication 'Published' with editorial ≠ 'Approved' → FAIL (live page without approved copy)
// Nothing auto-publishes: a status change is a reviewed commit.

import { clinics, deStandortPath, enLocationPath, locationImages } from '../locations';
import { therapies, deTherapyPath, enTherapyPath, therapyImages } from '../therapies';
import { conditions, deConditionPath, enConditionPath } from '../conditions';
import { standorte } from '../standorte';

export type EditorialStatus = 'Missing' | 'Draft' | 'Needs clinical review' | 'Approved';
export type PublicationStatus = 'Unpublished' | 'Published';
/** Legacy union kept for callers/docs; "Outdated" is only ever computed by the gate. */
export type TranslationStatus = EditorialStatus | PublicationStatus | 'Outdated';

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
  editorial: EditorialStatus;
  publication: PublicationStatus;
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

// ── Editorial overrides. Every EN route that is live today is 'Approved' + 'Published' (it was
// reviewed before it went live). Wave 1 (EN V2) rewrote 30 pages and added the Zürich funnel: their
// copy is 'Approved' (editorial review done on this branch); publication stays as it is on
// production until the release commit flips the new page to 'Published'.
const EDITORIAL: Record<string, EditorialStatus> = {};
const PUBLICATION: Record<string, PublicationStatus> = {
  // 'page:zurich' went live with the EN V2 Wave 1 release (PR #29).
};
const editorial = (id: string): EditorialStatus => EDITORIAL[id] ?? 'Approved';
const publication = (id: string): PublicationStatus => PUBLICATION[id] ?? 'Published';
const st = (id: string) => ({ editorial: editorial(id), publication: publication(id) });

const staticEntries: LocalizationEntry[] = [
  {
    id: 'page:home', type: 'home', intent: 'conversion', de: '/', en: '/en/',
    ...st('page:home'), sources: ['src/data/home-body.html'],
    images: ['/images/team-hero.jpg'], links: { related: ['hub:locations', 'hub:therapies', 'hub:conditions', 'page:insurance', 'page:zurich'] },
    clinical: false, note: 'Wave 1: mirrors the DE Softriver split hero (Mint + team photo).',
  },
  {
    id: 'page:zurich', type: 'hub', intent: 'conversion', de: '/akupunktur-tcm-zuerich/', en: '/en/acupuncture-zurich/',
    ...st('page:zurich'), sources: ['src/pages/akupunktur-tcm-zuerich.astro', 'src/data/akupunktur-tcm-zuerich-body.html', 'src/data/zuerich-termin.ts'],
    images: ['/images/tcm-ch-crew-zuerich-west-1254.webp'], links: { parent: 'hub:locations', related: ['location:zuerich-hoengg', 'location:zuerich-oerlikon', 'page:contact'] },
    clinical: false, note: 'Citywide Zürich funnel (hub & spoke), counterpart of /akupunktur-tcm-zuerich/. No clinic entity, no address.',
  },
  {
    id: 'hub:locations', type: 'hub', intent: 'navigation', de: '/standorte/', en: '/en/locations/',
    ...st('hub:locations'), sources: ['src/pages/standorte/index.astro', 'src/data/locations.ts'],
    images: Object.values(locationImages).map((i) => i.src), links: { parent: 'page:home' }, clinical: false,
  },
  {
    id: 'hub:therapies', type: 'hub', intent: 'navigation', de: '/therapien/', en: '/en/therapies/',
    ...st('hub:therapies'), sources: ['src/pages/therapien/index.astro'],
    images: Object.values(therapyImages).map((i) => i.src), links: { parent: 'page:home' }, clinical: false,
  },
  {
    id: 'hub:conditions', type: 'hub', intent: 'navigation', de: '/beschwerden/', en: '/en/conditions/',
    ...st('hub:conditions'), sources: ['src/pages/beschwerden/index.astro'],
    images: [], links: { parent: 'page:home' }, clinical: false,
  },
  {
    id: 'hub:knowledge', type: 'hub', intent: 'informational', de: null, en: '/en/knowledge/',
    ...st('hub:knowledge'), sources: [], images: [], links: { parent: 'page:home' }, clinical: false,
    note: 'EN-only hub: the DE /wissen/ library is a different editorial product (no 1:1 twin).',
  },
  {
    id: 'page:contact', type: 'contact', intent: 'transactional', de: '/kontakt/', en: '/en/contact/',
    ...st('page:contact'), sources: ['src/pages/kontakt.astro', 'src/data/standort-optionen.ts', 'src/data/locations.ts'],
    images: [], links: { parent: 'page:home', related: ['hub:locations'] }, clinical: false,
  },
  {
    id: 'page:insurance', type: 'insurance', intent: 'informational', de: '/krankenkassen/', en: '/en/health-insurance-acupuncture/',
    ...st('page:insurance'), sources: ['src/pages/krankenkassen/index.astro'],
    images: ['/images/krankenkasse-hero.png'], links: { parent: 'page:home' }, clinical: false,
  },
  {
    id: 'page:near-me', type: 'near-me', intent: 'navigation', de: '/akupunktur-in-der-naehe/', en: '/en/acupuncture-near-me/',
    ...st('page:near-me'), sources: ['src/pages/akupunktur-in-der-naehe.astro', 'src/data/locations.ts'],
    images: [], links: { parent: 'hub:locations' }, clinical: false,
  },
];

const locationEntries: LocalizationEntry[] = clinics.map((c) => {
  const de = standorte[c.id];
  return {
    id: `location:${c.id}`, type: 'location', intent: 'conversion',
    de: slash(deStandortPath(c.id)), en: enLocationPath(c.id),
    ...st(`location:${c.id}`),
    sources: [`src/data/locations.ts#clinics.${c.id}`, ...(de ? [`src/data/standorte.ts#standorte.${c.id}`] : [])],
    images: [de?.hero.image ?? locationImages[c.id]?.src].filter(Boolean) as string[],
    links: { parent: 'hub:locations', related: ['page:contact', 'page:insurance', ...(c.city === 'Zürich' ? ['page:zurich'] : [])] },
    clinical: false,
    note: de ? undefined : 'DE page is a captured leaf (no standorte.ts entry): EN uses clinic data + shared imagery only.',
  };
});

const therapyEntries: LocalizationEntry[] = therapies.map((t) => ({
  id: `therapy:${t.slug}`, type: 'therapy', intent: 'informational',
  de: slash(deTherapyPath(t.deSlug)), en: enTherapyPath(t.slug),
  ...st(`therapy:${t.slug}`),
  sources: [`src/data/therapie-leaves/${t.deSlug}.html`],
  images: [therapyImages[t.slug]?.src].filter(Boolean) as string[],
  links: { parent: 'hub:therapies', related: t.related.map((r) => `therapy:${r}`) },
  clinical: true,
}));

const conditionEntries: LocalizationEntry[] = conditions.map((c) => ({
  id: `condition:${c.slug}`, type: 'condition', intent: 'informational',
  de: slash(deConditionPath(c.deSlug)), en: enConditionPath(c.slug),
  ...st(`condition:${c.slug}`),
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
  ...st(`knowledge:${s}`), sources: [], images: [], links: { parent: 'hub:knowledge' }, clinical: true,
}));

export const REGISTRY: LocalizationEntry[] = [
  ...staticEntries, ...locationEntries, ...therapyEntries, ...conditionEntries, ...knowledgeEntries,
];

export const byId = (id: string) => REGISTRY.find((e) => e.id === id);
export const byEn = (en: string) => REGISTRY.find((e) => e.en === slash(en));
export const byDe = (de: string) => REGISTRY.find((e) => e.de === slash(de));

/** Reciprocal hreflang eligibility: DE twin exists and the EN copy is editorially approved. */
export const hreflangEligible = (e: LocalizationEntry) => e.de !== null && e.editorial === 'Approved';
/** Sitemap eligibility: approved copy only (Draft / Needs review never reach the sitemap). */
export const sitemapEligible = (e: LocalizationEntry) => e.editorial === 'Approved';
/** Pages that may exist in dist at all. */
export const buildable = (e: LocalizationEntry) => e.editorial !== 'Missing';

/** Registry totals, for docs/reports and the gate summary. */
export const counts = () => ({
  entries: REGISTRY.length,
  pairs: REGISTRY.filter((e) => e.de !== null).length,
  enOnly: REGISTRY.filter((e) => e.de === null).length,
  published: REGISTRY.filter((e) => e.publication === 'Published').length,
  unpublished: REGISTRY.filter((e) => e.publication === 'Unpublished').length,
});

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
