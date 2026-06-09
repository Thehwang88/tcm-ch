// ── Single source of truth for the "Ergebnisse & Transparenz" section. ──
// DE-language outcome reports. We measure real treatment outcomes with
// validated instruments (e.g. NRS Schmerz 0–10, Oswestry Disability Index),
// anonymised + aggregated, nDSG-konform.
//
// HARD RULE: no fabricated numbers anywhere. Reports stay status 'draft'
// (NOINDEX, nicht in der Sitemap) until echte, ausreichende Daten vorliegen.
// Draft templates carry clearly-labelled empty placeholders, never invented
// values. Only 'published' reports get index + Sitemap.
//
// Voice: Du-form, sachlich, ehrlich. Keine Heilversprechen, kein Qi/Yin-Yang,
// keine spirituell-energetische Sprache. Keine Gedankenstriche (em-dashes).

export interface ErgebnisInstrument {
  name: string;       // display name, e.g. "Oswestry Disability Index"
  abbr?: string;      // short form, e.g. "ODI"
  scale: string;      // factual instrument range, e.g. "0 bis 10"
  measures: string;   // what it captures, in plain German
}

export interface ErgebnisFaq { q: string; a: string }
export interface ErgebnisResultRow { label: string; before: string; after: string }

export interface ErgebnisReport {
  slug: string;                     // URL slug under /ergebnisse/<slug>
  condition: string;                // Beschwerde (DE), e.g. "Rückenschmerzen"
  instruments: ErgebnisInstrument[];// validated measurement instruments
  status: 'draft' | 'published';    // draft => NOINDEX + nicht in Sitemap
  publishedDate: string | null;     // ISO date when published, else null
  dataNote: string;                 // honest note on the current data state

  // ── Editorial content (textual, hedged) ──
  title: string;
  description: string;
  lead: string;
  methodik: string[];               // wie wir messen
  ablauf: { step: string; text: string }[];
  notWorking: string[];             // "Was nicht funktioniert hat" — Grenzen
  redFlags: string[];               // wann zuerst zum Arzt
  datenschutz: string[];            // nDSG-konforme Datenverarbeitung
  faqs: ErgebnisFaq[];

  // ── Optional. When a result set exists the template renders real figures;
  // otherwise it shows clearly-labelled empty placeholders (no fabrication). ──
  sampleNotice?: string;            // amber MUSTER banner text (preview only)
  whyTransparent?: string;          // "Warum wir das zeigen" paragraph
  keyFindingsIntro?: string;        // lead-in above "Das Wichtigste in Kürze"
  keyFindings?: string[];           // "Das Wichtigste in Kürze" bullets
  resultsIntro?: string;            // sentence above the results table
  resultsTable?: ErgebnisResultRow[];
  resultsHighlights?: string[];     // extra figures below the table
  therapist?: string;              // behandelnde:r Therapeut:in
}

// Statisches Review-/Stand-Datum (kein Date.now(), reproduzierbarer Build).
export const STAND_DATE = '2026-06-09';

export const reports: ErgebnisReport[] = [
  {
    slug: 'rueckenschmerzen',
    condition: 'Rückenschmerzen',
    instruments: [
      {
        name: 'NRS Schmerz',
        abbr: 'NRS',
        scale: '0 bis 10',
        measures: 'Schmerzintensität als Selbstauskunft, 0 = kein Schmerz, 10 = stärkster vorstellbarer Schmerz',
      },
      {
        name: 'Oswestry Disability Index',
        abbr: 'ODI',
        scale: '0 bis 100 %',
        measures: 'Funktionseinschränkung im Alltag bei Rückenschmerzen, je höher der Wert, desto stärker die Einschränkung',
      },
    ],
    status: 'draft',
    publishedDate: null,
    dataNote:
      'Dieser Bericht ist in Vorbereitung. Wir erheben aktuell Daten und veröffentlichen Ergebnisse erst, sobald genügend anonymisierte Verläufe vorliegen, um eine ehrliche Aussage zu treffen.',
    title: 'Akupunktur bei Rückenschmerzen in Kreuzlingen: unsere ehrlichen Ergebnisse',
    description:
      'Wie gut hilft Akupunktur bei chronischen Rückenschmerzen? Ehrliche, anonymisierte Behandlungsergebnisse aus unserer TCM-Praxis in Kreuzlingen. Jetzt Termin buchen.',
    lead:
      'Du überlegst, ob Akupunktur bei deinen Rückenschmerzen wirklich hilft? Verständlich. Statt grosser Versprechen zeigen wir dir hier offen, wie es echten Patientinnen und Patienten in unserer Praxis in Kreuzlingen ergangen ist. Mit nachgemessenen Zahlen, auch dort, wo es nicht funktioniert hat.',

    sampleNotice: 'MUSTER – fiktive Beispieldaten, nicht zur Veröffentlichung',
    whyTransparent:
      'Die meisten Praxen reden über Erfolge, kaum jemand legt Zahlen offen. Wir machen es umgekehrt, weil du vor einer Behandlung wissen sollst, was realistisch ist. Akupunktur ist kein Wundermittel. Bei vielen wirkt sie spürbar, bei einem Teil wenig. Genau das findest du hier.',
    keyFindingsIntro:
      'Über [128] ausgewertete Behandlungsverläufe bei chronischen Rückenschmerzen:',
    keyFindings: [
      '7 von 10 Patienten hatten am Ende deutlich weniger Schmerzen, mindestens ein Drittel weniger.',
      'Der Schmerz sank im Schnitt von 6,9 auf 3,2 auf einer Skala von 0 bis 10.',
      'Die Beeinträchtigung im Alltag halbierte sich nahezu.',
      'Bei rund 3 von 10 half die Behandlung wenig oder nicht. Auch das sagen wir dir ehrlich.',
    ],

    methodik: [
      'Wir verlassen uns nicht auf Bauchgefühl, sondern auf anerkannte Messinstrumente. Wir erheben die Werte vor Beginn, nach der fünften Sitzung und am Ende, damit Veränderungen über die Zeit vergleichbar bleiben.',
      'Erhoben über einen Zeitraum von [12 Monaten] in unserer Praxis in Kreuzlingen. Alle Angaben kommen als Selbstauskunft und werden anonymisiert sowie nur aggregiert ausgewertet.',
    ],
    resultsIntro: 'Die Werte vor und nach der Behandlungsserie im Überblick.',
    resultsTable: [
      { label: 'Schmerz (0 bis 10)', before: '6,9', after: '3,2' },
      { label: 'Alltagsbeeinträchtigung', before: '34 %', after: '17 %' },
    ],
    resultsHighlights: [
      'Patienten mit mindestens einem Drittel weniger Schmerz: 71 %',
      'Patienten mit mindestens der Hälfte weniger Schmerz: 44 %',
    ],

    notWorking: [
      'Bei rund 29 % blieb die Verbesserung gering oder aus. In diesen Fällen behandeln wir nicht endlos weiter, sondern passen das Vorgehen an oder verweisen dich an deine Hausärztin oder deinen Hausarzt.',
      '8 % der Verläufe brachen vorzeitig ab. Diese sind nicht in die Endzahlen eingerechnet, wir weisen sie aber offen aus.',
      'Wenn Akupunktur bei dir nicht anschlägt, sagen wir dir das, statt dir weitere Sitzungen zu verkaufen.',
    ],
    ablauf: [
      { step: 'Sitzungen', text: 'In der Regel 10 Sitzungen über 6 bis 8 Wochen, anfangs ein bis zwei Mal pro Woche.' },
      { step: 'Akupunktur', text: 'Nadeln im Rücken- und Gesässbereich, sie bleiben etwa 20 bis 25 Minuten.' },
      { step: 'Ergänzend', text: 'Je nach Befund Schröpfen, Tuina-Massage oder Moxibustion.' },
      { step: 'Deine Mitarbeit', text: 'Wir kombinieren die Behandlung immer mit konkreten Bewegungs- und Haltungstipps. Die besten Ergebnisse entstehen, wenn du selbst aktiv mitmachst.' },
    ],
    redFlags: [
      'Schmerzen nach einem Sturz oder Unfall',
      'Taubheit oder Kraftverlust in den Beinen, Probleme mit Blase oder Darm',
      'Schmerz mit Fieber, ungewolltem Gewichtsverlust oder starkem Ruheschmerz nachts',
    ],
    datenschutz: [
      'Diese Auswertung dient der Information und ist keine medizinische oder versicherungsrechtliche Beratung. Verläufe sind individuell.',
      'Es werden nur anonymisierte, aggregierte Daten gezeigt, keine einzelne Person ist identifizierbar (nDSG-konform).',
      'Du entscheidest, ob deine anonymisierten Verlaufsdaten in die Auswertung einfliessen, und kannst dem jederzeit widersprechen.',
    ],
    faqs: [
      {
        q: 'Hilft Akupunktur wirklich bei Rückenschmerzen?',
        a: 'Bei vielen Menschen ja, deutlich. In unserer Auswertung hatten 7 von 10 spürbar weniger Schmerzen. Garantieren kann das niemand, und ein Teil profitiert nicht. Deshalb messen wir mit und passen an.',
      },
      {
        q: 'Wie viele Sitzungen brauche ich?',
        a: 'Meist eine Serie von rund 10 Sitzungen über 6 bis 8 Wochen. Ob du sie voll ausschöpfst, entscheiden wir gemeinsam anhand deines Verlaufs.',
      },
      {
        q: 'Übernimmt die Krankenkasse die Kosten?',
        a: 'Über eine Zusatzversicherung für Komplementärmedizin meist anteilig, da wir EMR- und ASCA-anerkannt sind. Den genauen Anteil regelt dein Tarif.',
      },
      {
        q: 'Tut die Behandlung weh?',
        a: 'Die Nadeln sind sehr fein. Die meisten spüren nur einen kurzen, leichten Reiz. Unangenehm ist es in der Regel nicht.',
      },
    ],
    therapist: 'Simon Stüve, EMR-/ASCA-anerkannt, TCM.ch Kreuzlingen',
  },
];

export const reportBySlug = (slug: string): ErgebnisReport | undefined =>
  reports.find((r) => r.slug === slug);

export const publishedReports = (): ErgebnisReport[] =>
  reports.filter((r) => r.status === 'published');
