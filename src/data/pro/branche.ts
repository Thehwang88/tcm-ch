// Branche (/branche/…) — Beruf, Arbeitsmarkt, Lohn, Praxisformen. Faktisch/einordnend.
// Keine geschätzten Branchengrössen, keine Lohnzahlen, keine Zitate ohne Quelle (siehe contributions.ts).
// Meinung/Kritik bleibt im OUCH.-Magazin; Stelleninserate bleiben /jobs/.
import { BODY } from './cohort-bodies';
import { BODY2 } from './cohort2-bodies';
import type { SourceId } from '../regulatorik/sources';

export interface BranchePage {
  slug: string;
  card: string;
  cardLabel: string;
  title: string;
  metaDesc: string;
  h1: string;
  lead: string;
  readTime: string;
  bodyHtml: string;
  method: string;
  ouch?: { label: string; url: string };
  cta: { title: string; text?: string; label?: string; href?: string; cards?: { k: string; t: string; href: string }[]; secondary?: { label: string; href: string } };
  related: string[];
  /** Answer-first. */
  short?: string;
  faq?: { q: string; a: string }[];
  /** Offizielle Quellen (src/data/regulatorik/sources.ts); «Zuletzt fachlich geprüft» nur wenn alle geprüft. */
  sources?: SourceId[];
}

const D = '2026-09-30';
export const BRANCHE_DATE = D;
const METHOD_NO_DATA = 'Diese Seite enthält bewusst keine geschätzten Schweizer Branchenzahlen. Zahlen veröffentlichen wir erst mit ausgewiesener Stichprobe, Zeitraum und Methodik. TCM.ch ist selbst Praxisbetreiber; eigene Erfahrung ist kein Branchendurchschnitt.';

export const BRANCHE: BranchePage[] = [
  {
    slug: 'tcm-in-der-schweiz', cardLabel: 'Beruf & Strukturen',
    card: 'Ausbildung, eidgenössischer Abschluss, Register, Versicherer und Kantone im Überblick.',
    title: 'TCM in der Schweiz: Beruf, Ausbildung & Strukturen erklärt',
    metaDesc: 'Wie ist TCM in der Schweiz organisiert? Eidgenössischer Berufsabschluss, Praxen, Zusatzversicherungen, Register, Arbeitgeber und kantonale Regeln im Überblick.',
    h1: 'TCM in der Schweiz: Ein Berufsfeld zwischen Praxis, Ausbildung und 26 Kantonen.',
    lead: 'Für Patient:innen wirkt TCM oft einfach: Praxis suchen, Termin buchen, behandeln lassen. Für Menschen, die in diesem Beruf arbeiten wollen, sieht die Welt dahinter deutlich komplexer aus. Ausbildung, eidgenössischer Abschluss, private Register, Zusatzversicherer und kantonale Berufsausübung greifen ineinander.',
    readTime: '6 Min.', bodyHtml: BODY.tcmInDerSchweiz, method: METHOD_NO_DATA,
    cta: { title: 'Du arbeitest selbst in TCM?', text: 'Lernen, arbeiten, Praxis führen, Regeln verstehen, gemeinsam wachsen: der professionelle Bereich von TCM.ch.', label: 'Für Fachpersonen', href: '/fachpersonen/' },
    related: ['tcm-arbeitsmarkt-schweiz', 'tcm-praxen-schweiz'],
  },
  {
    slug: 'tcm-arbeitsmarkt-schweiz', cardLabel: 'Arbeitsmarkt',
    card: 'Anstellung, Berufseinstieg, Standortleitung und eigene Praxis: die Modelle verstehen.',
    title: 'TCM Arbeitsmarkt Schweiz: Jobs, Selbstständigkeit & Berufseinstieg',
    metaDesc: 'Wie sieht der Arbeitsmarkt für TCM-Therapeut:innen in der Schweiz aus? Anstellung, eigene Praxis, Berufseinstieg, Standortleitung und worauf du bei Stellen achten solltest.',
    h1: 'TCM-Arbeitsmarkt Schweiz: Zwischen eigener Praxis und neuer Arbeitgeberlandschaft.',
    lead: 'Wer TCM lernt, stellt irgendwann eine überraschend praktische Frage: Wo arbeite ich danach eigentlich? Der Schweizer TCM-Arbeitsmarkt ist weniger standardisiert als bei Physiotherapie, Pflege oder Medizin. Genau deshalb lohnt es sich, die unterschiedlichen Modelle zu verstehen.',
    readTime: '6 Min.', bodyHtml: BODY.arbeitsmarkt, method: METHOD_NO_DATA,
    ouch: { label: 'TCM Jobs Schweiz', url: 'https://ouch.tcm.ch/insights/tcm-jobs-schweiz/' },
    cta: { title: 'Dein nächster Schritt', cards: [
      { k: 'Stellenmarkt', t: 'Jobs finden', href: '/jobs/' },
      { k: 'Anstellung', t: 'Bei TCM.ch arbeiten', href: '/karriere/' },
      { k: 'Gründen', t: 'Selbstständig werden', href: '/praxiswissen/tcm-praxis-eroeffnen/' },
      { k: 'Partner', t: 'Partner werden', href: '/partner/' },
    ] },
    related: ['tcm-lohn-schweiz', 'tcm-praxen-schweiz'],
  },
  {
    slug: 'tcm-lohn-schweiz', cardLabel: 'Lohn & Vergütung',
    card: 'Fixlohn, variable Vergütung, Selbstständigkeit: richtig vergleichen statt Durchschnitt raten.',
    title: 'TCM Therapeut Lohn Schweiz: Was verdient man wirklich?',
    metaDesc: 'Wie hoch ist der Lohn als TCM-Therapeut:in in der Schweiz? Warum es keinen verlässlichen Einheitslohn gibt und wie du Anstellung und Selbstständigkeit richtig vergleichst.',
    h1: 'Was verdient ein TCM-Therapeut in der Schweiz?',
    lead: 'Die einfache Antwort wäre eine Zahl. Die ehrliche Antwort ist komplizierter. In der Schweizer TCM gibt es angestellte Therapeut:innen, Umsatzbeteiligungen, Stundenmodelle und selbstständige Praxen. Diese Einkommen lassen sich nicht sinnvoll in einen einzigen Durchschnitt pressen.',
    readTime: '6 Min.', bodyHtml: BODY.lohn,
    method: 'Keine Lohnzahl auf dieser Seite ist ein Durchschnitt. Der Betrag CHF 20\'000 im Text ist ein Rechenbeispiel, kein Marktwert. Ein Benchmark erscheint erst mit ausgewiesener Stichprobe, Zeitraum und Methodik.',
    cta: { title: 'Angestellt oder selbstständig?', text: 'Der faire Vergleich von Risiko, Autonomie, Einkommen und Verantwortung.', label: 'Zum Vergleich', href: '/praxiswissen/tcm-selbststaendig-oder-angestellt/',
      cards: [
        { k: 'Vergleich', t: 'Angestellt oder selbstständig?', href: '/praxiswissen/tcm-selbststaendig-oder-angestellt/' },
        { k: 'Stellenmarkt', t: 'Offene Stellen', href: '/jobs/' },
      ] },
    related: ['tcm-arbeitsmarkt-schweiz', 'tcm-praxen-schweiz'],
  },
  {
    slug: 'tcm-praxen-schweiz', cardLabel: 'Praxisformen',
    card: 'Einzelpraxis, Praxisgemeinschaft, Arbeitgeberpraxis, mehrere Standorte, Netzwerk.',
    title: 'TCM Praxen Schweiz: Einzelpraxis, Klinik & Netzwerk im Vergleich',
    metaDesc: 'Wie sind TCM-Praxen in der Schweiz organisiert? Einzelpraxis, Gemeinschaftspraxis, Klinik, Anstellung und Partnernetzwerk – mit Vor- und Nachteilen.',
    h1: 'Die Schweizer TCM-Praxis hat mehr als ein Geschäftsmodell.',
    lead: 'Ein Raum, eine Therapeutin, ein Telefon: So funktionieren viele Praxen hervorragend. Andere bauen Teams, Kliniken oder Netzwerke. Die Frage ist nicht, welches Modell «besser» ist. Die Frage ist, welches zu Nachfrage, Verantwortung und Lebensziel passt.',
    readTime: '5 Min.', bodyHtml: BODY.praxen, method: METHOD_NO_DATA,
    cta: { title: 'Welches Modell passt zu deinem Ziel?', cards: [
      { k: 'Rechnen', t: 'Praxisrechner', href: '/praxiswissen/praxisrechner/' },
      { k: 'Gründen', t: 'Praxis eröffnen', href: '/praxiswissen/tcm-praxis-eroeffnen/' },
      { k: 'Partner', t: 'Partnermodell', href: '/partner/' },
    ] },
    related: ['tcm-in-der-schweiz', 'tcm-lohn-schweiz'],
  },
  {
    slug: 'tcm-international-schweiz', cardLabel: 'International',
    card: 'Ausländischer Abschluss: Anerkennung, Kanton, Arbeitsrecht und Registrierungen in der richtigen Reihenfolge.',
    title: 'Als TCM-Therapeut:in aus dem Ausland in der Schweiz arbeiten',
    metaDesc: 'Du hast deine TCM-Ausbildung im Ausland gemacht? So prüfst du Anerkennung, Berufsausübungsbewilligung, Arbeitserlaubnis, Register und Jobs in der Schweiz.',
    h1: 'Du hast TCM im Ausland gelernt und möchtest in der Schweiz arbeiten?',
    lead: 'Dann musst du zwei Dinge getrennt betrachten: Darfst du in der Schweiz arbeiten, und darfst du deine konkrete TCM-Tätigkeit fachlich ausüben? Aufenthaltsrecht und Berufsrecht sind nicht dasselbe.',
    short: 'Ein ausländisches TCM-Diplom führt nicht automatisch zu einer Schweizer Berufsausübungsbewilligung. Entscheidend sind dein Abschluss, der gewünschte Berufsweg, dein Kanton und dein Aufenthalts- beziehungsweise Arbeitsstatus. Beginne deshalb mit der Anerkennungsfrage und dem Kanton, bevor du einen Praxisvertrag unterschreibst.',
    readTime: '6 Min.', bodyHtml: BODY2.international,
    method: 'Diese Seite gibt keine Visa- oder Anerkennungszusage. Verbindlich sind die zuständigen Stellen: SEM und kantonale Migrationsbehörden für Aufenthalt und Arbeit, die kantonale Gesundheitsbehörde für die Berufsausübung, OdA AM für den Schweizer Berufsweg.',
    faq: [
      { q: 'Wird mein ausländisches TCM-Diplom anerkannt?', a: 'Das lässt sich nicht pauschal nach Land beantworten. Ob und wie dein Abschluss berücksichtigt wird, prüft die zuständige offizielle Stelle anhand deines konkreten Abschlusses.' },
      { q: 'Brauche ich eine Schweizer BAB?', a: 'Das hängt vom Kanton und der Methode ab, nicht von deiner Herkunft. Prüfe die Regeln im Zielkanton, besonders bei Akupunktur.' },
      { q: 'Kann mein Arbeitgeber die Anerkennung für mich erledigen?', a: 'Er kann dich organisatorisch unterstützen. Die Qualifikation und eine nötige Bewilligung bleiben aber persönlich und werden für dich geprüft.' },
      { q: 'Brauche ich EMR?', a: 'EMR ist eine Registrierung, keine Berufsbewilligung. Sie wird relevant, wenn deine Leistungen über Zusatzversicherer abgerechnet werden sollen. Kläre zuerst Anerkennung und Kanton.' },
      { q: 'Brauche ich eine Arbeitsbewilligung?', a: 'Das hängt von deiner Staatsangehörigkeit und deiner persönlichen Situation ab. Massgebend sind das SEM und die kantonalen Migrationsbehörden.' },
      { q: 'Welche Sprachkenntnisse brauche ich?', a: 'Genug, um Anamnese, Risiken, Einverständnis und Grenzen sicher zu besprechen. Einzelne Kantone oder Anerkennungswege können zusätzlich formelle Sprachnachweise verlangen.' },
    ],
    cta: { title: 'Du möchtest bei TCM.ch arbeiten?', text: 'Wir beschäftigen auch Therapeut:innen mit internationalem Hintergrund. Entscheidend ist, dass Qualifikation, Bewilligung und Einsatzort zusammenpassen.', label: 'Karriere bei TCM.ch', href: '/karriere/', secondary: { label: 'Schweizer Regulatorik verstehen', href: '/regulatorik/' } },
    related: ['organisationen', 'tcm-arbeitsmarkt-schweiz'],
    sources: ['odaAmHfp', 'odaAmModule', 'sbfiTitel', 'sem', 'zhKomplementaer', 'bgbm', 'emrReglement', 'ascaArg', 'egkTherapeutenstelle', 'visanaTherapeuten'],
  },
  {
    slug: 'organisationen', cardLabel: 'Organisationen & Register',
    card: 'OdA AM, Kantone, Fachverband, EMR, ASCA, SASIS, Versicherer: wer wofür zuständig ist.',
    title: 'OdA AM, EMR, ASCA & TCM Fachverband: Wer macht was?',
    metaDesc: 'OdA AM, TCM Fachverband, EMR, ASCA, SASIS und Kantone erfüllen unterschiedliche Aufgaben. So funktioniert die Schweizer TCM-Landschaft.',
    h1: 'Wer ist in der Schweizer TCM eigentlich wofür zuständig?',
    lead: 'Du kannst ein eidgenössisches Diplom haben, bei EMR registriert sein, Mitglied in einem Berufsverband sein, eine kantonale Bewilligung besitzen und zusätzlich eine ZSR-Nummer brauchen. Das klingt nach fünf Varianten derselben Sache. Sind es aber nicht.',
    short: 'Es gibt keine einzige Organisation, die den Schweizer TCM-Beruf vollständig steuert. Ausbildung, Berufsprüfung, Berufsausübung, Berufsvertretung, private Registrierung, Versicherer und Abrechnung liegen bei unterschiedlichen Stellen. Sobald du ihre Rollen trennst, wird das System deutlich einfacher.',
    readTime: '6 Min.', bodyHtml: BODY2.organisationen,
    method: 'Rollenbeschreibungen nach den offiziellen Angaben der jeweiligen Stellen. Für verbindliche Regeln gilt immer die Primärquelle, bei kantonalen Fragen die kantonale Behörde.',
    faq: [
      { q: 'Ist OdA AM dasselbe wie EMR?', a: 'Nein. Die OdA AM ist Trägerin der Höheren Fachprüfung und des Berufswegs zum eidgenössischen Diplom. EMR ist ein privates Register mit Qualitätslabel.' },
      { q: 'Ist der TCM Fachverband eine Behörde?', a: 'Nein. Er ist ein Berufsverband. Er erteilt keine Berufsausübungsbewilligung und verwaltet keine ZSR-Nummern.' },
      { q: 'Was ist der Unterschied zwischen EMR und ASCA?', a: 'Es sind zwei eigenständige Systeme mit eigenen Reglementen, Methodenlisten und Weiterbildungspflichten. Versicherer berücksichtigen sie unterschiedlich.' },
      { q: 'Wer vergibt die ZSR?', a: 'Das Zahlstellenregister führt santéservices/SASIS. Für Komplementärtherapeut:innen läuft der Antrag typischerweise über die Zertifizierungsstelle.' },
      { q: 'Wer entscheidet über Kostenübernahme?', a: 'Der Versicherer, nach seinem Produkt und seinen Anerkennungsregeln. EGK und Visana haben eigene Verfahren.' },
    ],
    cta: { title: 'Du willst wissen, was du konkret brauchst?', text: 'Die einzelnen Systeme, ihre Grenzen und die offiziellen Stellen im Bereich Regulatorik.', label: 'Zur Regulatorik', href: '/regulatorik/', secondary: { label: 'Praxis eröffnen', href: '/praxiswissen/tcm-praxis-eroeffnen/' } },
    related: ['tcm-in-der-schweiz', 'tcm-international-schweiz'],
    sources: ['odaAmHfp', 'odaAmModule', 'zhKomplementaer', 'emrReglement', 'ascaArg', 'ascaMethoden', 'sasisZsr', 'egkTherapeutenstelle', 'visanaTherapeuten', 'fachverbandKantone'],
  },
];

export const brHref = (slug: string) => `/branche/${slug}/`;
export const brBySlug = (slug: string) => BRANCHE.find((b) => b.slug === slug);
