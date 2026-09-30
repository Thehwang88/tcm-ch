// ── Single source of truth für alle TCM.ch Therapeut:innen. ──
// Profilseiten: /team/<slug>/ (src/pages/team/[slug].astro).
// Teamkarten (Über-uns-Seite + Standortseiten) werden aus DIESEN Daten generiert
// (teamCardHtml unten) - keine hartcodierten Karten in HTML-Dateien.
//
// Neue:r Therapeut:in = neuer Eintrag hier. Fertig.
//
// REGELN:
// - Basis sind die von den Fachpersonen gelieferten Angaben. Nichts ergänzen, nichts raten.
// - Fehlende optionale Felder WEGLASSEN - die Profilseite lässt die Section dann aus. Keine Placeholder.
// - Status strikt trennen: abgeschlossen / in_ausbildung / geplant. `geplant` wird nicht gerendert.
// - Registrierung `beantragt` wird sichtbar als «Antrag läuft» gezeigt, nie wie «anerkannt».
// - Klinischer Hintergrund ≠ TCM-Schwerpunkt. Keine Heil- oder Ergebnisversprechen.
// - standorte[] nur mit Slugs aus src/data/locations.ts (clinics[].id), und nur wenn EINDEUTIG
//   bekannt (z. B. nicht bei zwei Winterthur-Praxen). ortLabel ist das Anzeige-Label.
// - Keine E-Mail-Adressen, keine internen Kommentare. `needsConfirmation` ist intern (nie gerendert).
// - GLN/Nummern mit `needsConfirmation` werden nicht öffentlich angezeigt, bis bestätigt.

export type Status = 'abgeschlossen' | 'in_ausbildung' | 'geplant';

export interface TherapeutAusbildung {
  titel: string;
  institution?: string;
  jahr?: string;
  status?: Status;
  note?: string;
}

export type TherapeutWeiterbildung = TherapeutAusbildung;

export interface TherapeutErfahrung {
  rolle?: string;
  organisation?: string;
  ort?: string;
  zeitraum?: string;
  beschreibung?: string;
  aufgaben?: string[];
}

export interface TherapeutRegistrierung {
  organisation: string;
  status: 'anerkannt' | 'registriert' | 'beantragt';
  nummer?: string;
  note?: string;
  /** Fachbereich, falls nicht TCM (z. B. «Physiotherapie»). */
  bereich?: string;
}

export interface Therapeut {
  slug: string;
  name: string;
  /** Anrede-Vorname, falls nicht das erste Wort des Namens (z. B. «Ji Eun»). */
  vorname?: string;
  /** Name für Versicherer/Register, falls abweichend vom öffentlichen Namen. */
  registerName?: string;
  /** Präzise Berufsbezeichnung (Karte + Profil). */
  titel: string;
  untertitel?: string;
  /** Portrait unter /public, URL-encodiert. Fehlt es, rendert ein Initialen-Placeholder. */
  bild?: string;
  ortLabel?: string;
  standorte?: string[];
  /** Max. 2 Fokusthemen für die Karte. */
  cardFocus?: string[];
  kurzbeschreibung?: string;
  /** 3–6 Behandlungsschwerpunkte. */
  schwerpunkte?: string[];
  /** true = Themen sind besondere Interessen, keine formelle Spezialisierung. */
  schwerpunkteAlsInteressen?: boolean;
  /** Gruppierte Themen (optional, statt flacher schwerpunkte-Liste). */
  themenGruppen?: { titel: string; items: string[]; note?: string }[];
  methoden?: string[];
  ausbildung?: TherapeutAusbildung[];
  weiterbildungen?: TherapeutWeiterbildung[];
  weitereQualifikationen?: string[];
  /** Überschrift + Punkte für früheren Berufs-/Klinikhintergrund. */
  klinischerHintergrund?: { titel: string; items: string[] };
  berufserfahrung?: TherapeutErfahrung[];
  registrierungen?: TherapeutRegistrierung[];
  zsr?: string;
  gln?: string;
  /** Zusatz zur GLN, z. B. «Physiotherapie». */
  glnNote?: string;
  mitgliedschaften?: string[];
  /** Therapiesprachen (Anamnese und Behandlung vollständig möglich). */
  sprachen?: string[];
  /** Zusätzliche Behandlungssprachen oder Alltagskenntnisse, mit Label. */
  weitereSprachen?: { label: string; items: string[] };
  erfahrung?: string;
  bio?: string[];
  bookingUrl?: string;
  seo?: { title?: string; description?: string };
  /** INTERN: offene Punkte zur Bestätigung. Wird nie gerendert. */
  needsConfirmation?: { field: string; note: string }[];
}

/** Bestehender Team-Buchungskanal (identisch mit den bisherigen Teamkarten-CTAs). */
export const TEAM_WHATSAPP = 'https://wa.me/41775236122';

export const bookingHref = (t: Therapeut) => t.bookingUrl ?? TEAM_WHATSAPP;

/** Feld ist als offen markiert → nicht öffentlich rendern. */
export const isUnconfirmed = (t: Therapeut, field: string) => !!t.needsConfirmation?.some((n) => n.field === field);

/** Öffentlich sichtbare Einträge (geplant wird nie gerendert). */
export const visible = <T extends { status?: Status }>(arr?: T[]) => (arr ?? []).filter((x) => x.status !== 'geplant');

/** Aktive Registrierungen (für Badges). */
export const activeRegs = (t: Therapeut) => (t.registrierungen ?? []).filter((r) => r.status !== 'beantragt' && !r.bereich);

export const initials = (name: string) =>
  name.replace(/^Dr\.\s*\w*\.?\s*/i, '').split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

export const therapeuten: Therapeut[] = [
  {
    slug: 'simon-stueve',
    name: 'Simon Stüve Hwang',
    titel: 'Inhaber TCM.ch · TCM in Ausbildung',
    untertitel: 'Administration und Praxisorganisation',
    cardFocus: ['Administration & Praxisorganisation'],
    bild: '/images/img-b0d621bda695.webp',
    ortLabel: 'Zürich',
    ausbildung: [{ titel: 'Ausbildung Traditionelle Chinesische Medizin', status: 'in_ausbildung' }],
  },
  {
    slug: 'yuna-stueve',
    name: 'Yuna Stüve',
    titel: 'TCM-Therapeutin in Ausbildung',
    ausbildung: [{ titel: 'Ausbildung Traditionelle Chinesische Medizin', status: 'in_ausbildung' }],
    cardFocus: ['Frauengesundheit'],
    bild: '/images/img-8eef129844b9.webp',
    ortLabel: 'Zürich',
    schwerpunkte: ['Frauengesundheit'],
  },
  {
    slug: 'ken-uehara',
    name: 'Ken Uehara',
    titel: 'TCM-Therapeut',
    untertitel: 'Akupunktur · Moxibustion · Tuina',
    cardFocus: ['Schmerztherapie', 'Migräne & Frauengesundheit'],
    bild: '/images/img-78e38ed076ea.webp',
    ortLabel: 'Winterthur · Kreuzlingen',
    standorte: ['winterthur-muenzgasse', 'kreuzlingen'],
    kurzbeschreibung: 'Sportwissenschaftler und Akupunkteur mit Abschlüssen aus Japan, den USA und der Schweiz. Schwerpunkt Schmerz, Kopfschmerz und Frauengesundheit.',
    schwerpunkte: ['Schmerztherapie', 'Kopfschmerzen und Migräne', 'Gynäkologie', 'Wechseljahresbeschwerden'],
    methoden: ['Akupunktur', 'Moxibustion', 'Tuina'],
    ausbildung: [
      { titel: 'Master in Sportwissenschaften', status: 'abgeschlossen' },
      { titel: 'Studium Traditionelle Chinesische Medizin', status: 'abgeschlossen' },
      { titel: 'Staatliche Lizenz für Akupunktur und Moxibustion', institution: 'Japan', status: 'abgeschlossen' },
      { titel: 'NCCAOM-Zertifizierung Akupunktur', institution: 'USA', status: 'abgeschlossen' },
      { titel: 'OdA AM', institution: 'Schweiz', status: 'abgeschlossen' },
    ],
    weiterbildungen: [
      { titel: 'TCM Analysis of Insomnia' },
      { titel: 'TCM Treatment of Headache' },
      { titel: 'TCM Introduction to the Causes of Infertility' },
      { titel: 'Analysis of Pain in Excess and Deficiency Syndromes' },
      { titel: 'Usage and Contraindication of Moxa' },
      { titel: 'Cupping Risk Prevention and Contraindications' },
      { titel: 'Six-stage Treatment of Allergic Sinusitis and Epigastric Distension' },
      { titel: 'Treatment of Cough Caused by Disorders of Zang-Fu Organs in addition to the Lungs' },
    ],
    registrierungen: [
      { organisation: 'EMR', status: 'anerkannt', nummer: '44426' },
      { organisation: 'ASCA', status: 'anerkannt' },
    ],
    zsr: 'H763464',
    gln: '7601001989344',
    sprachen: ['Deutsch', 'Englisch', 'Japanisch'],
    bio: [
      'Ken kommt aus der Sportwissenschaft. Er hat einen Master in dem Fach und bringt dadurch ein genaues Verständnis für Bewegung, Belastung und muskuläre Überlastung mit. Das prägt seinen Blick auf Schmerzpatient:innen: Er fragt nicht nur, wo es weh tut, sondern auch, wann und bei welcher Bewegung.',
      'Akupunktur hat er in mehreren Systemen gelernt und abgeschlossen: mit der staatlichen Lizenz für Akupunktur und Moxibustion in Japan, der NCCAOM-Zertifizierung in den USA und dem Weg über die OdA AM in der Schweiz. Die japanische Tradition merkt man an seinem sorgfältigen Umgang mit Moxibustion.',
      'In seinen Weiterbildungen hat er sich vertieft mit Schlafstörungen, Kopfschmerzen, Schmerzsyndromen und den Grenzen und Kontraindikationen von Moxa und Schröpfen beschäftigt.',
    ],
  },
  {
    slug: 'markus-muschal',
    name: 'Markus Muschal',
    titel: 'TCM-Therapeut',
    cardFocus: ['Schröpfen & Moxa'],
    bild: '/images/img-babaaaf33d55.webp',
    ortLabel: 'Frauenfeld',
    standorte: ['frauenfeld'],
    methoden: ['Schröpfen', 'Moxibustion'],
  },
  {
    slug: 'johann-stueve',
    name: 'Dr. tcm Johann Stüve',
    titel: 'Leitender TCM-Arzt & Gründer',
    bild: '/images/img-645a5e1b4b7f.webp',
    ortLabel: 'Kreuzlingen · Frauenfeld',
    standorte: ['kreuzlingen', 'frauenfeld'],
  },
  {
    slug: 'janine-schmieder',
    name: 'Janine Schmieder Trebes',
    titel: 'Dipl. Naturheilpraktikerin TCM',
    untertitel: 'Ernährungswissenschaftlerin BSc',
    cardFocus: ['Frauengesundheit', 'Schmerz & Kiefer'],
    bild: '/images/Janine%20Schmieder.webp',
    ortLabel: 'Basel',
    standorte: ['basel'],
    kurzbeschreibung: 'Naturheilpraktikerin TCM mit Studium der Ernährungswissenschaft und praktischer Erfahrung in Vietnam und Deutschland. Schwerpunkte Frauengesundheit, Schmerz und Kiefer.',
    schwerpunkte: ['Frauengesundheit', 'Schmerztherapie', 'Kieferbeschwerden', 'Regulation des Nervensystems', 'Ohrakupunktur'],
    ausbildung: [
      { titel: 'Bachelor of Science Ernährungswissenschaft', institution: 'Universität Hohenheim', status: 'abgeschlossen' },
      { titel: 'Dipl. Naturheilpraktikerin TCM', status: 'abgeschlossen' },
      { titel: 'Medizinische Grundausbildung', institution: 'Basel', status: 'abgeschlossen' },
    ],
    berufserfahrung: [
      { organisation: 'National Hospital of Traditional Medicine', ort: 'Hanoi, Vietnam', beschreibung: 'Praktische Erfahrung' },
      { organisation: 'Dr. med. Christian Grabner, Arzt für Akupunktur', ort: 'Offenburg', beschreibung: 'Praktische Erfahrung' },
      { organisation: 'Immanuel Krankenhaus Berlin, bei Prof. Dr. Andreas Michalsen', ort: 'Berlin', beschreibung: 'Praktische Erfahrung' },
    ],
    weiterbildungen: [
      { titel: 'Faszien- und Schmerztherapie' },
      { titel: 'Frauenheilkunde' },
      { titel: 'Nervensystemregulation' },
      { titel: 'Ohrakupunktur' },
      { titel: 'Kosmetische Akupunktur' },
    ],
    weitereQualifikationen: ['Yogalehrerin: Yin Yoga, Hatha Yoga, Kiefer- und Gesichtsyoga'],
    registrierungen: [{ organisation: 'EMR', status: 'anerkannt', nummer: '47731' }],
    zsr: 'J212764',
    gln: '7601009302329',
    sprachen: ['Deutsch', 'Englisch', 'Französisch'],
    bio: [
      'Janine hat zuerst Ernährungswissenschaft an der Universität Hohenheim studiert. Dieser naturwissenschaftliche Hintergrund zeigt sich in ihrer Arbeit: Sie denkt Beschwerden gerne von Alltag, Ernährung und Belastung her mit, bevor sie behandelt.',
      'Ihre praktische TCM-Erfahrung hat sie an drei sehr unterschiedlichen Orten gesammelt: am National Hospital of Traditional Medicine in Hanoi, in einer ärztlichen Akupunkturpraxis in Offenburg und am Immanuel Krankenhaus in Berlin bei Prof. Dr. Andreas Michalsen.',
      'In der Praxis arbeitet sie vor allem mit Frauengesundheit, Schmerzen und Kieferbeschwerden. Als Yogalehrerin kennt sie auch die Übungsseite und gibt Patient:innen bei Bedarf einfache Übungen für Kiefer und Nacken mit.',
    ],
  },
  {
    slug: 'emanuela-pelican',
    name: 'Emanuela Pelican',
    titel: 'TCM-Therapeutin',
    bild: '/images/Emanuela%20Pelican.webp',
    ortLabel: 'Bottighofen',
    standorte: ['bottighofen'],
  },
  {
    slug: 'jiun-lee',
    name: 'Ji Eun Lee Tremmel',
    vorname: 'Ji Eun',
    registerName: 'Ji Eun Lee Tremmel',
    titel: 'Heilpraktikerin TCM',
    untertitel: 'Chiway Akademie · klinische Praktika in Südkorea',
    cardFocus: ['Schmerz & Bewegungsapparat', 'Frauenbeschwerden'],
    bild: '/images/Jiun%20Lee.webp',
    kurzbeschreibung: 'In der Schweiz ausgebildete Heilpraktikerin TCM mit klinischen Praktika in Südkorea und Weiterbildungen in SaAm-, Master-Tung- und Balance-Akupunktur.',
    schwerpunkte: ['Schmerztherapie und Bewegungsapparat', 'Frauenbeschwerden', 'Kopfschmerzen und Migräne', 'Innere Unruhe'],
    ausbildung: [
      { titel: 'Studium Heilpraktikerin TCM', institution: 'Chiway Akademie', jahr: '2019–2023', status: 'abgeschlossen' },
      { titel: 'Schulmedizinische Grundlagen, 700 Stunden', institution: 'Biomedica Glattbrugg', jahr: '2019–2022', status: 'abgeschlossen' },
    ],
    berufserfahrung: [
      { rolle: 'Praktikum', organisation: 'College of Korean Medicine', ort: 'Busan, Südkorea', zeitraum: '2023' },
      { rolle: 'Praktikum', organisation: 'Bei Dr. Jung Hwan Lee, Präsident der Society of SaAm Acupuncture', zeitraum: '2026' },
    ],
    weiterbildungen: [
      { titel: 'Shiatsu Samurai-Programm für kleine Kinder', jahr: '2022' },
      { titel: 'Master Tung Akupunktur bei Wirbelsäulenbeschwerden', jahr: '2023' },
      { titel: 'Westliche Kräuter nach TCM', jahr: '2024' },
      { titel: 'SaAm Mind Akupunktur', institution: 'Dr. Jung Hwan Lee', jahr: '2024' },
      { titel: 'Balance-Akupunktur nach Dr. Tan, Teil 1', jahr: '2024' },
      { titel: 'Balance-Akupunktur nach Dr. Tan, Teil 2', jahr: '2024' },
      { titel: 'Yamamoto Neue Schädelakupunktur (YNSA)', jahr: '2025' },
      { titel: 'Manuelle Therapie', jahr: '2025' },
      { titel: 'Mykotherapie', jahr: '2025' },
      { titel: 'Mind Acupuncture', institution: 'Dr. Jung Hwan Lee', jahr: '2025' },
      { titel: "Master Tung's Akupunktur", jahr: '2026' },
      { titel: 'Kosmetische Behandlungen mit Akupunktur und TCM', jahr: '2026' },
      { titel: 'NADA-Ohrakupunktur', jahr: '2026' },
      { titel: 'Laserakupunktur', jahr: '2026' },
      { titel: 'Fasziale Akupunktur', jahr: '11/2026–04/2027', status: 'geplant' },
    ],
    registrierungen: [
      { organisation: 'EMR', status: 'anerkannt' },
      { organisation: 'ASCA', status: 'anerkannt' },
      { organisation: 'EGK', status: 'anerkannt' },
    ],
    zsr: 'A233864',
    gln: '7601001884168',
    mitgliedschaften: ['TCM Fachverband Schweiz'],
    bio: [
      'Ji Eun hat ihre TCM-Ausbildung an der Chiway Akademie abgeschlossen und parallel 700 Stunden schulmedizinische Grundlagen an der Biomedica absolviert.',
      'Ihre klinische Erfahrung hat sie bewusst in Südkorea vertieft: 2023 im Praktikum am College of Korean Medicine in Busan und 2026 bei Dr. Jung Hwan Lee, dem Präsidenten der Society of SaAm Acupuncture. Von dort stammt ihr Interesse an SaAm- und Mind-Akupunktur.',
      'In der Praxis kombiniert sie diese Systeme mit Master-Tung- und Balance-Akupunktur, vor allem bei Schmerzen am Bewegungsapparat, Kopfschmerzen und Frauenbeschwerden.',
    ],
  },
  {
    slug: 'michele-seiler',
    name: 'Michele Seiler',
    titel: 'TCM-Therapeutin & Shiatsu-Therapeutin',
    untertitel: 'Dipl. Akupunkteurin TCM-FVS · Zertifikat OdA AM',
    cardFocus: ['Frauengesundheit', 'Shiatsu & Akupunktur'],
    bild: '/images/Michele%20Seiler.webp',
    ortLabel: 'Frauenfeld',
    standorte: ['frauenfeld'],
    erfahrung: '10 Jahre Erfahrung',
    kurzbeschreibung: 'Therapeutin für Chinesische Medizin und Shiatsu mit zehn Jahren Erfahrung. Schwerpunkt Frauengesundheit, Kinderwunsch und die Zeit rund um die Geburt.',
    schwerpunkte: ['Frauengesundheit', 'Kinderwunsch', 'Begleitung rund um Geburt und Wochenbett', 'Shiatsu und Akupressur bei Babys und Neugeborenen'],
    methoden: ['Akupunktur', 'Tuina', 'Shiatsu', 'Diätetik', 'Phytotherapie mit westlichen Kräutern'],
    ausbildung: [
      { titel: 'Vierjähriges Studium Chinesische Medizin und Shiatsu', institution: 'HPS Luzern', status: 'abgeschlossen' },
      { titel: 'Dipl. Akupunkteurin TCM-FVS', status: 'abgeschlossen' },
      { titel: 'Zertifikat OdA AM, Fachrichtung TCM Akupunktur / Tuina', status: 'abgeschlossen' },
    ],
    registrierungen: [
      { organisation: 'EMR', status: 'anerkannt' },
      { organisation: 'ASCA', status: 'anerkannt' },
    ],
    zsr: 'V006363',
    gln: '7601002672955',
    mitgliedschaften: ['TCM Fachverband Schweiz'],
    sprachen: ['Deutsch'],
    bio: [
      'Michele hat an der HPS Luzern vier Jahre Chinesische Medizin und Shiatsu studiert. Seither verbindet sie die Nadel mit der Hand: Akupunktur und Tuina auf der einen, Shiatsu und Akupressur auf der anderen Seite.',
      'In zehn Jahren Praxis hat sie sich auf Frauengesundheit konzentriert, besonders auf Kinderwunsch und die Zeit rund um Geburt und Wochenbett. Dazu gehört auch die sanfte Behandlung von Babys und Neugeborenen mit Shiatsu und Akupressur.',
      'Die Behandlung in der Schwangerschaft ergänzt die Betreuung durch Hebamme und Ärztin, sie ersetzt sie nicht.',
    ],
  },
  {
    slug: 'kristen-lambertin',
    name: 'Kristen Lambertin',
    titel: 'TCM-Therapeutin',
    bild: '/images/Kristen%20Lambertin.webp',
  },
  {
    slug: 'leon-brandon-mueller',
    name: 'Leon Brandon Müller',
    titel: 'TCM-Therapeut',
    bild: '/images/Leon%20Brandon%20M%C3%BCller.webp',
  },
  {
    slug: 'corinna-reinhart',
    name: 'Corinna Reinhart',
    titel: 'Naturheilpraktikerin TCM · Zertifikat OdA AM',
    untertitel: 'Fachrichtung TCM, Schwerpunkt Akupunktur / Tuina',
    cardFocus: ['Akupunktur & Tuina', 'Klinischer Hintergrund Onkologie'],
    bild: '/images/Corinna%20Reinhart.webp',
    ortLabel: 'St. Gallen',
    standorte: ['st-gallen'],
    kurzbeschreibung: 'Pflegefachfrau HF mit Erfahrung in Onkologie, Nephrologie und Neurochirurgie, heute Naturheilpraktikerin TCM mit Schwerpunkt Akupunktur und Tuina.',
    methoden: ['Akupunktur', 'Elektroakupunktur', 'Laserakupunktur, unter anderem für Kinder und Menschen mit Nadelphobie', 'Akupressur', 'Tuina', 'Schröpfen', 'Ernährungstherapie', 'Energetische Arbeit'],
    ausbildung: [
      { titel: 'Zertifikat OdA AM, Fachrichtung TCM Akupunktur / Tuina', status: 'abgeschlossen' },
      { titel: 'Pflegefachfrau HF', status: 'abgeschlossen' },
    ],
    klinischerHintergrund: { titel: 'Klinischer Hintergrund aus der Pflege', items: ['Onkologie', 'Nephrologie', 'Neurochirurgie'] },
    weiterbildungen: [
      { titel: 'Laserakupunktur', status: 'abgeschlossen' },
      { titel: 'Elektrotherapie', status: 'abgeschlossen' },
      { titel: 'Akupressur', status: 'abgeschlossen' },
      { titel: 'Psychosomatik', status: 'in_ausbildung' },
      { titel: 'Diverse Weiterbildungen in energetischer Arbeit', status: 'abgeschlossen' },
    ],
    registrierungen: [
      { organisation: 'EMR', status: 'anerkannt' },
      { organisation: 'ASCA', status: 'anerkannt' },
      { organisation: 'Visana', status: 'anerkannt' },
      { organisation: 'SNE', status: 'anerkannt' },
    ],
    zsr: 'K413264',
    gln: '76010099248',
    bio: [
      'Corinna ist diplomierte Pflegefachfrau HF. Bevor sie zur TCM kam, hat sie in der Onkologie, der Nephrologie und der Neurochirurgie gearbeitet. Sie kennt Spitalabläufe, schwere Krankheitsverläufe und die Fragen, die Patient:innen neben der Behandlung beschäftigen.',
      'Diese Erfahrung bringt sie in ihre TCM-Arbeit mit: Sie weiss, wann eine Beschwerde ärztlich abgeklärt gehören muss, und sie stimmt ihre Behandlung auf eine laufende schulmedizinische Therapie ab, statt sie zu ersetzen.',
      'Neben Akupunktur und Tuina arbeitet sie mit Laserakupunktur. Das ist eine Möglichkeit für Kinder und für Menschen, die Nadeln nicht vertragen.',
    ],
    needsConfirmation: [{ field: 'gln', note: 'Gelieferte GLN «76010099248» hat 11 statt 13 Stellen. Unverändert gespeichert, bewusst offen gelassen und nicht öffentlich angezeigt.' }],
  },
  {
    slug: 'natalia-goc',
    name: 'Natalia Goc',
    titel: 'Naturheilpraktikerin TCM & Physiotherapeutin',
    untertitel: 'Akupunktur · Tuina · Chinesische Arzneitherapie · Shiatsu',
    cardFocus: ['Orthopädie & Neurologie', 'Physiotherapie & TCM'],
    bild: '/images/Natalia-Goc.webp',
    ortLabel: 'Winterthur',
    standorte: ['winterthur-muenzgasse'],
    kurzbeschreibung: 'Physiotherapeutin BSc und Naturheilpraktikerin für Akupunktur, Tuina und Chinesische Arzneitherapie. Über zehn Jahre Weiterbildung in klassischer chinesischer Medizin.',
    schwerpunkte: ['Orthopädie', 'Neurologie', 'Dermatologie', 'Gynäkologie'],
    methoden: ['Akupunktur', 'Tuina', 'Chinesische Arzneitherapie', 'Shiatsu'],
    ausbildung: [
      { titel: 'Naturheilpraktikerin Chinesische Medizin Arzneimitteltherapie', jahr: '2026', status: 'abgeschlossen' },
      { titel: 'Naturheilpraktikerin Akupunktur / Tuina', jahr: '2025', status: 'abgeschlossen' },
      { titel: 'Shiatsu-Therapeutin, Diplom', institution: 'European Shiatsu School UK', jahr: '2015', status: 'abgeschlossen', note: '500 Ausbildungsstunden, davon 130 praktische Stunden' },
      { titel: 'BSc Physiotherapie', jahr: '2014', status: 'abgeschlossen' },
      { titel: 'Klassische Massage / medizinische Masseurin', institution: 'Polen', jahr: '2011', status: 'abgeschlossen' },
      { titel: 'MSc Precision Neurorehabilitation', institution: 'LLUI', jahr: 'seit September 2026', status: 'in_ausbildung' },
      { titel: 'BSc Psychology', institution: 'University of London', jahr: 'seit 2025', status: 'in_ausbildung' },
      { titel: 'MSc Traditional Chinese Medicine and Culture', institution: 'University of Malta', jahr: 'ab Oktober 2026', status: 'geplant' },
    ],
    weiterbildungen: [
      { titel: 'Laserakupunktur', institution: 'Chiway', jahr: '2026' },
      { titel: 'Unlocking the Mysteries of Chinese Medicine: Journey into the 3 Spirits and 7 Souls', jahr: '2024' },
      { titel: 'Infertility and its Treatment in Chinese Medicine', jahr: '2024' },
      { titel: 'Joints as Gateways to the Constitution', jahr: '2024' },
      { titel: 'Vascular Integrity & Its Role in Health', jahr: '2023' },
      { titel: 'The Philosophical Influences on Early Acupuncture and their Significant Applications', jahr: '2023' },
      { titel: 'ASA TCM Kongress Solothurn', jahr: '2023' },
      { titel: 'Major Sinews & Their Significance', jahr: '2023' },
      { titel: 'Role of the Cutaneous Regions', jahr: '2023' },
      { titel: 'Bridging the Dan Tians for Alchemy', jahr: '2023' },
      { titel: 'Activating Upper Dan Tian for Fine Tuning', jahr: '2023' },
      { titel: 'Managing the Fire & Water, Middle Dan Tian', jahr: '2023' },
      { titel: 'Setting Up the Cauldron & Lower Dan Tian', jahr: '2023' },
      { titel: 'Western Laboratory Bloodwork', jahr: '2022' },
      { titel: 'Dao Yin Sinew Releases', jahr: '2022' },
      { titel: 'Treatment of Shen Disturbances: Insomnia & Depression', jahr: '2022' },
      { titel: 'Significance of the Ji-Spine in Chinese Medicine', jahr: '2022' },
      { titel: 'Harmony and Peace in Troubled Times: Role of the Eight Extraordinary Vessels', jahr: '2022' },
      { titel: 'Treating the Elderly', jahr: '2022' },
      { titel: 'TCM Treatment of Long Covid', jahr: '2022' },
      { titel: 'Dietary Plan for Deficiency of Blood & Yin', jahr: '2022' },
      { titel: 'Dietary Plan for Deficiency of Qi & Yang', jahr: '2022' },
      { titel: 'Dietary Plan for Blood & Phlegm Issues', jahr: '2022' },
      { titel: 'Dietary Plan for Internal Heat and its Complications', jahr: '2022' },
      { titel: 'Dietary Plan for Acute Conditions and Their Terrains', jahr: '2022' },
      { titel: 'Daoist Wellness & Sexology', jahr: '2022' },
      { titel: 'Point Energetics: The Mu-Collection and Gui-Ghost Points of Acupuncture', jahr: '2022' },
      { titel: 'Zhuang Zi, Outer Chapters', jahr: '2021' },
      { titel: 'Classical Chinese Herbal Medicine IV', jahr: '2021' },
      { titel: 'Communication with Plants', jahr: '2021' },
      { titel: 'Sun Si Miao: His Herbal Contribution to Chinese Medicine', jahr: '2021' },
      { titel: 'Calligraphy as Cultivation with Jeffrey Yuen', jahr: '2021' },
      { titel: 'Patient Treatment Day', jahr: '2021' },
      { titel: 'Plants and their Morphology', jahr: '2021' },
      { titel: 'Classical Chinese Herbal Medicine III', jahr: '2021' },
      { titel: 'Curious Organs: A Cardio-Neuro Perspective', jahr: '2021' },
      { titel: 'Plants and their Habitat', jahr: '2021' },
      { titel: 'Zhuang Zi & Healing', jahr: '2021' },
      { titel: 'Classical Chinese Herbal Medicine II', jahr: '2021' },
      { titel: 'Classical Chinese Herbal Medicine I', jahr: '2021' },
      { titel: 'Triple Burner: Its Metabolism & Vital Substances', jahr: '2021' },
      { titel: 'Stones: A Journey Through Life', jahr: '2021' },
      { titel: 'Shamanic Origins of Classical Chinese Medicine: Manipulating the External Terrain', jahr: '2020' },
      { titel: 'Spirits of the Channels and Their Points', jahr: '2020' },
      { titel: 'A Journey Through Death and Dying', jahr: '2020' },
      { titel: 'NCALB Needling Technique', jahr: '2020' },
      { titel: 'Treating Epidemics with Classical Chinese Medicine', jahr: '2020' },
      { titel: 'Heart & Pericardium Journey Through the 9 Palaces', jahr: '2020' },
      { titel: 'Essential Oils: Pharmacopeia Update based on the Experience of Jeffrey Yuen', jahr: '2020' },
      { titel: 'Divergent Channels in the Treatment of Acute Infectious Diseases', jahr: '2020' },
      { titel: 'Shamanic Origins of Classical Chinese Medicine: Manipulating the Internal Terrain', institution: 'Los Angeles', jahr: '2020' },
      { titel: 'Influence of Shamanism into Chinese Medicine', institution: 'New Jersey', jahr: '2020' },
      { titel: 'Ge Hong and the Influence of Alchemy in Chinese Medicine', institution: 'Dublin', jahr: '2019' },
      { titel: 'Veranstalterin International Seminar: The Curious Organs and Classical Chinese Medicine', institution: 'Krakau', jahr: '2019' },
      { titel: 'Veranstalterin International Seminar: Chronic and Autoimmune Disease in Classical Chinese Medicine', institution: 'Warschau', jahr: '2018' },
      { titel: 'An Introduction to Stone Medicine', jahr: '2018' },
      { titel: 'Essential Oils for Respiratory Wellness', jahr: '2018' },
      { titel: 'The Kidney and San Jiao Channels of Classical Chinese Medicine', institution: 'Dublin', jahr: '2017' },
      { titel: 'The Heart and Small Intestine Channels of Classical Chinese Medicine', institution: 'Dublin', jahr: '2016' },
      { titel: 'Qigong and Meditation', institution: 'Riga', jahr: '2015' },
      { titel: 'Essence of Healing. Seasonal Harmony through Diet, Lifestyle and Meditation. Daoism and its Role in Chinese Medicine', institution: 'Riga', jahr: '2015' },
      { titel: 'The Lung and Large Intestine Channels of Classical Chinese Medicine', institution: 'Dr. Jeffrey Yuen, Dublin', jahr: '2015' },
      { titel: 'Shamanic Roots of Chinese Medicine / Channel Systems in Acupuncture', institution: 'Chiway', jahr: '30.10.–01.11.2026', status: 'geplant' },
    ],
    registrierungen: [
      { organisation: 'EMR', status: 'anerkannt', nummer: '44370' },
      { organisation: 'ASCA', status: 'anerkannt', nummer: 'I734864' },
      { organisation: 'EGK', status: 'anerkannt' },
      { organisation: 'Kanton Zürich', status: 'anerkannt', note: 'Berufsausübungsbewilligung', bereich: 'Physiotherapie' },
      { organisation: 'Kanton Thurgau', status: 'anerkannt', note: 'Berufsausübungsbewilligung', bereich: 'Physiotherapie' },
      { organisation: 'Kanton St. Gallen', status: 'anerkannt', note: 'Berufsausübungsbewilligung', bereich: 'Physiotherapie' },
    ],
    gln: '7601007575091',
    glnNote: 'Physiotherapie',
    mitgliedschaften: [
      'TCM Fachverband Schweiz (A-Mitglied für Akupunktur, Tuina und Arzneimittel)',
      'Physioswiss',
      'Polish Chamber of Physiotherapists',
      'The British Psychological Society (Student Member)',
    ],
    sprachen: ['Deutsch', 'Schweizerdeutsch', 'Englisch', 'Polnisch', 'Slowakisch'],
    weitereSprachen: { label: 'Basiskenntnisse', items: ['Italienisch'] },
    bio: [
      'Natalia ist Physiotherapeutin BSc und in drei Kantonen zur Berufsausübung als Physiotherapeutin bewilligt. Den Körper kennt sie deshalb zuerst von der Funktion her: Gelenke, Muskeln, Nerven, Bewegung.',
      'Seit über zehn Jahren bildet sie sich in klassischer chinesischer Medizin weiter, einen grossen Teil davon bei Jeffrey Yuen. 2025 hat sie als Naturheilpraktikerin für Akupunktur und Tuina abgeschlossen, 2026 für Chinesische Arzneitherapie. Dazu kommt eine Shiatsu-Ausbildung an der European Shiatsu School in Grossbritannien.',
      'In der Praxis verbindet sie beide Welten, vor allem bei orthopädischen und neurologischen Beschwerden. Aktuell studiert sie berufsbegleitend Precision Neurorehabilitation (MSc) und Psychologie (BSc).',
    ],
  },
  {
    slug: 'seongsu-kim',
    name: 'Seongsu Kim',
    titel: 'Fachkraft für Koreanische Medizin & TCM',
    untertitel: 'Akupunktur · Tuina · Arzneitherapie',
    cardFocus: ['Schmerz & Bewegungsapparat', '17+ Jahre klinische Erfahrung'],
    bild: '/images/Seongsu-Kim.png',
    ortLabel: 'Frauenfeld',
    standorte: ['frauenfeld'],
    erfahrung: "17+ Jahre klinische Erfahrung und Praxisleitung · über 13'000 Patientinnen und Patienten behandelt",
    kurzbeschreibung: 'Bachelor of Korean Medicine mit über 17 Jahren klinischer Erfahrung, davon fast 17 Jahre als Leiter und Inhaber einer eigenen Klinik in Südkorea.',
    schwerpunkte: ['Beschwerden des Bewegungsapparates', 'Schmerztherapie', 'Gastroenterologie', 'Rehabilitation', 'Neuropsychiatrie', 'Gynäkologie'],
    methoden: ['Akupunktur', 'Tuina-Manualtherapie', 'Chinesische und Koreanische Arzneitherapie', 'Moxibustion'],
    ausbildung: [
      { titel: 'Bachelor of Korean Medicine', institution: 'Woosuk University, Jeonju, Südkorea', jahr: '03/2001–02/2007', status: 'abgeschlossen' },
      { titel: 'Zertifikat OdA AM, Bescheinigung der Gleichwertigkeit', jahr: '09.12.2025', status: 'abgeschlossen', note: 'Modulabschlüsse M1–M6 / TCM. Schwerpunkte Akupunktur / Tuina und Chinesische Arzneitherapie' },
    ],
    berufserfahrung: [
      { rolle: 'Praxisleiter und Inhaber', organisation: 'Hanmaum Clinic', ort: 'Gyeonggi-do, Südkorea', zeitraum: '10/2008–07/2025',
        aufgaben: ['Eigenverantwortliche Praxisleitung', 'Qualitätsmanagement', 'Personalführung', 'Finanzführung', 'Behandlung mit Akupunktur, Kräutertherapie, Tuina und Moxibustion'] },
      { rolle: 'Stellvertretender Direktor', organisation: 'Jeheung Clinic', ort: 'Seoul, Südkorea', zeitraum: '01/2008–08/2008', beschreibung: 'Klinische Diagnostik und Therapieplanung' },
    ],
    registrierungen: [{ organisation: 'EMR', status: 'anerkannt', nummer: '49403' }],
    zsr: 'V636364',
    gln: '7601009518690',
    bio: [
      'Seongsu hat an der Woosuk University in Jeonju Koreanische Medizin studiert. Danach hat er fast 17 Jahre lang seine eigene Klinik in Südkorea geführt, als Praxisleiter und Inhaber. In dieser Zeit hat er über 13\'000 Patientinnen und Patienten behandelt.',
      'Er bringt damit nicht nur klinische Routine mit, sondern auch die Erfahrung, eine Praxis mit Team, Qualitätsmanagement und Finanzen zu verantworten.',
      'In der Schweiz hat er seinen Abschluss über die OdA AM prüfen lassen: Seit Dezember 2025 hat er das Zertifikat OdA AM mit Bescheinigung der Gleichwertigkeit für Akupunktur / Tuina und Chinesische Arzneitherapie. Sein Schwerpunkt liegt bei Schmerzen und Beschwerden des Bewegungsapparates.',
    ],
  },
  {
    slug: 'brenda-oviedo',
    name: 'Brenda Oviedo',
    titel: 'Dipl. Akupressur-Therapeutin',
    untertitel: 'Branchenzertifikat · in Ausbildung zur Naturheilpraktikerin TCM',
    cardFocus: ['Akupressur', 'Kopf, Kiefer & Nacken'],
    bild: '/images/Brenda-new.png',
    ortLabel: 'Winterthur',
    standorte: ['winterthur-muenzgasse'],
    kurzbeschreibung: 'Akupressur-Therapeutin mit Branchenzertifikat und Fokus auf Kopf, Kiefer, Nacken und Stress. Aktuell in Ausbildung zur Naturheilpraktikerin TCM.',
    schwerpunkte: ['Kopf- und Nackenbeschwerden', 'Kopfschmerzen', 'Kiefer- und Gesichtsverspannungen', 'Muskuläre Verspannungen', 'Stress und innere Unruhe', 'Menstruations- und Frauenbeschwerden'],
    methoden: ['Akupressur-Massage', 'Schröpfen', 'Gua Sha', 'Moxibustion'],
    ausbildung: [
      { titel: 'Dipl. Akupressur-Therapeutin, Branchenzertifikat', status: 'abgeschlossen' },
      { titel: 'Zertifikat Westliche Arzneimittel', status: 'abgeschlossen' },
      { titel: 'Naturheilpraktikerin TCM', status: 'in_ausbildung' },
    ],
    berufserfahrung: [
      { rolle: 'Therapeutisch tätig', zeitraum: 'seit 2024' },
      { rolle: 'Akupressur-Therapeutin', organisation: 'TCM.ch / Praxis Hwang', ort: 'Winterthur', zeitraum: 'seit Mai 2026' },
    ],
    registrierungen: [
      { organisation: 'EMR', status: 'anerkannt', nummer: '45414' },
      { organisation: 'ASCA', status: 'anerkannt' },
      { organisation: 'SNE', status: 'anerkannt' },
    ],
    zsr: 'U934864',
    gln: '7601009025853',
    sprachen: ['Deutsch', 'Schweizerdeutsch', 'Englisch'],
    bio: [
      'Brenda arbeitet mit den Händen. Als diplomierte Akupressur-Therapeutin mit Branchenzertifikat behandelt sie vor allem muskuläre Verspannungen und Beschwerden im Bereich Kopf, Gesicht, Kiefer und Nacken.',
      'Viele ihrer Patient:innen kommen mit Kopfschmerzen, einem verspannten Kiefer oder dem Gefühl, nicht mehr abschalten zu können. Neben der Akupressur-Massage setzt sie dafür Schröpfen, Gua Sha und Moxibustion ein.',
      'Seit 2024 ist sie therapeutisch tätig, seit Mai 2026 bei TCM.ch in Winterthur. Parallel absolviert sie die Ausbildung zur Naturheilpraktikerin TCM.',
    ],
  },
  {
    slug: 'astrid-lenggenhager',
    name: 'Astrid Lenggenhager',
    titel: 'Naturheilpraktikerin TCM · Zertifikat OdA AM',
    untertitel: 'Akupunktur / Tuina',
    cardFocus: ['Akupunktur & Tuina', 'Klinischer Hintergrund Onkologie'],
    ortLabel: 'St. Gallen',
    standorte: ['st-gallen'],
    kurzbeschreibung: 'Naturheilpraktikerin TCM mit langjähriger klinischer Erfahrung in der Onkologie und einem CAS in Psychoonkologie.',
    methoden: ['Akupunktur', 'Tuina'],
    ausbildung: [
      { titel: 'Studium TCM Akupunktur und Tuina', institution: 'Biomedica Zürich', status: 'abgeschlossen' },
      { titel: 'Zertifikat OdA AM, Fachrichtung TCM Akupunktur / Tuina', status: 'abgeschlossen' },
      { titel: 'Zertifikat Akupressur', status: 'abgeschlossen' },
      { titel: 'CAS Psychoonkologie', status: 'abgeschlossen' },
      { titel: 'Zertifikat Psychosomatische Prozessbegleitung & Coaching', institution: 'Biomedica', jahr: 'voraussichtlicher Abschluss 2028', status: 'in_ausbildung' },
      { titel: 'Dipl. Energetiker & medizinisches Qi Gong Practitioner', jahr: 'Start November 2026', status: 'geplant' },
    ],
    klinischerHintergrund: { titel: 'Klinischer Hintergrund in der Onkologie', items: ['Langjährige Tätigkeit in der onkologischen Pflege', 'In den letzten sieben Jahren besonderer Schwerpunkt Brustkrebs', 'Weiterbildung in Psychoonkologie (CAS)'] },
    registrierungen: [{ organisation: 'EMR', status: 'anerkannt', nummer: 'D370465' }],
    zsr: 'D370465',
    mitgliedschaften: ['TCM Fachverband Schweiz', 'Onkologiepflege Schweiz'],
    sprachen: ['Deutsch', 'Englisch', 'Italienisch'],
    weitereSprachen: { label: 'Gute Alltagskenntnisse', items: ['Französisch'] },
    bio: [
      'Astrid hat viele Jahre in der onkologischen Pflege gearbeitet, in den letzten sieben Jahren mit besonderem Schwerpunkt auf Brustkrebs. Mit einem CAS in Psychoonkologie hat sie sich zusätzlich mit der seelischen Belastung einer Krebserkrankung auseinandergesetzt.',
      'Aus dieser Arbeit heraus hat sie TCM Akupunktur und Tuina an der Biomedica Zürich studiert und das Zertifikat OdA AM abgeschlossen.',
      'Wer bei ihr in Behandlung ist, trifft auf jemanden, der onkologische Therapien, ihre Nebenwirkungen und die Abläufe im Spital aus nächster Nähe kennt. TCM ergänzt dabei die ärztliche Behandlung, sie ersetzt sie nicht.',
    ],
    needsConfirmation: [
      { field: 'bild', note: 'Kein Portrait im Repository. Initialen-Placeholder aktiv.' },
    ],
  },
  {
    slug: 'desiree-letter',
    name: 'Désirée Letter',
    titel: 'Dipl. Naturheilpraktikerin TCM',
    untertitel: 'Akupunktur / Tuina · Zertifikat OdA AM',
    cardFocus: ['Psycho-emotionale Beschwerden', 'Frauengesundheit & Schmerzen'],
    ortLabel: 'Winterthur',
    standorte: ['winterthur-muenzgasse'],
    kurzbeschreibung: 'Naturheilpraktikerin TCM mit einem Bachelor in Sozialer Arbeit und mehrjähriger Erfahrung in Suchttherapie und Sozialpsychiatrie.',
    schwerpunkteAlsInteressen: true,
    themenGruppen: [
      { titel: 'Psycho-emotionale Beschwerden', items: ['Stress', 'Schlafprobleme', 'Ängste', 'Depressive Symptomatik', 'Burnout', 'Begleitende Behandlung bei Trauma und Sucht'],
        note: 'Begleitend zu ärztlicher, psychiatrischer oder psychotherapeutischer Behandlung, nicht als Ersatz.' },
      { titel: 'Frauengesundheit', items: ['Zyklusbeschwerden', 'Dysmenorrhoe', 'Amenorrhoe', 'Endometriose', 'Wechseljahresbeschwerden'] },
      { titel: 'Schmerzen', items: ['Knie', 'Schulter', 'Hüfte', 'Rücken', 'Nacken', 'Fersensporn', 'Karpaltunnelsyndrom', 'Epicondylitis', 'Rhizarthrose'] },
    ],
    methoden: ['Akupunktur', 'Tuina'],
    ausbildung: [
      { titel: 'Dipl. Naturheilpraktikerin TCM, Akupunktur / Tuina', status: 'abgeschlossen' },
      { titel: 'Zertifikat OdA AM, Fachrichtung TCM Akupunktur / Tuina', status: 'abgeschlossen' },
      { titel: 'Bachelor of Arts in Sozialer Arbeit', institution: 'FHNW', status: 'abgeschlossen' },
    ],
    klinischerHintergrund: { titel: 'Beruflicher Hintergrund in der Sozialen Arbeit', items: ['Mehrjährige Tätigkeit in der Suchttherapie', 'Mehrjährige Tätigkeit in der Sozialpsychiatrie'] },
    weiterbildungen: [
      { titel: 'Balance Akupunktur nach Dr. Tan, Teil 1 & 2' },
      { titel: 'Mind Acupuncture', institution: 'Dr. Junghwan Lee' },
      { titel: 'Ohrakupunktur nach NADA-Protokoll', institution: 'NADA Schweiz' },
    ],
    registrierungen: [
      { organisation: 'EMR', status: 'anerkannt', nummer: '48478' },
      { organisation: 'Visana', status: 'anerkannt' },
    ],
    zsr: 'N286064',
    gln: '76601009360558',
    sprachen: ['Schweizerdeutsch', 'Deutsch'],
    weitereSprachen: { label: 'Behandlung zusätzlich möglich auf', items: ['Englisch', 'Französisch', 'Spanisch'] },
    bio: [
      'Désirée hat Soziale Arbeit an der FHNW studiert und danach mehrere Jahre in der Suchttherapie und der Sozialpsychiatrie gearbeitet. Sie kennt Menschen in schwierigen Lebensphasen und weiss, wie wichtig ein ruhiger, verlässlicher Rahmen für eine Behandlung ist.',
      'Heute arbeitet sie als Naturheilpraktikerin TCM mit Akupunktur und Tuina. Ein besonderes Interesse hat sie für psycho-emotionale Beschwerden wie Stress, Schlafprobleme und Ängste. Bei Trauma, Depression und Sucht behandelt sie begleitend zu einer ärztlichen oder psychotherapeutischen Betreuung.',
      'Daneben behandelt sie Frauenbeschwerden und Schmerzen an Gelenken und Wirbelsäule. Weitergebildet hat sie sich unter anderem in der Ohrakupunktur nach dem NADA-Protokoll, das aus der Suchtarbeit stammt.',
    ],
    needsConfirmation: [
      { field: 'bild', note: 'Kein Portrait im Repository. Initialen-Placeholder aktiv.' },
      { field: 'gln', note: 'Gelieferte GLN «76601009360558» hat 14 statt 13 Stellen. Unverändert gespeichert, nicht öffentlich angezeigt.' },
    ],
  },
];

export const getTherapeut = (slug: string) => therapeuten.find((t) => t.slug === slug);
export const getTherapeutByName = (name: string) => therapeuten.find((t) => t.name === name || t.registerName === name);

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const LOC_PIN =
  '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>';

/** Portrait oder Initialen-Placeholder (kein Stockfoto). */
export const portraitHtml = (t: Therapeut, cls: string, eager = false): string =>
  t.bild
    ? `<img width="630" height="840" src="${t.bild}" alt="${esc(t.name)}, ${esc(t.titel)} bei TCM.ch" class="${cls}" loading="${eager ? 'eager' : 'lazy'}">`
    : `<div class="${cls} tmc-initials" role="img" aria-label="${esc(t.name)}"><span>${esc(initials(t.name))}</span></div>`;

/**
 * Eine Teamkarte als HTML-String. Einheitliche Struktur für alle Personen:
 * Bild, Berufsbezeichnung, Name, max. 2 Fokusthemen, Standort, max. 2 Badges, «Profil ansehen».
 * Gesamte Karte klickbar → /team/<slug>/. Styles: .tmc-* in public/home.css.
 */
export const teamCardHtml = (t: Therapeut): string => {
  const focus = (t.cardFocus ?? []).slice(0, 2);
  const badges = activeRegs(t).slice(0, 2);
  return (
    `<a href="/team/${t.slug}/" class="tmc reveal" aria-label="Profil von ${esc(t.name)} ansehen">` +
    `<div class="tmc-photo">${portraitHtml(t, 'tmc-img')}</div>` +
    `<div class="tmc-body">` +
    `<div class="tmc-title">${esc(t.titel)}</div>` +
    `<div class="tmc-name">${esc(t.name)}</div>` +
    `<div class="tmc-focus">${focus.map(esc).join(' · ')}</div>` +
    `<div class="tmc-loc">${t.ortLabel ? LOC_PIN + esc(t.ortLabel) : ''}</div>` +
    `<div class="tmc-badges">${badges.map((b) => `<span>${esc(b.organisation)}</span>`).join('')}</div>` +
    `<span class="tmc-cta">Profil ansehen <span aria-hidden="true">→</span></span>` +
    `</div></a>`
  );
};

/** Das komplette Teamgrid (Über-uns-Sektion) als HTML-String. */
export const teamGridHtml = (): string =>
  `<div class="tmc-grid">${therapeuten.map(teamCardHtml).join('')}</div>`;
