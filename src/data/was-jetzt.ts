// Was jetzt?: Daten-Layer für /gesundheitsbibliothek/was-jetzt/
//
// INTENT-ABGRENZUNG innerhalb der Gesundheitsbibliothek (nicht verwischen):
// - Körpersignale:      "Ich bemerke etwas."
// - Beschwerden:        "Ich kenne oder vermute das Problem."
// - Befunde & Werte:    "Ein Test/Bericht sagt etwas."
// - Was jetzt?:         "Was kann ich jetzt sicher selbst tun?"
// - Therapien:          "Welche professionelle Behandlung gibt es?"
// - Fragen:             "Konkrete Behandlungsfrage."
// - Wissen:             "Thema verstehen."
// - Perspektiven:       "Wie TCM.ch klinisch entscheidet."
// - TCM verstehen:      "TCM-Begriffe/Modelle verstehen."
//
// Dieses Cluster besitzt NUR den Handlungs-Intent (sofortige Selbsthilfe,
// was vermeiden, wann abklären, wann professionelle Behandlung). Es ist keine
// zweite Beschwerden-Bibliothek, kein Hausmittel-Lexikon, keine DIY-Verordnung.
//
// STRENGER SEITEN-TEST (Publikation nur bei mind. 4 von 5):
// 1. klarer handlungsorientierter Such-Intent
// 2. Antwort unterscheidet sich substanziell von Beschwerden-/Signal-Seite
// 3. echter Selbstmanagement-Nutzen
// 4. natürliche interne Links zu bestehenden Knoten
// 5. realer SEO- oder Navigationswert
// Sonst: Selbsthilfe-Abschnitt auf der Owner-Seite ergänzen statt neuer URL.
//
// Kräuter: KEIN Selbsthilfe-Feld (bewusst kein herbsHtml). Chinesische
// Kräutertherapie ist ein professioneller Behandlungsweg; Erwähnungen
// verlinken auf /therapien/kraeutertherapie/.

export type SelfCareTool =
  | 'movement'
  | 'nutrition'
  | 'acupressure'
  | 'heat-cold'
  | 'sleep'
  | 'stress'
  | 'ergonomics'
  | 'rest-recovery';

export const TOOL_LABELS: Record<SelfCareTool, string> = {
  movement: 'Bewegung',
  nutrition: 'Ernährung',
  acupressure: 'Akupressur',
  'heat-cold': 'Wärme & Kälte',
  sleep: 'Schlaf',
  stress: 'Stress & Entspannung',
  ergonomics: 'Alltag & Ergonomie',
  'rest-recovery': 'Ruhe & Erholung',
};

// low-risk: Selbsthilfe unproblematisch. needs-caution: Selbsthilfe ok, aber
// mit klaren Abklärungs-Hinweisen. medical-first: nur als Triage-/Weiterleitungs-
// Seite zulässig (in Phase 1 nicht vorgesehen).
export type SelfCareSafety = 'low-risk' | 'needs-caution' | 'medical-first';

export interface WasJetztLink {
  href: string;
  label: string;
}

export interface WasJetztEntry {
  slug: string;
  title: string;
  status: 'planned' | 'draft' | 'published';
  indexable: boolean;
  deck: string;
  // Kannibalisierungs-Leitplanken (Pflicht pro Eintrag):
  primaryPurpose: string;
  // Bestehende URL(s), die den Erkrankungs-/Signal-Intent besitzen. Leeres Array
  // NUR wenn kein Owner existiert; Begründung in overlapNotes. Keine URLs erfinden.
  canonicalIntentOwner: string[];
  overlapNotes: string;
  // Welche Selbsthilfe-Dimensionen der künftige Artikel nutzt. Nur relevante
  // Blöcke: KEIN Pflicht-Raster über alle Tools hinweg.
  selfCareTools: SelfCareTool[];
  safetyLevel: SelfCareSafety;
  suggestedReviewerType: string;
  // Nur verifizierte, existierende URLs:
  relatedSignals?: WasJetztLink[];
  relatedConditions?: WasJetztLink[];
  relatedFindings?: WasJetztLink[];
  relatedTherapies?: WasJetztLink[];
  relatedDiagnostics?: WasJetztLink[];
  relatedVisuals?: WasJetztLink[];
  // Phase 2 (Inhalt): alle Blöcke optional, bleiben in Phase 1 leer.
  shortAnswerHtml?: string;          // Kurzantwort
  doNowHtml?: string;                // Was du jetzt tun kannst
  avoidHtml?: string;                // Was du besser vermeiden solltest
  movementHtml?: string;             // optionale Module: nur wo relevant
  nutritionHtml?: string;
  acupressureHtml?: string;          // max. 1-2 einfache Punkte, ersetzt keine Abklärung
  heatColdHtml?: string;
  sleepHtml?: string;
  stressHtml?: string;
  ergonomicsHtml?: string;
  whenToSeekCareHtml?: string;       // Wann ärztlich abklären
  notBetterHtml?: string;            // Wenn es nicht besser wird
  professionalTreatmentHtml?: string; // Wann professionelle Behandlung sinnvoll sein kann
  sources?: { label: string; url?: string }[];
  publishedAt?: string;
  updatedAt?: string;
}

// Hub bleibt noindex,follow bis mindestens 4 wirklich publizierte, hochwertige
// Beiträge existieren.
export const HUB_INDEXABLE = false;

export const wasJetzt: WasJetztEntry[] = [
  {
    slug: 'akuter-hexenschuss',
    title: 'Was tun bei akutem Hexenschuss?',
    status: 'planned',
    indexable: false,
    deck: 'Erste Schritte bei akutem Hexenschuss: was jetzt hilft, was du vermeiden solltest und wann eine Abklärung wichtig ist.',
    primaryPurpose: 'Sofort-Handlungs-Intent bei akutem Hexenschuss; keine Erklärung der Erkrankung.',
    canonicalIntentOwner: ['/beschwerden/hexenschuss/'],
    overlapNotes: 'Erkrankungs-Intent gehört /beschwerden/hexenschuss/. Diese Seite bleibt bei Sofortmassnahmen/Verhalten und delegiert Ursachen, Diagnose und Behandlung an den Owner.',
    selfCareTools: ['movement', 'heat-cold', 'rest-recovery'],
    safetyLevel: 'needs-caution',
    suggestedReviewerType: 'Fachliche Review (TCM-Therapeut:in + ärztlich bei Red Flags)',
    relatedConditions: [
      { href: '/beschwerden/hexenschuss/', label: 'Hexenschuss' },
      { href: '/beschwerden/rueckenschmerzen/', label: 'Rückenschmerzen' },
    ],
    relatedTherapies: [{ href: '/therapien/akupunktur/', label: 'Akupunktur' }],
  },
  {
    slug: 'ischias-schmerzen',
    title: 'Was tun bei Ischias-Schmerzen?',
    status: 'planned',
    indexable: false,
    deck: 'Was bei Ischias-Schmerzen jetzt sinnvoll ist, welche Bewegungen helfen können und wann du ärztlich abklären solltest.',
    primaryPurpose: 'Handlungs-Intent bei Ischias-Beschwerden; die Erkrankungsseite bleibt Owner für Ursachen und Behandlung.',
    canonicalIntentOwner: ['/beschwerden/ischias/'],
    overlapNotes: 'Erkrankungs-Intent gehört /beschwerden/ischias/. Kein Reha-Programm, keine Physio-Ersatzinhalte (Grenze zu physio.ch beachten).',
    selfCareTools: ['movement', 'heat-cold', 'ergonomics'],
    safetyLevel: 'needs-caution',
    suggestedReviewerType: 'Fachliche Review (TCM-Therapeut:in + ärztlich bei Red Flags)',
    relatedConditions: [
      { href: '/beschwerden/ischias/', label: 'Ischias' },
      { href: '/beschwerden/bandscheibenvorfall/', label: 'Bandscheibenvorfall' },
    ],
    relatedVisuals: [{ href: '/visuals/ischias/', label: 'Visual: Verlauf des Ischiasnervs' }],
    relatedTherapies: [{ href: '/therapien/akupunktur/', label: 'Akupunktur' }],
  },
  {
    slug: 'nackenschmerzen-nach-dem-schlafen',
    title: 'Was tun bei Nackenschmerzen nach dem Schlafen?',
    status: 'planned',
    indexable: false,
    deck: 'Steifer Nacken am Morgen: was jetzt hilft, worauf du beim Schlafen achten kannst und wann mehr dahinterstecken kann.',
    primaryPurpose: 'Handlungs-Intent für den akuten Morgen-Nacken; Signal- und Erkrankungsseiten bleiben Owner der Einordnung.',
    canonicalIntentOwner: ['/koerpersignale/nacken-morgens-steif/', '/beschwerden/nackenschmerzen/'],
    overlapNotes: 'Einordnungs-Intent gehört dem Körpersignal nacken-morgens-steif und /beschwerden/nackenschmerzen/. Diese Seite bleibt bei Sofortmassnahmen, Schlafumgebung und Alltag.',
    selfCareTools: ['movement', 'heat-cold', 'sleep', 'ergonomics'],
    safetyLevel: 'low-risk',
    suggestedReviewerType: 'Fachliche Review (TCM-Therapeut:in)',
    relatedSignals: [{ href: '/koerpersignale/nacken-morgens-steif/', label: 'Nacken morgens steif' }],
    relatedConditions: [{ href: '/beschwerden/nackenschmerzen/', label: 'Nackenschmerzen' }],
    relatedVisuals: [{ href: '/visuals/nacken-ausstrahlung/', label: 'Visual: Ausstrahlung vom Nacken' }],
    relatedTherapies: [{ href: '/therapien/tuina/', label: 'Tuina' }],
  },
  {
    slug: 'migraene-im-anflug',
    title: 'Was tun bei Migräne im Anflug?',
    status: 'planned',
    indexable: false,
    deck: 'Wenn sich eine Migräne ankündigt: was in der Frühphase helfen kann, was du vermeiden solltest und wann ärztliche Hilfe nötig ist.',
    primaryPurpose: 'Handlungs-Intent für die Frühphase einer Migräne-Attacke; die Erkrankungsseite bleibt Owner.',
    canonicalIntentOwner: ['/beschwerden/migraene/'],
    overlapNotes: 'Erkrankungs-Intent gehört /beschwerden/migraene/. Keine Medikamenten-Empfehlungen; Akutmedikation ist ärztliches Terrain.',
    selfCareTools: ['rest-recovery', 'stress', 'acupressure'],
    safetyLevel: 'needs-caution',
    suggestedReviewerType: 'Fachliche Review (TCM-Therapeut:in + ärztlich bei Red Flags)',
    relatedConditions: [{ href: '/beschwerden/migraene/', label: 'Migräne' }],
    relatedTherapies: [{ href: '/therapien/akupunktur/', label: 'Akupunktur' }],
  },
  {
    slug: 'voellegefuehl-nach-dem-essen',
    title: 'Was tun bei Völlegefühl nach dem Essen?',
    status: 'planned',
    indexable: false,
    deck: 'Praktische Schritte bei Völlegefühl: was jetzt entlastet, welche Essgewohnheiten helfen und wann eine Abklärung sinnvoll ist.',
    primaryPurpose: 'Handlungs-Intent; das gleichnamige Körpersignal bleibt Owner der Einordnung ("was bedeutet das?").',
    canonicalIntentOwner: ['/koerpersignale/voellegefuehl-nach-dem-essen/'],
    overlapNotes: 'ACHTUNG: identischer Slug wie das Körpersignal. Höchstes internes Kannibalisierungs-Risiko der Welle; Publikation nur, wenn der Handlungsteil den Seiten-Test (4/5) klar besteht, sonst Selbsthilfe-Abschnitt im Körpersignal ergänzen. /beschwerden/verdauungsprobleme/ bleibt Owner des Erkrankungs-Intents.',
    selfCareTools: ['nutrition', 'movement'],
    safetyLevel: 'low-risk',
    suggestedReviewerType: 'Fachliche Review (TCM-Therapeut:in)',
    relatedSignals: [{ href: '/koerpersignale/voellegefuehl-nach-dem-essen/', label: 'Völlegefühl nach dem Essen' }],
    relatedConditions: [{ href: '/beschwerden/verdauungsprobleme/', label: 'Verdauungsprobleme' }],
  },
  {
    slug: 'blaehbauch-am-abend',
    title: 'Was tun bei Blähbauch am Abend?',
    status: 'planned',
    indexable: false,
    deck: 'Was gegen den abendlichen Blähbauch hilft: einfache Schritte für heute Abend und Gewohnheiten für die nächsten Tage.',
    primaryPurpose: 'Handlungs-Intent; das gleichnamige Körpersignal bleibt Owner der Einordnung.',
    canonicalIntentOwner: ['/koerpersignale/blaehbauch-am-abend/'],
    overlapNotes: 'Identischer Slug wie das Körpersignal (gleiches Risiko wie voellegefuehl-nach-dem-essen; Seiten-Test streng anwenden). /beschwerden/blaehungen/ und /beschwerden/reizdarm/ bleiben Owner der Erkrankungs-Intents.',
    selfCareTools: ['nutrition', 'movement', 'stress'],
    safetyLevel: 'low-risk',
    suggestedReviewerType: 'Fachliche Review (TCM-Therapeut:in)',
    relatedSignals: [{ href: '/koerpersignale/blaehbauch-am-abend/', label: 'Blähbauch am Abend' }],
    relatedConditions: [
      { href: '/beschwerden/blaehungen/', label: 'Blähungen' },
      { href: '/beschwerden/reizdarm/', label: 'Reizdarm' },
    ],
  },
  {
    slug: 'muskelverspannungen',
    title: 'Was tun bei Muskelverspannungen?',
    status: 'planned',
    indexable: false,
    deck: 'Verspannte Muskeln lösen: was du selbst tun kannst, was Verspannungen verstärkt und wann Behandlung sinnvoll ist.',
    primaryPurpose: 'Handlungs-Intent bei muskulären Verspannungen; kein Erkrankungs-Explainer, kein Therapie-Ersatz.',
    canonicalIntentOwner: [],
    overlapNotes: 'Kein bestehender Owner: keine Beschwerden-Seite zu Muskelverspannungen (geprüft). Nächste Nachbarn /beschwerden/nackenschmerzen/ und /beschwerden/rueckenschmerzen/ besitzen ihre regionalen Intents; diese Seite bleibt generisch-handlungsorientiert und delegiert regionale Beschwerden dorthin. Kein Physio-Ersatzcontent (physio.ch-Grenze).',
    selfCareTools: ['movement', 'heat-cold', 'stress', 'ergonomics'],
    safetyLevel: 'low-risk',
    suggestedReviewerType: 'Fachliche Review (TCM-Therapeut:in)',
    relatedConditions: [
      { href: '/beschwerden/nackenschmerzen/', label: 'Nackenschmerzen' },
      { href: '/beschwerden/rueckenschmerzen/', label: 'Rückenschmerzen' },
    ],
    relatedTherapies: [
      { href: '/therapien/tuina/', label: 'Tuina' },
      { href: '/therapien/massage/', label: 'Massage' },
    ],
  },
  {
    slug: 'knieschmerzen-nach-belastung',
    title: 'Was tun bei Knieschmerzen nach Belastung?',
    status: 'planned',
    indexable: false,
    deck: 'Knie schmerzt nach Sport oder Belastung: was jetzt sinnvoll ist, wie du weiter belastest und wann eine Abklärung wichtig ist.',
    primaryPurpose: 'Handlungs-Intent nach Belastung; die Erkrankungsseite bleibt Owner für Ursachen und Behandlung.',
    canonicalIntentOwner: ['/beschwerden/knieschmerzen/'],
    overlapNotes: 'Erkrankungs-Intent gehört /beschwerden/knieschmerzen/. Kein Reha-/Trainingsprogramm (physio.ch-Grenze); Belastungssteuerung nur als breite, sichere Orientierung.',
    selfCareTools: ['movement', 'heat-cold', 'rest-recovery'],
    safetyLevel: 'needs-caution',
    suggestedReviewerType: 'Fachliche Review (TCM-Therapeut:in + ärztlich bei Red Flags)',
    relatedConditions: [
      { href: '/beschwerden/knieschmerzen/', label: 'Knieschmerzen' },
      { href: '/beschwerden/arthrose/', label: 'Arthrose' },
    ],
    relatedTherapies: [{ href: '/therapien/akupunktur/', label: 'Akupunktur' }],
  },
  {
    slug: 'schlafprobleme-heute-nacht',
    title: 'Was tun bei Schlafproblemen heute Nacht?',
    status: 'planned',
    indexable: false,
    deck: 'Wenn du jetzt nicht schlafen kannst: was in dieser Nacht hilft, was du lassen solltest und wann Schlafprobleme abgeklärt gehören.',
    primaryPurpose: 'Akut-Handlungs-Intent ("heute Nacht"); die Erkrankungsseite bleibt Owner für chronische Schlafprobleme.',
    canonicalIntentOwner: ['/beschwerden/schlafprobleme/'],
    overlapNotes: 'Erkrankungs-Intent gehört /beschwerden/schlafprobleme/ (Canonical, schlafstoerungen kanonisiert dorthin). Diese Seite bleibt bei der Akut-Situation; kein Schlafmittel-Content.',
    selfCareTools: ['sleep', 'stress', 'rest-recovery'],
    safetyLevel: 'low-risk',
    suggestedReviewerType: 'Fachliche Review (TCM-Therapeut:in)',
    relatedSignals: [{ href: '/koerpersignale/immer-zur-gleichen-uhrzeit-aufwachen/', label: 'Immer zur gleichen Uhrzeit aufwachen' }],
    relatedConditions: [{ href: '/beschwerden/schlafprobleme/', label: 'Schlafprobleme' }],
    relatedTherapies: [{ href: '/therapien/akupunktur/', label: 'Akupunktur' }],
  },
  {
    slug: 'leichter-schwindel',
    title: 'Was tun bei leichtem Schwindel?',
    status: 'planned',
    indexable: false,
    deck: 'Leichter Schwindel ohne Alarmzeichen: was du jetzt tun kannst, was du beobachten solltest und wann ärztliche Abklärung nötig ist.',
    primaryPurpose: 'Handlungs-Intent bei leichtem, nicht alarmierendem Schwindel; die Erkrankungsseite bleibt Owner.',
    canonicalIntentOwner: ['/beschwerden/schwindel/'],
    overlapNotes: 'Erkrankungs-Intent gehört /beschwerden/schwindel/; die Lage-Schwindel-Körpersignale (beim Aufstehen, beim Umdrehen im Bett, beim Bücken) behalten ihre Einordnungs-Intents. Abgrenzung "leicht" vs. abklärungsbedürftig muss redaktionell sehr sauber werden (needs-caution).',
    selfCareTools: ['rest-recovery', 'movement'],
    safetyLevel: 'needs-caution',
    suggestedReviewerType: 'Fachliche Review (TCM-Therapeut:in + ärztlich bei Red Flags)',
    relatedSignals: [
      { href: '/koerpersignale/schwindel-beim-aufstehen/', label: 'Schwindel beim Aufstehen' },
      { href: '/koerpersignale/schwindel-beim-umdrehen-im-bett/', label: 'Schwindel beim Umdrehen im Bett' },
    ],
    relatedConditions: [{ href: '/beschwerden/schwindel/', label: 'Schwindel' }],
  },
];

export const publishedWasJetzt = wasJetzt.filter((w) => w.status === 'published');
