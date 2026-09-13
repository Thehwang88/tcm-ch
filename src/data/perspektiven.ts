// "Perspektiven": redaktionelle Ebene der Gesundheitsbibliothek (Phase 1: nur Infrastruktur).
//
// ROLLE / ABGRENZUNG (verbindlich für jede künftige Ausgabe):
// - TCM verstehen erklärt Konzepte, Begriffe, Methoden und traditionelle Modelle.
// - Wissen erklärt Gesundheitsthemen und Studienlagen (Referenz-Charakter).
// - Fragen beantwortet konkrete Patientenfragen.
// - PERSPEKTIVEN erklärt klinisches Urteilen: wie Behandlungsentscheidungen entstehen,
//   wo Unsicherheit und Grenzen liegen, wie Evidenz interpretiert wird, wann verwiesen
//   wird und wie traditionelle und konventionelle Medizin verantwortungsvoll kombiniert
//   werden. Leicht meinungsstark, nie absolut. Kein SEO-Ranking-Ziel als Selbstzweck.
//
// KANNIBALISIERUNGS-SCHUTZ: Jeder Beitrag muss einen anderen Primärzweck haben als die
// bestehende Beschwerde-/Therapie-/Fragen-/Körpersignal-/TCM-verstehen-Seite zum Thema.
// primaryPurpose beschreibt diesen Zweck in einem Satz; canonicalIntentOwner nennt die
// URLs, die den Such-Intent weiterhin besitzen (der Beitrag verlinkt sie, konkurriert nicht).
//
// INDEXIERUNG: Hub und Beiträge folgen der indexable-Flag-Konvention (wie tcm-verstehen).
// status 'mock' = reine Entwicklungs-Daten: nie indexierbar, nie in der Sitemap
// (gen-sitemap schliesst noindex aus), nie in der Bibliothek-Suche, nie verlinkt.
// Der Hub wird erst indexierbar (HUB_INDEXABLE), wenn mindestens 2-3 echte Beiträge
// mit echten Autor:innen publiziert sind.

export type PerspektiveTopic =
  | 'clinical-judgement'
  | 'evidence'
  | 'integrative-medicine'
  | 'treatment-decisions'
  | 'limits-transparency'
  | 'international-perspective';

export const TOPIC_LABELS: Record<PerspektiveTopic, string> = {
  'clinical-judgement': 'Klinisches Urteilen',
  'evidence': 'Evidenz',
  'integrative-medicine': 'Integrative Medizin',
  'treatment-decisions': 'Behandlungsentscheidungen',
  'limits-transparency': 'Grenzen & Transparenz',
  'international-perspective': 'Internationale Perspektive',
};

export interface PerspektiveAuthor {
  name: string;
  role?: string;
  credentials?: string;
  href?: string; // Autor:innen-Profil, falls vorhanden
}
export interface PerspektiveSource { label: string; detail?: string; href?: string }
export interface PerspektiveLink { href: string; label: string; cat: string }

export interface Perspektive {
  slug: string;
  status: 'mock' | 'published';
  indexable: boolean; // nur bei status 'published' und echtem Inhalt true
  featured?: boolean;
  title: string;
  /** Standfirst/Deck: 1-2 Sätze redaktioneller Unterzeile. */
  deck: string;
  topic: PerspektiveTopic;
  metaDesc?: string;
  author?: PerspektiveAuthor; // NIE automatisch zuweisen, keine erfundenen Personen
  reviewerName?: string;      // nur bei echtem Review
  publishedAt?: string;       // ISO, nur bei published
  updatedAt?: string;
  readingTime?: string;
  /** Kernthese, prominent unter dem Deck (optional). */
  thesisHtml?: string;
  bodyHtml?: string;
  /** Optionale redaktionelle Blöcke; Artikel dürfen frei variieren. */
  klinischeSichtHtml?: string; // "Unsere klinische Sicht"
  grenzenHtml?: string;        // "Wo die Grenzen liegen"
  evidenzHtml?: string;        // Evidenz-/Kontext-Box
  sources?: PerspektiveSource[]; // keine erfundenen Quellen
  related?: PerspektiveLink[];   // Therapien/Beschwerden/Signale/Diagnostik/Standorte
  relatedPerspektiven?: string[]; // slugs
  /** Optionaler, dezenter CTA-Text + Ziel; Default ist KEIN Buchungs-CTA. */
  cta?: { label: string; href: string };
  primaryPurpose?: string;
  canonicalIntentOwner?: string[];
}

/** Hub erst indexieren, wenn echte Beiträge existieren (Launch-Kriterien: siehe
 *  seo/editorial-perspectives-architecture.md). */
export const HUB_INDEXABLE = false;

export const perspektiven: Perspektive[] = [
  // ── MOCK / DEV ONLY ──────────────────────────────────────────────────────
  // Reine Layout-Testdaten: keine Artikel, keine Autor:innen, keine echten Daten.
  // Nicht indexierbar, nicht in Sitemap/Suche, nirgends verlinkt ausser vom
  // (noindex-)Hub-Template im Entwicklungsmodus.
  {
    slug: 'mock-wann-wir-abraten',
    status: 'mock', indexable: false, featured: true,
    title: 'Wann wir von Akupunktur abraten',
    deck: 'Nicht jede Beschwerde gehört in die TCM-Praxis. Ein Blick darauf, wie wir entscheiden, wann wir behandeln und wann wir weiterverweisen.',
    topic: 'limits-transparency',
    primaryPurpose: 'Grenzen und Verweislogik transparent machen, nicht für Akupunktur-Keywords ranken.',
    canonicalIntentOwner: ['/therapien/akupunktur/', '/gesundheitsbibliothek/fragen/wann-zuerst-zum-arzt/'],
  },
  {
    slug: 'mock-physio-oder-akupunktur',
    status: 'mock', indexable: false,
    title: 'Physiotherapie oder Akupunktur? Oft ist das die falsche Frage.',
    deck: 'Warum die Entweder-oder-Logik vielen Verläufen nicht gerecht wird und wie integrierte Behandlungsentscheidungen wirklich entstehen.',
    topic: 'treatment-decisions',
    primaryPurpose: 'Integriertes klinisches Entscheiden erklären, nicht für Physio- oder Akupunktur-Keywords ranken.',
    canonicalIntentOwner: ['/therapien/physiotherapie/', '/therapien/akupunktur/'],
  },
  {
    slug: 'mock-tradition-ist-kein-beweis',
    status: 'mock', indexable: false,
    title: 'Tradition ist kein Beweis',
    deck: 'Zweitausend Jahre Anwendung sind ein Argument für Erfahrung, nicht für Wirksamkeit. Wie wir mit diesem Spannungsfeld umgehen.',
    topic: 'evidence',
    primaryPurpose: 'Evidenz-Haltung von TCM.ch erklären.',
    canonicalIntentOwner: ['/gesundheitsbibliothek/tcm-verstehen/'],
  },
];

export const publishedPerspektiven = perspektiven.filter((p) => p.status === 'published');
export const perspektiveBySlug = (slug: string) => perspektiven.find((p) => p.slug === slug);
