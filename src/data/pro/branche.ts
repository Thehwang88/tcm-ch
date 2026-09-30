// Branche (/branche/…) — Beruf, Arbeitsmarkt, Lohn, Praxisformen. Faktisch/einordnend.
// Keine geschätzten Branchengrössen, keine Lohnzahlen, keine Zitate ohne Quelle (siehe contributions.ts).
// Meinung/Kritik bleibt im OUCH.-Magazin; Stelleninserate bleiben /jobs/.
import { BODY } from './cohort-bodies';

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
  cta: { title: string; text?: string; label?: string; href?: string; cards?: { k: string; t: string; href: string }[] };
  related: string[];
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
];

export const brHref = (slug: string) => `/branche/${slug}/`;
export const brBySlug = (slug: string) => BRANCHE.find((b) => b.slug === slug);
