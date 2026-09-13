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
// status 'planned'/'draft' = nicht publiziert: nie indexierbar, nie in der Sitemap
// (gen-sitemap schliesst noindex aus), nie in der Bibliothek-Suche, nie verlinkt.
// Der Hub wird erst indexierbar (HUB_INDEXABLE), wenn mindestens 3-4 echte Beiträge
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
  status: 'planned' | 'draft' | 'published';
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
  /** Interne Planung (nie öffentlich gerendert): */
  suggestedAuthorType?: 'senior-tcm-practitioner' | 'practitioner-with-physio-experience' | 'clinical-editorial' | 'institutional-perspective' | 'practitioner-plus-reviewer';
  overlapNotes?: string;
  /** Ein interner Planungs-Satz, KEINE finale These. */
  editorialThesis?: string;
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

/** Hub bleibt noindex, bis mindestens 3-4 wirklich publizierte Perspektiven mit
 *  echter Autorschaft existieren (Launch-Kriterien: seo/editorial-perspectives-architecture.md). */
export const HUB_INDEXABLE = false;

export const perspektiven: Perspektive[] = [
  // ── WELLE 1: GEPLANTE REDAKTIONELLE THEMEN ───────────────────────────────
  // Freigegebene Themen, KEINE publizierten Artikel: status 'planned' = Route nur
  // im Dev-Server, nie in Produktion/Sitemap/Suche, kein Inhalt, keine Autor:innen,
  // keine Daten. Inhalte entstehen später pro Beitrag mit echter Autorschaft.
  {
    slug: 'wann-wir-von-akupunktur-abraten',
    status: 'planned', indexable: false, featured: true,
    title: 'Wann wir von Akupunktur abraten',
    deck: 'Wie wir entscheiden, wann eine Behandlung sinnvoll ist und wann wir bewusst nicht behandeln, sondern weiterverweisen.',
    topic: 'limits-transparency',
    suggestedAuthorType: 'senior-tcm-practitioner',
    primaryPurpose: 'Klinische Grenzen und Verweislogik transparent machen, nicht für allgemeine Akupunktur-Queries ranken.',
    canonicalIntentOwner: ['/therapien/akupunktur/', '/gesundheitsbibliothek/fragen/wann-zuerst-zum-arzt/'],
    overlapNotes: 'Darf die Red-Flag-Liste von fragen/wann-zuerst-zum-arzt nicht duplizieren; verlinkt sie stattdessen.',
    related: [
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
      { href: '/gesundheitsbibliothek/fragen/wann-zuerst-zum-arzt/', label: 'Wann zuerst zum Arzt?', cat: 'Frage' },
      { href: '/gesundheitsbibliothek/fragen/was-passiert-beim-ersten-termin/', label: 'Was passiert beim ersten Termin?', cat: 'Frage' },
    ],
  },
  {
    slug: 'wenn-eine-behandlung-nicht-hilft',
    status: 'planned', indexable: false,
    title: 'Was wir tun, wenn eine Behandlung nicht hilft',
    deck: 'Zwischenbilanz, Stoppregeln, Methodenwechsel: wie wir vorgehen, wenn sich nach mehreren Sitzungen nichts bewegt.',
    topic: 'clinical-judgement',
    suggestedAuthorType: 'practitioner-plus-reviewer',
    primaryPurpose: 'Reassessment, Abbruch- und Wechselentscheide erklären; kein SEO-Ziel besitzt diesen redaktionellen Intent.',
    canonicalIntentOwner: [],
    overlapNotes: 'Kein kanonischer Owner vorhanden (dokumentiert in wave1-structure.md); grenzt sich von der Sitzungsanzahl-Frage (fragen/akupunktur#sitzungen) ab.',
    related: [
      { href: '/therapien/', label: 'Therapien im Überblick', cat: 'Therapien' },
      { href: '/gesundheitsbibliothek/fragen/was-passiert-beim-ersten-termin/', label: 'Was passiert beim ersten Termin?', cat: 'Frage' },
      { href: '/gesundheitsbibliothek/fragen/wann-zuerst-zum-arzt/', label: 'Wann zuerst zum Arzt?', cat: 'Frage' },
    ],
  },
  {
    slug: 'physiotherapie-oder-akupunktur',
    status: 'planned', indexable: false,
    title: 'Physiotherapie oder Akupunktur? Oft ist das die falsche Frage.',
    deck: 'Warum Methoden verschiedene klinische Aufgaben haben und integrierte Behandlung aufgabenbasiert gedacht werden sollte, nicht als Entweder-oder.',
    topic: 'integrative-medicine',
    suggestedAuthorType: 'practitioner-with-physio-experience',
    primaryPurpose: 'Integriertes, aufgabenbasiertes Entscheiden erklären; nicht für Physio- oder Akupunktur-Keywords ranken.',
    canonicalIntentOwner: ['/therapien/physiotherapie/', '/therapien/akupunktur/'],
    overlapNotes: 'Ergänzt das Physio-oder-TCM-Entscheidungsmodul (physio-tcm.ts), ersetzt es nicht; Therapie-Seiten behalten alle kommerziellen Intents.',
    related: [
      { href: '/therapien/physiotherapie/', label: 'Physiotherapie', cat: 'Therapie' },
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
      { href: '/beschwerden/rueckenschmerzen/', label: 'Rückenschmerzen', cat: 'Beschwerde' },
      { href: '/beschwerden/nackenschmerzen/', label: 'Nackenschmerzen', cat: 'Beschwerde' },
    ],
  },
  {
    slug: 'tradition-ist-kein-beweis',
    status: 'planned', indexable: false,
    title: 'Tradition ist kein Beweis',
    deck: 'Wie wir traditionelle Modelle, klinische Erfahrung und wissenschaftliche Evidenz auseinanderhalten und warum das der Behandlung nützt.',
    topic: 'evidence',
    suggestedAuthorType: 'clinical-editorial',
    primaryPurpose: 'Die Evidenz-Haltung von TCM.ch erklären; erklärt NICHT Qi oder Meridiane selbst (das gehört TCM verstehen).',
    canonicalIntentOwner: ['/gesundheitsbibliothek/tcm-verstehen/'],
    overlapNotes: 'Strikte Abgrenzung: keine Begriffserklärungen, nur Haltung zur Einordnung.',
    related: [
      { href: '/gesundheitsbibliothek/tcm-verstehen/', label: 'TCM verstehen', cat: 'Bibliothek' },
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
      { href: '/wissen/dry-needling-vs-akupunktur/', label: 'Dry Needling vs. Akupunktur', cat: 'Artikel' },
    ],
  },
  {
    slug: 'mri-und-schmerzen',
    status: 'planned', indexable: false,
    title: 'Das MRI sieht etwas. Aber erklärt es auch deine Schmerzen?',
    deck: 'Bildbefund, Diagnose und Beschwerde sind drei verschiedene Dinge. Warum ein auffälliges MRI nicht automatisch die Ursache zeigt.',
    topic: 'clinical-judgement',
    suggestedAuthorType: 'practitioner-plus-reviewer',
    primaryPurpose: 'Den Unterschied zwischen Bildbefund, Diagnose und Symptom erklären; keine spezifische Rückenschmerz-Krankheits-Query anvisieren.',
    canonicalIntentOwner: ['/beschwerden/rueckenschmerzen/', '/beschwerden/bandscheibenvorfall/', '/beschwerden/ischias/'],
    overlapNotes: 'Beschwerde-Seiten behalten alle Diagnose-/Behandlungs-Intents; Beitrag verlinkt sie prominent.',
    related: [
      { href: '/beschwerden/rueckenschmerzen/', label: 'Rückenschmerzen', cat: 'Beschwerde' },
      { href: '/beschwerden/bandscheibenvorfall/', label: 'Bandscheibenvorfall', cat: 'Beschwerde' },
      { href: '/beschwerden/ischias/', label: 'Ischias', cat: 'Beschwerde' },
      { href: '/therapien/physiotherapie/', label: 'Physiotherapie', cat: 'Therapie' },
      { href: '/visuals/bandscheibenvorfall-lws/', label: 'Visual: Bandscheibenvorfall LWS', cat: 'Visual' },
    ],
  },
  {
    slug: 'wie-viele-behandlungen-sind-genug',
    status: 'planned', indexable: false,
    title: 'Wie viele Behandlungen sind genug?',
    deck: 'Warum wir mit Zwischenbilanzen arbeiten statt mit fixen Paketen und woran wir erkennen, ob Weiterbehandeln klinisch sinnvoll ist.',
    topic: 'treatment-decisions',
    suggestedAuthorType: 'senior-tcm-practitioner',
    primaryPurpose: 'Reassessment-Punkte und Weiter-oder-Stopp-Entscheide erklären; NICHT die informationale Sitzungsanzahl-Query anvisieren.',
    canonicalIntentOwner: ['/gesundheitsbibliothek/fragen/akupunktur/', '/therapien/akupunktur/'],
    overlapNotes: 'Die Frage "Wie viele Sitzungen brauche ich?" bleibt bei fragen/akupunktur#sitzungen und dem Akupunktur-Leaf; dieser Beitrag behandelt die Entscheidungslogik dahinter.',
    related: [
      { href: '/gesundheitsbibliothek/fragen/akupunktur/', label: 'Fragen zur Akupunktur', cat: 'Fragen' },
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
      { href: '/wissen/wie-lange-bleiben-akupunkturnadeln-drin/', label: 'Wie lange bleiben die Nadeln drin?', cat: 'Artikel' },
    ],
  },
  {
    slug: 'wann-wir-zum-arzt-zurueckverweisen',
    status: 'planned', indexable: false,
    title: 'Wann wir Patienten zurück zum Arzt schicken',
    deck: 'Rücküberweisung ist kein Scheitern, sondern Teil kompetenter Komplementärmedizin. Wann und wie wir sie aussprechen.',
    topic: 'limits-transparency',
    suggestedAuthorType: 'senior-tcm-practitioner',
    primaryPurpose: 'Rücküberweisung in die Schulmedizin als Qualitätsmerkmal erklären.',
    canonicalIntentOwner: ['/gesundheitsbibliothek/fragen/wann-zuerst-zum-arzt/', '/gesundheitsbibliothek/fragen/sicherheit-nebenwirkungen/'],
    overlapNotes: 'Red-Flag-Listen bleiben bei den Fragen-Seiten; hier geht es um den Entscheidungsprozess und die Zusammenarbeit mit Ärzt:innen.',
    related: [
      { href: '/gesundheitsbibliothek/fragen/wann-zuerst-zum-arzt/', label: 'Wann zuerst zum Arzt?', cat: 'Frage' },
      { href: '/gesundheitsbibliothek/fragen/sicherheit-nebenwirkungen/', label: 'Sicherheit & Nebenwirkungen', cat: 'Fragen' },
      { href: '/koerpersignale/', label: 'Körpersignale einordnen', cat: 'Körpersignale' },
    ],
  },
  {
    slug: 'was-integrative-medizin-fuer-uns-bedeutet',
    status: 'planned', indexable: false,
    title: 'Was integrative Medizin für uns tatsächlich bedeutet',
    deck: 'Integriert heisst nicht einfach mehr Behandlung. Jede Methode braucht eine klare Aufgabe, sonst gehört sie nicht in den Plan.',
    topic: 'integrative-medicine',
    suggestedAuthorType: 'institutional-perspective',
    primaryPurpose: 'Die TCM.ch-Definition integrierter Versorgung erklären: klare Rollen pro Methode statt Additionslogik.',
    canonicalIntentOwner: ['/therapien/', '/therapien/akupunktur/', '/therapien/physiotherapie/'],
    overlapNotes: 'Keine Methoden-Erklärungen (gehören den Therapie-Seiten und tcm-verstehen/methoden).',
    related: [
      { href: '/therapien/', label: 'Therapien im Überblick', cat: 'Therapien' },
      { href: '/therapien/physiotherapie/', label: 'Physiotherapie', cat: 'Therapie' },
      { href: '/gesundheitsbibliothek/tcm-verstehen/methoden/', label: 'Methoden erklärt', cat: 'Bibliothek' },
    ],
  },
];


export const publishedPerspektiven = perspektiven.filter((p) => p.status === 'published');
export const perspektiveBySlug = (slug: string) => perspektiven.find((p) => p.slug === slug);
