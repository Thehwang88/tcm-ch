// Artikelreihe "Akupunktur bei X".
//
// Warum als eigene Datei: wissen.ts ist bereits ~290 KB. Neue Reihen kommen hier rein und
// werden in wissen.ts angehängt, damit die Basisdatei nicht weiter wächst.
//
// Auswahl nach Suchvolumen CH x Difficulty (Semrush, 09/2026):
//   akupunktur kopfschmerzen 110 / KD 15 · akupunktur abnehmen 140 / KD 21
//
// BEWUSST NICHT hier: Heuschnupfen, Migräne und Kinderwunsch. Für alle drei existieren
// bereits Artikel in wissen.ts (akupunktur-bei-heuschnupfen, migraene-tcm-warum-akupunktur-
// nicht-fuer-jeden, kinderwunsch-akupunktur-tcm). Eine zweite Seite zum selben Thema hätte
// genau die Kannibalisierung erzeugt, die dauernadeln-akupunktur und
// wie-lange-bleiben-akupunkturnadeln-drin gegenseitig auf Position 9 bis 13 festhielt.
// Vor dem Anlegen eines neuen wissen-Slugs deshalb IMMER die Slug-Liste in wissen.ts prüfen.
//
// Spannungskopfschmerz ist gegenüber dem bestehenden Migräne-Artikel klar abgegrenzt:
// Cochrane führt für beide Beschwerdebilder eigene Reviews, und die Seite verweist explizit
// auf den Migräne-Artikel, statt dessen Suchanfragen mitzunehmen.
//
// Alle Studienangaben sind vor dem Schreiben gegen die Primärquelle geprüft worden.
import type { Wissen } from './wissen';

const AUTOR = {
  name: 'Corinna Reinhart',
  role: 'TCM-Therapeutin · EMR & ASCA zertifiziert · Praxis St. Gallen',
  bio: 'Corinna behandelt seit über zwölf Jahren Patientinnen mit Akupunktur, Tuina und Schröpfen. Schwerpunkte: chronische Schmerzen, Kopfschmerzen, Migräne und stressbedingte Beschwerden. Ausbildung in der Schweiz mit Weiterbildungen in Chengdu und Shanghai. Arbeitet eng mit Neurologen und Gynäkologinnen in der Ostschweiz zusammen.',
};

const DATEN = { datePublished: '2026-09-02', dateModified: '2026-09-02', lastReviewed: '2026-09-02' };

export const wissenAkupunkturBei: Wissen[] = [
  // ────────────────────────────────────────────────────────── KOPFSCHMERZEN
  {
    slug: 'akupunktur-bei-kopfschmerzen',
    title: 'Akupunktur bei Spannungskopfschmerzen: Was hilft',
    metaDesc: 'Akupunktur bei Spannungskopfschmerzen: Was der Cochrane-Review zeigt, wie sich der Kopfschmerz von Migräne unterscheidet und warum der Nacken oft der eigentliche Ort ist.',
    region: 'Schweizweit',
    excerpt: 'Spannungskopfschmerz ist der häufigste Kopfschmerz überhaupt — und einer, bei dem Akupunktur in den Studien gut abschneidet.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur bei Spannungskopfschmerzen',
    lead: 'Der drückende, beidseitige Kopfschmerz ohne Übelkeit ist der häufigste überhaupt, und einer der wenigen, bei denen Akupunktur in einer grossen Übersichtsarbeit klar abschneidet. Hier steht, was gemessen wurde, warum wir dabei fast immer auch am Nacken arbeiten und wann Schmerzmittel selbst zum Problem werden.',
    readingTime: '8 Min.',
    ctaTitle: 'Kopfschmerzen abklären lassen?',
    author: AUTOR,
    reviewerName: 'Corinna Reinhart',
    ...DATEN,
    bodyHtml: `<p>Spannungskopfschmerz fühlt sich an wie ein zu enges Band um den Kopf. Beidseitig, drückend statt pulsierend, ohne Übelkeit, und meist so, dass man damit weiterarbeiten kann — nur eben schlechter. Genau deshalb wird er lange ausgehalten und selten behandelt.</p>
<h2>Erst die Abgrenzung</h2>
<p>Der Unterschied zur Migräne ist praktisch relevant, weil beide unterschiedlich behandelt werden. Migräne ist typischerweise einseitig, pulsierend, oft mit Übelkeit und Licht- oder Lärmempfindlichkeit, und sie zwingt zum Hinlegen. Spannungskopfschmerz ist beidseitig, drückend, ohne Übelkeit. Wenn dein Kopfschmerz eher der ersten Beschreibung entspricht, findest du das Passende unter <a href="/wissen/migraene-tcm-warum-akupunktur-nicht-fuer-jeden/">Migräne und Akupunktur</a>.</p>
<h2>Was die Studien zeigen</h2>
<p>Der Cochrane-Review zur Prophylaxe des Spannungskopfschmerzes (<a href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD007587.pub2/information" target="_blank" rel="noopener">Linde et al., 2016</a>) wertete zwölf Studien mit rund 2.350 Teilnehmenden aus.</p>
<p>Das Ergebnis fällt hier sogar etwas deutlicher aus als bei der Migräne: Rund die Hälfte der mit Akupunktur Behandelten hatte ihre Kopfschmerztage mindestens halbiert, gegenüber etwa 40 Prozent unter Schein-Akupunktur und deutlich weniger ohne Behandlung. Der Effekt hielt in den Nachbeobachtungen über mehrere Monate an.</p>
<div class="wa-callout"><div class="wa-callout-label">Einordnung</div><p>Auch hier gilt: Ein erheblicher Teil des Effekts tritt unabhängig von der genauen Punktwahl auf. Der Nutzen gegenüber gar keiner Behandlung ist trotzdem gut belegt, und die Nebenwirkungen sind gering.</p></div>
<h2>Warum wir fast immer am Nacken arbeiten</h2>
<p>Bei einem Grossteil der Patient:innen mit Spannungskopfschmerz findet sich eine deutlich verhärtete Nacken- und Schultermuskulatur, oft mit Triggerpunkten, die bei Druck genau den bekannten Kopfschmerz auslösen. Das ist kein Zufallsbefund, sondern häufig der eigentliche Ort des Geschehens.</p>
<p>Deshalb kombinieren wir Akupunktur regelmässig mit <a href="/therapien/tuina/">Tuina</a> oder einer <a href="/therapien/massage/triggerpunktmassage/">Triggerpunktmassage</a>. Wer acht Stunden am Bildschirm sitzt, bekommt zusätzlich zwei bis drei Übungen mit, weil die Nadel gegen die Sitzhaltung auf Dauer verliert.</p>
<h2>Das Thema Schmerzmittel</h2>
<p>Wer an mehr als zehn bis fünfzehn Tagen im Monat Schmerzmittel gegen Kopfschmerz nimmt, riskiert einen Medikamentenübergebrauch-Kopfschmerz: Das Mittel verursacht dann selbst, wogegen es genommen wird. Das ist häufiger, als die meisten denken, und der Ausweg führt über einen ärztlich begleiteten Entzug, nicht über Akupunktur allein.</p>
<p>Wenn du in dieser Grössenordnung liegst, sprich es beim ersten Termin an. Wir arbeiten dann parallel zur ärztlichen Behandlung, nicht statt ihr.</p>
<h2>Ablauf und Kosten</h2>
<p>Üblich sind acht bis zwölf Sitzungen über sechs bis acht Wochen. Eine Behandlung dauert mit Gespräch 45 bis 60 Minuten, die Nadeln bleiben 20 bis 30 Minuten. Bei EMR- und ASCA-anerkannten Therapeut:innen beteiligt sich die Zusatzversicherung in der Regel mit 70 bis 90 Prozent, ohne ärztliche Verordnung — Details unter <a href="/krankenkassen/akupunktur/">Akupunktur und Krankenkasse</a>.</p>`,
    faqs: [
      { q: 'Hilft Akupunktur bei Spannungskopfschmerzen?', a: 'Im Cochrane-Review von 2016 halbierte rund die Hälfte der mit Akupunktur Behandelten ihre Kopfschmerztage, gegenüber etwa 40 Prozent unter Schein-Akupunktur und deutlich weniger ohne Behandlung. Der Effekt hielt über mehrere Monate an.' },
      { q: 'Was ist der Unterschied zwischen Spannungskopfschmerz und Migräne?', a: 'Spannungskopfschmerz ist beidseitig und drückend, ohne Übelkeit, und man kann meist weiterarbeiten. Migräne ist typischerweise einseitig, pulsierend, oft mit Übelkeit und Licht- oder Lärmempfindlichkeit, und zwingt zum Hinlegen.' },
      { q: 'Warum wird bei Kopfschmerzen am Nacken behandelt?', a: 'Bei vielen Betroffenen ist die Nacken- und Schultermuskulatur deutlich verhärtet, oft mit Triggerpunkten, die den bekannten Kopfschmerz bei Druck auslösen. Der Nacken ist dann häufig der eigentliche Ort des Problems.' },
      { q: 'Wie viele Sitzungen brauche ich?', a: 'Üblich sind acht bis zwölf Sitzungen über sechs bis acht Wochen. Zeigt sich nach der Hälfte gar keine Veränderung, besprechen wir Alternativen.' },
      { q: 'Ich nehme oft Schmerzmittel. Ist das ein Problem?', a: 'Ab etwa zehn bis fünfzehn Einnahmetagen im Monat kann ein Medikamentenübergebrauch-Kopfschmerz entstehen, bei dem das Mittel selbst den Kopfschmerz unterhält. Sprich das beim ersten Termin an, das gehört ärztlich begleitet.' },
    ],
    related: [
      { href: '/beschwerden/spannungskopfschmerzen/', label: 'Spannungskopfschmerzen', cat: 'Beschwerde' },
      { href: '/wissen/migraene-tcm-warum-akupunktur-nicht-fuer-jeden/', label: 'Akupunktur bei Migräne', cat: 'Artikel' },
      { href: '/therapien/massage/triggerpunktmassage/', label: 'Triggerpunktmassage', cat: 'Therapie' },
    ],
  },

  // ──────────────────────────────────────────────────────────── KINDERWUNSCH

  // ──────────────────────────────────────────────────────────────── ABNEHMEN
  {
    slug: 'akupunktur-zum-abnehmen',
    title: 'Akupunktur zum Abnehmen: Was dran ist',
    metaDesc: 'Hilft Akupunktur beim Abnehmen? Die ehrliche Einordnung der Studienlage, warum wir keine Abnehmprogramme anbieten und was wir stattdessen sinnvoll behandeln können.',
    region: 'Schweizweit',
    excerpt: 'Akupunktur wird häufig als Abnehmhilfe beworben. Die Studienlage trägt das nicht. Was wir stattdessen sagen.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur zum Abnehmen: die unbequeme Antwort',
    lead: 'Akupunktur wird oft als sanfte Abnehmhilfe beworben, mit Ohrnadeln gegen den Appetit und Programmen über zehn Sitzungen. Wir bieten das nicht an, und dieser Artikel erklärt warum. Er sagt auch, was wir stattdessen sinnvoll behandeln können.',
    readingTime: '6 Min.',
    ctaTitle: 'Lieber konkret besprechen?',
    author: AUTOR,
    reviewerName: 'Corinna Reinhart',
    ...DATEN,
    bodyHtml: `<p>Die Anfrage kommt regelmässig, meist im Januar. Ob wir Akupunktur zum Abnehmen machen, gerne mit Ohrnadeln, gerne als Paket. Die kurze Antwort ist nein, und die längere ist interessanter.</p>
<h2>Was die Studienlage hergibt</h2>
<p>Es gibt eine Reihe von Studien zu Akupunktur und Körpergewicht, überwiegend klein, methodisch schwach und mit kurzer Beobachtungsdauer. Wo Effekte gefunden wurden, waren sie gering und liessen sich in besser kontrollierten Untersuchungen meist nicht bestätigen. Eine belastbare Grundlage dafür, Akupunktur als Abnehmmethode anzubieten, existiert nicht.</p>
<p>Das ist keine besonders strenge Auslegung. Es ist der Unterschied zwischen "es gibt Studien" und "die Studien zeigen etwas".</p>
<div class="wa-callout"><div class="wa-callout-label">Unsere Haltung</div><p>Wir verkaufen keine Behandlung, deren Wirkung wir nicht belegen können — auch dann nicht, wenn sie nachgefragt wird und sich gut verkaufen liesse.</p></div>
<h2>Warum die Ohrnadel-Programme trotzdem funktionieren</h2>
<p>Wer zehn Wochen lang wöchentlich in eine Praxis geht, über Essen spricht, gewogen wird und sich beobachtet fühlt, ändert sein Verhalten. Das ist ein realer Effekt, nur hat er wenig mit der Nadel zu tun. Denselben Effekt bekommst du in einer Ernährungsberatung, dort aber mit fachlicher Grundlage und ohne den Umweg.</p>
<p>Wenn dir also jemand ein Abnehmprogramm mit Akupunktur verkauft: Was du bezahlst, ist im Wesentlichen Begleitung. Das darf man wollen. Man sollte nur wissen, wofür man zahlt.</p>
<h2>Was wir stattdessen behandeln</h2>
<p>Es gibt Beschwerden im Umfeld, bei denen wir sinnvoll etwas beitragen können, und die den Alltag oft mehr belasten als die Zahl auf der Waage:</p>
<p>Schlafprobleme, die den Tagesrhythmus durcheinanderbringen. Stressbedingte Erschöpfung. Verdauungsbeschwerden wie Blähungen, Völlegefühl oder <a href="/beschwerden/reizdarm/">Reizdarm</a>. Schmerzen im Bewegungsapparat, die Bewegung schwer machen — bei <a href="/beschwerden/knieschmerzen/">Knieschmerzen</a> etwa ist das oft der eigentliche Engpass.</p>
<p>Wenn du deswegen kommst, behandeln wir das. Und wenn Gewicht für dich ein Thema ist, sagen wir dir ehrlich, dass eine Ernährungsberatung oder eine ärztliche Abklärung der bessere Ort dafür ist. Bei anerkannten Fachpersonen beteiligt sich die Zusatzversicherung daran häufig ebenfalls.</p>
<h2>Was wir nicht tun</h2>
<p>Wir stellen keine Ernährungspläne auf, geben keine Kalorienvorgaben und verkaufen keine Pakete im Voraus. Wenn dir das jemand als TCM-Leistung anbietet, frag nach der Qualifikation dafür.</p>`,
    faqs: [
      { q: 'Hilft Akupunktur beim Abnehmen?', a: 'Die Studienlage gibt das nicht her. Die vorhandenen Untersuchungen sind überwiegend klein und methodisch schwach, gefundene Effekte waren gering und liessen sich in besser kontrollierten Studien meist nicht bestätigen.' },
      { q: 'Was ist mit Ohrakupunktur gegen Appetit?', a: 'Für diese Anwendung gilt dasselbe. Was in solchen Programmen wirkt, ist überwiegend die wöchentliche Begleitung und Selbstbeobachtung, nicht die Nadel.' },
      { q: 'Bietet ihr Abnehmprogramme an?', a: 'Nein. Wir verkaufen keine Behandlung, deren Wirkung wir nicht belegen können.' },
      { q: 'Was könnt ihr denn behandeln?', a: 'Schlafprobleme, stressbedingte Erschöpfung, Verdauungsbeschwerden und Schmerzen im Bewegungsapparat. Das sind Beschwerden, bei denen wir etwas beitragen können und die den Alltag oft stärker belasten.' },
      { q: 'Wohin soll ich mich stattdessen wenden?', a: 'An eine Ernährungsberatung oder deine Ärztin. Bei anerkannten Fachpersonen beteiligt sich die Zusatzversicherung daran häufig ebenfalls.' },
    ],
    related: [
      { href: '/beschwerden/reizdarm/', label: 'Reizdarm', cat: 'Beschwerde' },
      { href: '/beschwerden/schlafprobleme/', label: 'Schlafprobleme', cat: 'Beschwerde' },
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
    ],
  },
];
