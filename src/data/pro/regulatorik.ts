// Regulatorik (/regulatorik/…) — Orientierung zu BAB, EMR, ASCA, ZSR, OdA AM für Fachpersonen.
// Regel: regulatorische Fakten nur aus offiziellen Primärquellen; keine Stunden/Gebühren/Fristen aus Modellwissen.
// Patienten-Kassenfragen bleiben bei /krankenkassen/, Kritik/Meinung bei OUCH.
import { BODY } from './cohort-bodies';

/**
 * Freigabe-Gate: erst true setzen, wenn jede Quelle unten im Browser geöffnet, geprüft und mit `checked` datiert ist.
 * Solange false: Regulatorik-Seiten + Hub rendern noindex,follow (nicht in Sitemap) und zeigen «Stand» statt «Zuletzt fachlich geprüft».
 * Grund 09/2026: Build-Umgebung hatte keinen Netzwerkzugriff auf zh.ch / emr.ch / asca.ch / sasis.ch / oda-am.ch.
 */
export const REGULATORIK_VERIFIED = false;
export const REGULATORIK_STAND = '2026-09-30';

export interface OfficialSource {
  org: string;
  title: string;
  url: string;
  /** ISO-Datum der letzten manuellen Prüfung; null = noch nicht geprüft. */
  checked: string | null;
}

export const SOURCES: Record<string, OfficialSource> = {
  zhKomplementaer: { org: 'Kanton Zürich, Gesundheitsdirektion', title: 'Nichtärztliche Komplementärmedizin (Bewilligungen)', url: 'https://www.zh.ch/de/gesundheit/gesundheitsberufe/bewilligungen/nichtaerztliche-komplementaermedizin.html', checked: null },
  zhAkupunktur: { org: 'Kanton Zürich, Gesundheitsdirektion', title: 'Merkblatt Akupunktur (PDF)', url: 'https://www.zh.ch/content/dam/zhweb/bilder-dokumente/themen/gesundheit/gesundheitsberufe/merkblaetter_neu/merkblatt_akupunktur_nov_2023.pdf', checked: null },
  bgbm: { org: 'Schweizerische Eidgenossenschaft (Fedlex)', title: 'Bundesgesetz über den Binnenmarkt (BGBM), SR 943.02', url: 'https://www.fedlex.admin.ch/eli/cc/1996/1738_1738_1738/de', checked: null },
  emr: { org: 'EMR ErfahrungsMedizinisches Register', title: 'Registrierung, Reglemente und Methodenliste', url: 'https://www.emr.ch/', checked: null },
  ascaArg: { org: 'Stiftung ASCA', title: 'Allgemeines Anerkennungsreglement (PDF)', url: 'https://asca.ch/wp-content/uploads/2023/12/CGATh_2023_DE.pdf', checked: null },
  ascaArarg: { org: 'Stiftung ASCA', title: 'Ausführungsreglement zum Anerkennungsreglement (PDF)', url: 'https://asca.ch/wp-content/uploads/2023/12/ReCGATh_2023_DE.pdf', checked: null },
  asca: { org: 'Stiftung ASCA', title: 'Anerkennung, Methodenliste und Weiterbildung', url: 'https://asca.ch/', checked: null },
  sasis: { org: 'SASIS AG', title: 'Zahlstellenregister (ZSR)', url: 'https://www.sasis.ch/', checked: null },
  refdata: { org: 'Stiftung Refdata', title: 'GLN (Global Location Number)', url: 'https://www.refdata.ch/', checked: null },
  odaAm: { org: 'OdA AM Organisation der Arbeitswelt Alternativmedizin Schweiz', title: 'Höhere Fachprüfung Naturheilpraktiker:in, Prüfungsordnung, Wegleitung, Module', url: 'https://www.oda-am.ch/', checked: null },
};

export type WiwKey = 'oda-am' | 'bab' | 'emr' | 'asca' | 'zsr';
/** «Was ist was?» — kompakte Vergleichskomponente, verlinkt auf den jeweiligen Owner. */
export const WAS_IST_WAS: { key: WiwKey; label: string; role: string; href: string }[] = [
  { key: 'oda-am', label: 'OdA AM', role: 'Ausbildung / Prüfung / eidg. Diplom', href: '/regulatorik/oda-am/' },
  { key: 'bab', label: 'BAB', role: 'Kantonale Berufsausübung', href: '/regulatorik/berufsausuebungsbewilligung/' },
  { key: 'emr', label: 'EMR', role: 'Registrierung / Qualitätslabel', href: '/regulatorik/emr/' },
  { key: 'asca', label: 'ASCA', role: 'Anerkennung / Qualitätslabel', href: '/regulatorik/asca/' },
  { key: 'zsr', label: 'ZSR', role: 'Leistungserbringer-Identifikation', href: '/regulatorik/zsr/' },
];

const OUCH = 'https://ouch.tcm.ch/insights';

export interface RegPage {
  slug: string;
  wiw: WiwKey;
  card: string;
  title: string;
  metaDesc: string;
  h1: string;
  lead: string;
  short: string;
  bodyHtml: string;
  not?: string[];
  faq?: { q: string; a: string }[];
  cta: { title: string; text?: string; label: string; href: string };
  ouch?: { label: string; url: string };
  sources: (keyof typeof SOURCES)[];
}

export const REGULATORIK: RegPage[] = [
  {
    slug: 'berufsausuebungsbewilligung', wiw: 'bab',
    card: 'Kantonale Berufsausübung: warum Kanton, Methode und Qualifikation zählen.',
    title: 'Berufsausübungsbewilligung TCM: Was gilt in deinem Kanton?',
    metaDesc: 'Brauchst du als TCM-Therapeut:in eine Berufsausübungsbewilligung? Warum Kanton, Methode und Qualifikation entscheidend sind und was du vor Praxisstart prüfen solltest.',
    h1: 'Berufsausübungsbewilligung für TCM: Erst den Kanton prüfen.',
    lead: 'Eine der häufigsten Fragen vor dem Praxisstart lautet: Brauche ich eine Berufsausübungsbewilligung? Die unbefriedigende, aber wichtige Antwort lautet: Es kommt darauf an. In der Schweiz wird die Berufsausübung in der nichtärztlichen Komplementärmedizin kantonal geregelt. Entscheidend sind deshalb nicht nur deine Ausbildung, sondern auch der Kanton und die konkrete Tätigkeit, die du ausüben möchtest.',
    short: 'Es gibt keine einheitliche Schweizer TCM-Bewilligung. Ob du eine Berufsausübungsbewilligung brauchst, entscheidet der Kanton – und zwar für die konkrete Tätigkeit. Invasive Methoden wie Akupunktur prüfst du separat.',
    bodyHtml: BODY.bab,
    not: ['kein eidgenössisches Diplom (das ist ein Berufsabschluss)', 'keine EMR- oder ASCA-Registrierung', 'keine ZSR-Nummer', 'keine schweizweit gültige Einheitsbewilligung'],
    faq: [
      { q: 'Braucht jede TCM-Therapeutin in der Schweiz eine BAB?', a: 'Nein, eine solche pauschale Aussage wäre falsch. Die Anforderungen hängen vom Kanton und der ausgeübten Tätigkeit ab. Besonders invasive Methoden wie Akupunktur müssen separat geprüft werden.' },
      { q: 'Ist das eidgenössische Diplom automatisch eine Berufsausübungsbewilligung?', a: 'Nein. Das eidgenössische Diplom ist ein Berufsabschluss. Die Berufsausübung wird kantonal geregelt.' },
      { q: 'Brauche ich EMR, um eine BAB zu beantragen?', a: 'Das lässt sich nicht schweizweit pauschal beantworten. BAB und EMR sind unterschiedliche Systeme. Prüfe die Voraussetzungen des konkreten Kantons.' },
    ],
    cta: { title: 'Du planst deine eigene Praxis?', text: 'Bewilligung ist nur eine Zeile auf der Checkliste. Standort, Kosten, Anerkennungen, Abrechnung und Patientengewinnung gehören genauso dazu.', label: 'Praxisgründung Schritt für Schritt', href: '/praxiswissen/tcm-praxis-eroeffnen/' },
    ouch: { label: 'Die Kantons-Lotterie', url: `${OUCH}/kantons-lotterie/` },
    sources: ['zhKomplementaer', 'zhAkupunktur', 'bgbm'],
  },
  {
    slug: 'emr', wiw: 'emr',
    card: 'Privates Registrierungs- und Qualitätslabel: Ablauf, Weiterbildung, Grenzen.',
    title: 'EMR Registrierung TCM: Voraussetzungen, Ablauf & Unterschiede',
    metaDesc: 'Wie funktioniert die EMR-Registrierung für TCM-Therapeut:innen? Methoden, Ausbildungsnachweise, Weiterbildung und der Unterschied zu BAB, ASCA und ZSR.',
    h1: 'EMR: Was die Registrierung bedeutet – und was nicht.',
    lead: 'Wenn du mit Zusatzversicherungen arbeitest, begegnet dir das EMR sehr schnell. Trotzdem wird die Registrierung oft mit Berufsbewilligung, eidgenössischem Diplom oder Krankenkassengarantie vermischt. Das sind unterschiedliche Dinge.',
    short: 'Das EMR ist ein privates Registrierungs- und Qualitätslabel. Registriert wirst du für eine bestimmte Methode bzw. einen Berufsabschluss nach dem aktuellen EMR-Reglement. Eine kantonale Bewilligung oder eine Kostenzusage der Versicherer ist es nicht.',
    bodyHtml: BODY.emr,
    not: ['keine kantonale Berufsausübungsbewilligung', 'kein eidgenössisches Diplom', 'keine automatische Kostengutsprache einer Zusatzversicherung', 'nicht dasselbe wie eine ASCA-Anerkennung'],
    cta: { title: 'Du willst die ganze Anerkennungslandschaft verstehen?', text: 'Wir bauen den TCM.ch Anerkennungs-Navigator. Bis dahin findest du alle einzelnen Schritte im Bereich Regulatorik.', label: 'Regulatorik ansehen', href: '/regulatorik/' },
    ouch: { label: 'Das EMR/ASCA-Labyrinth', url: `${OUCH}/emr-asca-labyrinth/` },
    sources: ['emr'],
  },
  {
    slug: 'asca', wiw: 'asca',
    card: 'Anerkennung je Methode nach ASCA-Reglement: Weg, Unterlagen, Grenzen.',
    title: 'ASCA Anerkennung TCM: Voraussetzungen & Ablauf erklärt',
    metaDesc: 'Wie funktioniert die ASCA-Anerkennung für TCM-Therapeut:innen? Methodenliste, Ausbildung, Weiterbildung und Unterschied zu EMR, BAB und eidgenössischem Diplom.',
    h1: 'ASCA: Was du vor dem Anerkennungsgesuch wissen solltest.',
    lead: 'ASCA ist eines der bekannten Qualitätslabels der Schweizer Komplementärmedizin. Für Therapeut:innen ist trotzdem wichtiger als das Logo die Frage: Für welche Methode möchtest du anerkannt werden – und erfüllst du genau deren aktuelle Anforderungen?',
    short: 'Die Stiftung ASCA anerkennt Therapeut:innen methodenbezogen nach ihren eigenen Reglementen und ihrer Methodenliste. Eine ASCA-Anerkennung ist keine Berufsausübungsbewilligung und keine Deckungszusage.',
    bodyHtml: BODY.asca,
    cta: { title: 'BAB, EMR, ASCA, ZSR und OdA AM auseinanderhalten', label: 'Alle Anerkennungen verstehen', href: '/regulatorik/' },
    ouch: { label: 'Das EMR/ASCA-Labyrinth', url: `${OUCH}/emr-asca-labyrinth/` },
    sources: ['ascaArg', 'ascaArarg', 'asca'],
  },
  {
    slug: 'zsr', wiw: 'zsr',
    card: 'Identifikation im Leistungserbringer-System, keine Anerkennung.',
    title: 'ZSR-Nummer für TCM-Therapeut:innen: Was sie bedeutet',
    metaDesc: 'Was ist eine ZSR-Nummer und wann spielt sie für TCM-Therapeut:innen eine Rolle? Unterschied zu EMR, ASCA, BAB und GLN verständlich erklärt.',
    h1: 'ZSR-Nummer: Identifikation ist nicht dasselbe wie Anerkennung.',
    lead: 'ZSR, EMR, ASCA, GLN, BAB: Wer eine Praxis eröffnet, sammelt erstaunlich schnell Abkürzungen. Die ZSR-Nummer gehört zum Schweizer Leistungserbringer-System. Sie sagt aber nicht automatisch aus, dass du jede gewünschte Methode ausüben oder jede Versicherung abrechnen darfst.',
    short: 'Die ZSR-Nummer identifiziert Leistungserbringer im Zahlstellenregister, das SASIS führt. Sie ist weder Berufsausübungsbewilligung noch Anerkennung. Welche Voraussetzungen für dich gelten, legen die aktuellen SASIS-Bedingungen fest.',
    bodyHtml: BODY.zsr,
    not: ['keine kantonale Berufsausübungsbewilligung', 'keine EMR- oder ASCA-Registrierung', 'nicht dasselbe wie die GLN', 'keine Zusage, bei jeder Versicherung abrechnen zu können'],
    faq: [
      { q: 'Was ist eine ZSR-Nummer?', a: 'Eine Identifikationsnummer im Zahlstellenregister, das SASIS führt. Sie dient dazu, Leistungserbringer im Schweizer Abrechnungssystem eindeutig zuzuordnen.' },
      { q: 'Ist ZSR dasselbe wie GLN?', a: 'Nein. ZSR-Nummer und GLN sind unterschiedliche Identifikatoren mit unterschiedlichen Einsatzbereichen. Welche Nummer du wofür brauchst, hängt von deiner Tätigkeit ab.' },
      { q: 'Brauche ich als TCM-Therapeut automatisch eine ZSR?', a: 'Das lässt sich nicht pauschal beantworten. Ob und wofür du eine ZSR-Nummer brauchst, hängt von deiner Tätigkeit und deiner Abrechnungssituation ab. Massgebend sind die aktuellen Bedingungen von SASIS.' },
      { q: 'Bekomme ich mit EMR automatisch eine ZSR?', a: 'Darauf gibt es keine pauschale Zusage. EMR-Registrierung und ZSR-Nummer sind getrennte Systeme. Welche Voraussetzungen für eine ZSR-Nummer gelten, legen die aktuellen SASIS- und Registrierungsbedingungen fest.' },
    ],
    cta: { title: 'Die Reihenfolge klären, bevor du Nummern beantragst', text: 'Bewilligung, Anerkennung, Abrechnung: Die Praxisgründung im Überblick.', label: 'Praxisgründung Schritt für Schritt', href: '/praxiswissen/tcm-praxis-eroeffnen/' },
    sources: ['sasis', 'refdata'],
  },
  {
    slug: 'oda-am', wiw: 'oda-am',
    card: 'Module, Zertifikat, M7 und Höhere Fachprüfung zum eidgenössischen Diplom.',
    title: 'OdA AM: Zertifikat, M7 & eidgenössisches Diplom erklärt',
    metaDesc: 'Was macht die OdA AM? Der Weg über Module, Zertifikat, M7 und Höhere Fachprüfung zum Naturheilpraktiker mit eidgenössischem Diplom TCM.',
    h1: 'OdA AM: Der Weg zum eidgenössischen Diplom in TCM.',
    lead: 'Wer in der Schweiz den Weg zum Naturheilpraktiker mit eidgenössischem Diplom in Traditioneller Chinesischer Medizin geht, begegnet der OdA AM spätestens bei Modulen, Zertifikat, M7 und Höherer Fachprüfung. Diese Begriffe gehören zusammen – sind aber nicht dasselbe.',
    short: 'Die OdA AM ist Trägerin der Höheren Fachprüfung für Naturheilpraktiker:innen. Der Weg führt über Module, das Zertifikat OdA AM und M7 zur HFP und zum eidgenössischen Diplom. Eine Berufsausübungsbewilligung ist das Diplom nicht.',
    bodyHtml: BODY.odaAm,
    not: ['kein Register wie EMR oder ASCA', 'keine kantonale Berufsausübungsbewilligung', 'das Zertifikat OdA AM ist nicht das eidgenössische Diplom'],
    cta: { title: 'Du suchst M7, Praktikum oder Begleitung nach der Ausbildung?', label: 'TCM.ch Akademie', href: '/akademie/' },
    sources: ['odaAm'],
  },
];

export const regHref = (slug: string) => `/regulatorik/${slug}/`;
