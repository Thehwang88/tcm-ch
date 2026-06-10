// ── Single source of truth for migrated Therapien (Astro static pages). ──
// Route: src/pages/therapien/[slug].astro (getStaticPaths). Phase 4.5 pilot:
// ONLY 'akupunktur'. Schema: MedicalTherapy + FAQPage + BreadcrumbList.
//
// VOICE: evidence-based only. No Qi / Yin-Yang / Meridiane / "Energiefluss" /
// "Selbstheilungskräfte aktivieren" / "löst Blockaden". The pilot's intro was
// rewritten to remove the one esoteric sentence in "Was ist Akupunktur?"; the
// rest of the SPA copy was already evidence-based and is preserved.

export interface TherapieFaq { q: string; a: string }
export interface TherapieLink { slug: string; label: string }

export interface Therapie {
  slug: string;
  name: string;
  title: string;
  metaDesc: string;
  lead: string;
  duration: string;       // e.g. "45–60 Min"
  sessions: string;       // e.g. "6–10"
  insurance: string;
  bodyHtml: string;       // evidence-based article (set:html)
  faqs: TherapieFaq[];
  beschwerden: TherapieLink[]; // related migrated /beschwerden pages
  therapies: TherapieLink[];   // related /therapien
}

export const therapien: Therapie[] = [
  {
    slug: 'akupunktur',
    name: 'Akupunktur',
    title: 'Akupunktur Schweiz – EMR-anerkannt, Termin in 24h',
    metaDesc:
      'Akupunktur in der Schweiz: geprüfte TCM-Praxen, EMR/ASCA anerkannt, Zusatzversicherung 80–100%. Evidenzbasiert bei Schmerzen, Migräne und mehr. Termin oft in 24h.',
    lead:
      'Feine Nadeln an definierten Körperpunkten — eine der am besten erforschten komplementärmedizinischen Methoden. EMR-/ASCA-anerkannt, Termin oft innert 24 Stunden.',
    duration: '45–60 Min',
    sessions: '6–10',
    insurance: 'Zusatzversicherung oft anerkannt',
    bodyHtml:
      `<h2>Was ist Akupunktur?</h2><p>Akupunktur ist die bekannteste Methode der Traditionellen Chinesischen Medizin und wird seit über 2000 Jahren angewendet. Feine, sterile Einmalnadeln werden an definierten Punkten des Körpers gesetzt. Die moderne Forschung erklärt die Wirkung über die Reizung von Nerven, die Ausschüttung körpereigener Botenstoffe (unter anderem Endorphine) und Einflüsse auf die Schmerzverarbeitung im Nervensystem. Akupunktur zählt heute zu den weltweit am besten untersuchten komplementärmedizinischen Methoden; die WHO listet zahlreiche Indikationen, bei denen Wirksamkeit klinisch dokumentiert ist.</p><h2>Wissenschaftliche Evidenz</h2><p>Akupunktur zählt zu den am besten untersuchten ergänzenden Therapien. Meta-Analysen zeigen Wirksamkeit bei chronischen Schmerzen (Rücken, Nacken, Knie), Migräne, Spannungskopfschmerzen, in der Fertilitätsbehandlung sowie bei Schwangerschafts- und postoperativer Übelkeit. In der Schweiz ist Akupunktur seit 2012 als ärztliche Leistung über die Grundversicherung erstattbar (bei entsprechender FMH-Fähigkeit) und über die Zusatzversicherung (EMR/ASCA-anerkannt) breit gedeckt.</p><h2>Behandlungsablauf bei TCM.ch</h2><ul><li><strong>Erstgespräch und Diagnose:</strong> ausführliche Anamnese, Puls- und Zungendiagnostik</li><li><strong>Individuelle Behandlungsplanung:</strong> abgestimmt auf dein Beschwerdebild</li><li><strong>Nadelsetzen:</strong> 8–20 sterile Einmalnadeln, schmerzarm. Meist nur leichter Druck spürbar</li><li><strong>Ruhezeit:</strong> 20–30 Minuten Liegen mit Nadeln, viele Patient:innen entspannen tief</li><li><strong>Nachbesprechung:</strong> Beobachtungen, gegebenenfalls Kräuter- oder Ernährungsempfehlungen</li></ul><h2>Kosten und Krankenkassenübernahme</h2><p>Eine Sitzung kostet bei TCM.ch zwischen CHF 130 und CHF 160 (45–60 Minuten). Mit anerkannter Zusatzversicherung (EMR/ASCA) übernimmt die Krankenkasse 80–100 % der Kosten. Wir prüfen die Deckung für dich kostenlos vor der ersten Sitzung; viele Versicherungen erstatten 10–20 Sitzungen pro Jahr.</p><h2>Wie viele Sitzungen brauche ich?</h2><p>Bei akuten Beschwerden zeigen sich meist nach 4–6 Sitzungen Verbesserungen. Chronische Themen brauchen 8–12 Sitzungen für nachhaltige Effekte. Wir empfehlen anfangs 1–2 Termine pro Woche, später monatliche Erhaltungstermine. Wenn nach 4 Sitzungen keinerlei Veränderung spürbar ist, besprechen wir gemeinsam, ob eine andere Methode geeigneter wäre.</p><h2>Wann ist Akupunktur nicht geeignet?</h2><p>Bei schweren Blutgerinnungsstörungen, akuten Infektionen, unbehandelten Tumoren im Behandlungsgebiet und während chemotherapeutischer Akutphasen wird Akupunktur nicht oder nur sehr zurückhaltend eingesetzt. In der Schwangerschaft werden bestimmte Punkte vermieden; gezielt eingesetzt kann Akupunktur jedoch bei Schwangerschaftsbeschwerden helfen.</p>`,
    faqs: [
      { q: 'Übernimmt die Krankenkasse Akupunktur in der Schweiz?', a: 'Ja, die meisten Schweizer Zusatzversicherungen (EMR/ASCA-anerkannt) übernehmen 80–100 % der Kosten für Akupunktur. Über die Grundversicherung nur bei ärztlicher Akupunktur durch Mediziner mit FMH-Fähigkeitsausweis. Wir prüfen die Deckung kostenlos vor der ersten Sitzung.' },
      { q: 'Wie viel kostet eine Akupunkturbehandlung?', a: 'Eine Sitzung kostet bei TCM.ch zwischen CHF 130 und CHF 160 (45–60 Minuten). Mit anerkannter Zusatzversicherung beträgt der Eigenanteil meist nur CHF 0–30 pro Sitzung.' },
      { q: 'Wie viele Akupunktur-Sitzungen brauche ich?', a: 'Bei akuten Beschwerden meist 4–6 Sitzungen, bei chronischen Themen 8–12 Sitzungen. Wir empfehlen am Anfang 1–2 Termine pro Woche, später zur Erhaltung 1× monatlich.' },
      { q: 'Tut Akupunktur weh?', a: 'Die Nadeln sind sehr fein, meist spürbar als leichter Druck oder ein kurzes Ziehen beim Einstich. Schmerzen sind nicht normal und sollten der Therapeutin gemeldet werden.' },
      { q: 'Ist Akupunktur in der Schwangerschaft sicher?', a: 'Ja, Akupunktur wird in der Schwangerschaft eingesetzt – bei Übelkeit, Rückenschmerzen und zur Geburtsvorbereitung. Bestimmte Punkte werden vermieden. Wichtig: Informiere die Therapeutin über die Schwangerschaft.' },
    ],
    beschwerden: [
      { slug: 'rueckenschmerzen', label: 'Rückenschmerzen' },
      { slug: 'migraene', label: 'Migräne' },
      { slug: 'nackenschmerzen', label: 'Nackenschmerzen' },
      { slug: 'kinderwunsch', label: 'Kinderwunsch' },
    ],
    therapies: [
      { slug: 'schroepfen', label: 'Schröpfen' },
      { slug: 'tuina', label: 'Tuina' },
      { slug: 'elektroakupunktur', label: 'Elektroakupunktur' },
    ],
  },
];

export const therapieBySlug = (slug: string): Therapie | undefined =>
  therapien.find((t) => t.slug === slug);
