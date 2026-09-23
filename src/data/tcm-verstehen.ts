// "TCM verstehen": Wissens-Säule der Gesundheitsbibliothek (Architektur-Welle 09/2026).
//
// Diese Datei trägt NUR die Struktur: 1 Haupt-Hub + 5 Sektions-Hubs. Leaf-Inhalte
// (Konzepte, Muster, Meridiane, Punkte, Diagnostik-Themen) kommen in späteren Wellen
// als TcmEntity-Einträge dazu; erst dann werden Sektionen mit Inhalt indexierbar.
// Indexierungsregel: indexable nur, wenn die Sektion heute echte verlinkte Inhalte
// bündelt (Methoden). Leere Sektionen sind noindex,follow (gleiche Konvention wie Visuals).
//
// Positionierung: traditionelle Begriffe modern und medizinisch verantwortungsvoll
// erklärt. Jede Muster-/Diagnostik-Seite muss künftig klarstellen, dass es sich um
// traditionelle Einordnungsmodelle handelt, nicht um schulmedizinische Diagnosen.

export interface TcmLink { href: string; label: string; cat: string }

// Künftige Entitätstypen des Wissensgraphen. Bewusst im bestehenden Graph-Stil
// (Slug-Referenzen wie in gesundheitsbibliothek.ts), kein paralleles System.
export type TcmEntityType = 'tcm-concept' | 'tcm-pattern' | 'meridian' | 'acupuncture-point' | 'tcm-diagnostic';
// Phase 4A (Foundation, 23.09.2026): Inhaltsmodell fuer Leaves. Regel wie bei
// Befunde & Werte: NUR status 'published' erzeugt Prod-Routen. Drafts haben KEINE
// Route (nicht bloss noindex): kein Thin Content in Google. Finales Copy liefert
// ChatGPT (siehe seo/tcm-verstehen-foundation-editorial-handoff-2026-09-23.md);
// hier stehen nur Struktur, SEO-Vorschlaege und Beziehungen. Keine AI-Fuelltexte.
export interface TcmEntity {
  type: TcmEntityType;
  slug: string;
  section: 'grundlagen' | 'muster' | 'meridiane-punkte' | 'diagnostik' | 'methoden';
  title: string;                   // SEO-Title ohne "| TCM.ch"
  status: 'draft' | 'published';   // draft = WAITING_FOR_CHATGPT_EDITORIAL, keine Route
  indexable: boolean;              // erst mit finalem Copy true (dann auch Sitemap/Queue)
  nav: string;                     // kurzes Karten-Label
  metaDesc: string;
  h1: string;
  publishedAt?: string;
  // Inhaltsbloecke (Reihenfolge = Template-Reihenfolge). Alle optional, Editorial
  // kommt extern; KEINE Platzhalter-Prosa eintragen.
  kurzantwortHtml?: string;        // praezise Definition / kurze Antwort
  traditionellHtml?: string;       // was das traditionelle Konzept meint
  praxisHtml?: string;             // wie es in der TCM-Praxis verwendet wird
  abgrenzungHtml?: string;         // was es NICHT bedeutet
  evidenzHtml?: string;            // moderne medizinische / Evidenz-Perspektive
  relevanzHtml?: string;           // praktische Relevanz fuer Patient:innen
  arztHinweisHtml?: string;        // wann aerztliche Abklaerung zaehlt (wo anwendbar)
  sources?: { label: string; url?: string }[];
  // Beziehungen als Slug-Listen, aufgelöst gegen die bestehenden Datenquellen:
  relatedConcepts?: string[];      // TcmEntity.slug
  relatedPatterns?: string[];      // TcmEntity.slug
  relatedMeridians?: string[];     // TcmEntity.slug
  relatedPoints?: string[];        // TcmEntity.slug
  relatedSignals?: string[];       // koerpersignale slug
  relatedConditions?: string[];    // beschwerden slug
  relatedTherapies?: string[];     // therapien slug
  relatedDiagnostics?: string[];   // DIAGNOSTICS id (schulmedizinisch) ODER TcmEntity slug
  relatedVisuals?: string[];       // visuals slug
  /** Bestehende Nicht-Graph-URLs (Fragen/Wissen), nur echte URLs. */
  relatedLinks?: TcmLink[];
}

// Foundation-Welle 4A: 7 genehmigte Konzepte, alle draft (Editorial ausstehend).
// URL-Schema (mit Sektion, wie "TCM verstehen -> Kategorie -> Leaf"):
// /gesundheitsbibliothek/tcm-verstehen/<section>/<slug>/
export const tcmEntities: TcmEntity[] = [
  {
    type: 'tcm-concept', slug: 'qi', section: 'grundlagen',
    status: 'draft', indexable: false,
    nav: 'Qi',
    title: 'Qi in der TCM: Was der Begriff bedeutet',
    metaDesc: 'Was meint die TCM mit Qi? Warum Übersetzungen wie "Energie" nur Annäherungen sind, wie der Begriff in der Praxis verwendet wird und was er nicht bedeutet.',
    h1: 'Qi: Was meint die TCM damit?',
    sources: [
      { label: 'National Center for Complementary and Integrative Health: Traditional Chinese Medicine - What You Need To Know' },
      { label: 'Stanford Encyclopedia of Philosophy: Chinese Metaphysics' },
    ],
    relatedConcepts: ['yin-und-yang', 'fuenf-elemente'],
    relatedTherapies: ['akupunktur'],
  },
  {
    type: 'tcm-concept', slug: 'yin-und-yang', section: 'grundlagen',
    status: 'draft', indexable: false,
    nav: 'Yin und Yang',
    title: 'Yin und Yang: Bedeutung in der Chinesischen Medizin',
    metaDesc: 'Yin und Yang als Ordnungsprinzip der TCM: was das Begriffspaar traditionell beschreibt, wie es in der Behandlung genutzt wird und was es nicht ist.',
    h1: 'Yin und Yang: Bedeutung in der TCM',
    sources: [
      { label: 'Stanford Encyclopedia of Philosophy: Chinese Metaphysics' },
      { label: 'Stanford Encyclopedia of Philosophy: Philosophy in Han Dynasty China' },
    ],
    relatedConcepts: ['qi', 'fuenf-elemente'],
  },
  {
    type: 'tcm-concept', slug: 'fuenf-elemente', section: 'grundlagen',
    status: 'draft', indexable: false,
    nav: 'Fünf Elemente',
    title: 'Fünf Elemente der TCM: Holz, Feuer, Erde, Metall, Wasser',
    metaDesc: 'Die Fünf Elemente (Wandlungsphasen) der TCM: was das traditionelle Modell beschreibt, wie es in der Praxis verwendet wird und wo seine Grenzen liegen.',
    h1: 'Die Fünf Elemente der TCM',
    sources: [
      { label: 'Stanford Encyclopedia of Philosophy: Chinese Metaphysics' },
      { label: 'Stanford Encyclopedia of Philosophy: Philosophy in Han Dynasty China' },
    ],
    relatedConcepts: ['qi', 'yin-und-yang', 'organuhr'],
  },
  {
    type: 'tcm-concept', slug: 'organuhr', section: 'grundlagen',
    status: 'draft', indexable: false,
    nav: 'TCM-Organuhr',
    title: 'TCM-Organuhr: Das traditionelle 24-Stunden-Modell erklärt',
    metaDesc: 'Die chinesische Organuhr: was das traditionelle 24-Stunden-Modell beschreibt, wie nächtliches Aufwachen traditionell gedeutet wird und wo die Grenzen liegen.',
    h1: 'Die TCM-Organuhr: Was das Modell beschreibt und was nicht',
    sources: [
      { label: 'National Institute of General Medical Sciences: Circadian Rhythms' },
      { label: 'Samuels N. Chronotherapy in traditional Chinese medicine. American Journal of Chinese Medicine, 2000.' },
      { label: 'National Center for Complementary and Integrative Health: Traditional Chinese Medicine - What You Need To Know' },
    ],
    relatedConcepts: ['fuenf-elemente', 'qi'],
    relatedSignals: ['herzklopfen-im-liegen', 'nachtschweiss-ohne-fieber'],
    relatedConditions: ['schlafprobleme'],
  },
  {
    type: 'tcm-concept', slug: 'meridiane', section: 'meridiane-punkte',
    status: 'draft', indexable: false,
    nav: 'Meridiane',
    title: 'Meridiane in der TCM: Das Leitbahnen-Modell erklärt',
    metaDesc: 'Was Meridiane in der TCM sind: das traditionelle Leitbahnen-Modell, seine Rolle in der Akupunktur und warum Meridiane keine anatomischen Strukturen sind.',
    h1: 'Meridiane: Das Leitbahnen-Modell der TCM',
    sources: [
      { label: 'National Center for Complementary and Integrative Health: Acupuncture - Effectiveness and Safety' },
      { label: 'Peer-reviewed research on the anatomical basis of acupuncture meridians: anatomical basis remains unresolved' },
    ],
    relatedConcepts: ['qi'],
    relatedTherapies: ['akupunktur', 'akupressur'],
  },
  {
    type: 'tcm-diagnostic', slug: 'zungendiagnostik', section: 'diagnostik',
    status: 'draft', indexable: false,
    nav: 'Zungendiagnostik',
    title: 'Zungendiagnostik in der TCM: Was die Zunge zeigt und was nicht',
    metaDesc: 'Zungendiagnostik der TCM: was Therapeut:innen an Farbe, Form und Belag beobachten, wie das Bild in die Einschätzung einfliesst und was es nicht leisten kann.',
    h1: 'Zungendiagnostik: Wie die TCM die Zunge betrachtet',
    sources: [
      { label: 'Experimental Studies of Inter-Rater Agreement in Traditional Chinese Medicine: A Systematic Review' },
      { label: 'Research on intra-rater and inter-rater reliability of TCM tongue assessment' },
    ],
    relatedDiagnostics: ['pulsdiagnostik'],
    relatedSignals: ['zungenbrennen'],
    relatedLinks: [
      { href: '/gesundheitsbibliothek/fragen/was-passiert-beim-ersten-termin/', label: 'Was passiert beim ersten Termin?', cat: 'Frage' },
    ],
  },
  {
    type: 'tcm-diagnostic', slug: 'pulsdiagnostik', section: 'diagnostik',
    status: 'draft', indexable: false,
    nav: 'Pulsdiagnostik',
    title: 'Pulsdiagnostik in der TCM: Was das Pulstasten erfasst',
    metaDesc: 'Pulsdiagnostik der TCM: warum an beiden Handgelenken getastet wird, welche Qualitäten traditionell unterschieden werden und was das Verfahren nicht ersetzt.',
    h1: 'Pulsdiagnostik: Wie die TCM den Puls tastet',
    sources: [
      { label: 'Experimental Studies of Inter-Rater Agreement in Traditional Chinese Medicine: A Systematic Review' },
      { label: 'Can Traditional Chinese Medicine Diagnosis Be Parameterized and Standardized? A Narrative Review' },
    ],
    relatedDiagnostics: ['zungendiagnostik'],
    relatedLinks: [
      { href: '/gesundheitsbibliothek/fragen/was-passiert-beim-ersten-termin/', label: 'Was passiert beim ersten Termin?', cat: 'Frage' },
    ],
  },
];

export const publishedTcmEntities = tcmEntities.filter((e) => e.status === 'published');
export const tcmEntityBySlug = (slug: string) => tcmEntities.find((e) => e.slug === slug);

export interface TcmSection {
  slug: string;
  nav: string;
  title: string;
  metaDesc: string;
  h1: string;
  lead: string;
  indexable: boolean;
  /** Traditionelles-Modell-Hinweis prominent anzeigen (Muster, Diagnostik). */
  modellHinweis?: boolean;
  introHtml: string;
  /** Bestehende Inhalte, die heute schon in diese Sektion gehören (nur echte URLs). */
  vorhandene: TcmLink[];
  /** Geplante Themen als reiner Text (KEINE Links, keine URLs, kein Fake-Inhalt). */
  geplant: string[];
}

export const tcmSections: TcmSection[] = [
  {
    slug: 'grundlagen',
    nav: 'Grundlagen & Begriffe',
    title: 'TCM-Grundlagen & Begriffe',
    metaDesc: 'Qi, Yin und Yang, Fünf Elemente, Organuhr: die Grundbegriffe der Traditionellen Chinesischen Medizin, modern und verständlich eingeordnet.',
    h1: 'Grundlagen & Begriffe',
    lead: 'Was meint die TCM, wenn sie von Qi, Yin und Yang oder den Fünf Elementen spricht? Hier entsteht das Begriffslexikon: traditionelle Konzepte, modern erklärt.',
    indexable: false,
    introHtml: '<p>Die Traditionelle Chinesische Medizin arbeitet mit eigenen Begriffen und Denkmodellen, die über 2000 Jahre gewachsen sind. Wer sie zum ersten Mal hört, versteht oft nur Bahnhof. Diese Sektion übersetzt: Was ist mit einem Begriff traditionell gemeint, wie nutzt ihn die Therapeutin in der Praxis, und wie ist er aus heutiger medizinischer Sicht einzuordnen? Wichtig vorweg: Es handelt sich um traditionelle Erklärungsmodelle, nicht um anatomische oder biomedizinische Fakten.</p>',
    vorhandene: [
      { href: '/therapien/', label: 'Therapien im Überblick', cat: 'Therapien' },
      { href: '/gesundheitsbibliothek/fragen/was-passiert-beim-ersten-termin/', label: 'Was passiert beim ersten Termin?', cat: 'Frage' },
    ],
    geplant: ['Qi', 'Yin und Yang', 'Fünf Elemente', 'TCM-Organuhr', 'TCM-Ernährung', 'Jing', 'Shen', 'Blut (Xue)'],
  },
  {
    slug: 'muster',
    nav: 'TCM-Muster',
    title: 'TCM-Muster & Syndrome',
    metaDesc: 'Qi-Mangel, Leber-Qi-Stagnation, Yin-Mangel: was TCM-Muster bedeuten, wie Therapeutinnen sie nutzen und was sie NICHT sind: schulmedizinische Diagnosen.',
    h1: 'TCM-Muster',
    lead: 'Leber-Qi-Stagnation, Milz-Qi-Mangel, Yin-Mangel: Die TCM ordnet Beschwerden in traditionelle Muster ein. Hier entsteht die Übersicht, was diese Begriffe bedeuten und was nicht.',
    indexable: false,
    modellHinweis: true,
    introHtml: '<p>Wenn eine TCM-Therapeutin von einem Muster wie Qi-Stagnation oder Yin-Mangel spricht, ist das eine traditionelle Arbeitsdiagnose: eine Einordnung von Beschwerden, Puls- und Zungenbild nach den Kategorien der chinesischen Medizin. Sie hilft, die Behandlung zu wählen. Sie ist keine schulmedizinische Diagnose und ersetzt keine ärztliche Abklärung. Genau diese doppelte Lesart wird jede Muster-Seite in dieser Sektion sauber trennen.</p>',
    vorhandene: [
      { href: '/gesundheitsbibliothek/fragen/wann-zuerst-zum-arzt/', label: 'Wann sollte ich zuerst zum Arzt?', cat: 'Frage' },
      { href: '/koerpersignale/', label: 'Körpersignale einordnen', cat: 'Körpersignale' },
    ],
    geplant: ['Qi-Mangel', 'Qi-Stagnation', 'Leber-Qi-Stagnation', 'Milz-Qi-Mangel', 'Yin-Mangel', 'Yang-Mangel', 'Blut-Mangel', 'Blut-Stase', 'Feuchtigkeit', 'Hitze', 'Kälte'],
  },
  {
    slug: 'meridiane-punkte',
    nav: 'Meridiane & Punkte',
    title: 'Meridiane & Akupunkturpunkte',
    metaDesc: 'Meridiane, Akupunkturpunkte und Akupressurpunkte: wie das traditionelle Leitbahnen-Modell aufgebaut ist und wie Punkte in der Behandlung eingesetzt werden.',
    h1: 'Meridiane & Punkte',
    lead: 'Wo liegen die Leitbahnen der TCM, welche Punkte nutzt die Akupunktur, und was kannst du mit Akupressur selbst tun? Hier entsteht die Übersicht über Meridiane und Punkte.',
    indexable: false,
    introHtml: '<p>Das Meridian-Modell beschreibt traditionell zwölf Hauptleitbahnen, auf denen die Akupunkturpunkte liegen. Es ist ein historisch gewachsenes Ordnungssystem für die Punktauswahl, kein anatomischer Befund: Meridiane sind mit bildgebenden Verfahren nicht darstellbar. In der Praxis relevant bleibt das System trotzdem, weil es beschreibt, welche Punkte bei welchen Beschwerden kombiniert werden. Diese Sektion wird die wichtigsten Meridiane und die meistgenutzten Punkte einzeln vorstellen, inklusive dem, was du mit Akupressur selbst ausprobieren kannst.</p>',
    vorhandene: [
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
      { href: '/therapien/akupressur/', label: 'Akupressur', cat: 'Therapie' },
      { href: '/therapien/ohrakupunktur/', label: 'Ohrakupunktur', cat: 'Therapie' },
      { href: '/wissen/wie-lange-bleiben-akupunkturnadeln-drin/', label: 'Wie lange bleiben die Nadeln drin?', cat: 'Artikel' },
    ],
    geplant: ['Die 12 Hauptmeridiane', 'Akupunkturpunkte: Überblick', 'Akupressurpunkte Hand', 'Akupressurpunkte Fuss', 'Lungenmeridian', 'Lebermeridian', 'Magenmeridian', 'Nierenmeridian', 'Dickdarmmeridian', 'Einzelne Punkte (z.B. Neiguan PC6, Hegu Di4, Zusanli Ma36)'],
  },
  {
    slug: 'diagnostik',
    nav: 'Diagnostik in der TCM',
    title: 'Diagnostik in der TCM',
    metaDesc: 'Zungendiagnose, Pulsdiagnose, TCM-Anamnese: wie eine TCM-Diagnose entsteht, was Therapeutinnen beobachten und was das Verfahren nicht leisten kann.',
    h1: 'Diagnostik in der TCM',
    lead: 'Puls tasten, Zunge anschauen, ausführlich fragen: So entsteht eine TCM-Einschätzung. Hier entsteht die Erklärung der traditionellen Diagnostik, ehrlich eingeordnet.',
    indexable: false,
    modellHinweis: true,
    introHtml: '<p>Die TCM-Diagnostik stützt sich auf Beobachtung: das Tasten des Pulses an beiden Handgelenken, das Betrachten von Zungenfarbe und Zungenbelag und eine ausführliche Anamnese zu Schlaf, Verdauung, Energie und Zyklus. Daraus entsteht die traditionelle Einordnung, nach der behandelt wird. Wichtig zur Abgrenzung: Diese Verfahren sind Einschätzungsinstrumente der chinesischen Medizin, keine medizinische Diagnostik. Blutwerte, Bildgebung und ärztliche Untersuchungen ersetzen sie nicht; was die Schulmedizin einsetzt, findest du unter <a href="/gesundheitsbibliothek/#diagnostik">Untersuchungen &amp; Diagnostik</a>.</p>',
    vorhandene: [
      { href: '/gesundheitsbibliothek/fragen/was-passiert-beim-ersten-termin/', label: 'Was passiert beim ersten Termin?', cat: 'Frage' },
      { href: '/gesundheitsbibliothek/fragen/erster-termin/', label: 'Erster Termin & Vorbereitung', cat: 'Fragen' },
      { href: '/gesundheitsbibliothek/untersuchungen/nervenleitmessung/', label: 'Nervenleitmessung (schulmedizinisch)', cat: 'Untersuchung' },
    ],
    geplant: ['Zungendiagnose', 'Zungenfarbe und Zungenbelag', 'Pulsdiagnose und Pulsqualitäten', 'Die TCM-Anamnese', 'Wie eine TCM-Diagnose entsteht'],
  },
  {
    slug: 'methoden',
    nav: 'Methoden erklärt',
    title: 'TCM-Methoden erklärt',
    metaDesc: 'Akupressur, Gua Sha, Moxibustion, Schröpfen, Ohrakupunktur, Kräutertherapie: alle TCM-Methoden mit Wirkung, Ablauf und Kostenübernahme, an einem Ort.',
    h1: 'Methoden erklärt',
    lead: 'Von Akupressur bis Schröpfen: Jede Methode der chinesischen Medizin hat ihre eigene Seite mit Wirkung, Ablauf, Grenzen und Kostenübernahme. Hier ist der Überblick.',
    indexable: true,
    introHtml: '<p>Die Behandlungsmethoden sind der praktischste Einstieg in die chinesische Medizin, und sie sind auf TCM.ch bereits ausführlich erklärt. Diese Übersicht bündelt die bestehenden Methoden-Seiten und die vertiefenden Artikel dazu. Für Wirkung, Ablauf, Kosten und Grenzen einer Methode ist immer die verlinkte Hauptseite der richtige Ort.</p>',
    vorhandene: [
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
      { href: '/therapien/akupressur/', label: 'Akupressur', cat: 'Therapie' },
      { href: '/therapien/gua-sha/', label: 'Gua Sha', cat: 'Therapie' },
      { href: '/therapien/schroepfen/', label: 'Schröpfen', cat: 'Therapie' },
      { href: '/therapien/moxibustion/', label: 'Moxibustion (Moxa)', cat: 'Therapie' },
      { href: '/therapien/ohrakupunktur/', label: 'Ohrakupunktur', cat: 'Therapie' },
      { href: '/therapien/kraeutertherapie/', label: 'Chinesische Kräutertherapie', cat: 'Therapie' },
      { href: '/therapien/tuina/', label: 'Tuina', cat: 'Therapie' },
      { href: '/wissen/schroepfen-wirkung-flecken/', label: 'Schröpfen: Wirkung und Flecken', cat: 'Artikel' },
      { href: '/wissen/elektroakupunktur-wirkung/', label: 'Elektroakupunktur: Wirkung', cat: 'Artikel' },
      { href: '/wissen/dauernadeln-akupunktur/', label: 'Dauernadeln', cat: 'Artikel' },
      { href: '/wissen/dry-needling-vs-akupunktur/', label: 'Dry Needling vs. Akupunktur', cat: 'Artikel' },
      { href: '/gesundheitsbibliothek/fragen/schroepfen-methoden/', label: 'Häufige Fragen zu den Methoden', cat: 'Fragen' },
    ],
    geplant: [],
  },
];

export const tcmSectionBySlug = (slug: string) => tcmSections.find((s) => s.slug === slug);
