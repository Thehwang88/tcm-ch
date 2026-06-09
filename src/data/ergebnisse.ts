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

export interface ErgebnisReport {
  slug: string;                     // URL slug under /ergebnisse/<slug>
  condition: string;                // Beschwerde (DE), e.g. "Rückenschmerzen"
  instruments: ErgebnisInstrument[];// validated measurement instruments
  status: 'draft' | 'published';    // draft => NOINDEX + nicht in Sitemap
  publishedDate: string | null;     // ISO date when published, else null
  dataNote: string;                 // honest note on the current data state

  // ── Editorial content (textual, hedged, ohne Zahlen) ──
  title: string;
  description: string;
  lead: string;
  methodik: string[];               // wie wir messen
  ablauf: { step: string; text: string }[];
  notWorking: string[];             // "Was nicht funktioniert hat" — Grenzen
  redFlags: string[];               // wann zuerst zum Arzt
  datenschutz: string[];            // nDSG-konforme Datenverarbeitung
  faqs: ErgebnisFaq[];
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
      'Dieser Bericht ist in Vorbereitung. Wir erheben aktuell Daten und veröffentlichen Ergebnisse erst, sobald genügend anonymisierte Verläufe vorliegen, um eine ehrliche Aussage zu treffen. Bis dahin stehen unten bewusst keine Zahlen.',
    title: 'Ergebnisse bei Rückenschmerzen',
    description:
      'Wie wir Behandlungsergebnisse bei Rückenschmerzen mit validierten Instrumenten messen. Methodik, Ablauf und Datenschutz transparent erklärt. Erste Zahlen folgen, sobald genügend Daten erhoben sind.',
    lead:
      'Rückenschmerzen sind einer der häufigsten Gründe, weshalb Menschen zu uns kommen. Hier zeigen wir offen, wie wir den Verlauf messen und was die Daten später sagen werden. Solange noch keine ausreichenden Daten vorliegen, findest du hier keine Zahlen, sondern nur die Methodik.',
    methodik: [
      'Wir messen Schmerz und Funktion vor Behandlungsbeginn und im Verlauf mit denselben validierten Instrumenten, damit Werte über die Zeit vergleichbar bleiben.',
      'Alle Angaben kommen direkt von dir als Selbstauskunft. Wir rechnen nichts schön und ergänzen keine Werte, die nicht erhoben wurden.',
      'Ergebnisse werden anonymisiert und nur aggregiert ausgewertet. Einzelne Personen sind in den späteren Auswertungen nicht erkennbar.',
      'Wir berichten auch dann, wenn die Daten keinen klaren Nutzen zeigen. Das gehört zu einer ehrlichen Auswertung dazu.',
    ],
    ablauf: [
      { step: 'Erstgespräch', text: 'Wir klären deine Beschwerden, prüfen Warnzeichen und erfassen den Ausgangswert mit den Messinstrumenten.' },
      { step: 'Behandlungsserie', text: 'Statt einer Einzelsitzung planen wir in der Regel eine kurze Serie und erheben den Verlauf zwischendurch erneut.' },
      { step: 'Verlaufskontrolle', text: 'Wir vergleichen die Werte mit dem Ausgangspunkt und besprechen mit dir, ob und wie es weitergeht.' },
      { step: 'Auswertung', text: 'Anonymisierte Werte fliessen aggregiert in den späteren Ergebnisbericht ein.' },
    ],
    notWorking: [
      'Akupunktur und manuelle Verfahren ersetzen weder Bewegung noch ärztliche Abklärung. Wer inaktiv bleibt, profitiert erfahrungsgemäss weniger.',
      'Nicht bei allen Personen verbessern sich die Werte. Wo der Verlauf ausbleibt, sagen wir das offen und passen den Plan an oder verweisen weiter.',
      'Bei klaren strukturellen Ursachen oder Warnzeichen ist eine TCM-Behandlung nicht der richtige erste Schritt.',
    ],
    redFlags: [
      'Rückenschmerzen nach einem schweren Sturz oder Unfall',
      'Taubheit, Kribbeln oder Schwäche in den Beinen, oder Verlust der Kontrolle über Blase oder Darm (sofort ärztlich abklären)',
      'Ungewollter Gewichtsverlust, Fieber oder eine Krebserkrankung in der Vorgeschichte zusammen mit neuen Rückenschmerzen',
      'Schmerz, der nachts stark ist oder kontinuierlich zunimmt statt zu schwanken',
    ],
    datenschutz: [
      'Wir verarbeiten Gesundheitsdaten nach dem Schweizer Datenschutzgesetz (nDSG).',
      'Für die Veröffentlichung werden Daten anonymisiert und nur aggregiert ausgewertet, sodass keine Rückschlüsse auf einzelne Personen möglich sind.',
      'Du entscheidest, ob deine anonymisierten Verlaufsdaten in die Auswertung einfliessen, und kannst dem jederzeit widersprechen.',
    ],
    faqs: [
      {
        q: 'Warum stehen hier noch keine Zahlen?',
        a: 'Weil wir keine Zahlen veröffentlichen, bevor genügend Daten vorliegen. Lieber transparent leer als zu früh und irreführend. Sobald die Datenbasis ausreicht, ergänzen wir die Ergebnisse an dieser Stelle.',
      },
      {
        q: 'Wie messt ihr den Erfolg einer Behandlung?',
        a: 'Mit validierten Instrumenten wie der NRS für Schmerz und dem Oswestry Disability Index für die Alltagsfunktion. Wir erfassen die Werte vor Beginn und im Verlauf und vergleichen sie.',
      },
      {
        q: 'Sind meine Daten geschützt?',
        a: 'Ja. Wir verarbeiten Gesundheitsdaten nach dem nDSG. Für Auswertungen werden Daten anonymisiert und nur aggregiert genutzt, einzelne Personen sind nicht erkennbar.',
      },
      {
        q: 'Übernimmt die Krankenkasse die Behandlung?',
        a: 'Behandlungen durch unsere EMR-/ASCA-anerkannten Therapeut:innen werden in der Regel über die Zusatzversicherung für Komplementärmedizin abgerechnet, nicht über die Grundversicherung. Wie viel du zurückbekommst, hängt von deiner Police ab.',
      },
    ],
  },
];

export const reportBySlug = (slug: string): ErgebnisReport | undefined =>
  reports.find((r) => r.slug === slug);

export const publishedReports = (): ErgebnisReport[] =>
  reports.filter((r) => r.status === 'published');
