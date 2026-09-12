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
export interface TcmEntity {
  type: TcmEntityType;
  slug: string;
  section: 'grundlagen' | 'muster' | 'meridiane-punkte' | 'diagnostik' | 'methoden';
  title: string;
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
}
// Leer bis zur ersten Inhalts-Welle. Keine Platzhalter-Einträge anlegen.
export const tcmEntities: TcmEntity[] = [];

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
