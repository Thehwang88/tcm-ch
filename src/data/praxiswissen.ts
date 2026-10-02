// Praxiswissen — B2B-Wissenshub für TCM-Therapeut:innen (/praxiswissen/).
// Bewusst getrennt von der Patienten-Wissensbasis (wissen.ts). Keine erfundenen Zahlen:
// Beispiele sind als Beispiele markiert, Kostenposten ohne Schweizer Durchschnittswerte.
// OUCH (ouch.tcm.ch) bleibt Meinung/Analyse; hier stehen Werkzeuge, Checklisten, Rechnungen.

import type { ProfessionalContentExtras } from './pro/architecture';
import { BODY } from './pro/cohort-bodies';
import { BODY2 } from './pro/cohort2-bodies';

export type PwCategory = 'gruenden' | 'zahlen' | 'wachstum' | 'betrieb' | 'nachfolge';

/** Optional: expertQuotes, interviews, firstPartyObservations, sourceLinks, lifecycle (siehe professional.ts). */
export interface PwArticle extends ProfessionalContentExtras {
  slug: string;
  category: PwCategory;
  title: string;
  metaDesc: string;
  h1: string;
  lead: string;
  datePublished: string;
  dateModified: string;
  readTime: string;
  bodyHtml: string;
  keyTakeaways: string[];
  /** Answer-first: 2–5 Sätze direkt nach dem Lead. */
  shortAnswer?: string;
  ctaSecondary?: { label: string; href: string };
  firstPartyBox?: string;
  faq?: { q: string; a: string }[];
  related: string[];
  ctaTitle: string;
  ctaText: string;
  ctaLabel: string;
  ctaHref: string;
  ctaCards?: { k: string; t: string; href: string }[];
}

export const PW_CATEGORIES: { id: PwCategory | 'next'; label: string }[] = [
  { id: 'gruenden', label: 'Gründen' },
  { id: 'zahlen', label: 'Zahlen' },
  { id: 'wachstum', label: 'Wachstum' },
  { id: 'betrieb', label: 'Betrieb' },
  { id: 'nachfolge', label: 'Nachfolge' },
  { id: 'next', label: 'Nächster Schritt' },
];

export const PW_RECHNER = {
  slug: 'praxisrechner',
  category: 'zahlen' as PwCategory,
  title: 'TCM Praxis Rechner: Umsatz, Auslastung & Break-even',
  short: 'Praxisrechner',
  teaser: 'Wie viele Patienten braucht deine Praxis? Umsatz, Kosten und Break-even selbst rechnen.',
};

const OUCH = 'https://ouch.tcm.ch/insights';
const D = '2026-09-30';

export const PRAXISWISSEN: PwArticle[] = [
  {
    slug: 'tcm-praxis-eroeffnen',
    category: 'gruenden',
    title: 'TCM Praxis eröffnen in der Schweiz: Die praktische Checkliste',
    metaDesc: 'TCM-Praxis eröffnen: Anerkennung, Bewilligung, Mietvertrag, Fixkosten, Termine, Preise, Sichtbarkeit und die ersten 90 Tage. Checkliste ohne Rechtsberatung.',
    h1: 'Eine TCM-Praxis eröffnen: Was vor dem ersten Patienten geklärt sein muss',
    lead: 'Die meisten Praxen scheitern nicht an der Therapie, sondern an Entscheidungen, die vor dem ersten Termin fallen. Diese Checkliste ordnet sie in eine sinnvolle Reihenfolge.',
    datePublished: D, dateModified: D, readTime: '9 Min.',
    keyTakeaways: [
      'Anerkennung und kantonale Bewilligung zuerst klären, dann erst Räume suchen.',
      'Den Raum nach realistischer Nachfrage wählen, nicht nach Verfügbarkeit.',
      'Fixkosten, Terminannahme und Sichtbarkeit müssen vor der Eröffnung stehen.',
      'Die ersten 90 Tage sind ein Test, ob Nachfrage da ist, nicht der Beweis, dass sie fehlt.',
    ],
    bodyHtml: `
<p class="b2-note">Allgemeine Orientierung, keine Rechts- oder Behördenberatung. Bewilligungen und Anforderungen unterscheiden sich je nach Kanton und Methode. Prüfe Details immer bei der zuständigen Stelle.</p>
<h2>1. Qualifikation und Anerkennung</h2>
<p>Bevor du über Räume nachdenkst: Welche Methoden willst du anbieten, und welche Abschlüsse und Anerkennungen hast du dafür? Davon hängt ab, welche Bewilligung du brauchst und ob Patient:innen über eine Zusatzversicherung abrechnen können.</p>
<ul class="b2-check-list"><li>Abschlüsse und Diplome vollständig und übersetzt, wo nötig</li><li>Methodenliste klar: Akupunktur, Tuina, Kräuter, weitere</li><li>Nachweise für Weiterbildungen gesammelt</li></ul>
<h2>2. Kanton und Berufsausübungsbewilligung (BAB)</h2>
<p>Ob und welche kantonale Bewilligung nötig ist, entscheidet der Kanton, in dem du praktizierst. Die Regeln sind nicht einheitlich. Wie unterschiedlich das in der Praxis wirken kann, beschreibt das OUCH.-Magazin in der <a href="${OUCH}/kantons-lotterie/">Kantons-Lotterie</a>. Für deine Planung heisst das: Bewilligungsfrage früh stellen, weil sie Zeitplan und Standortwahl beeinflussen kann. Die sachliche Einordnung: <a href="/regulatorik/berufsausuebungsbewilligung/">Berufsausübungsbewilligung für TCM</a> und der <a href="/regulatorik/kantone/">Kanton-Navigator</a>.</p>
<h2>3. EMR, ASCA und ZSR, wo relevant</h2>
<p>Viele Patient:innen fragen zuerst, ob ihre Zusatzversicherung zahlt. Dafür sind Registrierungen wie EMR oder ASCA und eine ZSR-Nummer relevant. Welche Stelle welche Anforderungen stellt, ist ein eigenes Thema; die kritische Einordnung dazu steht im <a href="${OUCH}/emr-asca-labyrinth/">EMR/ASCA-Labyrinth</a>. Plane die Registrierung vor der Eröffnung ein, damit du nicht mit einer Praxis startest, deren Leistungen niemand zurückerstattet bekommt. Die einzelnen Systeme erklärt: <a href="/regulatorik/emr/">EMR</a>, <a href="/regulatorik/asca/">ASCA</a>, <a href="/regulatorik/zsr/">ZSR-Nummer</a>, <a href="/regulatorik/tarif-590/">Tarif 590</a> und <a href="/regulatorik/krankenkassen-anerkennung/">Versicherer-Anerkennung</a>.</p>
<p>Welche Registrierungen du tatsächlich brauchst, hängt von Methode, Kanton und den Versicherern ab, über die deine Patient:innen abrechnen.</p>
<ul class="b2-check-list"><li>BAB / kantonale Berufsausübung geklärt</li><li>OdA-AM-/Berufsabschluss geklärt</li><li>EMR beantragt/geprüft</li><li>ASCA beantragt/geprüft</li><li>ZSR vorhanden</li><li>EGK-Registrierung geprüft</li><li>Visana-Anerkennung geprüft</li><li>Tarif-590-Abrechnung eingerichtet</li></ul>
<p>Alles an einem Ort: <a href="/regulatorik/">TCM-Regulatorik Schweiz</a>.</p>
<h2>4. Bevor du einen Mietvertrag unterschreibst</h2>
<ul class="b2-check-list"><li>Laufzeit und Kündigungsfristen: Wie lange bindest du dich?</li><li>Nutzung als Praxis erlaubt? Nebenkosten und Anpassungen geklärt?</li><li>Erreichbarkeit mit ÖV, Parkplätze wo relevant, barrierearmer Zugang</li><li>Kaution und Einrichtung in der Liquidität eingeplant</li></ul>
<h2>5. Raumgrösse gegen tatsächliche Nachfrage</h2>
<p>Ein zweiter oder dritter Raum ist nur dann ein Vorteil, wenn er gefüllt wird. Leere Räume kosten jeden Monat Miete. Die Faustregel aus unserem Betrieb: <strong>Erst Nachfrage, dann Kapazität.</strong> Mehr dazu in <a href="/praxiswissen/standortwahl-tcm-praxis/">Standortwahl</a>.</p>
<h2>6. Fixkosten</h2>
<p>Miete, Versicherungen, Software, Buchhaltung, Telefon und Marketing fallen an, bevor der erste Patient zahlt. Liste sie vollständig auf und rechne, wie viele Behandlungen du brauchst, um sie zu decken. Eine Übersicht der Kostenposten findest du unter <a href="/praxiswissen/tcm-praxis-kosten/">Was kostet eine TCM Praxis?</a>, die Rechnung im <a href="/praxiswissen/praxisrechner/">Praxisrechner</a>.</p>
<h2>7. Termine, Telefon und Administration</h2>
<p>Wer während der Behandlung ans Telefon muss, verliert entweder den Anruf oder die Konzentration. Kläre vor dem Start: Wie werden Anfragen angenommen, wie schnell wird zurückgerufen, wie werden Termine bestätigt und verschoben?</p>
<h2>8. Preise</h2>
<p>Deine Preise sollten zu deinen Kosten, deiner Qualifikation und dem lokalen Markt passen. Prüfe, wie Zusatzversicherungen deine Leistungen einordnen, und kommuniziere Preise transparent. Zu tiefe Preise lassen sich später schwer korrigieren.</p>
<h2>9. Website, Google und Reviews</h2>
<p>Patient:innen suchen lokal. Ein vollständiges Google-Unternehmensprofil, eine klare Website mit Angebot, Preisen und Anfahrt sowie ehrliche Bewertungen sind die Grundlage. Wie daraus Patient:innen werden, erklärt <a href="/praxiswissen/patienten-gewinnen-tcm-praxis/">Patienten gewinnen</a>.</p>
<h2>10. Die ersten 90 Tage</h2>
<p>Die ersten Monate sind ein Nachfragetest. Miss von Anfang an: Wie viele Anfragen kommen, wie viele werden zu Terminen, wie viele Patient:innen kommen wieder? Ohne diese Zahlen weisst du nach drei Monaten nicht, was funktioniert. Die wichtigsten Grössen stehen unter <a href="/praxiswissen/tcm-praxis-kennzahlen/">Kennzahlen</a>.</p>
<h2>11. Wann eine Anstellung klüger sein kann</h2>
<p>Wenn klinische Routine noch fehlt, wenn die Liquidität knapp ist oder wenn dich Administration und Marketing nicht interessieren, kann eine Anstellung der bessere Start sein. Der faire Vergleich: <a href="/praxiswissen/tcm-selbststaendig-oder-angestellt/">selbstständig oder angestellt</a>.</p>
<h2>12. Wann eine Partnerschaft klüger sein kann</h2>
<p>Wenn du therapeutisch stark bist und unternehmerisch arbeiten willst, aber nicht jedes System selbst bauen möchtest, gibt es einen dritten Weg: eine eigene lokale Praxis mit einer Plattform, die Nachfrage, Terminannahme und Technologie betreibt. So funktioniert das <a href="/partner/modell/">TCM.ch Partnermodell</a>.</p>`,
    firstPartyBox: 'Aus dem Betrieb mehrerer TCM-Standorte wissen wir: Die teuersten Fehler passieren vor der Eröffnung. Ein zu grosser Mietvertrag bindet über Jahre, ein fehlender Prozess für Anrufe kostet jede Woche Patient:innen.',
    related: ['tcm-praxis-kosten', 'standortwahl-tcm-praxis', 'tcm-selbststaendig-oder-angestellt'],
    ctaTitle: 'Du willst eine Praxis aufbauen, aber nicht jedes System selbst?',
    ctaText: 'Im TCM.ch Partnermodell führst du deine lokale Praxis. Nachfrage, Terminannahme und Technologie laufen über das System.',
    ctaLabel: 'Partner werden',
    ctaHref: '/partner/',
    ctaSecondary: { label: 'Praxis-Checkliste starten', href: '/tools/praxis-checkliste/' },
  },
  {
    slug: 'tcm-praxis-kosten',
    category: 'zahlen',
    title: 'Was kostet eine TCM Praxis? Fixkosten, Marketing & Break-even',
    metaDesc: 'Welche Kosten eine TCM-Praxis wirklich hat: Miete, Einrichtung, Versicherungen, Software, Buchhaltung, Marketing, Personal und Liquiditätsreserve. Mit Beispielrechnung.',
    h1: 'Was eine TCM-Praxis wirklich kostet',
    lead: 'Pauschale Schweizer Durchschnittswerte helfen wenig, weil Miete, Kanton und Praxisgrösse stark variieren. Hilfreich ist eine vollständige Liste und eine eigene Rechnung.',
    datePublished: D, dateModified: D, readTime: '7 Min.',
    keyTakeaways: [
      'Kosten vollständig erfassen: einmalig, monatlich fix, variabel.',
      'Marketing ist kein Luxus, sondern die Voraussetzung für Auslastung.',
      'Eine Liquiditätsreserve überbrückt die Monate, bevor die Praxis voll ist.',
      'Der Break-even ist eine Anzahl Behandlungen, keine Stimmung.',
    ],
    bodyHtml: `
<p>Wir nennen hier bewusst keine Durchschnittswerte für die Schweiz: Sie wären entweder erfunden oder für deine Situation irreführend. Stattdessen alle Kostenposten, die in eine ehrliche Rechnung gehören, und ein Beispiel, das du mit deinen Zahlen ersetzt.</p>
<h2>Die Kostenposten</h2>
<div class="b2-tablewrap"><table><thead><tr><th>Posten</th><th>Art</th><th>Worauf achten</th></tr></thead><tbody>
<tr><td>Raum / Miete</td><td>fix, monatlich</td><td>inkl. Nebenkosten; Laufzeit und Kündigungsfrist</td></tr>
<tr><td>Kaution & Einrichtung</td><td>einmalig</td><td>Liege, Hygiene, Mobiliar, Anpassungen am Raum</td></tr>
<tr><td>Anerkennung & Berufsadministration</td><td>einmalig + jährlich</td><td>Registrierungen, Bewilligungen, Mitgliedschaften, Weiterbildungspflicht</td></tr>
<tr><td>Versicherungen</td><td>fix</td><td>Berufshaftpflicht, Sach-, ggf. Taggeldversicherung</td></tr>
<tr><td>Software</td><td>fix</td><td>Terminbuchung, Dokumentation, Rechnungsstellung</td></tr>
<tr><td>Buchhaltung</td><td>fix</td><td>Treuhand oder eigene Zeit, Steuern, Abschluss</td></tr>
<tr><td>Zahlung & Abrechnung</td><td>variabel</td><td>Kartengebühren, Rechnungsversand, Mahnwesen</td></tr>
<tr><td>Verbrauchsmaterial</td><td>variabel</td><td>Nadeln, Hygiene, Wäsche, Kräuter je nach Angebot</td></tr>
<tr><td>Telefon & Administration</td><td>fix</td><td>Erreichbarkeit während der Behandlungszeit</td></tr>
<tr><td>Marketing</td><td>fix/variabel</td><td>Website, Google-Profil, Anzeigen, Content</td></tr>
<tr><td>Personal</td><td>fix</td><td>Empfang oder angestellte Therapeut:innen inkl. Arbeitgeberbeiträge</td></tr>
<tr><td>Liquiditätsreserve</td><td>Puffer</td><td>deckt die Monate, bevor die Auslastung trägt</td></tr>
</tbody></table></div>
<h2>Beispielrechnung zum Ersetzen</h2>
<p>Ein bewusst einfaches Beispiel mit runden Zahlen, <strong>keine Durchschnittswerte</strong>: Angenommen, deine monatlichen Fixkosten (Miete, Versicherungen, Software, Buchhaltung, Telefon, Marketing) betragen zusammen CHF 5'000 und eine Behandlung bringt im Schnitt CHF 125 Umsatz. Dann brauchst du 40 Behandlungen pro Monat, nur um die Fixkosten zu decken, bei 4 Arbeitswochen also 10 pro Woche. Erst jede Behandlung darüber trägt zu deinem Einkommen bei.</p>
<div class="b2-callout"><p>Break-even-Behandlungen = Fixkosten ÷ Ø Umsatz pro Behandlung</p></div>
<p>Rechne das mit deinen eigenen Werten im <a href="/praxiswissen/praxisrechner/">Praxisrechner</a> nach. Er berücksichtigt auch Marketing und optionale Personalkosten.</p>
<h2>Marketing gehört in die Fixkosten</h2>
<p>Viele Gründer:innen planen Marketing als Restposten. In der Praxis ist es die Voraussetzung, dass die Fixkosten überhaupt gedeckt werden. Wie Nachfrage entsteht und wie man misst, ob sie ankommt, steht unter <a href="/praxiswissen/patienten-gewinnen-tcm-praxis/">Patienten gewinnen</a>.</p>
<h2>Liquidität für die Anlaufphase</h2>
<p>Eine neue Praxis ist in den ersten Monaten selten voll ausgelastet. Die Reserve sollte die Differenz zwischen Kosten und Einnahmen dieser Monate decken, plus einen Puffer für Unerwartetes. Wie schnell die Auslastung steigt, hängt von Standort, Nachfrage und Sichtbarkeit ab.</p>`,
    firstPartyBox: 'Im TCM.ch Partnermodell ist das Launch-Marketing als festes Budget geplant und klar als Werbebudget für den Standort ausgewiesen, nicht als Gebühr. Die lokalen Kosten trägt die Partnerfirma selbst.',
    related: ['tcm-praxis-kennzahlen', 'tcm-praxis-auslastung', 'tcm-praxis-eroeffnen'],
    ctaTitle: 'Eigene Kosten modellieren',
    ctaText: 'Trage deine Miete, Fixkosten und Preise ein und sieh, ab wie vielen Behandlungen deine Praxis trägt.',
    ctaLabel: 'Zum Praxisrechner',
    ctaHref: '/praxiswissen/praxisrechner/',
  },
  {
    slug: 'patienten-gewinnen-tcm-praxis',
    category: 'wachstum',
    title: 'Patienten gewinnen für eine TCM Praxis: Was wirklich zählt',
    metaDesc: 'Wie eine TCM-Praxis Patient:innen gewinnt: lokale Suche, Website, bezahlte Nachfrage, Empfehlungen, Lead-Bearbeitung, Folgetermine und Messung. Ein System statt Tipps.',
    h1: 'Eine gute Behandlung bringt wenig, wenn niemand die Praxis findet.',
    lead: 'Patientengewinnung ist kein einzelner Trick, sondern eine Kette. Jedes Glied kann brechen, und meistens bricht es dort, wo niemand hinschaut.',
    datePublished: D, dateModified: D, readTime: '8 Min.',
    keyTakeaways: [
      'Traffic ist nicht gleich Patient:innen. Anfragen sind nicht gleich Termine.',
      'Die meisten Verluste passieren zwischen Anfrage und Termin.',
      'Folgetermine gehören zur Planung, wo sie klinisch sinnvoll sind.',
      'Ohne Messung weisst du nicht, welches Glied der Kette bricht.',
    ],
    bodyHtml: `
<h2>Die Nachfrage-Kette</h2>
<p>Eine Patientin sieht deine Praxis, fragt an, bekommt einen Termin, kommt zur Behandlung und entscheidet danach, ob sie wiederkommt und weiterempfiehlt. Das sind sieben Glieder, und jedes braucht Aufmerksamkeit.</p>
<h3>1. Lokale Suche und Google Maps</h3>
<p>Wer «Akupunktur» plus Ort sucht, sieht zuerst die Kartenresultate. Ein vollständiges Unternehmensprofil mit korrekten Öffnungszeiten, Kategorien, Fotos und echten Bewertungen ist die Grundlage lokaler Sichtbarkeit.</p>
<h3>2. Website und SEO</h3>
<p>Die Website beantwortet die Fragen, die Patient:innen vor der Anfrage haben: Was wird behandelt, wie läuft der erste Termin ab, was kostet es, zahlt die Zusatzversicherung, wie komme ich hin? Seiten zu konkreten Beschwerden und Methoden helfen, bei spezifischen Suchen gefunden zu werden.</p>
<h3>3. Bezahlte Nachfrage</h3>
<p>Anzeigen bringen schneller Sichtbarkeit, besonders in der Anfangsphase. Sie lohnen sich nur, wenn die Kette danach funktioniert. Anzeigen auf eine Praxis zu lenken, die das Telefon nicht abnimmt, ist teuer verbranntes Geld.</p>
<h3>4. Empfehlungen und Reviews</h3>
<p>Zufriedene Patient:innen empfehlen weiter, wenn man sie darum bittet und es ihnen leicht macht. Bewertungen sind öffentliche Empfehlungen: ehrlich einholen, nie kaufen, auf Kritik sachlich antworten.</p>
<h3>5. Anfrage- und Telefon-Conversion</h3>
<p>Hier gehen die meisten Patient:innen verloren. Wer während einer Behandlung anruft und niemanden erreicht, ruft oft die nächste Praxis an. Entscheidend sind Erreichbarkeit, schnelle Rückrufe und eine einfache Terminvergabe.</p>
<h3>6. Folgetermine, wo klinisch sinnvoll</h3>
<p>Viele Beschwerden brauchen mehr als eine Behandlung. Ein klar erklärter Behandlungsplan ist kein Verkaufstrick, sondern gute Medizin. Wo keine weitere Behandlung sinnvoll ist, gehört das ebenso ehrlich gesagt.</p>
<h3>7. Messung</h3>
<p>Ohne Zahlen bleibt Marketing ein Gefühl. Die wichtigsten Übergänge:</p>
<div class="b2-tablewrap"><table><thead><tr><th>Schritt</th><th>Frage</th></tr></thead><tbody>
<tr><td>Sichtbarkeit → Anfrage</td><td>Wie viele Menschen, die die Praxis sehen, fragen an?</td></tr>
<tr><td>Anfrage → Termin</td><td>Welcher Anteil der Anfragen wird zu einem gebuchten Termin?</td></tr>
<tr><td>Termin → Behandlung</td><td>Wie viele Termine finden statt (Absagen, No-Shows)?</td></tr>
<tr><td>Erstbehandlung → Folgetermin</td><td>Wie viele kommen wieder, wo es sinnvoll ist?</td></tr>
</tbody></table></div>
<p>Definitionen und weitere Grössen: <a href="/praxiswissen/tcm-praxis-kennzahlen/">Praxis-Kennzahlen</a>.</p>
<h2>Warum «10 SEO-Tipps» nicht reichen</h2>
<p>Einzelne Massnahmen verbessern ein Glied. Patient:innen entstehen erst, wenn die ganze Kette hält. Deshalb lohnt es sich, zuerst die schwächste Stelle zu finden, statt überall ein bisschen zu optimieren. Wie Auslastung daraus entsteht, erklärt <a href="/praxiswissen/tcm-praxis-auslastung/">Auslastung planen</a>.</p>`,
    firstPartyBox: 'Aus dem Betrieb mehrerer TCM-Standorte wissen wir: Der Engpass liegt selten bei der Sichtbarkeit allein. Oft ist es die Zeit zwischen Anfrage und Rückruf. Deshalb laufen Anfragen, Telefon und Terminvergabe bei TCM.ch zentral.',
    related: ['tcm-praxis-kennzahlen', 'tcm-praxis-auslastung', 'standortwahl-tcm-praxis'],
    ctaTitle: 'Das ist genau der Teil, den TCM.ch im Partner-System übernimmt.',
    ctaText: 'Nachfrage, Anfrage, Telefon und Terminvergabe laufen zentral. Du behandelst und führst deine lokale Praxis.',
    ctaLabel: 'Partnermodell ansehen',
    ctaHref: '/partner/modell/',
  },
  {
    slug: 'tcm-praxis-anfragen-bewertungen',
    category: 'wachstum',
    title: 'Mehr Patientenanfragen für TCM-Praxen: System statt Zufall',
    metaDesc: 'Wie TCM-Praxen Anfragen besser gewinnen, beantworten und messen. Website, Google, Telefon, Formulare und Bewertungen als einfaches Praxissystem.',
    h1: 'Patientenanfragen und Bewertungen systematisch aufbauen',
    lead: 'Eine Praxis braucht nicht möglichst viele Klicks. Sie braucht passende Patientinnen und Patienten, die Vertrauen fassen, Kontakt aufnehmen und einen Termin vereinbaren. Dafür lohnt sich ein einfaches System, das Sichtbarkeit, Anfragewege, Reaktionszeit, Bewertungen und tatsächliche Neupatienten miteinander verbindet.',
    datePublished: '2026-10-02', dateModified: '2026-10-02', readTime: '9 Min.',
    keyTakeaways: [],
    bodyHtml: BODY2.anfragenBewertungen,
    faq: [
      { q: 'Wie bekomme ich mehr Google-Bewertungen für meine Praxis?', a: 'Bitte Patientinnen und Patienten neutral um ehrliches Feedback und mache den Zugang mit einem direkten Bewertungslink oder QR-Code einfach. Biete keine Gegenleistung an und beeinflusse weder Sternezahl noch Inhalt.' },
      { q: 'Darf ich Patienten aktiv um eine Google-Bewertung bitten?', a: 'Ja. Google erlaubt das Einholen authentischer Bewertungen von Personen mit einer echten Erfahrung. Nicht erlaubt sind unter anderem Anreize, gekaufte Bewertungen und das gezielte Einholen ausschliesslich positiver Bewertungen.' },
      { q: 'Welche Marketingzahl ist für eine TCM-Praxis am wichtigsten?', a: 'Das hängt vom Ziel ab. Für die wirtschaftliche Praxissteuerung ist die Zahl tatsächlicher Neupatienten meist aussagekräftiger als Klicks oder technische Conversion-Events. Dazwischen sollten tatsächliche Anfragen separat erfasst werden.' },
      { q: 'Braucht eine kleine TCM-Praxis ein CRM?', a: 'Nicht zwingend. Entscheidend ist zunächst, dass Anfragen zuverlässig erfasst, beantwortet und bis zum Termin nachvollzogen werden. Das kann bei kleinen Praxen auch mit einem einfachen, konsequent geführten System funktionieren.' },
    ],
    sourceLinks: [
      { label: 'Google Business Profile-Hilfe: Tipps für mehr Rezensionen (Bewertungslink und QR-Code)', url: 'https://support.google.com/business/answer/3474122', kind: 'official', nature: 'fact', accessed: '2026-10-02' },
      { label: 'Google Maps: Richtlinien für von Nutzern erstellte Inhalte – verbotene und eingeschränkte Inhalte', url: 'https://support.google.com/contributionpolicy/answer/7400114', kind: 'official', nature: 'fact', accessed: '2026-10-02' },
    ],
    related: ['patienten-gewinnen-tcm-praxis', 'tcm-praxis-kennzahlen', 'tcm-praxis-auslastung'],
    ctaTitle: 'Wenn du behandeln willst, statt Anfragen zu verwalten',
    ctaText: 'Im TCM.ch Partnermodell laufen Nachfrage, Anfrage, Telefon und Terminvergabe zentral. Du behandelst und führst deine lokale Praxis.',
    ctaLabel: 'Partnermodell ansehen',
    ctaHref: '/partner/modell/',
  },
  {
    slug: 'standortwahl-tcm-praxis',
    category: 'gruenden',
    title: 'Standortwahl für eine TCM Praxis: Nachfrage vor Quadratmetern',
    metaDesc: 'Standort für eine TCM-Praxis wählen: Einzugsgebiet, Suchnachfrage, Wettbewerb, Erreichbarkeit, Miete, Raumanzahl und Mietrisiko. Warum klein testen oft klüger ist.',
    h1: 'Der schönste Praxisraum ist nutzlos, wenn der Markt ihn nicht trägt.',
    lead: 'Die Standortwahl entscheidet über Jahre. Der häufigste Fehler ist nicht die falsche Stadt, sondern der zu grosse Mietvertrag zu früh.',
    datePublished: D, dateModified: D, readTime: '7 Min.',
    keyTakeaways: [
      'Erst Nachfrage, dann Kapazität.',
      'Einzugsgebiet und Suchnachfrage vor Ambiente und Quadratmetern prüfen.',
      'Ein Raum, der sich später erweitern lässt, schlägt drei Räume ab Tag eins.',
      'Lange Mietverträge sind das grösste Einzelrisiko einer neuen Praxis.',
    ],
    bodyHtml: `
<h2>Die Kriterien</h2>
<h3>Einzugsgebiet</h3>
<p>Wie viele Menschen wohnen oder arbeiten in erreichbarer Nähe? Pendlerströme zählen: Eine Praxis nahe am Bahnhof erreicht auch Menschen, die dort nur vorbeikommen.</p>
<h3>Suchnachfrage</h3>
<p>Suchen Menschen in dieser Region nach Akupunktur oder TCM? Eine erste Einschätzung geben die Suchvorschläge und Kartenresultate zu «Akupunktur» plus Ortsname. Wenig Suche heisst nicht keine Nachfrage, aber mehr Aufwand, um sie zu wecken.</p>
<h3>Wettbewerb</h3>
<p>Wie viele Praxen gibt es bereits, wie sind sie bewertet, wie gut erreichbar? Wettbewerb ist nicht nur schlecht: Er zeigt, dass Nachfrage existiert. Entscheidend ist, ob du dich klar unterscheiden kannst.</p>
<h3>Erreichbarkeit</h3>
<p>ÖV-Anbindung, Parkplätze wo relevant, barrierearmer Zugang, Sichtbarkeit vom Strassenraum. Patient:innen mit Schmerzen nehmen keine komplizierten Wege auf sich.</p>
<h3>Miete und Mietrisiko</h3>
<p>Nicht nur die Monatsmiete zählt, sondern Laufzeit, Kündigungsfrist, Kaution und Umbaukosten. Ein langer Vertrag für einen zu grossen Raum ist das grösste Einzelrisiko einer neuen Praxis.</p>
<h3>Anzahl Räume und Erweiterbarkeit</h3>
<p>Ein zweiter Raum lohnt sich, wenn er gefüllt wird. Besser als drei Räume ab Tag eins ist ein Standort, der sich später erweitern lässt, oder ein Zusatzraum, der kurzfristig dazugemietet werden kann.</p>
<h2>Klein testen statt gross wetten</h2>
<p>Das Prinzip aus unserem Partnermodell gilt für jede Praxis: <strong>Erst Nachfrage. Dann Kapazität.</strong> Ein Raum, eine Therapeut:in, ein Standort und ein System, das misst, ob Nachfrage entsteht. Wenn der Kalender wiederholt voll ist, ist der zweite Raum eine Entscheidung auf Basis von Zahlen, nicht von Hoffnung.</p>
<div class="b2-callout"><p>Nicht fünf Räume mieten, nur weil sie verfügbar sind.</p></div>
<h2>Checkliste vor der Unterschrift</h2>
<ul class="b2-check-list"><li>Einzugsgebiet und Pendlerwege angeschaut</li><li>Lokale Suche und Wettbewerb geprüft</li><li>Erreichbarkeit mit ÖV und Auto getestet</li><li>Fixkosten und Break-even gerechnet (<a href="/praxiswissen/praxisrechner/">Praxisrechner</a>)</li><li>Laufzeit, Kündigung und Erweiterungsoption verhandelt</li></ul>
<p>Weitere Schritte vor der Eröffnung: <a href="/praxiswissen/tcm-praxis-eroeffnen/">Praxis eröffnen: die Checkliste</a>.</p>`,
    firstPartyBox: 'Neue TCM.ch Partnerstandorte starten bewusst klein: ein Behandlungsraum, eine Therapeut:in, ein zeitlich begrenzter Launch. Ausgebaut wird erst, wenn die Nachfrage die bestehende Kapazität wiederholt übersteigt.',
    related: ['tcm-praxis-erweitern', 'tcm-praxis-eroeffnen', 'tcm-praxis-kosten'],
    ctaTitle: 'Standort lieber klein testen?',
    ctaText: 'Im Partnermodell startest du mit einem Raum und einem zeitlich begrenzten Launch, bevor du Fixkosten ausbaust.',
    ctaLabel: 'Partner werden',
    ctaHref: '/partner/',
  },
  {
    slug: 'tcm-praxis-auslastung',
    category: 'wachstum',
    title: 'TCM Praxis auslasten: Neue Patienten, Wiederkehr & Kapazität',
    metaDesc: 'Auslastung einer TCM-Praxis berechnen: Kapazität, belegte Behandlungen, Neupatient:innen, Wiederkehr, Warteliste und wann ein zweiter Raum oder eine zweite Therapeut:in Sinn macht.',
    h1: 'Auslastung ist kein Gefühl. Sie ist eine Rechnung.',
    lead: 'Ein voller Montag und ein leerer Donnerstag fühlen sich unterschiedlich an. Die Zahl dahinter sagt, ob deine Praxis wachsen muss oder erst besser füllen.',
    datePublished: D, dateModified: D, readTime: '7 Min.',
    keyTakeaways: [
      'Kapazität = Arbeitstage × Slots pro Tag.',
      'Auslastung = belegte Behandlungen ÷ Kapazität.',
      'Wachstum braucht Zufluss neuer Patient:innen und ein realistisches Wiederkehrmuster.',
      'Kapazität erst ausbauen, wenn die Nachfrage die bestehende wiederholt übersteigt.',
    ],
    bodyHtml: `
<h2>Die Grundrechnung</h2>
<div class="b2-callout"><p>Kapazität = Arbeitstage × Slots pro Tag · Auslastung = belegte Behandlungen ÷ Kapazität</p></div>
<p>Beispiel: 4 Arbeitstage mit je 8 Slots ergeben 32 Behandlungsplätze pro Woche. Sind davon 24 belegt, liegt die Auslastung bei 75 %. Das ist eine Rechnung, keine Bewertung: Ob 75 % gut sind, hängt von deinen Kosten und Zielen ab.</p>
<h2>Woraus Auslastung entsteht</h2>
<h3>Neupatient:innen</h3>
<p>Ohne stetigen Zufluss leert sich jeder Kalender, weil Behandlungsserien enden. Wie viele neue Patient:innen du pro Monat brauchst, hängt davon ab, wie viele Termine eine Patientin im Schnitt wahrnimmt.</p>
<h3>Wiederkehr</h3>
<p>Wo klinisch sinnvoll, verteilt sich eine Behandlung auf mehrere Termine. Das Muster ist je nach Beschwerde verschieden. Beobachte es in deiner Praxis, statt allgemeine Richtwerte zu übernehmen.</p>
<h3>Therapeut:innen-Kapazität</h3>
<p>Mehr Slots pro Tag sind nicht beliebig möglich. Behandlungsqualität, Dokumentation und Pausen setzen Grenzen. Eine überlastete Therapeutin ist keine Wachstumsstrategie.</p>
<h2>Wann eine zweite Therapeut:in Sinn macht</h2>
<ul class="b2-check-list"><li>Die Auslastung ist über mehrere Monate hoch, nicht nur in einer guten Woche.</li><li>Es gibt eine Warteliste oder abgewiesene Anfragen.</li><li>Neue Anfragen kommen verlässlich, nicht nur durch eine einzelne Kampagne.</li><li>Die zusätzlichen Personalkosten sind gerechnet (<a href="/praxiswissen/praxisrechner/">Praxisrechner</a>).</li></ul>
<h2>Warteliste</h2>
<p>Eine Warteliste ist ein Signal, aber nur, wenn sie gepflegt wird. Wer drei Wochen auf einen Termin wartet, sucht sich oft eine andere Praxis. Erfasse, wie viele Anfragen du nicht bedienen konntest.</p>
<h2>Wann du NICHT ausbauen solltest</h2>
<p>Wenn die Auslastung schwankt, wenn nur eine Kampagne den Kalender füllt oder wenn Anfragen zwar kommen, aber nicht zu Terminen werden: Dann liegt das Problem nicht in der Kapazität, sondern in Nachfrage oder Conversion. Zuerst <a href="/praxiswissen/patienten-gewinnen-tcm-praxis/">dort ansetzen</a>.</p>
<div class="b2-callout"><p>Kapazität erst ausbauen, wenn die Nachfrage die bestehende wiederholt übersteigt.</p></div>`,
    firstPartyBox: 'In der internen Standortplanung von TCM.ch folgt die Entscheidung über einen zweiten Raum derselben Regel: Die Nachfrage muss die bestehende Kapazität wiederholt übersteigen, bevor Fixkosten dazukommen.',
    related: ['tcm-praxis-team-aufbauen', 'tcm-praxis-erweitern', 'tcm-praxis-kennzahlen'],
    ctaTitle: 'Kapazität berechnen',
    ctaText: 'Arbeitstage, Slots und Auslastung eintragen und sehen, was deine Praxis heute trägt.',
    ctaLabel: 'Zum Praxisrechner',
    ctaHref: '/praxiswissen/praxisrechner/',
  },
  {
    slug: 'tcm-praxis-kennzahlen',
    category: 'zahlen',
    title: 'TCM Praxis Kennzahlen: Die Zahlen, die du wirklich brauchst',
    metaDesc: 'Die wichtigsten Kennzahlen einer TCM-Praxis einfach erklärt: Neupatient:innen, Behandlungen, Auslastung, Umsatz pro Behandlung, Anfragen, Conversion, Absagen, Fixkosten und Ergebnis.',
    h1: 'Du musst keine Controllerin sein. Aber diese Zahlen solltest du kennen.',
    lead: 'Dreizehn Zahlen reichen, um eine Praxis zu steuern. Hier ist, was sie bedeuten und wie du sie erfasst. Bewusst ohne pauschale «gut/schlecht»-Grenzen.',
    datePublished: D, dateModified: D, readTime: '6 Min.',
    keyTakeaways: [
      'Monatlich erfassen, nicht nur zum Jahresabschluss.',
      'Trends sind wichtiger als einzelne Monate.',
      'Vergleiche dich mit deiner eigenen Praxis, nicht mit erfundenen Benchmarks.',
    ],
    bodyHtml: `
<p>Wir geben bewusst keine allgemeinen Zielwerte an. Ob eine Zahl gut ist, hängt von deinen Kosten, deinem Angebot und deinem Standort ab. Wichtig ist, dass du sie regelmässig misst und die Entwicklung verfolgst.</p>
<div class="b2-tablewrap"><table><thead><tr><th>Kennzahl</th><th>Einfach erklärt</th></tr></thead><tbody>
<tr><td>Neupatient:innen / Monat</td><td>Wie viele Menschen kommen zum ersten Mal?</td></tr>
<tr><td>Behandlungen / Monat</td><td>Alle stattgefundenen Behandlungen.</td></tr>
<tr><td>Behandlungen pro Therapeut:innen-Tag</td><td>Behandlungen geteilt durch gearbeitete Tage.</td></tr>
<tr><td>Auslastung</td><td>Belegte Behandlungen ÷ verfügbare Slots.</td></tr>
<tr><td>Umsatz</td><td>Alle Einnahmen aus Behandlungen im Monat.</td></tr>
<tr><td>Umsatz pro Behandlung</td><td>Umsatz ÷ Behandlungen.</td></tr>
<tr><td>Anfragen (Leads)</td><td>Anrufe, Nachrichten, Formulare mit Terminwunsch.</td></tr>
<tr><td>Anfrage → Termin</td><td>Anteil der Anfragen, die zu einem Termin werden.</td></tr>
<tr><td>Kosten pro gewonnener Patient:in</td><td>Marketingausgaben ÷ Neupatient:innen, wo messbar.</td></tr>
<tr><td>Absage- / No-Show-Rate</td><td>Anteil gebuchter Termine, die nicht stattfinden.</td></tr>
<tr><td>Review-Tempo</td><td>Neue Bewertungen pro Monat.</td></tr>
<tr><td>Fixkosten</td><td>Monatliche Kosten, die unabhängig von Behandlungen anfallen.</td></tr>
<tr><td>Marketingausgaben</td><td>Alle Ausgaben für Sichtbarkeit und Anzeigen.</td></tr>
<tr><td>Betriebsergebnis</td><td>Umsatz minus alle Kosten, vor persönlichen Steuern.</td></tr>
</tbody></table></div>
<h2>Wie du anfängst</h2>
<ol><li>Eine einfache Tabelle mit einer Zeile pro Monat anlegen.</li><li>Behandlungen, Neupatient:innen, Umsatz und Anfragen aus Terminsoftware und Buchhaltung übertragen.</li><li>Nach drei Monaten die Trends anschauen: Was steigt, was fällt?</li><li>Den schwächsten Übergang zuerst verbessern.</li></ol>
<p>Viele dieser Zahlen hängen direkt zusammen: Auslastung und Umsatz pro Behandlung bestimmen den Umsatz; Fixkosten und Umsatz das Ergebnis. Im <a href="/praxiswissen/praxisrechner/">Praxisrechner</a> siehst du, wie eine Änderung durchschlägt. Hintergrund zur Auslastung: <a href="/praxiswissen/tcm-praxis-auslastung/">Auslastung ist eine Rechnung</a>.</p>
<h2>Zum Weiterdenken</h2>
<p>Wie Praxen an falschen Annahmen über Zahlen scheitern können, analysiert das OUCH.-Magazin am Beispiel <a href="${OUCH}/holistiq-konkurs-analyse/">Holistiq</a>.</p>`,
    firstPartyBox: 'Im TCM.ch System werden Anfragen, Termine und Behandlungen zentral erfasst, damit Standorte diese Zahlen nicht selbst zusammensuchen müssen.',
    related: ['tcm-praxis-administration', 'tcm-praxis-auslastung', 'tcm-praxis-wert'],
    ctaTitle: 'Praxiszahlen modellieren',
    ctaText: 'Sieh im Rechner, wie Auslastung, Preis und Fixkosten zusammen dein Ergebnis bestimmen.',
    ctaLabel: 'Zum Praxisrechner',
    ctaHref: '/praxiswissen/praxisrechner/',
  },
  {
    slug: 'tcm-selbststaendig-oder-angestellt',
    category: 'gruenden',
    title: 'TCM Therapeut: selbstständig oder angestellt?',
    metaDesc: 'Selbstständig oder angestellt als TCM-Therapeut:in? Ein fairer Vergleich von Risiko, Autonomie, Einkommen und Verantwortung, plus das Partnermodell als dritter Weg.',
    h1: 'Eigene Praxis oder Anstellung: Zwei sehr unterschiedliche Berufe',
    lead: 'Beide Wege können richtig sein. Sie verlangen nur Verschiedenes: Die Anstellung verlangt vor allem gute Therapie, die eigene Praxis zusätzlich ein Unternehmen.',
    datePublished: D, dateModified: D, readTime: '6 Min.',
    keyTakeaways: [
      'Anstellung: weniger Risiko, mehr Struktur, weniger Autonomie.',
      'Selbstständigkeit: mehr Freiheit und Chancen, aber auch Akquise, Miete und Schwankungen.',
      'Das Partnermodell verbindet lokales Unternehmertum mit einem Plattform-System.',
      'Kein Weg ist für alle besser.',
    ],
    bodyHtml: `
<h2>Anstellung</h2>
<div class="b2-tablewrap"><table><thead><tr><th>Vorteile</th><th>Nachteile</th></tr></thead><tbody>
<tr><td>Weniger finanzielles Risiko</td><td>Weniger Autonomie</td></tr>
<tr><td>Infrastruktur ist vorhanden</td><td>Einkommen begrenzt durch Lohnmodell</td></tr>
<tr><td>Nachfrage je nach Arbeitgeber bereits da</td><td>Systeme und Regeln des Arbeitgebers</td></tr>
<tr><td>Kolleg:innen und Fallbesprechungen</td><td></td></tr>
<tr><td>Planbare Struktur</td><td></td></tr>
</tbody></table></div>
<h2>Selbstständigkeit</h2>
<div class="b2-tablewrap"><table><thead><tr><th>Vorteile</th><th>Nachteile</th></tr></thead><tbody>
<tr><td>Autonomie über Angebot und Arbeitszeit</td><td>Patientengewinnung liegt bei dir</td></tr>
<tr><td>Unternehmerische Chancen</td><td>Miete und Fixkosten laufen immer</td></tr>
<tr><td>Eigene Marke</td><td>Administration, Buchhaltung, Versicherungen</td></tr>
<tr><td>Flexibilität</td><td>Schwankende Einnahmen, volle Verantwortung</td></tr>
</tbody></table></div>
<h2>Der dritte Weg: Partnermodell</h2>
<p>Zwischen beiden liegt ein Modell, in dem du eine eigene lokale Praxis führst, aber nicht jedes System selbst baust: Eine Plattform übernimmt Nachfrage, Anfragen, Terminvergabe und Technologie, du behandelst und führst den Betrieb vor Ort. Du trägst weiterhin unternehmerisches Risiko und lokale Kosten. Das ist nicht automatisch besser, aber für manche die passende Mischung. Wie das bei TCM.ch funktioniert: <a href="/partner/modell/">das Partnermodell</a>.</p>
<h2>Fragen zur Entscheidung</h2>
<ul class="b2-check-list"><li>Wie sicher bist du klinisch, auch bei schwierigen Fällen?</li><li>Wie viel finanzielle Schwankung hältst du aus?</li><li>Machen dir Marketing und Administration Freude oder kosten sie dich Energie?</li><li>Hast du ein lokales Netzwerk, das Patient:innen bringt?</li></ul>
<p>Direkt nach der Ausbildung spricht vieles für eine Phase mit Begleitung. Mehr dazu unter <a href="/karriere/berufseinstieg/">Berufseinstieg</a>. Die kritische Einordnung zur Ausbildung selbst liefert das OUCH.-Magazin: <a href="${OUCH}/tcm-ausbildung-lohnt-sich/">Lohnt sich die TCM-Ausbildung?</a></p>`,
    related: ['tcm-praxis-eroeffnen', 'tcm-praxis-kosten', 'standortwahl-tcm-praxis'],
    ctaTitle: 'Welcher Weg passt zu dir?',
    ctaText: 'Anstellung, Lernen oder eigene Praxis mit System: Alle drei Wege gibt es bei TCM.ch.',
    ctaLabel: 'Partnermodell ansehen',
    ctaHref: '/partner/',
    ctaCards: [
      { k: 'Anstellung', t: 'Karriere bei TCM.ch', href: '/karriere/' },
      { k: 'Lernen / Mentorat', t: 'TCM.ch Akademie', href: '/akademie/' },
      { k: 'Partner', t: 'Eigene Praxis mit System', href: '/partner/' },
    ],
  },
  {
    slug: 'tcm-praxis-uebernehmen',
    category: 'nachfolge',
    title: 'TCM Praxis übernehmen oder neu eröffnen?',
    metaDesc: 'Bestehende TCM-Praxis übernehmen oder selbst neu starten? Nachfrage, Patienten, Mietvertrag, Team, Abhängigkeit vom Inhaber und Zahlen richtig prüfen.',
    h1: 'Praxis übernehmen oder bei null anfangen?',
    lead: 'Eine bestehende Praxis klingt zunächst einfacher: Räume sind da, Patienten auch, vielleicht sogar ein Team. Aber du kaufst nicht automatisch ein funktionierendes Unternehmen. Manchmal kaufst du vor allem den Arbeitsplatz der bisherigen Inhaberin.',
    datePublished: D, dateModified: D, readTime: '6 Min.',
    keyTakeaways: [
      'Entscheidend ist, was ohne die bisherige Inhaberin bleibt.',
      'Ein Patientenstamm ist kein garantierter zukünftiger Umsatz.',
      'Mietvertrag, Team und Neupatientenquellen vor dem Preis prüfen.',
      'Kein Kaufpreis aus Internet-Faustformeln.',
    ],
    bodyHtml: BODY.uebernehmen,
    related: ['tcm-praxis-wert', 'tcm-praxis-verkaufen', 'tcm-praxis-eroeffnen'],
    ctaTitle: 'Du prüfst gerade eine bestehende Praxis?',
    ctaText: 'Rechne die Zahlen selbst nach oder sprich vertraulich mit uns über eine schrittweise Nachfolgelösung.',
    ctaLabel: 'Praxisnachfolge mit TCM.ch',
    ctaHref: '/partner/praxisnachfolge/',
    ctaCards: [
      { k: 'Tool', t: 'Praxisrechner', href: '/praxiswissen/praxisrechner/' },
      { k: 'Nachfolge', t: 'Praxisnachfolge mit TCM.ch', href: '/partner/praxisnachfolge/' },
    ],
  },
  {
    slug: 'tcm-praxis-verkaufen',
    category: 'nachfolge',
    title: 'TCM Praxis verkaufen: So bereitest du eine Nachfolge vor',
    metaDesc: 'TCM-Praxis verkaufen oder übergeben: Welche Zahlen, Verträge, Prozesse und Abhängigkeiten du vor einer Nachfolge klären solltest.',
    h1: 'Eine Praxis wird nicht am Tag des Verkaufs verkaufsfähig.',
    lead: 'Wenn du möchtest, dass deine Praxis nach dir weiterlebt, beginnt die Vorbereitung nicht mit einem Inserat. Sie beginnt damit, ein Unternehmen zu schaffen, das eine andere Person verstehen und weiterführen kann.',
    datePublished: D, dateModified: D, readTime: '7 Min.',
    keyTakeaways: [
      'Je weniger die Praxis an dir persönlich hängt, desto leichter die Übergabe.',
      'Zahlen, Verträge und Prozesse früh dokumentieren.',
      'Patientendaten gehören nicht in ein Verkaufsdossier.',
      'Der Wert entsteht aus dem konkreten Geschäft, nicht aus einem Multiplikator.',
    ],
    bodyHtml: BODY.verkaufen,
    related: ['tcm-praxis-wert', 'tcm-praxis-uebernehmen', 'tcm-praxis-kennzahlen'],
    ctaTitle: 'Du denkst über die nächsten Jahre nach?',
    ctaText: 'Du musst noch nichts verkaufen. Wir können vertraulich anschauen, welche Nachfolgewege für deine Praxis grundsätzlich denkbar wären.',
    ctaLabel: 'Praxisnachfolge besprechen',
    ctaHref: '/partner/praxisnachfolge/',
  },
  {
    slug: 'tcm-praxis-wert',
    category: 'nachfolge',
    title: 'TCM Praxis Wert: Was deine Praxis wirklich wertvoll macht',
    metaDesc: 'Was bestimmt den Wert einer TCM-Praxis? Ergebnis, Inhaberabhängigkeit, Team, Standort, Nachfrage, Prozesse und Risiken verständlich erklärt.',
    h1: 'Was ist deine TCM-Praxis wert?',
    lead: "Umsatz allein beantwortet diese Frage nicht. Zwei Praxen können beide CHF 300'000 Umsatz machen und trotzdem wirtschaftlich völlig unterschiedlich sein. Entscheidend ist, was vom Geschäft tatsächlich übertragbar ist.",
    shortAnswer: 'Eine Praxis ist dann besonders übertragbar, wenn sie nachhaltig Geld verdient und nicht vollständig an einer einzelnen Person hängt. Entscheidend sind deshalb neben Umsatz und Gewinn auch Nachfrage, Team, Prozesse, Mietvertrag, Marke und die Frage, was passiert, wenn du selbst weniger behandelst.',
    datePublished: D, dateModified: D, readTime: '7 Min.',
    keyTakeaways: [],
    bodyHtml: BODY2.praxisWert,
    faq: [
      { q: 'Ist Umsatz gleich Praxiswert?', a: 'Nein. Umsatz zeigt, wie viel Geld hereinkommt. Für den Wert zählt, was nach allen Kosten nachhaltig übrig bleibt und ob dieses Ergebnis auch ohne dich weiterläuft.' },
      { q: 'Gibt es einen festen Multiplikator?', a: 'Nicht seriös. Ein fixer Faktor auf den Umsatz ignoriert Ergebnis, Abhängigkeit von dir, Mietvertrag und Risiken. Für eine echte Transaktion braucht es eine Bewertung des konkreten Geschäfts.' },
      { q: 'Wie wichtig ist mein Patientenstamm?', a: 'Er hilft, ist aber kein garantierter zukünftiger Umsatz. Patient:innen entscheiden selbst, ob sie bei einer Nachfolge bleiben. Wichtiger ist, ob die Praxis laufend neue Anfragen erzeugt, die nicht nur an deinem Namen hängen.' },
      { q: 'Macht ein Team meine Praxis wertvoller?', a: 'Oft ja, wenn das Team bleiben möchte, wirtschaftlich trägt und nicht vollständig von dir geführt und ausgelastet wird. Ein Team bringt aber auch Verträge und Verantwortung mit, die ein Nachfolger übernimmt.' },
      { q: 'Wann sollte ich mich auf eine Nachfolge vorbereiten?', a: 'Mehrere Jahre vorher. Zahlen sauber führen, Prozesse dokumentieren und die Abhängigkeit von dir reduzieren braucht Zeit. Diese Schritte machen die Praxis meist schon heute ruhiger.' },
    ],
    related: ['tcm-praxis-verkaufen', 'tcm-praxis-uebernehmen', 'tcm-praxis-kennzahlen'],
    ctaTitle: 'Du denkst über Nachfolge nach?',
    ctaText: 'Du musst deine Praxis noch nicht verkaufen. Ein vertrauliches Gespräch kann trotzdem helfen, mögliche Wege früh zu verstehen.',
    ctaLabel: 'Praxisnachfolge besprechen',
    ctaHref: '/partner/praxisnachfolge/',
    ctaSecondary: { label: 'Praxiswert-Check starten', href: '/tools/praxiswert-rechner/' },
  },
  {
    slug: 'tcm-praxis-team-aufbauen',
    category: 'wachstum',
    title: 'TCM Praxis Team aufbauen: Wann lohnt sich der zweite Therapeut?',
    metaDesc: 'Wann solltest du in einer TCM-Praxis den zweiten Therapeuten einstellen? Nachfrage, Auslastung, Lohnmodell, Onboarding und Kapazität praktisch erklärt.',
    h1: 'Wann ist deine Praxis bereit für den zweiten Therapeuten?',
    lead: 'Ein freies Zimmer ist noch kein Grund, jemanden einzustellen. Die bessere Frage lautet: Hast du genug wiederkehrende Nachfrage, damit eine zweite Person sinnvoll ausgelastet werden kann?',
    shortAnswer: 'Stell nicht ein, weil du wachsen möchtest. Stell ein, weil deine bestehende Nachfrage wiederholt mehr Kapazität braucht als du selbst anbieten kannst. Idealerweise siehst du diese Überlastung über mehrere Wochen oder Monate und nicht nur während einer besonders guten Woche.',
    datePublished: D, dateModified: D, readTime: '7 Min.',
    keyTakeaways: [],
    bodyHtml: BODY2.teamAufbauen,
    faq: [
      { q: 'Wann ist der richtige Zeitpunkt für den zweiten Therapeuten?', a: 'Wenn du über mehrere Wochen oder Monate Anfragen nicht bedienen kannst, obwohl du selbst nahe an deiner gewünschten Kapazität arbeitest. Eine einzelne volle Woche reicht nicht.' },
      { q: 'Soll ich direkt 100 Prozent einstellen?', a: 'Meistens nicht. Ein Start mit zwei Behandlungstagen ist leichter zu füllen. Wenn die Nachfrage mitwächst, erhöhst du das Pensum schrittweise.' },
      { q: 'Fixlohn oder Umsatzbeteiligung?', a: 'Beides kann funktionieren. Ein Fixlohn gibt der Mitarbeiterin Planbarkeit und dir mehr Risiko. Ein variabler Anteil verteilt das Risiko, muss aber transparent und arbeitsrechtlich sauber geregelt sein. Lass den Vertrag im Zweifel prüfen.' },
      { q: 'Was passiert, wenn die neue Person nicht voll wird?', a: 'Dann trägst du die Differenz. Plane deshalb so, dass das Modell auch bei tieferer Auslastung in den ersten Monaten aufgeht, und verteile neue Anfragen gezielt an die neue Person.' },
      { q: 'Wer sollte neue Patienten bekommen?', a: 'In der Aufbauphase gezielt die neue Person, vor allem Anfragen, die du selbst nicht zeitnah bedienen kannst. Bestehende Patient:innen wechselst du nur mit deren Einverständnis.' },
    ],
    related: ['tcm-praxis-auslastung', 'tcm-praxis-kennzahlen', 'tcm-praxis-erweitern'],
    ctaTitle: 'Du willst wachsen, aber nicht alles selbst aufbauen?',
    ctaText: 'Im Partnermodell baut TCM.ch Nachfrage, Anfragen und Terminprozesse mit dir zusammen auf.',
    ctaLabel: 'Partner werden',
    ctaHref: '/partner/',
    ctaSecondary: { label: 'Auslastung berechnen', href: '/praxiswissen/tcm-praxis-auslastung/' },
  },
  {
    slug: 'tcm-praxis-erweitern',
    category: 'wachstum',
    title: 'TCM Praxis erweitern: Zweiter Raum, Team oder zweiter Standort?',
    metaDesc: 'Wann solltest du eine TCM-Praxis erweitern? Zweiter Behandlungsraum, zusätzliche Therapeut:innen oder zweiter Standort mit klarer Entscheidungslogik.',
    h1: 'Mehr Platz oder mehr Standort? Erst herausfinden, was wirklich knapp ist.',
    lead: 'Wenn die Praxis voll wird, fühlt sich Expansion logisch an. Trotzdem ist ein zweiter Standort nicht automatisch der nächste Schritt. Vielleicht brauchst du nur einen weiteren Behandlungstag, einen zweiten Raum oder eine zusätzliche Therapeutin.',
    shortAnswer: 'Erweitere immer den Engpass. Wenn Termine fehlen, brauchst du mehr Behandlungskapazität. Wenn Räume fehlen, brauchst du Raum. Wenn Nachfrage aus einer anderen Region kommt, kann ein zweiter Standort sinnvoll werden. Ein zweiter Mietvertrag sollte nicht die Standardantwort auf Wachstum sein.',
    datePublished: D, dateModified: D, readTime: '7 Min.',
    keyTakeaways: [],
    bodyHtml: BODY2.praxisErweitern,
    faq: [
      { q: 'Wann lohnt sich ein zweiter Standort?', a: 'Wenn echte Nachfrage aus einer anderen Region da ist, zum Beispiel Anfragen, Suchnachfrage oder Patient:innen mit langer Anreise, und der erste Standort ohne dich laufen kann.' },
      { q: 'Zweiter Raum oder zweite Praxis?', a: 'Wenn die Nachfrage am bestehenden Ort liegt, meistens zuerst der zweite Raum. Er bringt Kapazität ohne zweite Administration, zweiten Mietvertrag und zweite lokale Nachfrage.' },
      { q: 'Wie teste ich Nachfrage vor dem Mietvertrag?', a: 'Bestehende Anfragen nach Herkunft auswerten, eine Landingpage oder begrenzte Werbung für die neue Region testen und wenn möglich mit kleiner Fläche oder Teilzeitkapazität starten.' },
      { q: 'Wie viel Reserve brauche ich?', a: 'Genug für Eröffnung und die Monate danach: Kaution, Ausbau, Miete, Personal, Marketing und Administration, auch wenn der Standort nicht ab Woche eins voll ist. Die konkrete Summe hängt von deinem Mietvertrag und deiner Kostenstruktur ab.' },
      { q: 'Sollte ich erst jemanden einstellen?', a: 'Oft ja. Wenn deine eigene Zeit der Engpass ist, löst eine zusätzliche Therapeutin im bestehenden Raum das Problem mit deutlich weniger Risiko als ein neuer Standort.' },
    ],
    related: ['standortwahl-tcm-praxis', 'tcm-praxis-auslastung', 'tcm-praxis-team-aufbauen'],
    ctaTitle: 'Du willst mehrere Standorte aufbauen?',
    ctaText: 'Im Partnermodell bringt TCM.ch Nachfrage, Systeme und Standortentwicklung mit.',
    ctaLabel: 'Partner werden',
    ctaHref: '/partner/',
    ctaSecondary: { label: 'Standortwahl', href: '/praxiswissen/standortwahl-tcm-praxis/' },
  },
  {
    slug: 'tcm-praxis-administration',
    category: 'betrieb',
    title: 'TCM Praxis Administration: Termine, Abrechnung & Prozesse',
    metaDesc: 'Wie organisierst du eine TCM-Praxis effizient? Telefon, Terminmanagement, Tarif 590, Rechnungen, No-Shows, Software und wiederkehrende Prozesse.',
    h1: 'Gute Administration merkst du daran, dass sie kaum auffällt.',
    lead: 'Patient:innen kommen nicht wegen deiner Buchhaltungssoftware. Trotzdem entscheidet die Administration mit darüber, ob deine Praxis ruhig läuft oder jeder Behandlungstag von Telefonaten, offenen Rechnungen und Terminverschiebungen unterbrochen wird.',
    shortAnswer: 'Du brauchst am Anfang kein kompliziertes Praxissystem. Du brauchst klare Standards für Anfragen, Termine, Dokumentation, Rechnungen und Ausfälle. Sobald dieselbe Frage zum dritten Mal auftaucht, lohnt sich ein Prozess.',
    datePublished: D, dateModified: D, readTime: '7 Min.',
    keyTakeaways: [],
    bodyHtml: BODY2.praxisAdministration,
    faq: [
      { q: 'Welche Software braucht eine TCM-Praxis?', a: 'Eine Lösung für Agenda, Patientendaten, Dokumentation und Rechnungsstellung nach Tarif 590. Ob das ein Tool oder mehrere sind, ist zweitrangig. Wichtig ist, dass für jede Aufgabe klar ist, welches System zuständig ist.' },
      { q: 'Wie oft sollte ich Rechnungen stellen?', a: 'In einem festen Rhythmus, den Patient:innen kennen, zum Beispiel nach jeder Behandlung oder monatlich. Monatelang nicht abzurechnen belastet deine Liquidität.' },
      { q: 'Wie gehe ich mit No-Shows um?', a: 'Mit einer Absageregel, die vor dem ersten Termin bekannt ist: bis wann kostenlos abgesagt werden kann, was bei kurzfristigen Ausfällen gilt und welche Ausnahmen es gibt. Alle im Team kommunizieren sie gleich.' },
      { q: 'Wann lohnt sich eine administrative Person?', a: 'Wenn du regelmässig viel Zeit mit Aufgaben verbringst, die jemand anderes nach einem klaren Prozess erledigen könnte. Miss das eine Woche lang, bevor du entscheidest.' },
      { q: 'Was gehört zu Tarif 590?', a: 'Tarif 590 ist die Struktur, mit der komplementärmedizinische Leistungen gegenüber Zusatzversicherern bezeichnet und abgerechnet werden. Dazu gehören die aktuellen Tarifpositionen und deine ZSR-Nummer auf der Rechnung. Details unter Tarif 590.' },
    ],
    related: ['tcm-praxis-kennzahlen', 'tcm-praxis-auslastung', 'tcm-praxis-eroeffnen'],
    ctaTitle: 'Du willst weniger selbst administrieren?',
    ctaText: 'Im Partnermodell übernimmt TCM.ch Anfragen, Terminprozesse und Technologie.',
    ctaLabel: 'Partner werden',
    ctaHref: '/partner/',
    ctaSecondary: { label: 'Tarif 590', href: '/regulatorik/tarif-590/' },
  },
  {
    slug: 'tcm-praxis-qualitaet-dokumentation',
    category: 'betrieb',
    title: 'Dokumentation und Qualität in der TCM-Praxis',
    metaDesc: 'Was gehört in eine gute TCM-Behandlungsdokumentation? Praxisleitfaden zu Anamnese, Akupunkturpunkten, Einwilligung, Zwischenfällen, Datenschutz und Qualität.',
    h1: 'Dokumentation und Qualität in der TCM-Praxis',
    lead: 'Gute Dokumentation soll nicht möglichst viel Papier produzieren. Sie soll nachvollziehbar machen, was du vorgefunden, entschieden und behandelt hast. Gerade in einer TCM-Praxis gehören dazu neben der allgemeinen Anamnese auch die TCM-Einordnung, verwendete Akupunkturpunkte und Techniken, Reaktionen auf die Behandlung und der weitere Plan.',
    shortAnswer: 'Eine brauchbare Behandlungsdokumentation beantwortet auch Wochen später die wichtigsten Fragen: Was war die Ausgangslage? Welche TCM-Einordnung wurde verwendet? Was wurde konkret behandelt? Wie reagierte die Patientin oder der Patient? Gab es Besonderheiten oder Zwischenfälle? Und was ist als Nächstes geplant? Ein einfaches Qualitätssystem baut auf genau dieser Nachvollziehbarkeit auf. Es schafft wiederholbare Abläufe für Behandlung, Sicherheit, Hygiene, Übergaben und den Umgang mit Abweichungen.',
    datePublished: '2026-10-02', dateModified: '2026-10-02', readTime: '9 Min.',
    keyTakeaways: [
      'Dokumentiere nicht nur den Termin, sondern Ausgangslage, TCM-Einordnung, konkrete Behandlung, Reaktion und nächsten Schritt.',
      'Bei Akupunktur gehören die tatsächlich verwendeten Punkte und relevanten Techniken in eine nachvollziehbare Verlaufsdokumentation.',
      'Ärztliche Abklärungen, besondere Reaktionen und Zwischenfälle sollten im Verlauf erkennbar bleiben.',
      'Gesundheitsdaten sind besonders schützenswerte Personendaten und benötigen angemessene organisatorische und technische Schutzmassnahmen.',
      'Verwende keine pauschale Schweizer Aufbewahrungsfrist, sondern prüfe die für Standort und Tätigkeit geltenden Vorgaben.',
      'Bei mehreren Therapeutinnen und Therapeuten braucht die Praxis einen gemeinsamen Mindeststandard für Dokumentation und Übergaben.',
    ],
    bodyHtml: BODY2.qualitaetDokumentation,
    faq: [
      { q: 'Was gehört in eine TCM-Behandlungsdokumentation?', a: 'Eine sinnvolle Dokumentation enthält die relevante Ausgangslage, medizinisch wichtige Informationen, die TCM-Anamnese und Arbeitshypothese, die konkret durchgeführte Behandlung, verwendete Akupunkturpunkte und Techniken, relevante Reaktionen sowie den weiteren Plan. Der genaue Umfang hängt von Behandlung und Situation ab.' },
      { q: 'Muss ich jeden Akupunkturpunkt dokumentieren?', a: 'Für einen nachvollziehbaren Behandlungsverlauf ist es sinnvoll, die tatsächlich verwendeten Akupunkturpunkte festzuhalten. Eine Notiz wie «Akupunktur durchgeführt» zeigt später nicht, welche Behandlung tatsächlich stattgefunden hat. Welche formalen Dokumentationspflichten zusätzlich gelten, sollte für die konkrete Tätigkeit und den Kanton geprüft werden.' },
      { q: 'Wie lange muss ich Patientendossiers aufbewahren?', a: 'Dafür sollte keine pauschale Frist für alle Schweizer TCM-Praxen verwendet werden. Die anwendbaren Anforderungen können von Kanton, Tätigkeit und Berufsstatus abhängen. Prüfe die konkrete Aufbewahrungsfrist für deinen Standort und deine Tätigkeit bei den zuständigen Stellen.' },
      { q: 'Sind Patientendaten besonders schützenswert?', a: 'Ja. Gesundheitsdaten gelten nach dem Schweizer Datenschutzgesetz als besonders schützenswerte Personendaten. Patientendossiers sollten deshalb organisatorisch und technisch vor unberechtigtem Zugriff geschützt werden.' },
      { q: 'Braucht eine kleine TCM-Praxis ein Qualitätshandbuch?', a: 'Nicht zwingend in Form eines umfangreichen Handbuchs. Entscheidend ist, dass wichtige Abläufe definiert, nachvollziehbar und im Alltag tatsächlich umgesetzt werden. Bei bewilligungspflichtigen Betrieben können zusätzliche kantonale Anforderungen an ein Qualitätssicherungssystem gelten.' },
      { q: 'Was ändert sich bei mehreren Therapeutinnen und Therapeuten?', a: 'Gemeinsame Mindeststandards werden wichtiger. Erstanamnese, Verlauf, Punkte und Techniken, Änderungen des Behandlungsplans, Zwischenfälle und Übergaben sollten so dokumentiert sein, dass eine berechtigte Vertretung den relevanten Verlauf verstehen kann.' },
    ],
    sourceLinks: [
      { label: 'EDÖB: Bekanntgabe von Patientendaten (Gesundheitsdaten als besonders schützenswerte Personendaten, Art. 5 Bst. c Ziff. 2 DSG)', url: 'https://www.edoeb.admin.ch/de/bekanntgabe-von-patientendaten', kind: 'official', nature: 'fact', accessed: '2026-10-02' },
      { label: 'Fedlex: Bundesgesetz über den Datenschutz (DSG), SR 235.1', url: 'https://www.fedlex.admin.ch/eli/cc/2022/491/de', kind: 'official', nature: 'fact', accessed: '2026-10-02' },
    ],
    related: ['tcm-praxis-administration', 'tcm-praxis-team-aufbauen', 'tcm-praxis-eroeffnen'],
    ctaTitle: 'Du baust deine Praxisabläufe gerade auf?',
    ctaText: 'Die Checkliste ordnet Anerkennung, Bewilligung, Räume und Prozesse in eine sinnvolle Reihenfolge.',
    ctaLabel: 'Zur Praxis-Checkliste',
    ctaHref: '/praxiswissen/tcm-praxis-eroeffnen/',
    ctaSecondary: { label: 'Praxisadministration', href: '/praxiswissen/tcm-praxis-administration/' },
  },
];

export const pwBySlug = (slug: string) => PRAXISWISSEN.find((a) => a.slug === slug);
export const pwHref = (slug: string) => `/praxiswissen/${slug}/`;
