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
import { PUBLISHED_WELLE_3_2026_10, PUBLISHED_WELLE_4_2026_10, PUBLISHED_WISSEN_NEUN_2026_10 } from './befunde-werte';

const AUTOR = {
  name: 'Corinna Reinhart',
  role: 'TCM-Therapeutin · EMR & ASCA zertifiziert · Praxis St. Gallen',
  bio: 'Corinna behandelt seit über zwölf Jahren Patientinnen mit Akupunktur, Tuina und Schröpfen. Schwerpunkte: chronische Schmerzen, Kopfschmerzen, Migräne und stressbedingte Beschwerden. Ausbildung in der Schweiz mit Weiterbildungen in Chengdu und Shanghai. Arbeitet eng mit Neurologen und Gynäkologinnen in der Ostschweiz zusammen.',
};

const DATEN = { datePublished: '2026-09-02', dateModified: '2026-09-02', lastReviewed: '2026-09-02' };
const DATEN2 = { datePublished: '2026-10-05', dateModified: '2026-10-05', lastReviewed: '2026-10-05' };
const DATEN3 = { datePublished: '2026-10-13', dateModified: '2026-10-13', lastReviewed: '2026-10-13' };
// Welle 3 (14.10.2026): neutrale Redaktion, kein Reviewer, kein lastReviewed. Datum ueber die
// Kohorten-Konstante (leer bis Release; Template laesst leere Daten weg).
const REDAKTION = {
  name: 'Redaktion TCM.ch',
  role: 'Redaktionelle Einordnung',
  bio: 'Redaktionelle Einordnung auf Basis der im Artikel verlinkten Quellen. Keine ärztliche Diagnose und keine individuelle Therapieempfehlung.',
};
const DATEN_W3 = { datePublished: PUBLISHED_WELLE_3_2026_10 ?? '', dateModified: PUBLISHED_WELLE_3_2026_10 ?? '' };
// Neun-Artikel-Paket 21.10.2026 (Artikel 07 bis 09; eigene Kohorten-Konstante, neutrale Redaktion)
const DATEN_N = { datePublished: PUBLISHED_WISSEN_NEUN_2026_10 ?? '', dateModified: PUBLISHED_WISSEN_NEUN_2026_10 ?? '' };
// Welle 4 (16.10.2026): gleiche Regel, eigene Kohorten-Konstante (undefined bis Release).
const DATEN_W4 = { datePublished: PUBLISHED_WELLE_4_2026_10 ?? '', dateModified: PUBLISHED_WELLE_4_2026_10 ?? '' };

export const wissenAkupunkturBei: Wissen[] = [
  // ────────────────────────────────────────────────────────── KOPFSCHMERZEN
  {
    slug: 'akupunktur-bei-kopfschmerzen',
    title: 'Akupunktur bei Kopfschmerzen: Was die Studien zeigen',
    metaDesc: 'Akupunktur bei Spannungskopfschmerzen: Was der Cochrane-Review zeigt, wie sich der Kopfschmerz von Migräne unterscheidet und warum der Nacken oft der eigentliche Ort ist.',
    region: 'Schweizweit',
    excerpt: 'Spannungskopfschmerz ist der häufigste Kopfschmerz überhaupt, und einer, bei dem Akupunktur in den Studien gut abschneidet.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur bei Kopfschmerzen: Was die Studien zeigen',
    lead: 'Der drückende, beidseitige Kopfschmerz ohne Übelkeit ist der häufigste überhaupt, und einer der wenigen, bei denen Akupunktur in einer grossen Übersichtsarbeit klar abschneidet. Hier steht, was gemessen wurde, warum wir dabei fast immer auch am Nacken arbeiten und wann Schmerzmittel selbst zum Problem werden.',
    readingTime: '8 Min.',
    ctaTitle: 'Kopfschmerzen abklären lassen?',
    author: AUTOR,
    reviewerName: 'Corinna Reinhart',
    ...DATEN,
    bodyHtml: `<p>Spannungskopfschmerz fühlt sich an wie ein zu enges Band um den Kopf. Beidseitig, drückend statt pulsierend, ohne Übelkeit, und meist so, dass man damit weiterarbeiten kann, nur eben schlechter. Genau deshalb wird er lange ausgehalten und selten behandelt.</p>
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
<p>Üblich sind acht bis zwölf Sitzungen über sechs bis acht Wochen. Eine Behandlung dauert mit Gespräch 45 bis 60 Minuten, die Nadeln bleiben 20 bis 30 Minuten. Bei EMR- und ASCA-anerkannten Therapeut:innen beteiligt sich die Zusatzversicherung in der Regel mit 70 bis 90 Prozent, ohne ärztliche Verordnung. Details unter <a href="/krankenkassen/akupunktur/">Akupunktur und Krankenkasse</a>.</p>`,
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
<div class="wa-callout"><div class="wa-callout-label">Unsere Haltung</div><p>Wir verkaufen keine Behandlung, deren Wirkung wir nicht belegen können. Auch dann nicht, wenn sie nachgefragt wird und sich gut verkaufen liesse.</p></div>
<h2>Warum die Ohrnadel-Programme trotzdem funktionieren</h2>
<p>Wer zehn Wochen lang wöchentlich in eine Praxis geht, über Essen spricht, gewogen wird und sich beobachtet fühlt, ändert sein Verhalten. Das ist ein realer Effekt, nur hat er wenig mit der Nadel zu tun. Denselben Effekt bekommst du in einer Ernährungsberatung, dort aber mit fachlicher Grundlage und ohne den Umweg.</p>
<p>Wenn dir also jemand ein Abnehmprogramm mit Akupunktur verkauft: Was du bezahlst, ist im Wesentlichen Begleitung. Das darf man wollen. Man sollte nur wissen, wofür man zahlt.</p>
<h2>Was wir stattdessen behandeln</h2>
<p>Es gibt Beschwerden im Umfeld, bei denen wir sinnvoll etwas beitragen können, und die den Alltag oft mehr belasten als die Zahl auf der Waage:</p>
<p>Schlafprobleme, die den Tagesrhythmus durcheinanderbringen. Stressbedingte Erschöpfung. Verdauungsbeschwerden wie Blähungen, Völlegefühl oder <a href="/beschwerden/reizdarm/">Reizdarm</a>. Schmerzen im Bewegungsapparat, die Bewegung schwer machen: bei <a href="/beschwerden/knieschmerzen/">Knieschmerzen</a> etwa ist das oft der eigentliche Engpass.</p>
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
      { href: '/beschwerden/gewichtsmanagement/', label: 'Gewichtsmanagement', cat: 'Beschwerde' },
      { href: '/beschwerden/reizdarm/', label: 'Reizdarm', cat: 'Beschwerde' },
      { href: '/beschwerden/schlafprobleme/', label: 'Schlafprobleme', cat: 'Beschwerde' },
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
    ],
  },
  // ─────────────────────────────── COHORT 01 (05.10.2026): Treatment-Decision-Serie
  {
    slug: 'akupunktur-bei-knieschmerzen',
    title: 'Akupunktur bei Knieschmerzen & Kniearthrose: Was Studien zeigen',
    metaDesc: 'Kann Akupunktur bei Knieschmerzen und Kniearthrose helfen? Studienlage, realistischer Nutzen, Ablauf, Grenzen und Kosten in der Schweiz.',
    region: 'Schweizweit',
    excerpt: 'Akupunktur ist bei Knieschmerzen und Kniearthrose vergleichsweise gut untersucht – die Ergebnisse sind differenzierter, als ein einfaches «wirkt» oder «wirkt nicht» vermuten lässt.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur bei Knieschmerzen & Kniearthrose: Was Studien zeigen',
    lead: 'Knieschmerzen können beim Gehen, Treppensteigen oder nach längerer Belastung den Alltag deutlich einschränken. Besonders bei Kniearthrose suchen viele Betroffene nach einer zusätzlichen Möglichkeit zur Schmerzlinderung. Akupunktur ist hier vergleichsweise gut untersucht – die Ergebnisse sind jedoch differenzierter, als ein einfaches «wirkt» oder «wirkt nicht» vermuten lässt.',
    readingTime: '7 Min.',
    ctaTitle: 'Knieschmerzen besprechen?',
    author: AUTOR,
    reviewerName: 'Corinna Reinhart',
    ...DATEN2,
    bodyHtml: `<h2>Wann Akupunktur bei Knieschmerzen infrage kommt</h2>
<p>Akupunktur kann vor allem dann als ergänzende Behandlung erwogen werden, wenn Knieschmerzen länger bestehen und eine Kniearthrose oder eine andere nicht akut behandlungsbedürftige Ursache medizinisch eingeordnet wurde.</p>
<p>Sie ersetzt weder die Diagnose noch sinnvolle Basisbehandlungen wie Bewegung, Krafttraining, Gewichtsmanagement bei Übergewicht oder eine notwendige orthopädische Therapie. Bei bestimmten Menschen kann sie jedoch Teil eines multimodalen Behandlungskonzepts sein.</p>
<p>Wichtig ist zunächst die Ursache. Schmerzen nach einem Unfall, ein plötzlich stark geschwollenes oder gerötetes Knie, eine ausgeprägte Instabilität oder eine deutliche Bewegungseinschränkung gehören medizinisch abgeklärt.</p>
<h2>Was die Studien zeigen</h2>
<p>Kniearthrose gehört zu den besser untersuchten Einsatzgebieten der Akupunktur.</p>
<p>Systematische Auswertungen zeigen, dass Akupunktur Schmerzen und Funktion gegenüber keiner Akupunktur beziehungsweise Wartelistenkontrollen verbessern kann. Gegenüber einer glaubwürdigen Scheinakupunktur fallen die zusätzlichen Effekte deutlich kleiner aus.</p>
<p>Auch die grosse deutsche GERAC-Studie bei chronischer Kniearthrose fand bessere Ergebnisse für echte und Scheinakupunktur als für die damalige konventionelle Vergleichsbehandlung; zwischen echter und Scheinakupunktur zeigte sich dagegen kein klarer Unterschied.</p>
<p>Das bedeutet: Ein Teil des beobachteten Gesamtnutzens lässt sich nicht eindeutig auf die spezifische Wahl klassischer Akupunkturpunkte zurückführen. Für Patientinnen und Patienten ist dennoch relevant, ob sich Schmerzen, Beweglichkeit und Alltag tatsächlich verbessern.</p>
<p><strong>Unsere Einordnung:</strong> Akupunktur ist bei chronischen Knieschmerzen und insbesondere Kniearthrose eine vertretbare ergänzende Option. Sie sollte aber nicht als Reparatur des Gelenks dargestellt werden.</p>
<h2>Baut Akupunktur Knorpel wieder auf?</h2>
<p>Nein. Dafür gibt es keine belastbare Evidenz.</p>
<p>Akupunktur kann auf Schmerzen und möglicherweise Funktion Einfluss nehmen. Einen abgenutzten Gelenkknorpel baut sie nicht wieder auf und strukturelle Arthroseveränderungen werden dadurch nicht rückgängig gemacht.</p>
<p>Das Behandlungsziel ist deshalb funktionell: weniger Beschwerden, bessere Belastbarkeit und mehr Bewegungsfreiheit – soweit dies individuell erreichbar ist.</p>
<h2>Wie wir behandeln</h2>
<p>Zu Beginn klären wir, wo und wann die Beschwerden auftreten, wie belastbar das Knie ist und welche Diagnose bereits gestellt wurde.</p>
<p>In der TCM wird zusätzlich das individuelle Beschwerdemuster betrachtet. Die Akupunktur kann lokale Punkte rund um das Knie mit weiter entfernten Punkten kombinieren.</p>
<p>Entscheidend ist nicht eine möglichst grosse Zahl von Nadeln, sondern ein nachvollziehbarer Behandlungsplan und eine regelmässige Überprüfung, ob sich tatsächlich etwas verändert.</p>
<h2>Wann Akupunktur nicht die richtige Wahl ist</h2>
<p>Akupunktur sollte eine notwendige medizinische Abklärung nicht verzögern. Das gilt besonders bei einem akut stark geschwollenen oder überwärmten Knie, Fieber, einem relevanten Unfall, Blockierungen, deutlicher Instabilität oder rasch zunehmenden Beschwerden.</p>
<p>Auch bei fortgeschrittener Arthrose mit erheblichem Funktionsverlust sollte eine notwendige orthopädische Beurteilung nicht zugunsten wiederholter Akupunktur aufgeschoben werden.</p>
<h2>Ablauf und Sitzungen</h2>
<p>Eine Behandlung beginnt mit Anamnese und Untersuchung. Anschliessend werden die Akupunkturpunkte individuell gewählt.</p>
<p>Bei chronischen Beschwerden wird meist nicht nach einer einzigen Sitzung beurteilt. Gleichzeitig sollte Akupunktur auch nicht unbegrenzt fortgesetzt werden, wenn sich kein nachvollziehbarer Nutzen zeigt.</p>
<p>Wir vereinbaren deshalb einen überschaubaren Behandlungsabschnitt und beurteilen danach gemeinsam Schmerz, Beweglichkeit, Belastbarkeit und Alltag.</p>
<h2>Kosten & Krankenkasse</h2>
<p>Bei nichtärztlichen Therapeutinnen und Therapeuten wird Akupunktur in der Schweiz je nach Versicherungsvertrag häufig über eine Zusatzversicherung für Komplementärmedizin vergütet. Umfang, Jahreslimiten und anerkannte Leistungserbringer unterscheiden sich je nach Versicherung.</p>
<p>Wir empfehlen, die persönliche Kostendeckung vor Behandlungsbeginn direkt bei der Versicherung zu prüfen.</p>`,
    faqs: [
      { q: 'Hilft Akupunktur bei Kniearthrose?', a: 'Sie kann bei manchen Menschen Schmerzen und Funktion verbessern. Gegenüber Scheinakupunktur ist der zusätzliche spezifische Effekt in Studien jedoch eher klein.' },
      { q: 'Kann Akupunktur den Knorpel wieder aufbauen?', a: 'Nein. Akupunktur kann Beschwerden beeinflussen, repariert aber keinen verlorenen Gelenkknorpel.' },
      { q: 'Wie viele Sitzungen brauche ich?', a: 'Das hängt von Dauer, Ursache und Reaktion der Beschwerden ab. Sinnvoll ist ein begrenzter Behandlungsversuch mit anschliessender ehrlicher Zwischenbilanz.' },
      { q: 'Kann Akupunktur eine Knieoperation verhindern?', a: 'Das lässt sich nicht versprechen. Wenn eine Operation medizinisch angezeigt ist, sollte sie nicht wegen Akupunktur verzögert werden.' },
    ],
    related: [
      { href: '/beschwerden/knieschmerzen/', label: 'Knieschmerzen', cat: 'Beschwerde' },
      { href: '/beschwerden/gonarthrose/', label: 'Gonarthrose (Kniearthrose)', cat: 'Beschwerde' },
      { href: '/beschwerden/arthrose/', label: 'Arthrose', cat: 'Beschwerde' },
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
    ],
  },
  {
    slug: 'akupunktur-bei-schulterschmerzen',
    title: 'Akupunktur bei Schulterschmerzen: Nutzen, Grenzen & Ablauf',
    metaDesc: 'Akupunktur bei Schulterschmerzen, Frozen Shoulder oder Impingement: Was die Forschung zeigt, wann sie ergänzen kann und wo ihre Grenzen liegen.',
    region: 'Schweizweit',
    excerpt: 'Akupunktur kann bei Schulterschmerzen ergänzend eingesetzt werden – die wissenschaftliche Evidenz ist jedoch wesentlich weniger eindeutig als bei einigen anderen Schmerzindikationen.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur bei Schulterschmerzen: Was realistisch zu erwarten ist',
    lead: 'Schulterschmerz ist nicht gleich Schulterschmerz. Hinter ähnlichen Beschwerden können beispielsweise eine Frozen Shoulder, Probleme der Rotatorenmanschette, ein Impingement oder andere Ursachen stehen. Akupunktur kann ergänzend eingesetzt werden – die wissenschaftliche Evidenz ist jedoch wesentlich weniger eindeutig als bei einigen anderen Schmerzindikationen.',
    readingTime: '7 Min.',
    ctaTitle: 'Schulterschmerzen besprechen?',
    author: AUTOR,
    reviewerName: 'Corinna Reinhart',
    ...DATEN2,
    bodyHtml: `<h2>Zuerst die Ursache klären</h2>
<p>Vor einer Behandlung sollte klar sein, ob vor allem Schmerzen und muskuläre Spannung im Vordergrund stehen oder ob eine strukturelle Verletzung beziehungsweise eine deutlich eingeschränkte Gelenkfunktion vorliegt.</p>
<p>Akupunktur ersetzt diese Differenzierung nicht.</p>
<h2>Was die Studien zeigen</h2>
<p>Die klassische Cochrane-Auswertung zu Akupunktur bei Schulterschmerzen fand nur wenige und methodisch unterschiedliche Studien. Daraus liess sich kein überzeugender allgemeiner Wirksamkeitsnachweis ableiten.</p>
<p>Einzelne Ergebnisse sprechen für mögliche kurzfristige Verbesserungen von Schmerz oder Funktion. Wegen kleiner Studien und unterschiedlicher Schulterdiagnosen ist die Sicherheit dieser Aussage jedoch begrenzt.</p>
<p>Deshalb formulieren wir bewusst zurückhaltend: Akupunktur kann bei bestimmten Schulterbeschwerden einen ergänzenden Versuch wert sein, ist aber keine nachgewiesene Reparaturbehandlung für Sehnen, Kalkablagerungen oder Gelenkkapseln.</p>
<h2>Frozen Shoulder, Impingement und Kalkschulter</h2>
<p>Bei einer Frozen Shoulder ist die Wiederherstellung der Beweglichkeit zentral. Bei Problemen der Rotatorenmanschette oder einem Impingement spielen Belastungssteuerung und aktive Rehabilitation häufig eine wichtige Rolle.</p>
<p>Akupunktur kann hier auf Schmerz und Muskelspannung ausgerichtet werden. Sie ersetzt jedoch weder gezielte Physiotherapie noch eine notwendige orthopädische Diagnostik.</p>
<p>Eine Kalkablagerung wird durch Akupunktur nicht «aufgelöst».</p>
<h2>Wie wir behandeln</h2>
<p>Wir orientieren uns an Schmerzort, Bewegungsmuster, Beweglichkeit und vorhandenen Befunden. Lokale Punkte können mit distalen Punkten kombiniert werden.</p>
<p>Parallel sollte geprüft werden, welche aktive Belastung sinnvoll ist. Bei Schulterbeschwerden ist eine Kombination mit Bewegung und gegebenenfalls Physiotherapie häufig plausibler als eine rein passive Behandlung.</p>
<h2>Wann Akupunktur nicht die richtige Wahl ist</h2>
<p>Nach einem Unfall mit deutlichem Kraftverlust, bei Verdacht auf Luxation oder Fraktur, plötzlich ausgeprägter Bewegungseinschränkung, neurologischen Ausfällen oder starken nächtlichen beziehungsweise systemischen Beschwerden ist zunächst eine medizinische Abklärung erforderlich.</p>
<h2>Ablauf und Sitzungen</h2>
<p>Nach der Erstbeurteilung wird ein begrenzter Behandlungsversuch vereinbart. Entscheidend sind messbare Veränderungen: Wird der Bewegungsradius grösser? Ist Anziehen oder Schlafen leichter? Nimmt der Belastungsschmerz ab?</p>
<p>Bleibt eine solche Veränderung aus, sollte das Vorgehen neu beurteilt werden.</p>
<h2>Kosten & Krankenkasse</h2>
<p>Bei nichtärztlicher Akupunktur hängt die Rückvergütung in der Schweiz von der persönlichen Zusatzversicherung und der Anerkennung des Therapeuten ab. Bitte prüfen Sie Ihre Deckung direkt bei Ihrer Versicherung.</p>`,
    faqs: [
      { q: 'Hilft Akupunktur bei Frozen Shoulder?', a: 'Sie kann ergänzend zur Symptomlinderung eingesetzt werden. Für die Beweglichkeit bleiben aktive Rehabilitation und medizinische Einordnung wichtig.' },
      { q: 'Hilft Akupunktur bei Kalkschulter?', a: 'Sie kann Schmerzen begleiten, löst die Kalkablagerung aber nicht nachweislich auf.' },
      { q: 'Ersetzt Akupunktur Physiotherapie?', a: 'In der Regel nein. Gerade bei funktionellen Schulterproblemen ist aktive Rehabilitation häufig ein zentraler Bestandteil der Behandlung.' },
      { q: 'Wann sollte ich die Schulter zuerst ärztlich untersuchen lassen?', a: 'Vor allem nach Trauma, bei deutlichem Kraftverlust, massiver Bewegungseinschränkung oder neurologischen Symptomen.' },
    ],
    related: [
      { href: '/beschwerden/schulterschmerzen/', label: 'Schulterschmerzen', cat: 'Beschwerde' },
      { href: '/beschwerden/frozen-shoulder/', label: 'Frozen Shoulder', cat: 'Beschwerde' },
      { href: '/beschwerden/kalkschulter/', label: 'Kalkschulter', cat: 'Beschwerde' },
      { href: '/beschwerden/impingement-syndrom/', label: 'Impingement-Syndrom', cat: 'Beschwerde' },
      { href: '/therapien/tuina/', label: 'Tuina', cat: 'Therapie' },
    ],
  },
  {
    slug: 'akupunktur-bei-wechseljahresbeschwerden',
    title: 'Akupunktur bei Wechseljahresbeschwerden: Studienlage & Ablauf',
    metaDesc: 'Hilft Akupunktur bei Hitzewallungen und Wechseljahresbeschwerden? Was Studien zeigen, wo die Grenzen liegen und wann andere Therapien wichtiger sind.',
    region: 'Schweizweit',
    excerpt: 'Akupunktur wird in den Wechseljahren häufig als nichtmedikamentöse Ergänzung gewählt – die Interpretation der Studien hängt stark davon ab, womit sie verglichen wird.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur bei Wechseljahresbeschwerden: Studienlage & Ablauf',
    lead: 'Hitzewallungen, Nachtschweiss, Schlafprobleme und Stimmungsschwankungen können die Wechseljahre deutlich belastender machen. Akupunktur wird häufig als nichtmedikamentöse Ergänzung gewählt. Studien zeigen interessante Effekte – gleichzeitig hängt die Interpretation stark davon ab, womit Akupunktur verglichen wird.',
    readingTime: '7 Min.',
    ctaTitle: 'Wechseljahresbeschwerden besprechen?',
    author: AUTOR,
    reviewerName: 'Corinna Reinhart',
    ...DATEN2,
    bodyHtml: `<h2>Was Akupunktur in den Wechseljahren leisten soll</h2>
<p>Im Mittelpunkt stehen meist vasomotorische Beschwerden wie Hitzewallungen und Nachtschweiss. Manche Patientinnen suchen zusätzlich Unterstützung bei Schlaf, innerer Unruhe oder allgemeinem Wohlbefinden.</p>
<p>Akupunktur ersetzt dabei keine gynäkologische Abklärung und ist nicht mit einer Hormontherapie gleichzusetzen.</p>
<h2>Was die Studien zeigen</h2>
<p>In der <a href="https://pubmed.ncbi.nlm.nih.gov/27023860/" target="_blank" rel="noopener">pragmatischen AIM-Studie</a> wurden Frauen mit häufigen vasomotorischen Beschwerden entweder früh mit Akupunktur behandelt oder zunächst einer Warteliste zugeteilt. In der Akupunkturgruppe gingen die Beschwerden stärker zurück; ein Teil der Verbesserung blieb nach Ende der Behandlung bestehen.</p>
<p>Das ist ein interessantes Ergebnis – aber nicht die ganze Evidenz.</p>
<p>Eine Cochrane-Auswertung fand gegenüber Scheinakupunktur keinen klaren Unterschied bei Hitzewallungen. Gegenüber keiner Behandlung zeigte sich dagegen ein Vorteil; die zugrunde liegende Evidenz wurde jedoch als niedrig beziehungsweise sehr niedrig bewertet.</p>
<p><strong>Unsere Einordnung:</strong> Akupunktur kann für Frauen, die eine nichtmedikamentöse Ergänzung wünschen, einen Behandlungsversuch wert sein. Man sollte aber nicht behaupten, dass ein spezifischer Akupunktureffekt gegenüber einer glaubwürdigen Scheinbehandlung eindeutig bewiesen ist.</p>
<h2>Ersetzt Akupunktur eine Hormontherapie?</h2>
<p>Nein.</p>
<p>Eine Hormontherapie hat eine andere Wirkweise und kann bei geeigneten Patientinnen sehr wirksam gegen vasomotorische Beschwerden sein. Ob sie infrage kommt, ist eine individuelle medizinische Entscheidung.</p>
<p>Akupunktur kann eine Alternative oder Ergänzung sein, wenn eine Frau sie bevorzugt oder eine Hormontherapie nicht gewünscht beziehungsweise nicht geeignet ist. Sie sollte aber nicht als gleichwertiger hormoneller Ersatz dargestellt werden.</p>
<p>Eine Rezeptur ist eine eigene Behandlungsentscheidung; die passende Forschung ordnet <a href="/wissen/chinesische-kraeuter-bei-wechseljahresbeschwerden/">chinesische Kräuter bei Wechseljahresbeschwerden</a> ein.</p>
<h2>Wie wir behandeln</h2>
<p>Wir erfassen zunächst, welche Beschwerden tatsächlich im Vordergrund stehen: Hitzewallungen, Nachtschweiss, Schlaf, Unruhe oder andere Symptome.</p>
<p>Die TCM-Behandlung wird anschliessend individuell aufgebaut. Gleichzeitig achten wir darauf, neue oder ungewöhnliche Beschwerden nicht automatisch den Wechseljahren zuzuschreiben.</p>
<h2>Wann Akupunktur nicht die richtige Wahl ist</h2>
<p>Ungewöhnliche Blutungen, neue starke Schmerzen, ausgeprägte psychische Beschwerden oder andere nicht eingeordnete Symptome sollten medizinisch beziehungsweise gynäkologisch abgeklärt werden.</p>
<p>Akupunktur darf eine notwendige Diagnostik nicht ersetzen.</p>
<h2>Ablauf und Sitzungen</h2>
<p>Ein sinnvoller Behandlungsversuch sollte anhand konkreter Symptome beurteilt werden. Bei Hitzewallungen können beispielsweise Häufigkeit und Belastung über einige Wochen dokumentiert werden.</p>
<p>So lässt sich besser beurteilen, ob sich tatsächlich etwas verändert.</p>
<h2>Kosten & Krankenkasse</h2>
<p>Nichtärztliche Akupunktur wird je nach Vertrag über Zusatzversicherungen für Komplementärmedizin vergütet. Die konkrete Deckung sollte vor Beginn bei der eigenen Versicherung geprüft werden.</p>`,
    faqs: [
      { q: 'Hilft Akupunktur gegen Hitzewallungen?', a: 'Gegenüber keiner Behandlung zeigen Studien Verbesserungen. Gegenüber Scheinakupunktur ist ein spezifischer Zusatznutzen bislang nicht eindeutig belegt.' },
      { q: 'Kann Akupunktur Hormone ersetzen?', a: 'Nein. Ob eine Hormontherapie sinnvoll ist, sollte individuell medizinisch besprochen werden.' },
      { q: 'Wie schnell kann sich etwas verändern?', a: 'Das ist individuell. Sinnvoller als ein festes Versprechen ist, Häufigkeit und Belastung der Symptome vor und während eines begrenzten Behandlungsversuchs zu dokumentieren.' },
      { q: 'Kann ich Akupunktur zusätzlich zu anderen Behandlungen nutzen?', a: 'Oft ja. Bestehende medizinische Behandlungen sollten jedoch nicht ohne Rücksprache verändert werden.' },
    ],
    related: [
      { href: '/beschwerden/wechseljahre/', label: 'Wechseljahre', cat: 'Beschwerde' },
      { href: '/beschwerden/hitzewallungen/', label: 'Hitzewallungen', cat: 'Beschwerde' },
      { href: '/beschwerden/scheidentrockenheit/', label: 'Scheidentrockenheit', cat: 'Beschwerde' },
      { href: '/wissen/akupunktur-schlafprobleme/', label: 'Akupunktur bei Schlafproblemen', cat: 'Artikel' },
    ],
  },
  {
    slug: 'akupunktur-bei-menstruationsbeschwerden',
    title: 'Akupunktur bei Menstruationsbeschwerden & PMS: ehrliche Einordnung',
    metaDesc: 'Akupunktur bei Regelschmerzen und PMS: Was die Studien wirklich zeigen, wann eine Abklärung wichtig ist und wie eine Behandlung abläuft.',
    region: 'Schweizweit',
    excerpt: 'Die Forschung liefert bei Regelschmerzen Hinweise auf mögliche Verbesserungen – die Qualität der Evidenz reicht aber nicht für starke Wirksamkeitsversprechen.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur bei Menstruationsbeschwerden & PMS: ehrliche Einordnung',
    lead: 'Regelschmerzen können von unangenehm bis stark einschränkend reichen. Akupunktur und Akupressur werden häufig dagegen eingesetzt. Die Forschung liefert Hinweise auf mögliche Verbesserungen – die Qualität der Evidenz reicht aber nicht für starke Wirksamkeitsversprechen.',
    readingTime: '7 Min.',
    ctaTitle: 'Zyklusbeschwerden besprechen?',
    author: AUTOR,
    reviewerName: 'Corinna Reinhart',
    ...DATEN2,
    bodyHtml: `<h2>Primäre Regelschmerzen oder eine Erkrankung?</h2>
<p>Diese Unterscheidung ist wichtig.</p>
<p>Primäre Dysmenorrhoe bezeichnet Regelschmerzen ohne erkennbare organische Ursache. Schmerzen können aber auch beispielsweise bei Endometriose, Adenomyose oder anderen gynäkologischen Erkrankungen auftreten.</p>
<p>Akupunktur sollte nicht dazu führen, starke oder neu auftretende Beschwerden vorschnell als «normale Periode» zu behandeln.</p>
<h2>Was die Studien zeigen</h2>
<p>Die Cochrane-Auswertung von 2016 schloss zahlreiche Studien zu Akupunktur und Akupressur bei primärer Dysmenorrhoe ein.</p>
<p>Das Ergebnis war zurückhaltend: Die vorhandene Evidenz reichte nicht aus, um zuverlässig festzustellen, ob Akupunktur oder Akupressur wirksam sind. Die Qualität der Evidenz wurde überwiegend als niedrig oder sehr niedrig bewertet.</p>
<p>Einzelne Studien zeigten geringere Schmerzen, doch methodische Schwächen, Inkonsistenz und mögliches Publikationsbias begrenzen die Aussagekraft.</p>
<p><strong>Unsere Einordnung:</strong> Es gibt Hinweise auf einen möglichen Nutzen, aber keinen Grund für starke Aussagen wie «Akupunktur ist Schmerzmitteln überlegen».</p>
<h2>Und bei PMS?</h2>
<p>PMS umfasst mehr als Regelschmerzen und kann körperliche sowie emotionale Beschwerden beinhalten.</p>
<p>Hier sollte ebenfalls individuell geklärt werden, welche Symptome behandelt werden sollen. Bei ausgeprägten psychischen Symptomen oder Verdacht auf PMDD ist eine entsprechende medizinische Beurteilung wichtiger als eine rein komplementäre Behandlung.</p>
<h2>Wie wir behandeln</h2>
<p>Wir erfassen Zeitpunkt, Dauer und Charakter der Beschwerden sowie den Zusammenhang mit dem Zyklus.</p>
<p>Die Akupunktur wird individuell geplant. Ziel ist nicht, einen Zyklus «zu korrigieren», sondern Beschwerden möglichst sinnvoll zu begleiten.</p>
<h2>Wann eine gynäkologische Abklärung wichtig ist</h2>
<p>Sehr starke oder neu zunehmende Schmerzen, ungewöhnlich starke Blutungen, Blutungen ausserhalb der Periode, Schmerzen beim Geschlechtsverkehr, unerfüllter Kinderwunsch oder andere auffällige Veränderungen sollten gynäkologisch beurteilt werden.</p>
<h2>Ablauf und Sitzungen</h2>
<p>Bei zyklusabhängigen Beschwerden ist eine Beurteilung über mehr als einen Zeitpunkt oft sinnvoll. Symptome können beispielsweise mit einem einfachen Zyklus- und Beschwerdetagebuch dokumentiert werden.</p>
<p>Eine Behandlung sollte nur fortgeführt werden, wenn sich ein nachvollziehbarer Nutzen zeigt.</p>
<h2>Kosten & Krankenkasse</h2>
<p>Die Kostenübernahme für nichtärztliche Akupunktur hängt in der Schweiz von der persönlichen Zusatzversicherung und der Anerkennung der behandelnden Fachperson ab.</p>`,
    faqs: [
      { q: 'Hilft Akupunktur bei Regelschmerzen?', a: 'Es gibt positive Einzelstudien, insgesamt ist die Evidenz jedoch von niedriger beziehungsweise sehr niedriger Qualität. Ein Nutzen ist möglich, aber nicht sicher belegt.' },
      { q: 'Ist Akupunktur besser als Schmerzmittel?', a: 'Das lässt sich aus der derzeitigen Evidenz nicht seriös ableiten.' },
      { q: 'Kann Akupunktur bei PMS helfen?', a: 'Sie kann als ergänzender Behandlungsversuch erwogen werden. Entscheidend ist, welche Symptome vorliegen und ob andere Ursachen beziehungsweise PMDD abgeklärt werden müssen.' },
      { q: 'Kann ich während der Periode Akupunktur bekommen?', a: 'Grundsätzlich kann eine Behandlung auch während der Menstruation stattfinden. Entscheidend sind Beschwerden, Kreislauf und individuelle Situation.' },
    ],
    related: [
      { href: '/beschwerden/menstruationsbeschwerden/', label: 'Menstruationsbeschwerden', cat: 'Beschwerde' },
      { href: '/beschwerden/pms/', label: 'PMS', cat: 'Beschwerde' },
      { href: '/gesundheitsbibliothek/fragen/akupunktur-waehrend-periode/', label: 'Akupunktur während der Periode', cat: 'Patientenfrage' },
      { href: '/wissen/akupunktur-bei-wechseljahresbeschwerden/', label: 'Akupunktur bei Wechseljahresbeschwerden', cat: 'Artikel' },
      { href: '/wissen/chinesische-kraeuter-bei-regelschmerzen/', label: 'Chinesische Kräuter bei Regelschmerzen', cat: 'Artikel' },
    ],
  },
  {
    slug: 'akupunktur-bei-tennisarm',
    title: 'Akupunktur bei Tennisarm & Golferarm: Was Studien zeigen',
    metaDesc: 'Akupunktur bei Tennisarm und Golferarm: Studienlage, kurzfristige Schmerzlinderung, Belastungsmanagement, Ablauf und Grenzen.',
    region: 'Schweizweit',
    excerpt: 'Akupunktur wird beim Tennisarm häufig ergänzend eingesetzt – mit Hinweisen auf kurzfristige Schmerzlinderung, aber begrenzten Daten zu langfristigen Effekten.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur bei Tennisarm & Golferarm: Was Studien zeigen',
    lead: 'Ein Tennisarm entsteht nicht nur beim Tennis. Wiederholte Belastungen von Unterarm und Hand können Schmerzen am Ellenbogen über Wochen oder Monate aufrechterhalten. Akupunktur wird häufig ergänzend eingesetzt – mit Hinweisen auf kurzfristige Schmerzlinderung, aber begrenzten Daten zu langfristigen Effekten.',
    readingTime: '7 Min.',
    ctaTitle: 'Ellenbogen besprechen?',
    author: AUTOR,
    reviewerName: 'Corinna Reinhart',
    ...DATEN2,
    bodyHtml: `<h2>Was hinter den Beschwerden steckt</h2>
<p>Beim klassischen Tennisarm liegt der Schmerz an der Aussenseite des Ellenbogens, beim sogenannten Golferarm eher an der Innenseite.</p>
<p>Belastungssteuerung bleibt zentral. Akupunktur verändert nicht automatisch die Ursache einer wiederholten Überlastung.</p>
<h2>Was die Studien zeigen</h2>
<p>Eine <a href="https://pubmed.ncbi.nlm.nih.gov/24726029/" target="_blank" rel="noopener">systematische Übersichtsarbeit randomisierter Studien</a> fand Hinweise darauf, dass Akupunktur bei lateralem Ellenbogenschmerz kurzfristig besser abschneiden kann als Scheinakupunktur.</p>
<p>Die Aussage muss jedoch begrenzt werden: Viele eingeschlossene Studien hatten methodische Schwächen, und Aussagen über längerfristige Ergebnisse sind wesentlich unsicherer.</p>
<p>Deshalb verstehen wir Akupunktur hier vor allem als mögliche Ergänzung zur Schmerzlinderung – nicht als Ersatz für Belastungsanpassung und aktive Rehabilitation.</p>
<h2>Wie wir behandeln</h2>
<p>Beurteilt werden Schmerzort, auslösende Bewegungen, Muskelspannung und Belastungen im Alltag oder Beruf.</p>
<p>Je nach Befund können lokale und distale Akupunkturpunkte kombiniert werden. Entscheidend ist parallel die Frage, welche wiederholte Belastung den Ellenbogen weiterhin reizt.</p>
<h2>Akupunktur oder Dry Needling?</h2>
<p>Die Verfahren überschneiden sich teilweise in der praktischen Anwendung, beruhen aber auf unterschiedlichen Konzepten.</p>
<p>Dry Needling richtet sich typischerweise gezielt auf myofasziale Triggerpunkte. Akupunktur verwendet ein breiteres Punkt- und Behandlungskonzept.</p>
<p>Welche Methode sinnvoller ist, hängt vom Befund ab.</p>
<h2>Wann Akupunktur nicht ausreicht</h2>
<p>Nach Trauma, bei deutlichem Kraftverlust, ausgeprägter Schwellung, neurologischen Symptomen oder länger anhaltenden Beschwerden ohne klare Diagnose sollte medizinisch abgeklärt werden.</p>
<h2>Ablauf und Sitzungen</h2>
<p>Wir definieren vorab konkrete Kriterien: Schmerz beim Greifen, Belastbarkeit im Beruf oder Sport und Druckempfindlichkeit.</p>
<p>Nach einem begrenzten Behandlungsabschnitt wird entschieden, ob eine relevante Verbesserung vorliegt.</p>
<h2>Kosten & Krankenkasse</h2>
<p>Bei nichtärztlicher Akupunktur hängt eine Rückvergütung von der individuellen Zusatzversicherung und der Anerkennung des Therapeuten ab.</p>`,
    faqs: [
      { q: 'Hilft Akupunktur beim Tennisarm?', a: 'Studien geben Hinweise auf kurzfristige Schmerzlinderung. Die langfristige Evidenz ist weniger sicher.' },
      { q: 'Funktioniert sie auch beim Golferarm?', a: 'Die Beschwerden sind verwandt, die Studienlage für den klassischen Tennisarm ist jedoch besser.' },
      { q: 'Muss ich die Belastung trotzdem verändern?', a: 'Ja. Wiederholte Überlastung sollte identifiziert und angepasst werden.' },
      { q: 'Was ist der Unterschied zu Dry Needling?', a: 'Dry Needling arbeitet gezielt mit myofaszialen Triggerpunkten; Akupunktur folgt einem breiteren therapeutischen Konzept.' },
    ],
    related: [
      { href: '/beschwerden/tennisarm/', label: 'Tennisarm & Golferarm', cat: 'Beschwerde' },
      { href: '/beschwerden/sehnenscheidenentzuendung/', label: 'Sehnenscheidenentzündung', cat: 'Beschwerde' },
      { href: '/wissen/dry-needling-vs-akupunktur/', label: 'Dry Needling vs. Akupunktur', cat: 'Artikel' },
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
    ],
  },
  {
    slug: 'akupunktur-bei-fersensporn',
    title: 'Akupunktur bei Fersensporn & Plantarfasziitis',
    metaDesc: 'Kann Akupunktur bei Fersensporn und Plantarfasziitis helfen? Evidenz, Grenzen, Belastungsmanagement und Ablauf verständlich erklärt.',
    region: 'Schweizweit',
    excerpt: 'Akupunktur kann beim plantaren Fersenschmerz ergänzend zur Schmerzlinderung eingesetzt werden – sie entfernt jedoch keinen knöchernen Fersensporn.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur bei Fersensporn & Plantarfasziitis',
    lead: 'Der typische stechende Fersenschmerz beim ersten Auftreten am Morgen kann hartnäckig sein. Häufig steht nicht der sichtbare «Sporn» selbst, sondern die gereizte Plantarfaszie im Mittelpunkt. Akupunktur kann ergänzend zur Schmerzlinderung eingesetzt werden – sie entfernt jedoch keinen knöchernen Fersensporn.',
    readingTime: '7 Min.',
    ctaTitle: 'Fersenschmerz besprechen?',
    author: AUTOR,
    reviewerName: 'Corinna Reinhart',
    ...DATEN2,
    bodyHtml: `<h2>Fersensporn und Plantarfasziitis sind nicht dasselbe</h2>
<p>Ein Fersensporn kann im Röntgen sichtbar sein, ohne Beschwerden zu verursachen. Bei typischem plantarem Fersenschmerz spielt häufig die Plantarfaszie eine entscheidende Rolle.</p>
<p>Das Behandlungsziel sollte deshalb nicht lauten, einen Sporn «aufzulösen».</p>
<h2>Was die Studien zeigen</h2>
<p>Systematische Übersichten beschreiben positive Signale für Akupunktur bei plantarem Fersenschmerz. Die Zahl und Qualität der Studien ist jedoch begrenzt, und unterschiedliche Akupunkturverfahren erschweren eindeutige Aussagen.</p>
<p>Die Forschung erlaubt daher eher die Aussage, dass Akupunktur kurzfristig zur Schmerzlinderung beitragen <strong>kann</strong>, als die Behauptung einer gesicherten dauerhaften Wirkung.</p>
<h2>Was zusätzlich wichtig ist</h2>
<p>Belastungssteuerung, geeignetes Schuhwerk, Dehnung und gegebenenfalls physiotherapeutische Massnahmen können je nach Befund wichtige Bestandteile sein. Schmerzt eher die Sehne oberhalb der Ferse, gilt eine eigene Studienlage, siehe <a href="/wissen/akupunktur-bei-achillessehnenbeschwerden/">Akupunktur bei Achillessehnenbeschwerden</a>.</p>
<p>Akupunktur sollte diese Faktoren ergänzen und nicht ersetzen.</p>
<h2>Wie wir behandeln</h2>
<p>Wir prüfen, wann der Schmerz auftritt, wo er lokalisiert ist und welche Belastungen ihn verstärken.</p>
<p>Die Behandlung kann lokale und distale Akupunkturpunkte umfassen. Bei ausgeprägter muskulärer Beteiligung kann zusätzlich geprüft werden, ob andere manuelle oder myofasziale Verfahren sinnvoll sind.</p>
<h2>Wann eine Abklärung wichtig ist</h2>
<p>Bei Trauma, ausgeprägter Schwellung, neurologischen Symptomen, Ruheschmerz oder untypischem Verlauf sollte die Ursache medizinisch geklärt werden.</p>
<h2>Ablauf und Sitzungen</h2>
<p>Der Verlauf lässt sich relativ gut anhand von Alltagssituationen beobachten: Schmerz bei den ersten Schritten am Morgen, Gehstrecke und Belastbarkeit.</p>
<p>Wenn diese Parameter trotz eines begrenzten Behandlungsversuchs unverändert bleiben, sollte das Konzept überprüft werden.</p>
<h2>Kosten & Krankenkasse</h2>
<p>Ob nichtärztliche Akupunktur vergütet wird, richtet sich nach der jeweiligen Schweizer Zusatzversicherung und der Anerkennung der behandelnden Person.</p>`,
    faqs: [
      { q: 'Hilft Akupunktur bei Fersensporn?', a: 'Sie kann möglicherweise Schmerzen lindern. Den knöchernen Sporn selbst löst sie nicht auf.' },
      { q: 'Hilft sie auch bei Plantarfasziitis?', a: 'Dafür gibt es positive Hinweise, die Evidenz ist aber begrenzt.' },
      { q: 'Brauche ich trotzdem Dehnübungen?', a: 'Je nach Befund sind Dehnung, Belastungsanpassung und andere aktive Massnahmen weiterhin sinnvoll.' },
      { q: 'Wie merke ich, ob die Behandlung funktioniert?', a: 'Vor allem an weniger Anlaufschmerz und besserer Geh- und Belastungsfähigkeit.' },
    ],
    related: [
      { href: '/beschwerden/fersensporn/', label: 'Fersensporn', cat: 'Beschwerde' },
      { href: '/beschwerden/plantarfasziitis/', label: 'Plantarfasziitis', cat: 'Beschwerde' },
      { href: '/beschwerden/achillessehnenentzuendung/', label: 'Achillessehnenentzündung', cat: 'Beschwerde' },
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
    ],
  },
  {
    slug: 'akupunktur-bei-kieferschmerzen',
    title: 'Akupunktur bei Kieferschmerzen & CMD',
    metaDesc: 'Akupunktur bei CMD, Kieferschmerzen und muskulärer Spannung: Studienlage, Zusammenspiel mit Zahnmedizin und Physiotherapie, Ablauf und Grenzen.',
    region: 'Schweizweit',
    excerpt: 'Bei vorwiegend muskulären CMD-Beschwerden kann Akupunktur ergänzend interessant sein – die wissenschaftliche Evidenz ist positiv, aber noch begrenzt.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur bei Kieferschmerzen & CMD',
    lead: 'Kieferschmerzen können vom Kiefergelenk, der Kaumuskulatur, Zähneknirschen oder mehreren Faktoren gleichzeitig ausgehen. Bei vorwiegend muskulären CMD-Beschwerden kann Akupunktur ergänzend interessant sein. Die wissenschaftliche Evidenz ist positiv, aber noch begrenzt.',
    readingTime: '7 Min.',
    ctaTitle: 'Kieferschmerzen besprechen?',
    author: AUTOR,
    reviewerName: 'Corinna Reinhart',
    ...DATEN2,
    bodyHtml: `<h2>CMD ist ein Sammelbegriff</h2>
<p>Craniomandibuläre Dysfunktionen umfassen unterschiedliche Probleme im Bereich von Kiefergelenk und Kaumuskulatur.</p>
<p>Deshalb ist vor einer Behandlung wichtig zu unterscheiden, ob beispielsweise muskuläre Spannung, Gelenkprobleme, Zähneknirschen oder eine zahnmedizinische Ursache im Vordergrund stehen.</p>
<h2>Was die Studien zeigen</h2>
<p>Eine <a href="https://pubmed.ncbi.nlm.nih.gov/38308258/" target="_blank" rel="noopener">aktuelle systematische Übersichtsarbeit randomisierter Studien</a> fand Hinweise auf kurzfristige Verbesserungen von Schmerzen bei temporomandibulären Beschwerden, insbesondere bei muskulär geprägten Formen.</p>
<p>Die Autoren bewerteten die Gesamtevidenz dennoch als begrenzt und forderten bessere Studien.</p>
<p>Das passt zu einer vorsichtigen klinischen Einordnung: Akupunktur kann bei myofaszialen Kieferschmerzen eine ergänzende Option sein, ist aber keine universelle CMD-Behandlung.</p>
<h2>Ersetzt Akupunktur eine Zahnschiene?</h2>
<p>Nein.</p>
<p>Wenn eine Schiene zahnmedizinisch sinnvoll ist, sollte Akupunktur sie nicht ersetzen. Ebenso können Physiotherapie, Übungen und der Umgang mit Pressen oder Knirschen wichtige Bestandteile sein.</p>
<h2>Wie wir behandeln</h2>
<p>Wir betrachten Schmerzort, Kaumuskulatur, Beweglichkeit des Kiefers und begleitende Verspannungen.</p>
<p>Die Akupunktur kann lokal im Gesichts- und Kieferbereich sowie über distale Punkte erfolgen.</p>
<h2>Wann Akupunktur nicht die richtige erste Behandlung ist</h2>
<p>Zahnschmerzen, Schwellungen, Verdacht auf Infektion, Trauma, plötzlich blockierter Kiefer oder andere unklare strukturelle Probleme gehören zuerst zahnmedizinisch beziehungsweise ärztlich beurteilt.</p>
<h2>Ablauf und Sitzungen</h2>
<p>Wir beurteilen unter anderem Schmerz beim Kauen, morgendliche Beschwerden, Mundöffnung und Muskelspannung.</p>
<p>Die Behandlung wird nur fortgesetzt, wenn sich diese Parameter nachvollziehbar verbessern.</p>
<h2>Kosten & Krankenkasse</h2>
<p>Bei nichtärztlichen Therapeuten richtet sich die Kostenbeteiligung nach der persönlichen Zusatzversicherung und deren Anerkennungsbedingungen.</p>`,
    faqs: [
      { q: 'Hilft Akupunktur bei CMD?', a: 'Bei insbesondere muskulären CMD-Schmerzen gibt es Hinweise auf kurzfristige Verbesserungen. Die Gesamtevidenz ist jedoch noch begrenzt.' },
      { q: 'Kann Akupunktur Zähneknirschen stoppen?', a: 'Das lässt sich nicht versprechen. Sie kann auf begleitende Muskelspannung ausgerichtet werden; Ursachen und Auslöser des Bruxismus sollten separat betrachtet werden.' },
      { q: 'Ersetzt Akupunktur eine Zahnschiene?', a: 'Nein. Eine medizinisch oder zahnmedizinisch indizierte Schiene sollte nicht ohne Rücksprache weggelassen werden.' },
      { q: 'Kann Akupunktur mit Physiotherapie kombiniert werden?', a: 'Ja. Gerade bei muskulären Beschwerden kann eine kombinierte Strategie sinnvoll sein.' },
    ],
    related: [
      { href: '/beschwerden/kieferschmerzen/', label: 'Kieferschmerzen & CMD', cat: 'Beschwerde' },
      { href: '/beschwerden/zaehneknirschen/', label: 'Zähneknirschen (Bruxismus)', cat: 'Beschwerde' },
      { href: '/koerpersignale/kiefer-knackt-beim-oeffnen/', label: 'Kiefer knackt beim Öffnen', cat: 'Körpersignal' },
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
    ],
  },
  {
    slug: 'akupunktur-bei-reizdarm',
    title: 'Akupunktur bei Reizdarm: Was sie kann – und was nicht',
    metaDesc: 'Hilft Akupunktur bei Reizdarm? Warum Studien gegenüber Scheinakupunktur keinen klaren Vorteil zeigen und wann ein Behandlungsversuch trotzdem infrage kommt.',
    region: 'Schweizweit',
    excerpt: 'Gerade beim Reizdarm ist eine ehrliche Einordnung wichtig: In hochwertigen Vergleichen mit Scheinakupunktur zeigt sich bislang kein klarer spezifischer Vorteil.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur bei Reizdarm: Was sie kann – und was nicht',
    lead: 'Bauchschmerzen, Blähungen und wechselnder Stuhlgang können beim Reizdarmsyndrom den Alltag stark beeinflussen. Akupunktur wird häufig als ergänzende Behandlung angeboten. Gerade hier ist eine ehrliche Einordnung wichtig: In hochwertigen Vergleichen mit Scheinakupunktur zeigt sich bislang kein klarer spezifischer Vorteil.',
    readingTime: '7 Min.',
    ctaTitle: 'Reizdarm besprechen?',
    author: AUTOR,
    reviewerName: 'Corinna Reinhart',
    ...DATEN2,
    bodyHtml: `<h2>Zuerst muss Reizdarm als Diagnose passen</h2>
<p>Reizdarm ist eine funktionelle Erkrankung. Bevor Beschwerden so eingeordnet werden, müssen je nach Situation andere Ursachen berücksichtigt werden.</p>
<p>Akupunktur ersetzt diese Abklärung nicht.</p>
<h2>Was die Studien zeigen</h2>
<p>Die Cochrane-Auswertung zu Akupunktur bei Reizdarm fand einen entscheidenden Unterschied zwischen verschiedenen Vergleichsgruppen.</p>
<p>Gegenüber keiner spezifischen Behandlung beziehungsweise in manchen pragmatischen Vergleichen berichteten Patientinnen und Patienten häufiger Verbesserungen.</p>
<p>In Studien mit glaubwürdiger Scheinakupunktur zeigte sich jedoch <strong>kein klarer Vorteil der echten Akupunktur</strong> bei Symptomschwere oder reizdarmbezogener Lebensqualität.</p>
<p>Das ist für uns eine wichtige Grenze.</p>
<h2>Warum kann jemand trotzdem einen Versuch machen?</h2>
<p>Eine Behandlung besteht nicht nur aus der Frage, ob ein einzelner Punkt einen spezifischen Effekt besitzt. Manche Menschen erleben Entspannung, eine veränderte Wahrnehmung von Bauchbeschwerden oder eine subjektive Verbesserung im Rahmen einer strukturierten Behandlung.</p>
<p>Das kann individuell relevant sein. Wissenschaftlich sollte dieser Gesamteffekt aber nicht mit einem eindeutig nachgewiesenen spezifischen Akupunktureffekt gleichgesetzt werden.</p>
<h2>Wie wir behandeln</h2>
<p>Wir erfassen das Beschwerdemuster, Stuhlverhalten, Bauchschmerzen, Blähungen und mögliche Zusammenhänge mit Stress oder Ernährung.</p>
<p>Akupunktur wird ergänzend eingesetzt. Ernährungstherapie, ärztliche Behandlung oder andere sinnvolle Massnahmen werden dadurch nicht ersetzt.</p>
<h2>Wann Akupunktur nicht die richtige Wahl ist</h2>
<p>Blut im Stuhl, unbeabsichtigter Gewichtsverlust, Fieber, nächtlich neu auftretende Beschwerden, Anämie oder andere Warnzeichen gehören medizinisch abgeklärt.</p>
<p>Auch neu auftretende deutliche Darmbeschwerden sollten nicht automatisch als Reizdarm behandelt werden.</p>
<h2>Ablauf und Sitzungen</h2>
<p>Ein Behandlungsversuch sollte anhand konkreter Beschwerden beurteilt werden: Schmerz, Blähungen, Stuhldrang und Einschränkungen im Alltag.</p>
<p>Bleibt eine relevante Veränderung aus, sollte die Behandlung nicht routinemässig fortgesetzt werden.</p>
<p>Die Daten zu <a href="/wissen/akupunktur-bei-verstopfung/">Akupunktur bei chronischer funktioneller Verstopfung</a> betreffen ein anderes Beschwerdebild und dürfen nicht einfach auf Reizdarm übertragen werden.</p>
<h2>Kosten & Krankenkasse</h2>
<p>Nichtärztliche Akupunktur fällt in der Schweiz grundsätzlich in den Bereich der Zusatzversicherung. Die konkrete Vergütung hängt vom individuellen Vertrag und der Anerkennung der Fachperson ab.</p>`,
    faqs: [
      { q: 'Hilft Akupunktur bei Reizdarm?', a: 'Gegenüber glaubwürdiger Scheinakupunktur zeigen kontrollierte Studien keinen klaren spezifischen Vorteil.' },
      { q: 'Warum berichten manche Menschen trotzdem von einer Verbesserung?', a: 'Gesamteffekte einer Behandlung können unter anderem Kontext, Erwartung, Betreuung und unspezifische Effekte umfassen. Eine individuelle Verbesserung ist möglich, beweist aber keinen spezifischen Akupunktureffekt.' },
      { q: 'Soll ich deshalb von Akupunktur abraten?', a: 'Nicht zwingend. Als ergänzender, zeitlich begrenzter Versuch kann sie vertretbar sein, solange Erwartungen realistisch sind und notwendige Diagnostik beziehungsweise Behandlung nicht ersetzt wird.' },
      { q: 'Wann sollte ich Darmbeschwerden ärztlich abklären lassen?', a: 'Insbesondere bei Blut im Stuhl, Gewichtsverlust, Fieber, Anämie, nächtlichen Beschwerden oder deutlicher Veränderung des bisherigen Musters.' },
    ],
    related: [
      { href: '/beschwerden/reizdarm/', label: 'Reizdarm', cat: 'Beschwerde' },
      { href: '/beschwerden/verdauungsprobleme/', label: 'Verdauungsprobleme', cat: 'Beschwerde' },
      { href: '/beschwerden/funktionelle-dyspepsie/', label: 'Funktionelle Dyspepsie (Reizmagen)', cat: 'Beschwerde' },
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
      { href: '/wissen/chinesische-kraeuter-bei-reizdarm/', label: 'Chinesische Kräuter bei Reizdarm', cat: 'Artikel' },
      { href: '/wissen/chinesische-kraeuter-bei-funktioneller-dyspepsie/', label: 'Chinesische Kräuter bei Reizmagen', cat: 'Artikel' },
    ],
  },
  {
    slug: 'akupunktur-bei-karpaltunnelsyndrom',
    title: 'Akupunktur beim Karpaltunnelsyndrom: Evidenz & Grenzen',
    metaDesc: 'Akupunktur bei Karpaltunnelsyndrom: Was Studien zeigen, warum die Gesamtevidenz unsicher bleibt und wann Schiene, Diagnostik oder Operation wichtiger sind.',
    region: 'Schweizweit',
    excerpt: 'Einzelne Studien zum Karpaltunnelsyndrom sind interessant – insgesamt reicht die Evidenz jedoch nicht aus, um Akupunktur etablierten Behandlungen gleichzustellen.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur beim Karpaltunnelsyndrom: Evidenz & Grenzen',
    lead: 'Kribbeln, Taubheit und nächtlich einschlafende Hände sind typische Beschwerden eines Karpaltunnelsyndroms. Akupunktur wurde als konservative Behandlung untersucht. Einzelne Studien sind interessant – insgesamt reicht die Evidenz jedoch nicht aus, um sie etablierten Behandlungen gleichzustellen.',
    readingTime: '7 Min.',
    ctaTitle: 'Hand-Beschwerden besprechen?',
    author: AUTOR,
    reviewerName: 'Corinna Reinhart',
    ...DATEN2,
    bodyHtml: `<h2>Was beim Karpaltunnelsyndrom passiert</h2>
<p>Der Medianusnerv wird im Bereich des Handgelenks eingeengt.</p>
<p>Bei milden und moderaten Beschwerden kommen konservative Behandlungen infrage. Bei ausgeprägten neurologischen Ausfällen oder fortschreitender Nervenschädigung verändert sich die Situation deutlich.</p>
<h2>Was die Studien zeigen</h2>
<p>Eine <a href="https://pubmed.ncbi.nlm.nih.gov/28334999/" target="_blank" rel="noopener">randomisierte Studie von Maeda und Kollegen</a> untersuchte echte und Schein-Elektroakupunktur und erfasste neben Symptomen auch Nervenleitungs- und Bildgebungsparameter.</p>
<p>Alle Gruppen berichteten weniger Symptome; bei echter Akupunktur zeigten sich zusätzlich Veränderungen bestimmter neurophysiologischer Messwerte.</p>
<p>Das ist wissenschaftlich interessant, reicht allein aber nicht für eine starke klinische Empfehlung.</p>
<p>Die Cochrane-Auswertung mehrerer Studien kam zu dem Schluss, dass die Evidenz insgesamt von niedriger beziehungsweise sehr niedriger Sicherheit ist. Gegenüber Scheinbehandlung lässt sich ein relevanter Vorteil nicht zuverlässig feststellen.</p>
<h2>Das konservative Fenster</h2>
<p>Bei milden oder moderaten Beschwerden kann Akupunktur als ergänzender konservativer Versuch diskutiert werden.</p>
<p>Sie sollte aber nicht isoliert betrachtet werden. Eine Nachtschiene und andere etablierte konservative Massnahmen können je nach Befund wichtig sein.</p>
<h2>Wann eine Operation nicht verzögert werden sollte</h2>
<p>Bei zunehmender Taubheit, Muskelschwäche, Muskelabbau am Daumenballen oder objektiv deutlicher Nervenschädigung ist eine fachärztliche Beurteilung wichtig. Schmerzt dagegen die Daumenseite des Handgelenks ohne Kribbeln, passt das eher zu einer Sehnenscheidenentzündung; die Studien dazu ordnet der Artikel <a href="/wissen/akupunktur-bei-sehnenscheidenentzuendung/">Akupunktur bei Sehnenscheidenentzündung</a> ein.</p>
<p>Akupunktur darf eine medizinisch notwendige operative Entlastung nicht verzögern.</p>
<h2>Wie wir behandeln</h2>
<p>Vor Beginn interessiert uns, ob die Diagnose gesichert ist, wie stark Sensibilitätsstörungen ausgeprägt sind und ob bereits neurologische Untersuchungen oder Nervenleitmessungen vorliegen.</p>
<p>Die Akupunktur wird nur innerhalb eines medizinisch vertretbaren konservativen Behandlungsfensters eingesetzt.</p>
<h2>Ablauf und Sitzungen</h2>
<p>Wir beobachten konkrete Parameter: nächtliches Aufwachen, Taubheit, Kribbeln und Handfunktion.</p>
<p>Bei Verschlechterung oder fehlendem Nutzen wird nicht einfach weiterbehandelt, sondern das Vorgehen neu beurteilt.</p>
<h2>Kosten & Krankenkasse</h2>
<p>Die Rückvergütung nichtärztlicher Akupunktur hängt von der individuellen Zusatzversicherung und der Anerkennung des Leistungserbringers ab.</p>`,
    faqs: [
      { q: 'Hilft Akupunktur beim Karpaltunnelsyndrom?', a: 'Einzelne Studien zeigen interessante Ergebnisse. Insgesamt ist die wissenschaftliche Sicherheit jedoch niedrig.' },
      { q: 'Kann Akupunktur eine Operation ersetzen?', a: 'Das lässt sich nicht behaupten. Bei deutlicher Nervenschädigung darf eine notwendige Operation nicht verzögert werden.' },
      { q: 'Sollte ich weiterhin eine Nachtschiene tragen?', a: 'Wenn sie medizinisch empfohlen wurde, sollte sie nicht ohne Rücksprache abgesetzt werden.' },
      { q: 'Wann muss ich rasch abklären lassen?', a: 'Bei zunehmender Schwäche, anhaltender Taubheit oder sichtbarem Muskelabbau sollte zeitnah fachärztlich beurteilt werden.' },
    ],
    related: [
      { href: '/beschwerden/karpaltunnelsyndrom/', label: 'Karpaltunnelsyndrom', cat: 'Beschwerde' },
      { href: '/koerpersignale/finger-schlafen-ein/', label: 'Finger schlafen ein', cat: 'Körpersignal' },
      { href: '/gesundheitsbibliothek/untersuchungen/nervenleitmessung/', label: 'Nervenleitmessung (NLG)', cat: 'Untersuchung' },
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
    ],
  },
  {
    slug: 'akupunktur-bei-uebelkeit',
    title: 'Akupunktur & Akupressur gegen Übelkeit: Der Punkt P6',
    metaDesc: 'Akupunktur und Akupressur bei Übelkeit: Was über P6 bei Übelkeit nach Operationen und anderen Situationen bekannt ist – mit Grenzen und Selbsthilfe.',
    region: 'Schweizweit',
    excerpt: 'Einer der bekanntesten Akupunkturpunkte gegen Übelkeit ist Perikard 6 (P6) am Unterarm – für postoperative Übelkeit wurde seine Stimulation vergleichsweise intensiv untersucht.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur & Akupressur gegen Übelkeit: Der Punkt P6',
    lead: 'Übelkeit hat viele Ursachen – von Infekten und Medikamenten bis zu Operationen oder Chemotherapie. Einer der bekanntesten Akupunkturpunkte in diesem Zusammenhang ist Perikard 6 (P6/Neiguan) am Unterarm. Gerade für postoperative Übelkeit wurde seine Stimulation vergleichsweise intensiv untersucht.',
    readingTime: '7 Min.',
    ctaTitle: 'Übelkeit besprechen?',
    author: AUTOR,
    reviewerName: 'Corinna Reinhart',
    ...DATEN2,
    bodyHtml: `<h2>P6: ein ungewöhnlich gut untersuchter Akupunkturpunkt</h2>
<p>P6 liegt am inneren Unterarm oberhalb des Handgelenks. In Studien wurde der Punkt mit Nadeln, Elektroakupunktur oder Akupressur stimuliert.</p>
<p>Die beste Evidenz betrifft nicht jede Form von Übelkeit, sondern bestimmte Situationen – insbesondere Übelkeit und Erbrechen nach Operationen.</p>
<p>Ob und wann nach einem Eingriff ein Termin infrage kommt, ist eine andere Frage, siehe <a href="/gesundheitsbibliothek/fragen/akupunktur-nach-operation/">Akupunktur nach einer Operation</a>.</p>
<h2>Was die Studien zeigen</h2>
<p><a href="https://pubmed.ncbi.nlm.nih.gov/26522652/" target="_blank" rel="noopener">Cochrane-Auswertungen randomisierter Studien</a> fanden Hinweise darauf, dass die Stimulation von P6 postoperative Übelkeit und Erbrechen gegenüber Scheinbehandlung reduzieren kann.</p>
<p>Auch Vergleiche mit Medikamenten zur Vorbeugung postoperativer Übelkeit wurden untersucht. Das bedeutet jedoch nicht, dass Akupressur oder Akupunktur notwendige Antiemetika pauschal ersetzen sollten.</p>
<p>Auch im Rahmen einer Chemotherapie <a href="https://pubmed.ncbi.nlm.nih.gov/16625560/" target="_blank" rel="noopener">wurde Akupunktur beziehungsweise Elektroakupunktur untersucht</a>. Hier gehört jede ergänzende Behandlung in das onkologische Gesamtkonzept.</p>
<h2>Akupunktur oder Akupressur?</h2>
<p>P6 lässt sich nicht nur mit einer Nadel stimulieren. Akupressur verwendet Druck auf denselben Bereich, beispielsweise manuell oder über entsprechende Bänder.</p>
<p>Das macht P6 interessant, weil bestimmte Formen der Stimulation auch ohne Nadeln möglich sind.</p>
<h2>Übelkeit ist ein Symptom, keine Diagnose</h2>
<p>Entscheidend bleibt die Ursache.</p>
<p>Neu auftretende oder starke Übelkeit, anhaltendes Erbrechen, Austrocknung, starke Bauchschmerzen, Blut im Erbrochenen, neurologische Symptome oder andere Warnzeichen benötigen medizinische Abklärung.</p>
<h2>Schwangerschaft</h2>
<p>Übelkeit in der Schwangerschaft ist ein eigener klinischer Kontext.</p>
<p>Diese Seite soll nicht die Behandlung von Schwangerschaftsbeschwerden übernehmen. Dafür gelten eigene medizinische Überlegungen und eine separate Einordnung.</p>
<h2>Wie wir behandeln</h2>
<p>Bei einer Behandlung klären wir zuerst Anlass und Ursache der Übelkeit. P6 kann Bestandteil der Akupunktur sein; je nach Situation werden weitere Punkte individuell ergänzt.</p>
<p>Bei postoperativer oder therapiebedingter Übelkeit erfolgt Akupunktur nur ergänzend zur medizinischen Versorgung.</p>
<p>Die Frage nach Nutzen bei Übelkeit ersetzt nicht die gesonderte Prüfung der <a href="/gesundheitsbibliothek/fragen/akupunktur-waehrend-chemotherapie/">Sicherheit während einer Chemotherapie</a>.</p>
<h2>Kosten & Krankenkasse</h2>
<p>Für nichtärztliche Akupunktur hängt die Vergütung von der persönlichen Zusatzversicherung und der Anerkennung des Therapeuten ab. Akupressur-Selbsthilfe ist davon natürlich unabhängig.</p>`,
    faqs: [
      { q: 'Hilft P6 wirklich gegen Übelkeit?', a: 'Für postoperative Übelkeit und Erbrechen gibt es vergleichsweise gute Forschung, die einen Nutzen der P6-Stimulation unterstützt.' },
      { q: 'Muss P6 mit einer Nadel behandelt werden?', a: 'Nein. Der Punkt wurde auch mit Akupressur und anderen Stimulationsformen untersucht.' },
      { q: 'Kann ich ein Akupressurband verwenden?', a: 'Solche Bänder zielen meist auf P6. Sie können eine einfache Form der Selbstanwendung darstellen, ersetzen aber bei starker oder ungeklärter Übelkeit keine medizinische Abklärung.' },
      { q: 'Hilft Akupunktur bei Übelkeit während einer Chemotherapie?', a: 'Akupunktur und Elektroakupunktur wurden in diesem Kontext untersucht. Sie sollten nur ergänzend zur onkologischen Behandlung eingesetzt werden und verordnete Antiemetika nicht eigenständig ersetzen.' },
      { q: 'Und bei Schwangerschaftsübelkeit?', a: 'Das ist ein eigener Behandlungskontext. Schwangerschaftsspezifische Beschwerden sollten entsprechend eingeordnet und betreut werden.' },
    ],
    related: [
      { href: '/beschwerden/uebelkeit/', label: 'Übelkeit', cat: 'Beschwerde' },
      { href: '/therapien/akupunktur/schwangerschaft/', label: 'Akupunktur in der Schwangerschaft', cat: 'Therapie' },
      { href: '/therapien/akupressur/', label: 'Akupressur', cat: 'Therapie' },
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
    ],
  },

  // ══════════════════════════════════════════════════════════ COHORT 02 (13.10.2026)
  // Sechs weitere Treatment-Decision-Artikel. Auswahl: Beschwerdeseiten mit laufender
  // Nachfrage nach "akupunktur <beschwerde>" (Semrush CH 10/2026: je 10–30/Monat, KD 0)
  // und ohne bestehenden Wissen-Owner. Jede Studienangabe wurde am 13.10.2026 gegen die
  // Primärquelle (PubMed/PMC bzw. Cochrane Library) geprüft; keine Heilversprechen.
  // ────────────────────────────────────────────────────────── ISCHIAS
  {
    slug: 'akupunktur-bei-ischias',
    title: 'Akupunktur bei Ischias: Studienlage, Grenzen & Ablauf',
    metaDesc: 'Akupunktur bei Ischiasschmerzen: Was zwei Meta-Analysen zeigen, warum die Evidenz trotz vieler Studien unsicher bleibt und bei welchen Warnzeichen du sofort ärztlich abklären musst.',
    region: 'Schweizweit',
    excerpt: 'Viele Studien, wenig Sicherheit: Akupunktur kann bei Ischias ein ergänzender Baustein sein, ersetzt aber weder Abklärung noch Bewegung.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur bei Ischias: Studienlage, Grenzen & Ablauf',
    lead: 'Ein ziehender Schmerz vom Gesäss bis ins Bein, oft mit Kribbeln oder Taubheit: Ischias ist ein Nervenschmerz, kein Rückenschmerz im engeren Sinn. Hier steht, was die Studien zu Akupunktur hergeben, wo ihre Grenzen liegen und wann du nicht zu uns, sondern zuerst in die Notaufnahme gehörst.',
    readingTime: '8 Min.',
    ctaTitle: 'Ischiasschmerzen einordnen lassen?',
    author: AUTOR,
    reviewerName: 'Corinna Reinhart',
    ...DATEN3,
    bodyHtml: `<h2>Erst die Einordnung: Ischias ist ein Nervenschmerz</h2>
<p>Der Ischiasnerv verlässt die Lendenwirbelsäule aus mehreren Nervenwurzeln und zieht über das Gesäss bis in den Fuss. Wird eine dieser Wurzeln gereizt oder bedrängt, meist durch einen Bandscheibenvorfall, eine Verengung des Wirbelkanals oder eine Reizung im Gesässbereich, entsteht der typische ausstrahlende Schmerz. Was das von einem gewöhnlichen Kreuzschmerz unterscheidet und welche Ursachen dahinterstecken können, erklärt die Seite <a href="/beschwerden/ischias/">Ischias</a>.</p>
<p>Für die Behandlungsentscheidung ist das wichtig: Akupunktur arbeitet am Schmerz und an der Muskulatur, nicht an der Bandscheibe. Sie kann Beschwerden lindern, während der Körper den eigentlichen Auslöser verarbeitet. Sie ersetzt keine Abklärung, wenn neurologische Ausfälle im Spiel sind.</p>
<h2>Was die Studien zeigen</h2>
<p>Zu Akupunktur bei Ischias gibt es inzwischen viele randomisierte Studien, aber ihre Qualität ist das Problem. Eine Meta-Analyse von <a href="https://pubmed.ncbi.nlm.nih.gov/26576192/" target="_blank" rel="noopener">Qin et al. (2015)</a> wertete 11 Studien mit 962 Teilnehmenden aus. Akupunktur schnitt gegenüber Schmerzmitteln wie Ibuprofen oder Diclofenac besser ab, und als Ergänzung zur Medikation verstärkte sie deren Effekt. Die Autor:innen selbst nennen die Evidenz jedoch begrenzt: kleine Studien, unklare Randomisierung, keine Verblindung der Patient:innen.</p>
<p>Eine aktuellere Auswertung von <a href="https://pubmed.ncbi.nlm.nih.gov/36845439/" target="_blank" rel="noopener">Zhang et al. (2023)</a> umfasste 30 Studien mit 2662 Teilnehmenden und kam zu ähnlich positiven Zahlen: weniger Schmerz, weniger Rückfälle, weniger Nebenwirkungen als unter Medikamenten. Nach dem GRADE-System war die Sicherheit der Evidenz für die Schmerzintensität aber sehr niedrig, fast alle Studien stammten aus China, und nur zwei verglichen Akupunktur mit einer Scheinakupunktur.</p>
<div class="wa-callout"><div class="wa-callout-label">Einordnung</div><p>Die Richtung der Ergebnisse ist über viele Studien hinweg konsistent, die Belastbarkeit nicht. Weil Scheinakupunktur-Vergleiche fast fehlen, lässt sich nicht sagen, wie viel des Effekts auf die Nadelung und wie viel auf Erwartung und Zuwendung zurückgeht. Internationale Leitlinien zu Kreuzschmerzen mit Ausstrahlung sprechen deshalb keine klare Empfehlung für Akupunktur aus.</p></div>
<h2>Warnzeichen, bei denen Akupunktur nicht der erste Schritt ist</h2>
<p>Ein Teil der Ischiasbeschwerden gehört sofort in ärztliche Hände. Geh in die Notaufnahme oder ruf den Notfalldienst, wenn du eines dieser Zeichen bemerkst: eine neu aufgetretene Blasen- oder Darmschwäche, Taubheit im Bereich von Gesäss, Damm oder Innenseite der Oberschenkel, eine rasch zunehmende Lähmung im Bein oder Fuss. Das können Hinweise auf ein Cauda-equina-Syndrom sein, bei dem Stunden zählen.</p>
<p>Auch ohne Notfall gilt: Bei Kraftverlust, bei Schmerzen nach einem Sturz, bei Fieber oder bei Beschwerden, die nach vier bis sechs Wochen nicht nachlassen, braucht es eine ärztliche Untersuchung, oft mit Bildgebung. Was ein <a href="/gesundheitsbibliothek/untersuchungen/mrt/">MRT</a> dabei zeigt und was nicht, erklären wir in der Gesundheitsbibliothek. Für die ersten Tage mit akuten Schmerzen gibt es den Leitfaden <a href="/gesundheitsbibliothek/was-jetzt/ischias-schmerzen/">Was tun bei Ischias-Schmerzen</a>.</p>
<h2>Wo Akupunktur sinnvoll sein kann</h2>
<p>Realistisch ist Akupunktur bei Ischias ein ergänzender Baustein in drei Situationen: wenn die Abklärung keine Operationsindikation ergeben hat und du die Wartezeit auf Besserung überbrücken willst; wenn Schmerzmittel nicht ausreichen oder nicht vertragen werden; und wenn die Muskulatur in Gesäss und Lendenbereich so verspannt ist, dass sie den Nerv zusätzlich reizt. In diesem letzten Fall kombinieren wir die Nadelung oft mit <a href="/therapien/tuina/">Tuina</a>, weil die manuelle Arbeit am Piriformis und an der tiefen Gesässmuskulatur direkt dort ansetzt. Ob bei dir eher eine manuelle Behandlung oder aktive Physiotherapie im Vordergrund stehen sollte, ordnet <a href="/wissen/tuina-oder-physiotherapie/">Tuina oder Physiotherapie</a> ein.</p>
<p>Akupunktur ersetzt nicht die Bewegung. Die wichtigste Massnahme bei Ischias ohne Warnzeichen ist, in Bewegung zu bleiben und die Rückenmuskulatur gezielt aufzubauen. Wer bereits in der <a href="/therapien/physiotherapie/">Physiotherapie</a> ist, kann Akupunktur parallel nutzen; die beiden Behandlungen behindern sich nicht.</p>
<h2>Wie wir behandeln</h2>
<p>Vor der ersten Nadel klären wir, ob eine ärztliche Diagnose vorliegt, ob Bildgebung gemacht wurde und ob Taubheit oder Kraftverlust bestehen. Dann wird genadelt: am unteren Rücken, im Gesäss und entlang des Schmerzverlaufs am Bein, meist mit acht bis fünfzehn Nadeln, die 20 bis 30 Minuten liegen bleiben. Bei ausgeprägtem Nervenschmerz setzen wir teilweise <a href="/therapien/elektroakupunktur/">Elektroakupunktur</a> ein, bei kälteempfindlichen Beschwerden ergänzend Moxibustion.</p>
<p>Typisch sind ein bis zwei Sitzungen pro Woche über vier bis sechs Wochen. Nach vier Sitzungen ziehen wir Bilanz: Hat sich die Ausstrahlung verkürzt, brauchst du weniger Schmerzmittel, schläfst du besser? Wenn nicht, besprechen wir offen, ob eine andere Methode oder eine erneute ärztliche Beurteilung sinnvoller ist.</p>
<h2>Kosten und Krankenkasse</h2>
<p>Akupunktur bei unseren nichtärztlichen, EMR- oder ASCA-registrierten Therapeut:innen läuft über die Zusatzversicherung für Komplementärmedizin; wie viel deine Police übernimmt, hängt von Kasse und Modell ab. Ärztliche Akupunktur durch Fachärzt:innen mit entsprechender Weiterbildung kann über die Grundversicherung abgerechnet werden. Die Unterschiede erklärt die Seite <a href="/krankenkassen/akupunktur/">Akupunktur und Krankenkasse</a>. Deine Deckung prüfen wir vor dem ersten Termin.</p>`,
    faqs: [
      { q: 'Hilft Akupunktur bei Ischias?', a: 'Zwei Meta-Analysen (2015 und 2023) zeigen weniger Schmerz als unter Schmerzmitteln, die Sicherheit der Evidenz ist aber niedrig bis sehr niedrig, weil Scheinakupunktur-Vergleiche fast fehlen. Als ergänzender Baustein ist Akupunktur vertretbar, als alleinige Behandlung nicht belegt.' },
      { q: 'Wann darf ich mit Ischias nicht zur Akupunktur?', a: 'Bei Blasen- oder Darmschwäche, Taubheit im Gesäss- oder Dammbereich oder rasch zunehmender Lähmung gehörst du sofort in die Notaufnahme. Auch bei Kraftverlust, Fieber oder Schmerzen nach einem Sturz zuerst ärztlich abklären.' },
      { q: 'Kann Akupunktur einen Bandscheibenvorfall heilen?', a: 'Nein. Akupunktur wirkt auf Schmerz und Muskulatur, nicht auf die Bandscheibe. Ob ein Vorfall von selbst abheilt oder operiert werden muss, entscheidet die ärztliche Beurteilung.' },
      { q: 'Wie viele Sitzungen sind realistisch?', a: 'Meist ein bis zwei Termine pro Woche über vier bis sechs Wochen. Nach vier Sitzungen sollte sich etwas bewegen, sonst wird das Vorgehen neu beurteilt.' },
      { q: 'Akupunktur oder Physiotherapie bei Ischias?', a: 'Beides, wenn möglich. Physiotherapie baut die Rückenmuskulatur auf und ist bei Ischias ohne Warnzeichen die wichtigste Massnahme; Akupunktur kann parallel den Schmerz dämpfen.' },
    ],
    related: [
      { href: '/beschwerden/ischias/', label: 'Ischias', cat: 'Beschwerde' },
      { href: '/gesundheitsbibliothek/was-jetzt/ischias-schmerzen/', label: 'Was tun bei Ischias-Schmerzen', cat: 'Soforthilfe' },
      { href: '/koerpersignale/bein-wird-beim-sitzen-taub/', label: 'Bein wird beim Sitzen taub', cat: 'Körpersignal' },
      { href: '/wissen/akupunktur-bei-rueckenschmerzen/', label: 'Akupunktur bei Rückenschmerzen', cat: 'Studienlage' },
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
    ],
  },
  // ────────────────────────────────────────────────────────── ENDOMETRIOSE
  {
    slug: 'akupunktur-bei-endometriose',
    title: 'Akupunktur bei Endometriose: Was die Studien zeigen',
    metaDesc: 'Akupunktur bei Endometriose: Was ein Cochrane-Review und eine Meta-Analyse zu Schmerzen zeigen, warum die Evidenz schwach bleibt und wie eine ergänzende Behandlung neben der gynäkologischen Therapie aussieht.',
    region: 'Schweizweit',
    excerpt: 'Hinweise auf weniger Schmerz, aber kaum verblindete Studien: Akupunktur kann Endometriose-Beschwerden ergänzend lindern, heilt die Erkrankung aber nicht.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur bei Endometriose: Was die Studien zeigen',
    lead: 'Endometriose ist eine chronische, gynäkologische Erkrankung, bei der Akupunktur oft als Ergänzung angefragt wird. Hier steht ehrlich, was die Forschung hergibt, was sie nicht hergibt und wie eine Behandlung neben Hormontherapie oder Operation sinnvoll eingebettet wird.',
    readingTime: '8 Min.',
    ctaTitle: 'Endometriose-Schmerzen ergänzend behandeln?',
    author: AUTOR,
    reviewerName: 'Corinna Reinhart',
    ...DATEN3,
    bodyHtml: `<h2>Was bei Endometriose passiert</h2>
<p>Gewebe, das der Gebärmutterschleimhaut ähnelt, siedelt sich ausserhalb der Gebärmutter an, reagiert auf den Zyklus und löst Entzündung, Verwachsungen und Schmerz aus. Typisch sind starke Regelschmerzen, Schmerzen beim Sex, beim Stuhlgang oder chronische Unterbauchschmerzen, oft verbunden mit unerfülltem Kinderwunsch. Die Diagnose stellt die Gynäkologie, häufig erst nach Jahren und manchmal erst per Bauchspiegelung. Die Erkrankung selbst, ihre Formen und die schulmedizinischen Optionen beschreibt die Seite <a href="/beschwerden/endometriose/">Endometriose</a>.</p>
<p>Das Entscheidende vorweg: Akupunktur verändert die Endometrioseherde nicht. Sie ist eine Behandlung des Schmerzes und der Begleitbeschwerden, nicht der Erkrankung.</p>
<h2>Was die Studien zeigen</h2>
<p>Der <a href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD007864.pub2/full" target="_blank" rel="noopener">Cochrane-Review zu Akupunktur bei Endometriose-Schmerzen (Zhu et al., 2011)</a> fand nur eine einzige Studie, die den Einschlusskriterien genügte: 67 Teilnehmerinnen, Ohrakupunktur im Vergleich mit chinesischen Kräutern. Die Akupunkturgruppe hatte tiefere Schmerzwerte, bei schwerer Dysmenorrhö deutlicher als bei leichter. Die Autor:innen bewerten die Evidenz als begrenzt und fordern verblindete Studien mit Scheinakupunktur.</p>
<p>Eine spätere Meta-Analyse von <a href="https://doi.org/10.1371/journal.pone.0186616" target="_blank" rel="noopener">Xu et al. (2017)</a> fasste 10 Studien mit 589 Patientinnen zusammen. Im Mittel lag die Schmerzreduktion unter Akupunktur um 1,36 Punkte auf einer Skala von 0 bis 10 über den Vergleichsgruppen. Nur eine der zehn Studien verwendete jedoch eine Placebo-Kontrolle; die übrigen verglichen mit Medikamenten oder Kräutern, was keine Verblindung erlaubt, und die Gruppen waren klein.</p>
<div class="wa-callout"><div class="wa-callout-label">Einordnung</div><p>Die Hinweise auf weniger Schmerz sind konsistent, aber methodisch schwach. Ein Unterschied von gut einem Punkt auf der Schmerzskala ist spürbar, aber kein Ersatz für eine wirksame Hormontherapie oder, wenn nötig, eine Operation. Seriös ist deshalb nur die Formulierung: Akupunktur kann Endometriose-Schmerzen ergänzend lindern, mit unsicherer Evidenz.</p></div>
<h2>Wann die gynäkologische Behandlung Vorrang hat</h2>
<p>Bei Verdacht auf Endometriose gehört die Abklärung zuerst in die Gynäkologie, nicht in die TCM-Praxis. Das gilt besonders, wenn Schmerzen rasch zunehmen, wenn Blut im Stuhl oder Urin auftritt, wenn Fieber dazukommt oder wenn ein Kinderwunsch im Raum steht und die Zeit drängt. Eine laufende Hormontherapie wird wegen Akupunktur nicht abgesetzt; wenn du das erwägst, besprich es mit deiner Ärztin.</p>
<p>Bei Endometriose und Kinderwunsch ist die Situation nochmals anders: Hier ist die Evidenz für Akupunktur dünn und die Zeitfrage oft entscheidend. Was wir dazu sagen können, steht auf der Seite <a href="/beschwerden/kinderwunsch/">Kinderwunsch</a>.</p>
<h2>Wie eine ergänzende Behandlung aussieht</h2>
<p>Wir planen die Behandlung entlang deines Zyklus. In der Woche vor und während der Menstruation steht die Schmerzlinderung im Vordergrund: Nadeln am Unterbauch, am unteren Rücken und an Punkten an Beinen und Händen, die in den Studien zu Regelschmerzen am häufigsten verwendet wurden. Zwischen den Blutungen arbeiten wir an Verspannungen im Beckenboden und im unteren Rücken, die chronische Unterbauchschmerzen oft verstärken, und an Schlaf und Erschöpfung, die bei Endometriose häufig mitlaufen.</p>
<p>Viele Patientinnen nutzen ergänzend eine <a href="/therapien/kraeutertherapie/">chinesische Kräuterrezeptur</a>. Auch hier gilt: Die Studienlage ist schwach, Wechselwirkungen mit Hormonpräparaten klären wir vorher, und Kräuter sind keine Alternative zur ärztlichen Therapie. Wenn zusätzlich eine Rezeptur vorgeschlagen wird, beantwortet <a href="/wissen/chinesische-kraeuter-bei-endometriose/">chinesische Kräuter bei Endometriose</a> die eigene Evidenzfrage dazu; eine kombinierte Behandlung belegt nicht automatisch die Wirkung jedes Bestandteils.</p>
<h2>Ablauf und was du erwarten kannst</h2>
<p>Realistisch ist ein Versuch über zwei bis drei Zyklen mit je zwei bis vier Sitzungen. Beurteilt wird nicht ein Gefühl, sondern konkret: Schmerzstärke an den schlimmsten Tagen, Bedarf an Schmerzmitteln, Ausfalltage. Zeigt sich nach drei Zyklen keine Veränderung, sagen wir dir das und raten nicht zu endlosen Serien.</p>
<h2>Kosten und Krankenkasse</h2>
<p>Akupunktur bei unseren nichtärztlichen, EMR- oder ASCA-registrierten Therapeut:innen läuft über die Zusatzversicherung für Komplementärmedizin; der Umfang hängt von deiner Police ab. Die gynäkologische Behandlung der Endometriose selbst ist Sache der Grundversicherung. Details unter <a href="/krankenkassen/akupunktur/">Akupunktur und Krankenkasse</a>.</p>`,
    faqs: [
      { q: 'Hilft Akupunktur bei Endometriose?', a: 'Studien zeigen Hinweise auf weniger Schmerz, im Mittel gut einen Punkt auf der Schmerzskala. Die Evidenz ist schwach, weil fast keine verblindeten Studien existieren. Akupunktur ist eine ergänzende Schmerzbehandlung, keine Therapie der Erkrankung.' },
      { q: 'Kann Akupunktur Endometriose heilen?', a: 'Nein. Sie verändert die Endometrioseherde nicht. Behandelt werden Schmerz und Begleitbeschwerden, parallel zur gynäkologischen Therapie.' },
      { q: 'Kann ich Akupunktur mit Hormontherapie kombinieren?', a: 'Ja. Die Hormontherapie wird nicht abgesetzt. Bei Kräuterrezepturen prüfen wir mögliche Wechselwirkungen vorher.' },
      { q: 'Wie lange dauert ein Behandlungsversuch?', a: 'Meist zwei bis drei Zyklen mit je zwei bis vier Sitzungen, mit klarer Zwischenbilanz anhand von Schmerzstärke und Schmerzmittelbedarf.' },
      { q: 'Was ist mit Endometriose und Kinderwunsch?', a: 'Hier drängt oft die Zeit, und die Evidenz für Akupunktur ist dünn. Die Planung gehört in die Kinderwunschklinik; TCM kann begleiten, nicht ersetzen.' },
    ],
    related: [
      { href: '/beschwerden/endometriose/', label: 'Endometriose', cat: 'Beschwerde' },
      { href: '/beschwerden/adenomyose/', label: 'Adenomyose', cat: 'Beschwerde' },
      { href: '/wissen/akupunktur-bei-menstruationsbeschwerden/', label: 'Akupunktur bei Menstruationsbeschwerden', cat: 'Studienlage' },
      { href: '/beschwerden/kinderwunsch/', label: 'Kinderwunsch', cat: 'Beschwerde' },
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
    ],
  },
  // ────────────────────────────────────────────────────────── FIBROMYALGIE
  {
    slug: 'akupunktur-bei-fibromyalgie',
    title: 'Akupunktur bei Fibromyalgie: Was der Cochrane-Review zeigt',
    metaDesc: 'Akupunktur bei Fibromyalgie: Was der Cochrane-Review zu Schmerz, Steifigkeit und Schlaf zeigt, warum Elektroakupunktur besser abschneidet und wo die Behandlung im multimodalen Konzept Platz hat.',
    region: 'Schweizweit',
    excerpt: 'Kurzfristig weniger Schmerz und Steifigkeit, vor allem mit Elektroakupunktur, aber keine anhaltende Wirkung nach sechs Monaten: so nüchtern fällt der Cochrane-Review aus.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur bei Fibromyalgie: Was der Cochrane-Review zeigt',
    lead: 'Schmerzen am ganzen Körper, Erschöpfung, schlechter Schlaf: Fibromyalgie ist real, chronisch und schwer zu behandeln. Akupunktur gehört zu den am besten untersuchten ergänzenden Methoden. Hier steht, was die Daten tragen und was nicht.',
    readingTime: '8 Min.',
    ctaTitle: 'Fibromyalgie ergänzend behandeln?',
    author: AUTOR,
    reviewerName: 'Corinna Reinhart',
    ...DATEN3,
    bodyHtml: `<h2>Was Fibromyalgie ausmacht</h2>
<p>Fibromyalgie ist ein chronisches Schmerzsyndrom: ausgedehnte Schmerzen in Muskeln und Weichteilen, dazu Erschöpfung, nicht erholsamer Schlaf, Konzentrationsstörungen und häufig Reizdarm oder Kopfschmerzen. Es gibt keinen Laborwert, der die Diagnose beweist; sie wird klinisch gestellt, nachdem andere Erkrankungen ausgeschlossen sind. Hintergründe, Diagnosekriterien und die empfohlene multimodale Behandlung beschreibt die Seite <a href="/beschwerden/fibromyalgie/">Fibromyalgie</a>.</p>
<p>Für die Behandlungsentscheidung heisst das: Keine einzelne Methode heilt Fibromyalgie. Bewegung, Schulung, Schlaf und, wenn nötig, Medikamente bilden die Basis. Akupunktur ist ein möglicher Baustein daneben.</p>
<h2>Was der Cochrane-Review zeigt</h2>
<p>Der <a href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD007070.pub2/full" target="_blank" rel="noopener">Cochrane-Review von Deare et al. (CD007070)</a> wertete neun randomisierte Studien mit 395 Teilnehmenden aus. Die Ergebnisse, sortiert nach Vergleich:</p>
<p>Gegenüber keiner Behandlung oder Standardtherapie verbesserte Akupunktur Schmerz und Steifigkeit, mit niedriger bis moderater Qualität der Evidenz. Gegenüber Scheinakupunktur war echte Akupunktur dagegen nicht überlegen, mit einer Ausnahme: weniger Steifigkeit nach einem Monat. Elektroakupunktur schnitt für Schmerz, Steifigkeit, Wohlbefinden, Schlaf und Erschöpfung wahrscheinlich besser ab als manuelle Akupunktur, allerdings auf Basis kleiner Studien, eine davon mit nur 13 Teilnehmenden. Manuelle Akupunktur allein verbesserte Schmerz und Funktion wahrscheinlich nicht.</p>
<p>Zwei Punkte sind für dich besonders wichtig: Die Effekte hielten bis etwa einen Monat an und waren nach sechs Monaten nicht mehr nachweisbar. Und Akupunktur war sicher, schwere Nebenwirkungen wurden keine berichtet.</p>
<div class="wa-callout"><div class="wa-callout-label">Einordnung</div><p>Fibromyalgie ist eines der Beschwerdebilder, bei denen der Unterschied zwischen echter und Scheinakupunktur klein ist. Das spricht dafür, dass ein guter Teil der Wirkung über Zuwendung, Erwartung und das Nervensystem läuft, nicht über die genaue Punktwahl. Für Patient:innen ist das weniger wichtig als für Forschende: Entscheidend ist, ob es dir mit der Behandlung besser geht und ob der Nutzen den Aufwand rechtfertigt.</p></div>
<h2>Wann zuerst rheumatologisch oder schmerzmedizinisch</h2>
<p>Bevor Fibromyalgie behandelt wird, muss sie diagnostiziert sein. Entzündliche Rheumaerkrankungen, Schilddrüsenstörungen, Vitamin-D-Mangel oder Polymyalgie können ähnliche Beschwerden machen und brauchen eine andere Behandlung. Neu aufgetretene, rasch zunehmende Schmerzen, geschwollene Gelenke, Fieber, ungewollter Gewichtsverlust oder Muskelschwäche gehören ärztlich abgeklärt. Auch bei bestehender Diagnose bleibt die rheumatologische oder schmerzmedizinische Begleitung die Basis, die wir ergänzen.</p>
<h2>Wie wir behandeln</h2>
<p>Bei Fibromyalgie arbeiten wir anders als bei einem lokalen Schmerz: weniger Nadeln, sanftere Stimulation, längere Pausen. Viele Betroffene reagieren empfindlich auf Reize; eine zu kräftige erste Sitzung kann die Beschwerden vorübergehend verstärken. Gestützt auf die Cochrane-Daten setzen wir, wenn du es verträgst, <a href="/therapien/elektroakupunktur/">Elektroakupunktur</a> mit niedriger Frequenz ein. Ergänzend kommen sanfte manuelle Techniken infrage, kein tiefes Kneten.</p>
<p>Weil Schlaf bei Fibromyalgie ein eigener Hebel ist, nehmen wir ihn bewusst mit in den Behandlungsplan auf; was Akupunktur bei <a href="/wissen/akupunktur-schlafprobleme/">Schlafproblemen</a> realistisch leisten kann, steht in einem eigenen Artikel.</p>
<h2>Ablauf und Sitzungen</h2>
<p>Ein sinnvoller Versuch umfasst sechs bis acht Sitzungen über etwa sechs Wochen. Wir messen nicht nur Schmerz, sondern auch Steifigkeit am Morgen, Schlafqualität und Belastbarkeit im Alltag. Weil die Wirkung laut Studienlage nicht lange anhält, besprechen wir vorher, ob Auffrischungssitzungen für dich sinnvoll und bezahlbar sind. Eine Dauerbehandlung ohne messbaren Nutzen empfehlen wir nicht.</p>
<h2>Kosten und Krankenkasse</h2>
<p>Akupunktur bei unseren nichtärztlichen, EMR- oder ASCA-registrierten Therapeut:innen läuft über die Zusatzversicherung für Komplementärmedizin, mit einem Jahresmaximum je nach Police. Gerade bei einer chronischen Erkrankung lohnt es sich, dieses Maximum vorher zu kennen. Details unter <a href="/krankenkassen/akupunktur/">Akupunktur und Krankenkasse</a>.</p>`,
    faqs: [
      { q: 'Hilft Akupunktur bei Fibromyalgie?', a: 'Laut Cochrane-Review verbessert sie Schmerz und Steifigkeit gegenüber keiner Behandlung, ist aber gegenüber Scheinakupunktur kaum überlegen. Die Wirkung hält etwa einen Monat an. Sie ist ein möglicher Baustein, keine Heilung.' },
      { q: 'Ist Elektroakupunktur besser als normale Akupunktur?', a: 'Nach den Cochrane-Daten wahrscheinlich ja, für Schmerz, Steifigkeit, Schlaf und Erschöpfung. Die zugrunde liegenden Studien sind jedoch klein.' },
      { q: 'Kann die Behandlung die Schmerzen verstärken?', a: 'Eine zu intensive erste Sitzung kann vorübergehend mehr Beschwerden auslösen. Deshalb beginnen wir mit wenigen Nadeln und sanfter Stimulation.' },
      { q: 'Wie lange hält die Wirkung an?', a: 'In den Studien bis etwa einen Monat; nach sechs Monaten war kein Unterschied mehr messbar. Ob Auffrischungen sinnvoll sind, besprechen wir vorher.' },
      { q: 'Ersetzt Akupunktur Bewegung und Medikamente?', a: 'Nein. Bewegung, Schulung, Schlaf und je nach Situation Medikamente bleiben die Basis der multimodalen Behandlung.' },
    ],
    related: [
      { href: '/beschwerden/fibromyalgie/', label: 'Fibromyalgie', cat: 'Beschwerde' },
      { href: '/therapien/elektroakupunktur/', label: 'Elektroakupunktur', cat: 'Therapie' },
      { href: '/wissen/akupunktur-schlafprobleme/', label: 'Akupunktur bei Schlafproblemen', cat: 'Studienlage' },
      { href: '/beschwerden/stress-burnout/', label: 'Stress & Burnout', cat: 'Beschwerde' },
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
    ],
  },
  // ────────────────────────────────────────────────────────── TINNITUS
  {
    slug: 'akupunktur-bei-tinnitus',
    title: 'Akupunktur bei Tinnitus: Evidenz ehrlich eingeordnet',
    metaDesc: 'Akupunktur bei Tinnitus: Warum die Studienlage trotz vieler Arbeiten schwach ist, was gegen Scheinakupunktur herauskam, wann der HNO-Arzt zuerst dran ist und was eine Behandlung realistisch leisten kann.',
    region: 'Schweizweit',
    excerpt: 'Viele Studien, schwache Qualität, kein klarer Vorteil gegenüber Scheinakupunktur: Bei Tinnitus ist Akupunktur höchstens ein ergänzender Versuch.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur bei Tinnitus: Evidenz ehrlich eingeordnet',
    lead: 'Ein Pfeifen oder Rauschen, das nicht aufhört, treibt viele Menschen zu Behandlungen, deren Nutzen nicht belegt ist. Akupunktur gehört dazu. Hier steht, was die Studien hergeben, warum wir keine Versprechen machen und was dennoch sinnvoll sein kann.',
    readingTime: '7 Min.',
    ctaTitle: 'Tinnitus begleiten lassen?',
    author: AUTOR,
    reviewerName: 'Corinna Reinhart',
    ...DATEN3,
    bodyHtml: `<h2>Erst die Abklärung beim HNO-Arzt</h2>
<p>Tinnitus ist ein Symptom, keine Diagnose. Ein neu aufgetretenes Ohrgeräusch, besonders einseitig, mit Hörverlust, Schwindel oder Druckgefühl, gehört innerhalb weniger Tage zur HNO-Ärztin: Ein Hörsturz lässt sich nur früh behandeln, und seltene Ursachen müssen ausgeschlossen werden. Ein pulssynchrones Geräusch, das im Takt des Herzschlags klopft, braucht eine eigene Abklärung. Was in den ersten Tagen zu tun ist, steht unter <a href="/gesundheitsbibliothek/was-jetzt/tinnitus-neu-aufgetreten/">Neuer Tinnitus: erste Schritte</a>; die Erkrankung insgesamt erklärt die Seite <a href="/beschwerden/tinnitus/">Tinnitus</a>.</p>
<p>Akupunktur kommt, wenn überhaupt, erst danach ins Spiel: bei chronischem Tinnitus, der ärztlich abgeklärt ist und bei dem es um den Umgang mit dem Geräusch geht.</p>
<h2>Was die Studien zeigen</h2>
<p>Die bis heute meistzitierte Übersicht stammt von <a href="https://doi.org/10.1186/1472-6882-12-97" target="_blank" rel="noopener">Kim et al. (2012)</a>: neun randomisierte Studien, in denen Akupunktur die einzige Behandlung war. In den fünf Studien mit Scheinakupunktur als Vergleich fand sich keine statistisch bedeutsame Verbesserung. Zwei Studien zu einer einzelnen Schädelakupunktur-Sitzung meldeten zwar Effekte, wurden von den Autor:innen aber wegen hohen Verzerrungsrisikos als wenig verlässlich eingestuft. Die methodische Qualität war insgesamt schlecht: kleine Gruppen, keine Fallzahlplanung, lückenhafte Berichte über Nebenwirkungen.</p>
<p>Eine <a href="https://www.frontiersin.org/journals/neurology/articles/10.3389/fneur.2022.1061431/full" target="_blank" rel="noopener">Übersicht über 14 systematische Reviews (Frontiers in Neurology, 2022)</a> kam zehn Jahre später zum gleichen Bild: Die Richtung der Ergebnisse ist tendenziell positiv, aber nach GRADE war keines der Ergebnisse von hoher Qualität, die meisten von niedriger oder sehr niedriger.</p>
<div class="wa-callout"><div class="wa-callout-label">Einordnung</div><p>Für Tinnitus können wir Akupunktur nicht als wirksam bezeichnen. Was sich sagen lässt: Sie ist sicher, und manche Menschen berichten, dass sie das Geräusch als weniger belastend empfinden, oft verbunden mit besserem Schlaf und weniger Anspannung. Ob das an der Nadelung liegt oder an der Ruhe und Zuwendung der Sitzung, lässt sich aus den Studien nicht ableiten. Die einzige Behandlung mit belegtem Nutzen für die Lebensqualität ist die kognitive Verhaltenstherapie.</p></div>
<h2>Wo ein Versuch vertretbar ist</h2>
<p>Vertretbar ist Akupunktur bei chronischem, abgeklärtem Tinnitus, wenn du sie als Ergänzung verstehst und nicht als Hoffnung auf Stille. Am ehesten profitieren Menschen, bei denen das Geräusch mit Verspannungen im Nacken und Kiefer, mit Stress oder mit Schlafproblemen verknüpft ist. Dort behandeln wir weniger das Ohr als das Umfeld: Nacken, Kiefermuskulatur, Anspannung, Schlaf. Was bei <a href="/beschwerden/stress-burnout/">Stress</a> und <a href="/wissen/akupunktur-schlafprobleme/">Schlafproblemen</a> realistisch ist, steht auf den jeweiligen Seiten.</p>
<p>Nicht sinnvoll ist Akupunktur als Ersatz für Hörgeräteversorgung bei Hörverlust, für die Behandlung eines Hörsturzes oder für eine Verhaltenstherapie, die dir empfohlen wurde.</p>
<h2>Wie wir behandeln</h2>
<p>Vor der ersten Sitzung wollen wir den HNO-Befund und den <a href="/gesundheitsbibliothek/untersuchungen/hoertest/">Hörtest</a> sehen. Genadelt wird rund um das Ohr, am Nacken und an Punkten an Händen und Füssen; bei ausgeprägter Kiefer- oder Nackenverspannung kombinieren wir mit manuellen Techniken. Wir vereinbaren vorher ein klar begrenztes Paket von sechs Sitzungen und messen den Erfolg nicht an der Lautstärke des Geräuschs, sondern daran, wie stark es dich im Alltag und beim Einschlafen stört. Bleibt das nach sechs Sitzungen gleich, beenden wir die Behandlung.</p>
<h2>Kosten und Krankenkasse</h2>
<p>Akupunktur bei unseren nichtärztlichen, EMR- oder ASCA-registrierten Therapeut:innen läuft über die Zusatzversicherung für Komplementärmedizin; der Umfang hängt von deiner Police ab. Die HNO-Abklärung und die Hörgeräteversorgung laufen über die Grundversicherung beziehungsweise die Invaliden- oder AHV-Versicherung. Details zur Akupunktur unter <a href="/krankenkassen/akupunktur/">Akupunktur und Krankenkasse</a>.</p>`,
    faqs: [
      { q: 'Hilft Akupunktur bei Tinnitus?', a: 'Gegenüber Scheinakupunktur zeigten die Studien keinen bedeutsamen Vorteil, und die Qualität der Evidenz ist niedrig bis sehr niedrig. Akupunktur kann höchstens ein ergänzender Versuch sein, vor allem wenn Nacken, Stress oder Schlaf mitspielen.' },
      { q: 'Kann Akupunktur das Ohrgeräusch zum Verschwinden bringen?', a: 'Dafür gibt es keinen Beleg. Realistisch ist allenfalls, dass das Geräusch als weniger belastend empfunden wird.' },
      { q: 'Wann muss ich mit Tinnitus zum HNO-Arzt?', a: 'Bei neu aufgetretenem, einseitigem Tinnitus, bei Hörverlust, Schwindel, Druckgefühl oder einem pulssynchronen Geräusch innerhalb weniger Tage. Akupunktur kommt erst nach der Abklärung infrage.' },
      { q: 'Wie viele Sitzungen sind sinnvoll?', a: 'Wir vereinbaren ein begrenztes Paket von sechs Sitzungen und messen, wie stark dich das Geräusch im Alltag stört. Ohne Veränderung beenden wir die Behandlung.' },
      { q: 'Was hilft nachweislich bei chronischem Tinnitus?', a: 'Die kognitive Verhaltenstherapie ist die Behandlung mit belegtem Nutzen für die Lebensqualität. Bei Hörverlust kommt die Hörgeräteversorgung dazu.' },
    ],
    related: [
      { href: '/beschwerden/tinnitus/', label: 'Tinnitus', cat: 'Beschwerde' },
      { href: '/gesundheitsbibliothek/was-jetzt/tinnitus-neu-aufgetreten/', label: 'Neuer Tinnitus: erste Schritte', cat: 'Soforthilfe' },
      { href: '/koerpersignale/herzschlag-im-ohr/', label: 'Herzschlag im Ohr', cat: 'Körpersignal' },
      { href: '/beschwerden/hoersturz/', label: 'Hörsturz', cat: 'Beschwerde' },
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
    ],
  },
  // ────────────────────────────────────────────────────────── POLYNEUROPATHIE
  {
    slug: 'akupunktur-bei-polyneuropathie',
    title: 'Akupunktur bei Polyneuropathie: Evidenz & Grenzen',
    metaDesc: 'Akupunktur bei Polyneuropathie: Was der Cochrane-Review zu Nervenschmerzen zeigt, was Studien zur Neuropathie nach Chemotherapie hergeben, wo die Grenzen liegen und was vor jeder Behandlung abgeklärt sein muss.',
    region: 'Schweizweit',
    excerpt: 'Für Nervenschmerzen reicht die Evidenz laut Cochrane nicht aus; bei Neuropathie nach Chemotherapie gibt es Hinweise auf weniger Schmerz. Akupunktur ist ergänzend, nie ursächlich.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur bei Polyneuropathie: Evidenz & Grenzen',
    lead: 'Brennende Füsse, Kribbeln, Taubheit, die langsam aufwärts wandert: Polyneuropathie hat viele Ursachen, und die Behandlung der Ursache steht immer an erster Stelle. Was Akupunktur bei den Beschwerden leisten kann, ist weniger klar, als viele Angebote suggerieren.',
    readingTime: '8 Min.',
    ctaTitle: 'Polyneuropathie ergänzend begleiten lassen?',
    author: AUTOR,
    reviewerName: 'Corinna Reinhart',
    ...DATEN3,
    bodyHtml: `<h2>Zuerst die Ursache</h2>
<p>Polyneuropathie bedeutet, dass viele periphere Nerven gleichzeitig geschädigt sind, meist beginnend an den Füssen. Die häufigsten Ursachen in der Schweiz sind Diabetes, Alkohol, Chemotherapie und Vitamin-B12-Mangel; daneben gibt es entzündliche, erbliche und medikamentöse Formen. Weil die Behandlung der Ursache den Verlauf bestimmt, gehört die Abklärung in die Neurologie, mit <a href="/gesundheitsbibliothek/untersuchungen/nervenleitmessung/">Nervenleitmessung</a> und Laborwerten. Was dabei untersucht wird und wie die Erkrankung verläuft, beschreibt die Seite <a href="/beschwerden/polyneuropathie/">Polyneuropathie</a>.</p>
<p>Akupunktur ersetzt davon nichts. Sie zielt auf die Beschwerden, vor allem auf Schmerz und Missempfindungen, nicht auf die Nervenschädigung.</p>
<h2>Was die Studien zeigen</h2>
<p>Der <a href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD012057.pub2/full" target="_blank" rel="noopener">Cochrane-Review zu Akupunktur bei neuropathischen Schmerzen (Ju et al., 2017)</a> fand sechs Studien mit 462 Erwachsenen, die chronische periphere Nervenschmerzen hatten. Das Fazit ist deutlich: Die Daten reichen nicht aus, um Akupunktur zu empfehlen oder abzulehnen, weder allgemein noch für eine bestimmte Neuropathie. Die Qualität der Evidenz wurde als sehr niedrig eingestuft, wegen fehlender Verblindung, kleiner Gruppen und Abbrüchen in den Vergleichsgruppen.</p>
<p>Etwas besser sieht es bei der Neuropathie nach Chemotherapie aus. Eine Meta-Analyse von <a href="https://pubmed.ncbi.nlm.nih.gov/31833790/" target="_blank" rel="noopener">Chien et al. (2019)</a> über sechs Studien mit 386 Patient:innen fand weniger Schmerz und weniger Nervensymptome unter Akupunktur; die Autor:innen fordern wegen der kleinen Fallzahlen grössere Studien. Eine Auswertung von 2022 bestätigte den Effekt auf Schmerz, fand aber gegenüber Placebo-Akupunktur keinen Unterschied bei der Nervenfunktion selbst.</p>
<div class="wa-callout"><div class="wa-callout-label">Einordnung</div><p>Für Schmerz und Missempfindungen gibt es Hinweise auf einen Nutzen, für die Nervenfunktion nicht. Wer dir verspricht, Akupunktur könne geschädigte Nerven regenerieren, bewegt sich ausserhalb der Studienlage. Realistisch ist ein ergänzender Versuch zur Schmerzlinderung, mit ehrlicher Zwischenbilanz.</p></div>
<h2>Wann Akupunktur nicht der richtige Schritt ist</h2>
<p>Rasch fortschreitende Taubheit oder Schwäche, Gangunsicherheit mit Stürzen, Beschwerden nach einer Infektion oder eine Neuropathie ohne bekannte Ursache gehören neurologisch abgeklärt, bevor irgendjemand nadelt. Bei Diabetes ist die Einstellung des Blutzuckers der wichtigste Hebel; Akupunktur ändert daran nichts. Bei laufender Chemotherapie stimmen wir jede Behandlung mit dem onkologischen Team ab.</p>
<p>Ein praktischer Punkt: Wo die Haut taub ist, spürst du Verletzungen nicht. Wir nadeln deshalb zurückhaltend an Stellen mit fehlendem Gefühl, verzichten dort auf starke Stimulation und raten dir ohnehin zur täglichen Fussinspektion, wie sie bei diabetischer Neuropathie empfohlen wird.</p>
<h2>Wie wir behandeln</h2>
<p>Wir wollen Diagnose, Ursache und aktuelle Medikation kennen und fragen nach dem Befund der Nervenleitmessung. Behandelt wird an Beinen und Füssen, oft ergänzt durch Punkte am Rumpf und an den Händen. Bei Schmerz im Vordergrund setzen wir teilweise <a href="/therapien/elektroakupunktur/">Elektroakupunktur</a> ein, bei ausgeprägter Kälteempfindlichkeit <a href="/therapien/moxibustion/">Moxibustion</a>. Was nachts an brennenden Füssen anders ist als tagsüber, erklärt das Körpersignal <a href="/koerpersignale/brennende-fuesse-nachts/">Brennende Füsse nachts</a>.</p>
<h2>Ablauf und Sitzungen</h2>
<p>Ein Versuch umfasst meist sechs bis acht Sitzungen über sechs bis acht Wochen. Beurteilt werden Schmerzstärke, nächtliche Beschwerden, Schlaf und Gehstrecke. Verbessert sich davon nach sechs Sitzungen nichts, brechen wir ab und sagen dir das. Eine Dauerbehandlung, um einer fortschreitenden Erkrankung hinterherzulaufen, ist kein Behandlungsplan.</p>
<p>Die Sicherheitsplanung bei <a href="/gesundheitsbibliothek/fragen/akupunktur-waehrend-chemotherapie/">Akupunktur während einer Chemotherapie</a> muss zusätzlich mit dem Onkologie-Team abgestimmt werden. Für Gelenkschmerzen unter Aromatasehemmern nach Brustkrebs gibt es eine eigene grosse Studie, siehe <a href="/wissen/akupunktur-bei-aromatasehemmer-gelenkschmerzen/">Akupunktur bei Gelenkschmerzen durch Aromatasehemmer</a>.</p>
<h2>Kosten und Krankenkasse</h2>
<p>Akupunktur bei unseren nichtärztlichen, EMR- oder ASCA-registrierten Therapeut:innen läuft über die Zusatzversicherung für Komplementärmedizin, mit einem Jahresmaximum je nach Police. Die neurologische Abklärung und die Behandlung der Ursache laufen über die Grundversicherung. Details unter <a href="/krankenkassen/akupunktur/">Akupunktur und Krankenkasse</a>.</p>`,
    faqs: [
      { q: 'Hilft Akupunktur bei Polyneuropathie?', a: 'Für Nervenschmerzen reicht die Evidenz laut Cochrane-Review nicht aus, um Akupunktur zu empfehlen oder abzulehnen. Bei Neuropathie nach Chemotherapie gibt es Hinweise auf weniger Schmerz. Ein ergänzender Versuch ist vertretbar, mehr nicht.' },
      { q: 'Kann Akupunktur geschädigte Nerven heilen?', a: 'Nein. Studien zeigen allenfalls weniger Schmerz und Missempfindungen, keine Verbesserung der Nervenfunktion gegenüber Placebo.' },
      { q: 'Was muss vor der Behandlung abgeklärt sein?', a: 'Die Ursache. Dazu gehören Nervenleitmessung und Laborwerte in der Neurologie. Bei Diabetes bleibt die Blutzuckereinstellung der wichtigste Hebel.' },
      { q: 'Ist Akupunktur bei tauben Füssen gefährlich?', a: 'Bei fachgerechter Anwendung nicht, aber wir nadeln an gefühllosen Stellen zurückhaltend, weil du Verletzungen dort nicht spürst.' },
      { q: 'Hilft TCM auch bei Neuropathie nach Chemotherapie?', a: 'Dafür gibt es die vergleichsweise beste Evidenz, vor allem für Schmerz. Die Behandlung wird mit dem onkologischen Team abgestimmt.' },
    ],
    related: [
      { href: '/beschwerden/polyneuropathie/', label: 'Polyneuropathie', cat: 'Beschwerde' },
      { href: '/koerpersignale/brennende-fuesse-nachts/', label: 'Brennende Füsse nachts', cat: 'Körpersignal' },
      { href: '/gesundheitsbibliothek/untersuchungen/nervenleitmessung/', label: 'Nervenleitmessung (NLG)', cat: 'Untersuchung' },
      { href: '/therapien/elektroakupunktur/', label: 'Elektroakupunktur', cat: 'Therapie' },
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
    ],
  },
  // ────────────────────────────────────────────────────────── HÜFTSCHMERZEN
  {
    slug: 'akupunktur-bei-hueftschmerzen',
    title: 'Akupunktur bei Hüftschmerzen & Hüftarthrose: Studienlage',
    metaDesc: 'Akupunktur bei Hüftschmerzen und Hüftarthrose: Was der Cochrane-Review von 2018 zeigt, warum der Unterschied zu Scheinakupunktur klein ist, wo Bewegung wichtiger ist und wann du ärztlich abklären musst.',
    region: 'Schweizweit',
    excerpt: 'Als Ergänzung zur Hausarztbehandlung möglicherweise weniger Schmerz, gegenüber Scheinakupunktur kaum ein Unterschied: Bei Hüftarthrose ist Akupunktur ein Baustein neben Bewegung, kein Ersatz.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur bei Hüftschmerzen & Hüftarthrose: Studienlage',
    lead: 'Hüftschmerzen beim Gehen, beim Aufstehen oder nachts beim Liegen auf der Seite haben sehr unterschiedliche Ursachen. Für die häufigste, die Hüftarthrose, gibt es einen Cochrane-Review zu Akupunktur. Hier steht, was er zeigt, wo die Grenzen liegen und wann die Hüfte zuerst ärztlich angeschaut werden muss.',
    readingTime: '8 Min.',
    ctaTitle: 'Hüftschmerzen einordnen lassen?',
    author: AUTOR,
    reviewerName: 'Corinna Reinhart',
    ...DATEN3,
    bodyHtml: `<h2>Welche Hüfte? Erst die Ursache</h2>
<p>Schmerz in der Leiste, der beim Gehen zunimmt und die Beweglichkeit einschränkt, spricht für das Hüftgelenk selbst, am häufigsten für eine <a href="/beschwerden/koxarthrose/">Koxarthrose</a>. Schmerz aussen an der Hüfte, der nachts beim Liegen auf der Seite stört, kommt meist von Sehnen und Schleimbeuteln am grossen Rollhügel. Und Schmerz, der vom Rücken ins Gesäss ausstrahlt, hat oft gar nichts mit der Hüfte zu tun. Die Unterscheidung bestimmt die Behandlung; die Seite <a href="/beschwerden/hueftschmerzen/">Hüftschmerzen</a> führt durch die häufigsten Ursachen.</p>
<p>Akupunktur kann bei allen drei Mustern den Schmerz beeinflussen, verändert aber weder Knorpel noch Sehne. Darum ist sie bei Hüftschmerzen immer ein Baustein neben Bewegung, nie die Hauptbehandlung.</p>
<h2>Was der Cochrane-Review zeigt</h2>
<p>Der <a href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD013010/full" target="_blank" rel="noopener">Cochrane-Review zu Akupunktur bei Hüftarthrose (Manheimer et al., 2018)</a> wertete sechs Studien mit 413 Teilnehmenden aus. Die Ergebnisse sind nüchtern: Gegenüber Scheinakupunktur machte echte Akupunktur nach etwa acht Wochen wahrscheinlich wenig oder keinen Unterschied bei Schmerz und Funktion. Als Ergänzung zur hausärztlichen Routinebehandlung verbesserte Akupunktur Schmerz und Funktion möglicherweise. Ob sie besser ist als Bewegungsberatung oder entzündungshemmende Medikamente, bleibt unklar.</p>
<p>Die Autor:innen weisen ausdrücklich darauf hin, dass ein Teil des berichteten Nutzens wahrscheinlich auf die höheren Erwartungen der Teilnehmenden an die Akupunktur zurückgeht. Nebenwirkungen waren gering.</p>
<div class="wa-callout"><div class="wa-callout-label">Einordnung</div><p>Für die Hüfte ist die Evidenz schwächer als für das Knie, wo grössere Studien einen moderaten Effekt zeigen. Wer Akupunktur bei Hüftarthrose versucht, sollte das mit realistischer Erwartung tun: etwas weniger Schmerz im Alltag, nicht die Rückkehr eines gesunden Gelenks. Was beim Knie anders aussieht, steht im Artikel <a href="/wissen/akupunktur-bei-knieschmerzen/">Akupunktur bei Knieschmerzen</a>.</p></div>
<h2>Wann die Hüfte zuerst ärztlich angeschaut werden muss</h2>
<p>Hüftschmerzen nach einem Sturz, bei Fieber, bei ungewolltem Gewichtsverlust oder bei nächtlichem Ruheschmerz, der mit Bewegung nicht besser wird, gehören ärztlich abgeklärt, bevor irgendjemand nadelt. Dasselbe gilt für Hüftschmerzen bei Kindern und Jugendlichen, bei Menschen mit Kortisontherapie oder hohem Alkoholkonsum, wo eine Hüftkopfnekrose ausgeschlossen werden muss, und bei rasch zunehmender Einschränkung des Gehens. Bei fortgeschrittener Arthrose ist die Prothese oft die bessere Entscheidung; Akupunktur darf sie nicht unnötig verzögern.</p>
<p>Was nach einem Gelenkersatz für einen Termin gilt, steht unter <a href="/gesundheitsbibliothek/fragen/akupunktur-mit-gelenkprothese/">Akupunktur mit Knie- oder Hüftprothese</a>.</p>
<h2>Wo Akupunktur sinnvoll sein kann</h2>
<p>Vertretbar ist ein Versuch bei leichter bis mittlerer Hüftarthrose, wenn du Schmerzmittel reduzieren willst oder nicht verträgst, und bei Sehnen- oder Schleimbeutelreizungen aussen an der Hüfte, wo wir die Nadelung mit manueller Arbeit an Gesäss- und Oberschenkelmuskulatur kombinieren. In beiden Fällen bleibt Bewegung die wichtigste Massnahme: Kräftigung der Hüftmuskulatur und ein angepasstes Gehpensum. Wer dafür Anleitung braucht, ist in der <a href="/therapien/physiotherapie/">Physiotherapie</a> richtig; Akupunktur kann parallel laufen.</p>
<h2>Wie wir behandeln</h2>
<p>Wir klären zuerst, welches der drei Muster vorliegt und ob eine ärztliche Diagnose mit Bildgebung besteht. Genadelt wird rund um die Hüfte, im Gesäss, am Oberschenkel und an Fernpunkten am Unterschenkel; bei ausgeprägter Muskelverhärtung ergänzen wir <a href="/therapien/tuina/">Tuina</a>, bei kälteempfindlichen Gelenken Moxibustion. Ein Versuch umfasst sechs bis acht Sitzungen über etwa sechs Wochen. Gemessen wird nicht ein Gefühl, sondern Gehstrecke, Treppensteigen, Nachtschlaf und Schmerzmittelbedarf. Ohne Veränderung nach sechs Sitzungen beenden wir die Behandlung.</p>
<h2>Kosten und Krankenkasse</h2>
<p>Akupunktur bei unseren nichtärztlichen, EMR- oder ASCA-registrierten Therapeut:innen läuft über die Zusatzversicherung für Komplementärmedizin; wie viel deine Police übernimmt, hängt von Kasse und Modell ab. Physiotherapie auf ärztliche Verordnung läuft über die Grundversicherung. Details unter <a href="/krankenkassen/akupunktur/">Akupunktur und Krankenkasse</a>.</p>`,
    faqs: [
      { q: 'Hilft Akupunktur bei Hüftarthrose?', a: 'Laut Cochrane-Review möglicherweise als Ergänzung zur hausärztlichen Behandlung, gegenüber Scheinakupunktur aber kaum. Ein Versuch bei leichter bis mittlerer Arthrose ist vertretbar, mit realistischer Erwartung.' },
      { q: 'Kann Akupunktur eine Hüftprothese vermeiden?', a: 'Nein. Bei fortgeschrittener Arthrose ist die Operation oft die bessere Entscheidung, und Akupunktur darf sie nicht unnötig verzögern.' },
      { q: 'Warum schmerzt meine Hüfte nachts beim Liegen auf der Seite?', a: 'Meist liegt die Ursache aussen am grossen Rollhügel, an Sehnen und Schleimbeuteln, nicht im Gelenk. Das wird anders behandelt als eine Arthrose.' },
      { q: 'Wie viele Sitzungen sind realistisch?', a: 'Sechs bis acht Sitzungen über etwa sechs Wochen, gemessen an Gehstrecke, Treppensteigen und Schmerzmittelbedarf.' },
      { q: 'Akupunktur oder Physiotherapie bei Hüftschmerzen?', a: 'Bewegung und Kräftigung sind die Basis, dafür ist Physiotherapie da. Akupunktur kann parallel den Schmerz dämpfen.' },
    ],
    related: [
      { href: '/beschwerden/hueftschmerzen/', label: 'Hüftschmerzen', cat: 'Beschwerde' },
      { href: '/beschwerden/koxarthrose/', label: 'Koxarthrose (Hüftarthrose)', cat: 'Beschwerde' },
      { href: '/wissen/akupunktur-bei-knieschmerzen/', label: 'Akupunktur bei Knieschmerzen', cat: 'Studienlage' },
      { href: '/gesundheitsbibliothek/koerper/huefte-bein-fuss/', label: 'Hüfte, Bein & Fuss', cat: 'Körperregion' },
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
    ],
  },
  // ────────────────────────────────────────────────────────── AKUPUNKTUR-BEI-VERSTOPFUNG (Welle 3)
  {
    slug: 'akupunktur-bei-verstopfung',
    title: 'Akupunktur bei Verstopfung: Nutzen und Grenzen',
    metaDesc: 'Bei chronischer funktioneller Verstopfung gibt es positive Studien zur Elektroakupunktur. Was das für dich bedeutet und wann medizinische Abklärung Vorrang hat.',
    region: 'Schweizweit',
    excerpt: 'Für eine bestimmte Form chronischer Verstopfung gibt es gute Studienhinweise. Daraus wird kein Versprechen für jede Ursache und jede Behandlung.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur bei Verstopfung: Wann kann sie ergänzend sinnvoll sein?',
    lead: 'Für eine bestimmte Form chronischer Verstopfung gibt es gute Studienhinweise. Daraus wird kein Versprechen für jede Ursache und jede Behandlung.',
    readingTime: '3 Min.',
    ctaTitle: 'Ergänzende Behandlung bei Verstopfung besprechen',
    ctaText: 'Wenn die Ursache geklärt ist, kannst du anfragen, ob Akupunktur zu deiner bisherigen Behandlung und deinen Zielen passt. Ein Behandlungsversuch wird mit dir geplant und überprüft.',
    ctaLabel: 'Passende Praxis finden',
    ctaHref: '/akupunktur-in-der-naehe/',
    author: REDAKTION,
    ...DATEN_W3,
    bodyHtml: `<div class="wa-callout"><div class="wa-callout-label">Kurz gesagt</div><p>Akupunktur kann bei chronischer funktioneller Verstopfung als ergänzende Behandlung erwogen werden. Eine grosse kontrollierte Studie zeigte einen Nutzen von Elektroakupunktur. Das gilt nicht automatisch für jede Verstopfung, und es ersetzt weder die Ursachenklärung noch wirksame Standardbehandlungen.</p></div>
<h2>Erst die Ursache klären</h2>
<p>Verstopfung kann mit Ernährung, Medikamenten und unterschiedlichen Erkrankungen zusammenhängen. Auch die Koordination des Beckenbodens kann relevant sein. Die Übersicht <a href="/beschwerden/verstopfung/">Verstopfung</a> hilft, Beschwerden und Abklärung einzuordnen.</p>
<p>Dieser Artikel behandelt die Entscheidung für Akupunktur bei einer bereits eingeordneten chronischen funktionellen Verstopfung. Eine neue starke Verschlechterung ist eine andere Situation. Bei heftigen Bauchschmerzen, Erbrechen oder einem stark geblähten Bauch mit fehlendem Stuhl- und Windabgang brauchst du rasch medizinische Hilfe. Blut im Stuhl, unbeabsichtigter Gewichtsverlust und eine anhaltende neue Veränderung gehören ebenfalls ärztlich abgeklärt.</p>
<h2>Was wurde untersucht?</h2>
<p>In einer 2016 veröffentlichten randomisierten Studie wurden 1’075 Erwachsene mit schwerer chronischer funktioneller Verstopfung untersucht. Elektroakupunktur wurde mit einer Scheinbehandlung verglichen. Das Protokoll umfasste 28 Sitzungen über acht Wochen. Die Gruppe mit Elektroakupunktur hatte im Mittel mehr vollständige spontane Stuhlentleerungen als die Vergleichsgruppe.</p>
<p>Das ist ein konkreter Studienhinweis und keine Garantie für den einzelnen Menschen. Die Studie untersuchte ein bestimmtes Protokoll in chinesischen Kliniken. Behandelnde konnten nicht verblindet werden; sehr langfristige Effekte waren nicht geklärt. Aus dem Ergebnis folgt auch nicht, dass wenige manuelle Sitzungen dieselbe Wirkung haben.</p>
<h2>Wie passt das zur üblichen Behandlung?</h2>
<p>Je nach Ursache gehören Ernährung, Bewegung, geeignete Ballaststoffe und Medikamente zur Behandlung. Für chronische idiopathische Verstopfung gibt es evidenzbasierte medikamentöse Optionen. Bei einer Entleerungsstörung kann wiederum eine gezielte Behandlung des Beckenbodens wichtig sein.</p>
<p>Akupunktur sollte deshalb als ergänzender Versuch eingeordnet werden. Medikamente oder bereits hilfreiche Massnahmen werden nicht eigenständig abgesetzt. Wenn deine Beschwerden vor allem zu <a href="/beschwerden/reizdarm/">Reizdarm</a> passen, lies die gesonderte Einordnung zu <a href="/wissen/akupunktur-bei-reizdarm/">Akupunktur bei Reizdarm</a>. Die Evidenz ist nicht für beide Beschwerdebilder gleich.</p>
<h2>Woran du einen sinnvollen Versuch erkennst</h2>
<p>Vor Beginn wird festgelegt, was sich verbessern soll: beispielsweise weniger starkes Pressen, mehr vollständige Entleerungen oder weniger belastende Bauchbeschwerden. Ein einfaches Stuhl- und Beschwerdeprotokoll hilft bei der Bewertung.</p>
<p>Du solltest wissen, welche Form der <a href="/therapien/akupunktur/">Akupunktur</a> geplant ist und wann der Nutzen überprüft wird. Eine Serie ohne erkennbares Ziel und ohne Zwischenbilanz ist keine gute Behandlungsplanung. Bleibt ein relevanter Nutzen aus, werden Vorgehen und Alternativen besprochen.</p>
<h2>Vor einer Anfrage</h2>
<p>Bring bekannte Diagnosen, Medikamentenliste und bisherige Behandlungsversuche mit. Frage nach Erfahrung mit diesem Beschwerdebild und nach dem geplanten Vorgehen. <a href="/krankenkassen/akupunktur/">Kosten und Versicherung</a> sollten vor Beginn geklärt sein; eine Kostenübernahme ist keine Wirksamkeitsgarantie.</p>
<p>Wenn die Ursache geklärt ist und du einen ergänzenden Versuch erwägst, kannst du über den <a href="/akupunktur-in-der-naehe/">Praxisfinder</a> eine passende Anfrage stellen. Die Studie ist keine Zusage, dass jede Praxis genau dieses Protokoll anbietet.</p>
<h2>Häufige Fragen</h2>
<h3>Hilft Akupunktur bei jeder Verstopfung?</h3>
<p>Nein. Ursache und Beschwerdebild sind entscheidend; die genannten Daten betreffen chronische funktionelle Verstopfung.</p>
<h3>Muss ich 28 Sitzungen buchen?</h3>
<p>Nein. Das war das untersuchte Studienprotokoll, kein Buchungspaket und keine persönliche Therapieempfehlung.</p>
<h3>Kann ich meine Abführmittel dann absetzen?</h3>
<p>Änderungen deiner bisherigen Behandlung besprichst du mit den zuständigen Fachpersonen. Akupunktur ersetzt wirksame Massnahmen nicht automatisch.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/27618593/" target="_blank" rel="noopener">Liu et al., Annals of Internal Medicine 2016: shamkontrollierte Studie</a></li>
<li><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10542656/" target="_blank" rel="noopener">AGA/ACG 2023: Pharmacological Management of Chronic Idiopathic Constipation</a></li>
<li><a href="https://www.worldgastroenterology.org/UserFiles/file/guidelines/constipation-english-2025.pdf" target="_blank" rel="noopener">World Gastroenterology Organisation 2025: Constipation guideline</a></li>
</ul>`,
    faqs: [],
    related: [
      { href: '/beschwerden/reizdarm/', label: 'Reizdarm', cat: 'Beschwerde' },
      { href: '/beschwerden/verstopfung/', label: 'Verstopfung', cat: 'Beschwerde' },
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
      { href: '/wissen/akupunktur-bei-reizdarm/', label: 'Akupunktur bei Reizdarm', cat: 'Artikel' },
      { href: '/wissen/chinesische-kraeuter-bei-verstopfung/', label: 'Chinesische Kräuter bei Verstopfung', cat: 'Artikel' },
    ],
  },
  // ────────────────────────────────────────────────────────── AKUPUNKTUR-BEI-PROSTATITIS (Welle 3)
  {
    slug: 'akupunktur-bei-prostatitis',
    title: 'Akupunktur bei Prostatitis und CPPS',
    metaDesc: 'Bei chronischem nichtbakteriellem Beckenschmerz gibt es positive Akupunkturstudien. Was damit gemeint ist und warum eine Infektion zuerst behandelt wird.',
    region: 'Schweizweit',
    excerpt: 'Gemeint ist hier das chronische, nichtbakterielle Beckenschmerzsyndrom. Eine akute Prostatainfektion braucht eine andere Behandlung.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur bei chronischer Prostatitis: Für wen ist sie eine Option?',
    lead: 'Gemeint ist hier das chronische, nichtbakterielle Beckenschmerzsyndrom. Eine akute Prostatainfektion braucht eine andere Behandlung.',
    readingTime: '3 Min.',
    ctaTitle: 'Ergänzende Unterstützung bei chronischem Beckenschmerz',
    ctaText: 'Wenn Infektion und andere behandlungsbedürftige Ursachen abgeklärt sind, kannst du anfragen, ob ein Akupunkturversuch in deinen bestehenden Behandlungsplan passt.',
    ctaLabel: 'Praxis finden',
    ctaHref: '/akupunktur-in-der-naehe/',
    author: REDAKTION,
    ...DATEN_W3,
    bodyHtml: `<div class="wa-callout"><div class="wa-callout-label">Kurz gesagt</div><p>Bei chronischer nichtbakterieller Prostatitis beziehungsweise chronischem Beckenschmerzsyndrom kann Akupunktur eine ergänzende Option sein. Eine grössere kontrollierte Studie zeigte eine bessere Symptomverbesserung als Scheinakupunktur. Eine akute bakterielle Prostatitis wird damit nicht behandelt.</p></div>
<h2>Welche Form von Prostatitis ist gemeint?</h2>
<p>Schmerzen im Damm, Becken oder Genitalbereich und Beschwerden beim Wasserlassen können unterschiedliche Ursachen haben. Der Begriff «Prostatitis» wird im Alltag für verschiedene Situationen verwendet. Eine Infektion und ein chronisches Beckenschmerzsyndrom ohne nachgewiesene bakterielle Ursache sind nicht gleichzusetzen.</p>
<p>Die medizinische Abklärung steht deshalb am Anfang. Der Überblick <a href="/beschwerden/prostata/">Prostatabeschwerden</a> beschreibt das Umfeld. Ein <a href="/gesundheitsbibliothek/befunde-werte/psa-wert/">PSA-Wert</a> beantwortet wiederum eine andere Frage und ist kein alleiniger Nachweis für die Ursache deiner Schmerzen.</p>
<h2>Was sagen die Studien?</h2>
<p>Eine 2021 veröffentlichte randomisierte Studie untersuchte Männer mit mässig bis stark ausgeprägtem CP/CPPS. Akupunktur wurde mit einer Scheinbehandlung verglichen. Das untersuchte Vorgehen umfasste 20 Sitzungen über acht Wochen. Die Beschwerden besserten sich in der Akupunkturgruppe häufiger; der Unterschied bestand auch in der Nachbeobachtung.</p>
<p>Die Ergebnisse sprechen für einen möglichen ergänzenden Nutzen bei dieser klar definierten Gruppe. Sie beweisen keine Heilung der Prostata, keine Beseitigung von Bakterien und keinen Nutzen gegen Prostatakrebs. Die Wirkung eines bestimmten Studienprotokolls darf auch nicht auf jede beliebige Behandlungsserie übertragen werden.</p>
<h2>Teil eines gemeinsamen Behandlungsplans</h2>
<p>Chronischer Beckenschmerz kann mehrere Faktoren umfassen. Je nach Befund werden urologische Behandlung, Schmerztherapie und andere Massnahmen kombiniert. Bei beteiligter Muskulatur kann eine gezielte physiotherapeutische Behandlung relevant sein. Der Plan sollte zu deinen konkreten Befunden passen.</p>
<p>Akupunktur ist ein möglicher Baustein, kein Anlass, eine hilfreiche oder notwendige Behandlung zu beenden. Auch eine <a href="/beschwerden/reizblase/">Reizblase</a> oder ein Blasenschmerzsyndrom braucht eine passende Einordnung, statt sämtliche Beschwerden als Prostatitis zu behandeln.</p>
<h2>Wann Akupunktur warten muss</h2>
<p>Fieber, Schüttelfrost, starke neue Schmerzen oder die Unfähigkeit, Urin zu lassen, gehören rasch medizinisch beurteilt. Bei Verdacht auf eine akute Infektion hat die ärztliche Behandlung Vorrang. Ein geplanter Akupunkturtermin ist dann nicht der passende erste Schritt.</p>
<h2>Was du vor Beginn besprechen solltest</h2>
<p>Bring Befunde, Medikamentenliste und bisherige Behandlungsversuche mit. Lege mit den Behandelnden fest, woran Nutzen gemessen wird, etwa Schmerzen, Alltagseinschränkung oder Beschwerden beim Wasserlassen. Eine Zwischenbilanz verhindert, dass du ohne erkennbaren Nutzen immer weiterbehandelst.</p>
<p>Informationen zu <a href="/therapien/akupunktur/">Akupunktur</a> und <a href="/krankenkassen/akupunktur/">Versicherung</a> helfen bei der Vorbereitung. Über den <a href="/akupunktur-in-der-naehe/">Praxisfinder</a> kannst du eine ergänzende Behandlung anfragen; die erforderliche Erfahrung und Eignung werden vor Beginn geklärt.</p>
<h2>Häufige Fragen</h2>
<h3>Ersetzt Akupunktur Antibiotika?</h3>
<p>Nein. Bei einer behandlungsbedürftigen bakteriellen Infektion bleibt die medizinische Therapie führend.</p>
<h3>Gilt die Studie für jede Art von Beckenschmerz?</h3>
<p>Nein. Sie betraf Männer mit CP/CPPS, nicht jede gynäkologische, urologische oder neurologische Schmerzursache.</p>
<h3>Wie viele Sitzungen brauche ich?</h3>
<p>Das hängt von Situation und Plan ab. Die 20 Studiensitzungen sind keine persönliche Vorgabe; Ziele und Überprüfung werden individuell besprochen.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/34399062/" target="_blank" rel="noopener">Sun et al., Annals of Internal Medicine 2021: Efficacy of Acupuncture for CP/CPPS</a></li>
<li><a href="https://www.auanet.org/guidelines-and-quality/guidelines/male-chronic-pelvic-pain" target="_blank" rel="noopener">AUA 2025: Diagnosis and Management of Male Chronic Pelvic Pain</a></li>
<li><a href="https://www.eu-openscience.europeanurology.com/article/S2666-1683%2822%2902126-7/fulltext" target="_blank" rel="noopener">Qin et al. 2022: systematische Übersicht zu CP/CPPS</a></li>
</ul>`,
    faqs: [],
    related: [
      { href: '/beschwerden/prostata/', label: 'Prostatabeschwerden', cat: 'Beschwerde' },
      { href: '/beschwerden/reizblase/', label: 'Reizblase', cat: 'Beschwerde' },
      { href: '/gesundheitsbibliothek/befunde-werte/psa-wert/', label: 'PSA-Wert: Was bedeutet ein erhöhter Befund?', cat: 'Befund' },
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
    ],
  },
  // ────────────────────────────────────────────────────────── AKUPUNKTUR-BEI-ANGSTSTOERUNGEN (Welle 3)
  {
    slug: 'akupunktur-bei-angststoerungen',
    title: 'Akupunktur bei Angststörungen: Ehrliche Einordnung',
    metaDesc: 'Akupunktur wird bei Angst untersucht, die Evidenz bleibt begrenzt. Was als ergänzende Unterstützung infrage kommt und warum Psychotherapie wichtig bleibt.',
    region: 'Schweizweit',
    excerpt: 'Ein ruhiger Behandlungstermin kann angenehm sein. Das ist etwas anderes als der Nachweis, dass eine Angststörung damit zuverlässig behandelt wird.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur bei Angststörungen: Was kannst du realistisch erwarten?',
    lead: 'Ein ruhiger Behandlungstermin kann angenehm sein. Das ist etwas anderes als der Nachweis, dass eine Angststörung damit zuverlässig behandelt wird.',
    readingTime: '3 Min.',
    ctaTitle: 'Ergänzende Unterstützung bei Angst besprechen',
    ctaText: 'Wenn du Akupunktur zusätzlich zu deinem bestehenden Behandlungsplan erwägst, kannst du eine Anfrage stellen. Sag dabei, was dich belastet und welche Unterstützung du bereits erhältst.',
    ctaLabel: 'Passende Praxis finden',
    ctaHref: '/akupunktur-in-der-naehe/',
    author: REDAKTION,
    ...DATEN_W3,
    bodyHtml: `<div class="wa-callout"><div class="wa-callout-label">Kurz gesagt</div><p>Akupunktur kann bei Angst als ergänzende Unterstützung erwogen werden. Studien zeigen mögliche Verbesserungen, ihre Aussagekraft ist jedoch begrenzt. Eine wirksame Psychotherapie und gegebenenfalls medikamentöse Behandlung werden dadurch nicht ersetzt.</p></div>
<h2>Entspannung und Angstbehandlung sind nicht dasselbe</h2>
<p>Sorgen, starke körperliche Anspannung und Vermeidung können den Alltag erheblich einschränken. Ob eine <a href="/beschwerden/angststoerungen/">Angststörung</a> vorliegt und welche Behandlung passt, sollte fachlich geklärt werden. <a href="/beschwerden/panikattacken/">Panikattacken</a> brauchen ebenfalls eine passende Einordnung; neue körperliche Symptome dürfen nicht vorschnell als «nur Angst» erklärt werden.</p>
<p>Eine Behandlung kann sich ruhig und unterstützend anfühlen, ohne die Ursache einer Angststörung ausreichend zu behandeln. Für die Entscheidung zählt deshalb nicht nur, ob du dich direkt danach entspannter fühlst, sondern ob sich dein Alltag langfristig verbessert.</p>
<h2>Wie sicher ist die Evidenz?</h2>
<p>Eine systematische Übersicht von 2021 fand Hinweise auf eine Verbesserung von Angstsymptomen gegenüber verschiedenen Vergleichsbedingungen. Die Studien unterschieden sich jedoch in Vorgehen und Qualität. Solche Unterschiede und Schwierigkeiten bei der Verblindung begrenzen die Sicherheit der Schlussfolgerungen.</p>
<p>Auch neuere Übersichten berichten positive Signale, weisen aber auf unterschiedliche Protokolle und methodische Unsicherheit hin. Daraus lässt sich weder eine zuverlässige Erfolgsquote noch eine Gleichwertigkeit mit gut untersuchten psychotherapeutischen Verfahren ableiten. Aussagen wie «reguliert dein Nervensystem dauerhaft» wären zu weitgehend.</p>
<h2>Was weiterhin Vorrang hat</h2>
<p>Für Angststörungen gibt es etablierte Behandlungen. Dazu gehört insbesondere eine passende Psychotherapie; je nach Situation werden Medikamente erwogen. Den Behandlungsplan solltest du mit den zuständigen Fachpersonen abstimmen. Eine laufende Therapie nicht aus eigener Entscheidung beenden, weil du etwas Ergänzendes ausprobieren möchtest.</p>
<p>Bei neuem starken Brustschmerz, Ohnmacht oder anderen akuten Warnzeichen ist medizinische Abklärung wichtiger als ein Akupunkturtermin. Wenn Angst den Alltag zunehmend verhindert oder du dich nicht sicher fühlst, brauchst du zeitnah professionelle Hilfe.</p>
<h2>Wie ein ergänzender Versuch aussehen kann</h2>
<p>Vereinbare konkrete Ziele: beispielsweise weniger belastende Anspannung oder besseren Schlaf, ohne die Ziele deiner Psychotherapie aus dem Blick zu verlieren. Lege einen Zeitpunkt für die gemeinsame Bewertung fest. Ein Versuch ohne relevante Besserung muss nicht endlos weitergehen.</p>
<p>Wenn Nadeln selbst Angst auslösen, erwähne das schon bei der Anfrage. Die Seite <a href="/gesundheitsbibliothek/fragen/angst-vor-akupunktur-nadeln/">Angst vor Akupunkturnadeln</a> erklärt, wie du deine Grenzen ansprechen kannst. Niemand muss eine Behandlung aushalten oder fortsetzen, die sich nicht sicher anfühlt.</p>
<h2>Vor einer Terminentscheidung</h2>
<p>Frage nach dem realistischen Ziel und der Zusammenarbeit mit deiner bisherigen Versorgung. Kläre <a href="/krankenkassen/akupunktur/">Kosten und Versicherung</a> vorher. Über den <a href="/akupunktur-in-der-naehe/">Praxisfinder</a> kannst du ergänzende Unterstützung anfragen. Eine Anfrage ist kein Versprechen, dass Akupunktur für dein Beschwerdebild die richtige Behandlung ist.</p>
<h2>Häufige Fragen</h2>
<h3>Kann Akupunktur eine Angststörung heilen?</h3>
<p>Ein verlässlicher Heilungsnachweis besteht nicht. Die Behandlung kann höchstens ergänzend eingeordnet werden.</p>
<h3>Soll ich Psychotherapie dafür pausieren?</h3>
<p>Nein. Ergänzende Massnahmen sollten den bestehenden Plan unterstützen, nicht eine wirksame Behandlung verdrängen.</p>
<h3>Was, wenn ich Angst vor den Nadeln habe?</h3>
<p>Sag es frühzeitig. Ablauf, Alternativen und deine Grenzen müssen gemeinsam besprochen werden; du kannst jederzeit stoppen.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/33516258/" target="_blank" rel="noopener">Yang et al. 2021: Effectiveness of acupuncture on anxiety disorder, systematische Übersicht</a></li>
<li><a href="https://www.frontiersin.org/journals/neurology/articles/10.3389/fneur.2025.1682400/full" target="_blank" rel="noopener">Jiang et al. 2025: Meta-analysis of randomized controlled trials in generalized anxiety disorder</a></li>
<li><a href="https://www.nice.org.uk/guidance/cg113" target="_blank" rel="noopener">NICE CG113: Generalised anxiety disorder and panic disorder in adults</a></li>
</ul>`,
    faqs: [],
    related: [
      { href: '/beschwerden/angststoerungen/', label: 'Angststörung', cat: 'Beschwerde' },
      { href: '/beschwerden/panikattacken/', label: 'Panikattacken', cat: 'Beschwerde' },
      { href: '/gesundheitsbibliothek/fragen/angst-vor-akupunktur-nadeln/', label: 'Angst vor Akupunkturnadeln', cat: 'Frage' },
    ],
  },
  // ────────────────────────────────────────────────────────── AKUPUNKTUR-BEI-DEPRESSIONEN (Welle 3)
  {
    slug: 'akupunktur-bei-depressionen',
    title: 'Akupunktur bei Depressionen: Nutzen und Grenzen',
    metaDesc: 'Die Studien zu Akupunktur bei Depressionen sind unsicher. Welche ergänzende Rolle möglich ist und warum Psychotherapie und Medikamente nicht ersetzt werden.',
    region: 'Schweizweit',
    excerpt: 'Bei Depressionen zählt eine verlässliche Versorgung. Akupunktur sollte höchstens ein abgestimmter Zusatz sein, kein Ersatz für notwendige Behandlung.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur bei Depressionen: Welche ergänzende Rolle ist möglich?',
    lead: 'Bei Depressionen zählt eine verlässliche Versorgung. Akupunktur sollte höchstens ein abgestimmter Zusatz sein, kein Ersatz für notwendige Behandlung.',
    readingTime: '3 Min.',
    ctaTitle: 'Ergänzende Unterstützung besprechen',
    ctaText: 'Wenn du medizinisch oder psychotherapeutisch begleitet wirst, kannst du fragen, ob Akupunktur als Ergänzung zu deinen Zielen passt. In einer akuten Krise hat unmittelbare professionelle Hilfe Vorrang.',
    ctaLabel: 'Praxis finden',
    ctaHref: '/akupunktur-in-der-naehe/',
    author: REDAKTION,
    ...DATEN_W3,
    bodyHtml: `<div class="wa-callout"><div class="wa-callout-label">Kurz gesagt</div><p>Die Evidenz für Akupunktur bei Depressionen ist unsicher. Es gibt Hinweise auf Symptomverbesserungen, aber keinen verlässlichen Nachweis, dass sie etablierte Behandlungen ersetzen kann. Wenn du sie erwägst, dann als abgestimmte Ergänzung zu medizinischer und psychotherapeutischer Versorgung.</p></div>
<h2>Die Depression zuerst ernst nehmen</h2>
<p>Eine Depression ist mehr als ein schlechter Tag. Wenn Interesse, Antrieb oder Stimmung über längere Zeit deutlich verändert sind, ist fachliche Hilfe wichtig. Die Übersicht <a href="/beschwerden/depressionen/">Depressionen</a> beschreibt das Beschwerdebild und die Rolle der Abklärung.</p>
<p>Dieser Artikel beantwortet die Frage nach einer ergänzenden Behandlung. Er ist keine Anleitung, eine Diagnose selbst zu stellen oder Antidepressiva zu verändern. Wenn du dich akut nicht sicher fühlst oder befürchtest, dir etwas anzutun, hole sofort professionelle Hilfe und bleibe damit nicht allein. Ein späterer Akupunkturtermin reicht dann nicht aus.</p>
<h2>Was die Forschung tatsächlich zeigt</h2>
<p>Ein Cochrane-Review von 2018 fand Hinweise auf eine Verbesserung der Depressionsschwere gegenüber keiner beziehungsweise üblicher Behandlung. Gegenüber Kontrollakupunktur war der Unterschied kleiner. Vergleiche mit Medikamenten und Psychotherapie blieben wegen sehr niedriger Evidenzqualität unsicher.</p>
<p>Neuere Übersichtsarbeiten berichten teilweise zusätzliche Verbesserungen, etwa bei Kombination mit Antidepressiva. Sie lösen jedoch die Fragen nach Studienqualität, Vergleichsbedingungen und zuverlässigen Langzeiteffekten nicht vollständig. Eine positive Zusammenfassung ist daher kein Beweis, dass Akupunktur gleich gut wirkt wie eine etablierte Therapie oder bei dir sicher helfen wird.</p>
<h2>Was nicht verdrängt werden darf</h2>
<p>Die Behandlung einer Depression hängt unter anderem von Schwere, Verlauf und deinen Bedürfnissen ab. Psychotherapie, Medikamente und weitere fachlich empfohlene Massnahmen haben ihren Platz. Eine ergänzende Behandlung sollte diesen Plan nicht verzögern oder unnötig verkomplizieren.</p>
<p>Auch wenn du Medikamente schlecht verträgst oder bisher wenig Nutzen erlebt hast, ist die nächste Entscheidung mit den zuständigen Fachpersonen zu treffen. Das ist kein Grund, Medikamente eigenständig abzusetzen oder eine unbewiesene Alternative als gleichwertig anzusehen.</p>
<h2>Ein Versuch mit klaren Grenzen</h2>
<p>Wenn du Akupunktur ausprobieren möchtest, besprecht konkrete Ziele und einen überschaubaren Prüfzeitraum. Es kann sinnvoll sein, Veränderungen von Schlaf, Anspannung und Alltag zu dokumentieren. Diese Bereiche sind jedoch nicht gleichbedeutend mit einer ausreichenden Behandlung der Depression.</p>
<p>Bei zunehmender Verschlechterung wird nicht einfach die nächste Sitzung abgewartet. Es braucht eine zeitnahe Rückmeldung an die behandelnde medizinische oder psychotherapeutische Fachperson. Ebenso ist ein ausbleibender Nutzen Anlass, den ergänzenden Versuch zu überdenken.</p>
<h2>Vor einer Anfrage</h2>
<p>Bring Informationen über laufende Behandlungen und Medikamente mit. Sage, welche Ziele du hast und welche Belastung aktuell im Vordergrund steht. Informationen zu <a href="/therapien/akupunktur/">Akupunktur</a> und <a href="/krankenkassen/akupunktur/">Kosten</a> helfen bei einer informierten Entscheidung. Über den <a href="/akupunktur-in-der-naehe/">Praxisfinder</a> kannst du eine ergänzende Unterstützung anfragen; medizinische Krisenversorgung wird dort nicht ersetzt.</p>
<h2>Häufige Fragen</h2>
<h3>Ist Akupunktur eine Alternative zu Antidepressiva?</h3>
<p>Nicht als gleichwertiger Ersatz auf Grundlage der verfügbaren Evidenz. Änderungen der Behandlung gehören mit der zuständigen Fachperson besprochen.</p>
<h3>Gilt Entspannung nach einer Sitzung als Behandlungserfolg?</h3>
<p>Sie kann angenehm sein. Entscheidend sind aber relevante und anhaltende Veränderungen deiner Beschwerden und deines Alltags.</p>
<h3>Was passiert, wenn es mir schlechter geht?</h3>
<p>Wende dich zeitnah an deine medizinische oder psychotherapeutische Betreuung. Bei akuter Gefährdung ist sofortige Hilfe nötig, nicht das Abwarten weiterer Sitzungen.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://www.cochrane.org/evidence/CD004046_acupuncture-depression" target="_blank" rel="noopener">Cochrane 2018: Acupuncture for depression, CD004046</a></li>
<li><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10108109/" target="_blank" rel="noopener">Chen et al. 2022: Efficacy and safety of acupuncture for depression, systematische Übersicht</a></li>
<li><a href="https://www.nice.org.uk/guidance/ng222" target="_blank" rel="noopener">NICE NG222: Depression in adults, treatment and management</a></li>
</ul>`,
    faqs: [],
    related: [
      { href: '/beschwerden/depressionen/', label: 'Depressionen', cat: 'Beschwerde' },
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
    ],
  },
  // ────────────────────────────────────────────────────────── AKUPUNKTUR-BEI-REIZBLASE (Welle 3)
  {
    slug: 'akupunktur-bei-reizblase',
    title: 'Akupunktur bei Reizblase: Studien und Grenzen',
    metaDesc: 'Hilft Akupunktur bei überaktiver Blase? Die Evidenz ist begrenzt. Was vor einem Versuch abgeklärt und mit der bisherigen Therapie abgestimmt werden sollte.',
    region: 'Schweizweit',
    excerpt: 'Harndrang lässt sich behandeln. Ob Akupunktur zusätzlich hilft, ist nach der bisherigen Forschung nicht zuverlässig vorherzusagen.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur bei Reizblase: Ist ein ergänzender Versuch sinnvoll?',
    lead: 'Harndrang lässt sich behandeln. Ob Akupunktur zusätzlich hilft, ist nach der bisherigen Forschung nicht zuverlässig vorherzusagen.',
    readingTime: '3 Min.',
    ctaTitle: 'Ergänzende Behandlung bei Reizblase besprechen',
    ctaText: 'Wenn Infektion und andere Ursachen abgeklärt sind, kannst du anfragen, ob ein zeitlich begrenzter Akupunkturversuch zu deinem Behandlungsplan passt.',
    ctaLabel: 'Praxis finden',
    ctaHref: '/akupunktur-in-der-naehe/',
    author: REDAKTION,
    ...DATEN_W3,
    bodyHtml: `<div class="wa-callout"><div class="wa-callout-label">Kurz gesagt</div><p>Für Akupunktur bei überaktiver Blase gibt es Hinweise auf mögliche Verbesserungen, die Evidenzsicherheit ist jedoch niedrig. Sie ist kein zuverlässig belegter Ersatz für etablierte Massnahmen. Ein ergänzender Versuch braucht eine vorherige Abklärung und überprüfbare Ziele.</p></div>
<h2>Nicht jeder Harndrang ist eine Reizblase</h2>
<p>Plötzlicher starker Harndrang und häufiges Wasserlassen können zu einer überaktiven Blase passen. Eine Infektion, andere Erkrankungen oder Medikamente können ähnliche Beschwerden verursachen. Die Übersicht <a href="/beschwerden/reizblase/">Reizblase</a> erklärt die Einordnung.</p>
<p>Schmerzen und Brennen, Fieber oder <a href="/gesundheitsbibliothek/befunde-werte/blut-im-urin/">Blut im Urin</a> gehören zuerst medizinisch abgeklärt. Wenn du trotz starken Drangs keinen Urin lassen kannst, brauchst du rasch Hilfe. Ein Akupunkturversuch darf die Suche nach einer behandelbaren Ursache nicht verzögern.</p>
<h2>Wie gut sind die Daten?</h2>
<p>Der Cochrane-Review von 2022 bewertete Studien zur Akupunktur bei Erwachsenen mit überaktiver Blase. Ein möglicher kleiner Vorteil gegenüber Medikamenten wurde mit niedriger Evidenzsicherheit beschrieben. Für zentrale Beschwerden wie Drang und Inkontinenzereignisse waren manche Vergleiche sehr unsicher. Für wiederkehrende Blasenentzündungen gibt es eine eigene Studie, eingeordnet unter <a href="/wissen/akupunktur-bei-wiederkehrenden-blasenentzuendungen/">Akupunktur bei wiederkehrenden Blasenentzündungen</a>.</p>
<p>Das ist keine belastbare Grundlage für eine Erfolgsquote. Unterschiedliche Studien, Vergleichsbehandlungen und Messungen erschweren die Übertragung. Dass in den eingeschlossenen Studien keine schweren Nebenwirkungen beobachtet wurden, beweist auch nicht, dass jede Behandlung für jede Person risikofrei ist.</p>
<h2>Was zur üblichen Versorgung gehört</h2>
<p>Die Auswahl richtet sich nach Diagnose und Belastung. Blasentraining, passende Verhaltensmassnahmen und je nach Situation Medikamente oder weitere Verfahren können wichtig sein. Welche Option für dich sinnvoll ist, besprichst du mit der zuständigen Fachperson.</p>
<p>Eine <a href="/gesundheitsbibliothek/untersuchungen/urinuntersuchung/">Urinuntersuchung</a> beantwortet diagnostische Fragen, nicht die Frage nach dem Nutzen einer Akupunktur. Bei vorwiegenden Blasenschmerzen ist zudem die Abgrenzung zur <a href="/beschwerden/interstitielle-zystitis/">interstitiellen Zystitis</a> wichtig. Studien zur überaktiven Blase werden nicht einfach auf dieses Beschwerdebild übertragen.</p>
<h2>So bleibt ein Versuch überprüfbar</h2>
<p>Dokumentiere beispielsweise Harndrang, Toilettengänge und die Belastung im Alltag. Lege mit den Behandelnden fest, welches Ziel realistisch ist und wann der Versuch bewertet wird. Ein Blasentagebuch kann dabei helfen, Veränderungen von einem wechselhaften Verlauf zu unterscheiden.</p>
<p>Akupunktur wird mit der bisherigen Versorgung abgestimmt. Bei fehlendem relevantem Nutzen ist es sinnvoll, andere Optionen zu besprechen. Medikamente nicht selbst absetzen und nicht absichtlich zu wenig trinken, um einen scheinbar besseren Messwert zu erreichen.</p>
<h2>Vor einer Terminentscheidung</h2>
<p>Bring Diagnosen, Medikamentenliste und vorhandene Befunde mit. Frage nach Erfahrung mit dem Beschwerdebild, Grenzen und geplantem Prüfzeitraum. Kläre <a href="/krankenkassen/akupunktur/">Versicherung und Kosten</a> vor Beginn. Der <a href="/akupunktur-in-der-naehe/">Praxisfinder</a> hilft bei einer ergänzenden Anfrage; eine urologische Untersuchung wird dadurch nicht ersetzt.</p>
<h2>Häufige Fragen</h2>
<h3>Ist Akupunktur bei Reizblase zuverlässig wirksam?</h3>
<p>Das lässt sich nach der bisherigen Forschung nicht sicher sagen. Ein möglicher Nutzen bleibt individuell und unsicher.</p>
<h3>Gilt das auch für jede Inkontinenz?</h3>
<p>Nein. Überaktive Blase und beispielsweise Belastungsinkontinenz sind unterschiedliche Situationen und dürfen nicht gleichgesetzt werden.</p>
<h3>Wann sollte ich den Versuch beenden?</h3>
<p>Wenn der vereinbarte Prüfzeitraum keinen relevanten Nutzen zeigt oder Beschwerden zunehmen, wird der Plan neu bewertet.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://www.cochrane.org/evidence/CD013519_acupuncture-treating-overactive-bladder-adults" target="_blank" rel="noopener">Cochrane 2022: Acupuncture for treating overactive bladder in adults, CD013519</a></li>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/36148895/" target="_blank" rel="noopener">PubMed, vollständige Review-Metadaten</a></li>
<li><a href="https://www.nccih.nih.gov/health/acupuncture-effectiveness-and-safety" target="_blank" rel="noopener">NCCIH: Acupuncture, effectiveness and safety</a></li>
</ul>`,
    faqs: [],
    related: [
      { href: '/beschwerden/interstitielle-zystitis/', label: 'interstitiellen Zystitis', cat: 'Beschwerde' },
      { href: '/beschwerden/reizblase/', label: 'Reizblase', cat: 'Beschwerde' },
      { href: '/gesundheitsbibliothek/befunde-werte/blut-im-urin/', label: 'Blut im Urin (Hämaturie): Was bedeutet der Befund?', cat: 'Befund' },
      { href: '/gesundheitsbibliothek/untersuchungen/urinuntersuchung/', label: 'Urinuntersuchung', cat: 'Untersuchung' },
    ],
  },
  // ──────────────────────────────────────────── WELLE 4 (Draft, Redaktion ohne Reviewer)
  {
    slug: 'akupunktur-bei-neurodermitis',
    title: 'Akupunktur bei Neurodermitis: was Studien zeigen',
    metaDesc: 'Hilft Akupunktur bei Neurodermitis? Zwei kontrollierte Studien mit gemischten Ergebnissen: Was sie zu Juckreiz und Hautbild zeigen und wo die Grenzen liegen.',
    region: 'Schweizweit',
    excerpt: 'Zu Akupunktur bei Neurodermitis gibt es wenige, kleine Studien. Hinweise betreffen vor allem den Juckreiz, beim Hautbild sind die Ergebnisse uneinheitlich.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur bei Neurodermitis: Kann sie Juckreiz und Ekzem lindern?',
    lead: 'Zu Akupunktur bei Neurodermitis gibt es wenige, kleine Studien. Hinweise betreffen vor allem den Juckreiz, beim Hautbild sind die Ergebnisse uneinheitlich.',
    readingTime: '4 Min.',
    ctaTitle: 'Ergänzende Behandlung bei Neurodermitis besprechen',
    ctaText: 'Wenn deine Hautbehandlung steht und der Juckreiz trotzdem belastet, kannst du anfragen, ob ein zeitlich begrenzter Akupunkturversuch zu deinem Plan passt.',
    ctaLabel: 'Praxis finden',
    ctaHref: '/akupunktur-in-der-naehe/',
    author: REDAKTION,
    ...DATEN_W4,
    bodyHtml: `<div class="wa-callout"><div class="wa-callout-label">Kurz gesagt</div><p>Bei Erwachsenen mit leichter bis mittelschwerer Neurodermitis gibt es Hinweise, dass Akupunktur Juckreiz lindern kann. Ob sie das Ekzem selbst verbessert, ist unklar: Eine kleine Studie fand einen Effekt, eine grössere nicht. Akupunktur ersetzt keine Hautpflege und keine ärztlich verordnete Therapie.</p></div>
<h2>Worum es hier geht</h2>
<p>Neurodermitis, auch atopische Dermatitis, ist eine chronisch-entzündliche Hauterkrankung mit Schüben und starkem Juckreiz. Was die Erkrankung ist, wie sie erkannt und behandelt wird, erklärt die Seite <a href="/beschwerden/neurodermitis/">Neurodermitis</a>. Dieser Artikel beantwortet nur eine Frage: Ist ein ergänzender Akupunkturversuch sinnvoll?</p>
<h2>Was die Studien zeigen</h2>
<p><strong>Kleine Studie mit Scheinakupunktur:</strong> In einer koreanischen Studie von 2021 erhielten 36 Erwachsene zwischen 19 und 38 Jahren mit leichter bis mittelschwerer Neurodermitis vier Wochen lang zweimal pro Woche echte oder Scheinakupunktur. Das Hautbild, gemessen mit dem SCORAD-Wert, verbesserte sich in der Akupunkturgruppe deutlicher. Die Nachbeobachtung dauerte nur vier Wochen, und die Gruppe war sehr klein.</p>
<p><strong>Grössere offene Studie:</strong> Eine Studie der Charité Berlin von 2022 verglich bei 121 Erwachsenen Akupunktur, Osteopathie und keine Zusatzbehandlung, jeweils zusätzlich zur üblichen Versorgung. Nach zwölf Wochen unterschied sich der Schweregrad der Neurodermitis nicht zwischen den Gruppen. Der Juckreiz war in der Akupunkturgruppe geringer. Weil die Teilnehmenden wussten, welche Behandlung sie erhielten, und Juckreiz selbst eingeschätzt wird, ist dieser Unterschied vorsichtig zu lesen. Kosteneffektiv war die Zusatzbehandlung nicht.</p>
<p>Was die beiden Methoden grundsätzlich unterscheidet und worauf du bei der Wahl der Fachperson achten kannst, steht unter <a href="/wissen/akupunktur-oder-osteopathie/">Akupunktur oder Osteopathie</a>.</p>
<h2>Was daraus nicht folgt</h2>
<p>Die Daten stammen von Erwachsenen mit leichter bis mittelschwerer Erkrankung. Für Kinder, schwere Verläufe oder Menschen unter moderner Systemtherapie lassen sie sich nicht übertragen. Es gibt keine belastbare Aussage dazu, ob Akupunktur Schübe verhindert oder Kortisoncremes einspart. In der Berliner Studie zeigte sich dazu nur ein nicht gesicherter Trend.</p>
<h2>Was die Behandlung trägt</h2>
<p>Grundlage bleiben rückfettende Pflege, das Meiden persönlicher Auslöser und eine entzündungshemmende Behandlung im Schub nach dermatologischer Verordnung. Bei schweren Verläufen kommen weitere Therapien infrage. Verordnete Cremes oder Medikamente setzt du nicht wegen eines Akupunkturversuchs ab.</p>
<p>Die Studien zu Nadeln sind kein Beleg für eine Rezeptur; dafür gibt es die gesonderte Einordnung <a href="/wissen/chinesische-kraeuter-bei-neurodermitis/">chinesische Kräuter bei Neurodermitis</a>.</p>
<h2>So bleibt ein Versuch überprüfbar</h2>
<p>Lege vorher fest, was sich ändern soll, zum Beispiel Juckreiz auf einer Skala von 0 bis 10, Schlaf oder Kratzattacken. Vereinbare einen Prüfzeitpunkt, etwa nach vier bis sechs Sitzungen. Behandelt wird nicht auf entzündeter, nässender oder offener Haut. Bei Anzeichen einer Hautinfektion, etwa Eiterbläschen, Krusten oder Fieber, gehst du zuerst zur Ärztin.</p>
<h2>Risiken und Nebenwirkungen</h2>
<p>Bei Neurodermitis ist die Hautbarriere gestört und anfälliger für Infektionen. Deshalb wird nicht in entzündete, nässende oder aufgekratzte Haut gestochen, und auf Hygiene wird besonders geachtet. Häufig sind kleine blaue Flecken, kurzes Nachbluten oder Müdigkeit nach der Sitzung. Schwere Komplikationen sind selten; sie wurden vor allem bei unsterilen Nadeln oder unsachgemässer Behandlung beschrieben. Mehr dazu unter <a href="/gesundheitsbibliothek/fragen/akupunktur-nebenwirkungen/">Nebenwirkungen von Akupunktur</a>.</p>
<h2>Vor einer Terminentscheidung</h2>
<p>Bring die Diagnose und deine aktuelle Behandlung mit und frage nach Erfahrung mit Hauterkrankungen und Hygienemassnahmen. Kläre <a href="/krankenkassen/akupunktur/">Versicherung und Kosten</a> vor Beginn. Über den <a href="/akupunktur-in-der-naehe/">Praxisfinder</a> findest du eine Praxis für eine ergänzende Anfrage.</p>
<h2>Häufige Fragen</h2>
<h3>Hilft Akupunktur gegen den Juckreiz bei Neurodermitis?</h3>
<p>Es gibt Hinweise aus zwei Studien. Gesichert ist der Effekt nicht, und er kann individuell ausbleiben.</p>
<h3>Kann ich meine Kortisoncreme durch Akupunktur ersetzen?</h3>
<p>Nein. Akupunktur ist höchstens eine Ergänzung. Änderungen an der Behandlung besprichst du mit der Dermatologin.</p>
<h3>Ist Akupunktur bei Kindern mit Neurodermitis untersucht?</h3>
<p>Die hier beschriebenen Studien betrafen Erwachsene. Für Kinder lassen sich die Ergebnisse nicht übertragen.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/33926433/" target="_blank" rel="noopener">Park et al. 2021: Acupuncture in mild to moderate atopic dermatitis, randomized sham-controlled trial, BMC Complementary Medicine and Therapies</a></li>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/35875898/" target="_blank" rel="noopener">Rotter et al. 2022: Acupuncture and osteopathic medicine for atopic dermatitis, three-armed randomized trial, Clinical and Experimental Dermatology</a></li>
<li><a href="https://www.nccih.nih.gov/health/acupuncture-effectiveness-and-safety" target="_blank" rel="noopener">NCCIH: Acupuncture, effectiveness and safety</a></li>
</ul>`,
    faqs: [],
    related: [
      { href: '/beschwerden/neurodermitis/', label: 'Neurodermitis', cat: 'Beschwerde' },
      { href: '/beschwerden/nesselsucht/', label: 'Nesselsucht', cat: 'Beschwerde' },
      { href: '/wissen/akupunktur-bei-nesselsucht/', label: 'Akupunktur bei Nesselsucht', cat: 'Artikel' },
    ],
  },
  {
    slug: 'akupunktur-bei-sehnenscheidenentzuendung',
    title: 'Akupunktur bei Sehnenscheidenentzündung: Studienlage',
    metaDesc: 'Akupunktur bei Sehnenscheidenentzündung: Die Daten stammen fast nur zur Form am Daumen (De Quervain). Was sie zeigen, was nicht und wie ein Versuch geprüft wird.',
    region: 'Schweizweit',
    excerpt: 'Studien zur Akupunktur bei Sehnenscheidenentzündung betreffen fast ausschliesslich die Form am Daumen. Für andere Sehnen fehlen Daten.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur bei Sehnenscheidenentzündung: Was ist belegt?',
    lead: 'Studien zur Akupunktur bei Sehnenscheidenentzündung betreffen fast ausschliesslich die Form am Daumen. Für andere Sehnen fehlen Daten.',
    readingTime: '4 Min.',
    ctaTitle: 'Ergänzende Behandlung der Sehnenreizung besprechen',
    ctaText: 'Wenn die Diagnose steht, kannst du anfragen, ob ein begrenzter Akupunkturversuch neben Schonung, Schiene oder Physiotherapie sinnvoll ist.',
    ctaLabel: 'Praxis finden',
    ctaHref: '/akupunktur-in-der-naehe/',
    author: REDAKTION,
    ...DATEN_W4,
    bodyHtml: `<div class="wa-callout"><div class="wa-callout-label">Kurz gesagt</div><p>Fast alle Studien betreffen die Sehnenscheidenentzündung am Daumen, die Tendovaginitis de Quervain. Dort deuten kleine Studien auf eine Schmerzlinderung hin, ohne Vorteil gegenüber einer Kortisoninjektion. Für Sehnenreizungen an anderen Stellen lässt sich daraus nichts ableiten.</p></div>
<h2>Worum es hier geht</h2>
<p>Eine Sehnenscheidenentzündung kann an vielen Sehnen von Hand, Fuss oder Unterarm auftreten. Ursachen, Formen und Behandlung erklärt die Seite <a href="/beschwerden/sehnenscheidenentzuendung/">Sehnenscheidenentzündung</a>. Hier geht es um die Frage, ob Akupunktur ergänzend sinnvoll sein kann.</p>
<h2>Was die Studien zeigen</h2>
<p><strong>Akupunktur oder Kortison:</strong> In einer iranischen Studie von 2014 mit 30 Personen mit De-Quervain-Sehnenscheidenentzündung erhielt eine Gruppe fünf Akupunktursitzungen, die andere eine einzelne Kortisoninjektion. Nach sechs Wochen hatten sich Schmerz und Funktion in beiden Gruppen gebessert, mit der Injektion etwas deutlicher. Eine Scheinbehandlung gab es nicht, die Nachbeobachtung war kurz.</p>
<p><strong>Zusammenfassung von 14 Studien:</strong> Eine Meta-Analyse von 2024 mit 851 Personen, überwiegend aus chinesischen Studien, fand gegenüber schmerzlindernden Salben eine stärkere Schmerzabnahme mit Akupunktur. Gegenüber Kortisoninjektionen zeigte sich kein Unterschied. Die Autorinnen und Autoren bewerten Menge und Qualität der Studien als begrenzt und fordern weitere Forschung.</p>
<h2>Was daraus nicht folgt</h2>
<p>Die Ergebnisse gelten für den Daumen und das Handgelenk an der Daumenseite. Sie lassen sich nicht auf einen <a href="/beschwerden/schnappfinger/">Schnappfinger</a>, auf Sehnen am Fuss, am Unterarm oder auf eine bakterielle Sehnenscheidenentzündung übertragen. Auch Dry Needling oder Kombinationen mit anderen Verfahren sind nicht dasselbe wie die untersuchte Akupunktur.</p>
<h2>Was die Behandlung trägt</h2>
<p>Üblich sind Entlastung, eine Schiene, Schmerzmittel nach Absprache, Handtherapie und bei anhaltenden Beschwerden eine Kortisoninjektion. Ein Eingriff kommt in Frage, wenn diese Schritte nicht ausreichen. Ein Akupunkturversuch ist höchstens eine Ergänzung, etwa für Menschen, die eine Injektion zunächst vermeiden möchten, und das nach ärztlicher Besprechung.</p>
<h2>So bleibt ein Versuch überprüfbar</h2>
<p>Notiere vorher Schmerz bei typischen Griffen, etwa beim Öffnen eines Glases, und eine Funktionseinschränkung im Alltag. Vereinbare einen Prüfzeitpunkt nach wenigen Wochen. Bessert sich nichts relevant, werden andere Optionen besprochen.</p>
<h2>Wann zuerst ärztlich abklären</h2>
<p>Rötung, Überwärmung, Schwellung entlang einer Sehne, Fieber oder Beschwerden nach einer Verletzung oder einem Schnitt gehören am gleichen Tag ärztlich beurteilt. Eine infektiöse Sehnenscheidenentzündung ist ein Notfall und kein Fall für Akupunktur.</p>
<h2>Risiken und Nebenwirkungen</h2>
<p>An Hand und Handgelenk liegen Sehnen, Nerven und Gefässe dicht beieinander. Kribbeln oder ein elektrisierendes Gefühl während der Sitzung meldest du sofort. Häufig sind kleine blaue Flecken, kurzes Nachbluten oder Müdigkeit nach der Sitzung. Schwere Komplikationen sind selten; sie wurden vor allem bei unsterilen Nadeln oder unsachgemässer Behandlung beschrieben. Mehr dazu unter <a href="/gesundheitsbibliothek/fragen/akupunktur-nebenwirkungen/">Nebenwirkungen von Akupunktur</a>.</p>
<h2>Vor einer Terminentscheidung</h2>
<p>Bring Diagnose und bisherige Behandlung mit. Kläre <a href="/krankenkassen/akupunktur/">Versicherung und Kosten</a> vorab. Der <a href="/akupunktur-in-der-naehe/">Praxisfinder</a> hilft bei einer ergänzenden Anfrage.</p>
<h2>Häufige Fragen</h2>
<h3>Wirkt Akupunktur so gut wie eine Kortisonspritze?</h3>
<p>In den wenigen Vergleichsstudien zum Daumen zeigte sich kein klarer Unterschied, eine Einzelstudie sah die Injektion etwas vorne. Belastbar ist das nicht.</p>
<h3>Gilt das auch für Sehnenscheidenentzündungen am Fuss?</h3>
<p>Nein. Die Studien betreffen fast nur den Daumen; für andere Stellen fehlen Daten.</p>
<h3>Wie viele Sitzungen sind sinnvoll?</h3>
<p>Das lässt sich aus den Studien nicht ableiten. Sinnvoll ist ein kurzer, klar begrenzter Versuch mit Prüfzeitpunkt.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/24929455/" target="_blank" rel="noopener">Hadianfard et al. 2014: Efficacy of acupuncture versus local methylprednisolone acetate injection in De Quervain's tenosynovitis, randomized controlled trial</a></li>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/38932434/" target="_blank" rel="noopener">Qin et al. 2024: Systematic review and meta-analysis of acupuncture for De Quervain's tenosynovitis, Postgraduate Medical Journal</a></li>
<li><a href="https://www.nccih.nih.gov/health/acupuncture-effectiveness-and-safety" target="_blank" rel="noopener">NCCIH: Acupuncture, effectiveness and safety</a></li>
</ul>`,
    faqs: [],
    related: [
      { href: '/beschwerden/sehnenscheidenentzuendung/', label: 'Sehnenscheidenentzündung', cat: 'Beschwerde' },
      { href: '/beschwerden/schnappfinger/', label: 'Schnappfinger', cat: 'Beschwerde' },
      { href: '/wissen/akupunktur-bei-karpaltunnelsyndrom/', label: 'Akupunktur bei Karpaltunnelsyndrom', cat: 'Artikel' },
    ],
  },
  {
    slug: 'akupunktur-bei-achillessehnenbeschwerden',
    title: 'Akupunktur bei Achillessehnenbeschwerden: Studien',
    metaDesc: 'Akupunktur bei Achillessehnenschmerzen: zwei kleine Studien, ein Vergleich mit Training, ein Zusatz zum Training. Was sie zeigen und warum das Training zentral bleibt.',
    region: 'Schweizweit',
    excerpt: 'Zwei kleine Studien deuten auf Schmerzlinderung hin. Die Grundlage der Behandlung bleibt das gezielte Belastungstraining der Sehne.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur bei Achillessehnenbeschwerden: Ergänzung zum Training?',
    lead: 'Zwei kleine Studien deuten auf Schmerzlinderung hin. Die Grundlage der Behandlung bleibt das gezielte Belastungstraining der Sehne.',
    readingTime: '4 Min.',
    ctaTitle: 'Ergänzung zum Sehnentraining besprechen',
    ctaText: 'Wenn Schmerzen das Training an der Achillessehne erschweren, kannst du anfragen, ob ein begrenzter Akupunkturversuch ergänzend passt.',
    ctaLabel: 'Praxis finden',
    ctaHref: '/akupunktur-in-der-naehe/',
    author: REDAKTION,
    ...DATEN_W4,
    bodyHtml: `<div class="wa-callout"><div class="wa-callout-label">Kurz gesagt</div><p>Bei chronischen Achillessehnenbeschwerden gibt es zwei kleine Studien mit positiven Signalen für Akupunktur. Keine davon war verblindet oder gross genug, um den Nutzen sicher zu belegen. Akupunktur kann ein Training der Sehne ergänzen, aber nicht ersetzen.</p></div>
<h2>Worum es hier geht</h2>
<p>Schmerzen an der Achillessehne entstehen meist durch Überlastung. Formen, Abklärung und Behandlung erklärt die Seite <a href="/beschwerden/achillessehnenentzuendung/">Achillessehnenentzündung</a>. Hier geht es nur um die Frage, ob Akupunktur ergänzend hilft.</p>
<h2>Was die Studien zeigen</h2>
<p><strong>Akupunktur statt exzentrischem Training:</strong> In einer chinesischen Studie von 2013 mit 64 Personen mit chronischer Achillessehnenreizung verbesserten sich Schmerz und Funktion nach acht Wochen mit Akupunktur deutlicher als mit exzentrischem Training, und der Unterschied hielt bis 24 Wochen an. Die Studie war nicht verblindet, und Vergleiche gegen eine aktive Behandlung, deren Durchführung schwer zu kontrollieren ist, sind anfällig für Verzerrungen.</p>
<p><strong>Elektroakupunktur als Zusatz:</strong> Eine US-Studie von 2023 untersuchte 52 Personen mit Beschwerden am Sehnenansatz an der Ferse. Alle trainierten exzentrisch; eine Gruppe erhielt in den ersten vier Terminen zusätzlich <a href="/therapien/elektroakupunktur/">Elektroakupunktur</a>. Kurzfristig berichtete diese Gruppe weniger Schmerz beim Üben. Bei der Funktion nach zwölf Wochen gab es keinen Unterschied.</p>
<h2>Was daraus nicht folgt</h2>
<p>Die Studien sind klein, in einem Fall ohne Scheinbehandlung und mit kurzer Nachbeobachtung. Ein Ersatz des Trainings lässt sich daraus nicht ableiten. Auch für einen akuten Riss oder einen Teilriss der Achillessehne gelten diese Daten nicht.</p>
<h2>Was die Behandlung trägt</h2>
<p>Im Zentrum steht ein schrittweises Belastungstraining der Sehne, zum Beispiel exzentrisch, angeleitet in der <a href="/therapien/physiotherapie/">Physiotherapie</a>. Dazu kommen Belastungssteuerung im Sport und passendes Schuhwerk. Weitere Verfahren werden je nach Verlauf ergänzt.</p>
<h2>So bleibt ein Versuch überprüfbar</h2>
<p>Notiere Morgensteifigkeit, Schmerz bei den ersten Schritten und Schmerz beim Training. Vereinbare einen Prüfzeitpunkt nach einigen Sitzungen. Das Training läuft während des Versuchs weiter.</p>
<h2>Wann zuerst ärztlich abklären</h2>
<p>Ein plötzlicher Knall oder Peitschenschlag in der Wade, eine tastbare Lücke in der Sehne oder Probleme beim Zehenstand können auf einen Riss hinweisen. Eine geschwollene, schmerzhafte Wade, Rötung, Überwärmung oder Fieber gehören ebenfalls rasch abgeklärt.</p>
<h2>Risiken und Nebenwirkungen</h2>
<p>Nimmst du Blutverdünner, sag das vor der ersten Sitzung, weil blaue Flecken dann häufiger sein können. Elektroakupunktur ist bei Herzschrittmachern oder anderen Implantaten nur nach Rücksprache möglich. Häufig sind kleine blaue Flecken, kurzes Nachbluten oder Müdigkeit nach der Sitzung. Schwere Komplikationen sind selten; sie wurden vor allem bei unsterilen Nadeln oder unsachgemässer Behandlung beschrieben. Mehr dazu unter <a href="/gesundheitsbibliothek/fragen/akupunktur-nebenwirkungen/">Nebenwirkungen von Akupunktur</a>.</p>
<h2>Vor einer Terminentscheidung</h2>
<p>Bring Diagnose, Trainingsplan und Hinweise zu Blutverdünnern mit. Kläre <a href="/krankenkassen/akupunktur/">Versicherung und Kosten</a> vorab. Der <a href="/akupunktur-in-der-naehe/">Praxisfinder</a> hilft bei einer ergänzenden Anfrage.</p>
<h2>Häufige Fragen</h2>
<h3>Kann ich das Training durch Akupunktur ersetzen?</h3>
<p>Nein. Das Training ist die Grundlage. Akupunktur kann es höchstens ergänzen, wenn Schmerzen das Üben erschweren.</p>
<h3>Hilft Akupunktur beim Riss der Achillessehne?</h3>
<p>Dazu gibt es keine Daten. Ein Riss braucht eine ärztliche oder chirurgische Behandlung.</p>
<h3>Ist Elektroakupunktur besser als klassische Akupunktur?</h3>
<p>Das lässt sich aus den beiden Studien nicht beurteilen, sie haben unterschiedliche Fragen untersucht.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/23263998/" target="_blank" rel="noopener">Zhang et al. 2013: Acupuncture for chronic Achilles tendinopathy, randomized controlled study, Chinese Journal of Integrative Medicine</a></li>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/37095788/" target="_blank" rel="noopener">Hawks et al. 2023: Insertional Achilles tendinopathy and adjunct electroacupuncture, randomized controlled trial, Medical Acupuncture</a></li>
<li><a href="https://www.nccih.nih.gov/health/acupuncture-effectiveness-and-safety" target="_blank" rel="noopener">NCCIH: Acupuncture, effectiveness and safety</a></li>
</ul>`,
    faqs: [],
    related: [
      { href: '/beschwerden/achillessehnenentzuendung/', label: 'Achillessehnenentzündung', cat: 'Beschwerde' },
      { href: '/beschwerden/fersensporn/', label: 'Fersensporn', cat: 'Beschwerde' },
      { href: '/wissen/akupunktur-bei-fersensporn/', label: 'Akupunktur bei Fersensporn', cat: 'Artikel' },
    ],
  },
  {
    slug: 'akupunktur-bei-wiederkehrenden-blasenentzuendungen',
    title: 'Akupunktur bei wiederkehrenden Blasenentzündungen',
    metaDesc: 'Kann Akupunktur wiederkehrenden Blasenentzündungen vorbeugen? Eine Studie bei Frauen mit gemischten Ergebnissen: was sie zeigt und was vor einem Versuch wichtig ist.',
    region: 'Schweizweit',
    excerpt: 'Eine Studie bei Frauen mit wiederkehrenden unkomplizierten Infekten fand nach einem Jahr weniger Infekte mit Akupunktur. Bestätigt ist das noch nicht.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur bei wiederkehrenden Blasenentzündungen: Vorbeugung möglich?',
    lead: 'Eine Studie bei Frauen mit wiederkehrenden unkomplizierten Infekten fand nach einem Jahr weniger Infekte mit Akupunktur. Bestätigt ist das noch nicht.',
    readingTime: '4 Min.',
    ctaTitle: 'Vorbeugung ergänzend besprechen',
    ctaText: 'Wenn wiederkehrende Infekte urologisch oder gynäkologisch abgeklärt sind, kannst du anfragen, ob ein vorbeugender Akupunkturversuch zu deinem Plan passt.',
    ctaLabel: 'Praxis finden',
    ctaHref: '/akupunktur-in-der-naehe/',
    author: REDAKTION,
    ...DATEN_W4,
    bodyHtml: `<div class="wa-callout"><div class="wa-callout-label">Kurz gesagt</div><p>Eine österreichische Studie bei Frauen mit wiederkehrenden unkomplizierten Blasenentzündungen fand mit Akupunktur zusätzlich zu Cranberry-Produkten über zwölf Monate weniger Infekte. Nach sechs Monaten war der Unterschied noch nicht gesichert. Eine einzelne, offene Studie reicht nicht für eine feste Empfehlung. Ein akuter Infekt wird nicht mit Akupunktur behandelt.</p></div>
<h2>Worum es hier geht</h2>
<p>Was eine Blasenentzündung ist, wie sie erkannt und behandelt wird, erklärt die Seite <a href="/beschwerden/blasenentzuendung/">Blasenentzündung</a>. Dieser Artikel behandelt nur die Frage, ob Akupunktur bei Frauen mit häufigen Rückfällen vorbeugend sinnvoll sein kann.</p>
<h2>Was die Studie zeigt</h2>
<p>In der Studie von 2024 wurden 137 Frauen mit wiederkehrenden unkomplizierten Harnwegsinfekten in eine Akupunktur- und eine Kontrollgruppe aufgeteilt. Alle erhielten die Empfehlung, Cranberry-Produkte zu verwenden. Die Akupunkturgruppe bekam zwölf Sitzungen über 18 Wochen mit festgelegten Körper- und Ohrpunkten.</p>
<ul>
<li>Nach sechs Monaten waren 59 Prozent der Akupunkturgruppe und 46 Prozent der Kontrollgruppe infektfrei. Dieser Unterschied war statistisch nicht gesichert.</li>
<li>Zwischen dem sechsten und zwölften Monat waren 66 gegenüber 45 Prozent infektfrei, ein gesicherter Unterschied.</li>
<li>Die Zahl der Infekte nach zwölf Monaten war in der Akupunkturgruppe geringer.</li>
</ul>
<p>Es gab keine Scheinakupunktur, die Teilnehmerinnen wussten also, welche Behandlung sie erhielten. Nicht alle konnten bis zum Ende ausgewertet werden. Die Autorinnen und Autoren halten weitere Studien für nötig.</p>
<h2>Was daraus nicht folgt</h2>
<p>Die Ergebnisse gelten für Frauen mit unkomplizierten Infekten. Sie lassen sich nicht auf Männer, Schwangere, Kinder, Menschen mit Katheter oder auf komplizierte Infekte übertragen. Bei Blasenschmerzen ohne Infektnachweis ist eher an eine <a href="/beschwerden/interstitielle-zystitis/">interstitielle Zystitis</a> oder eine <a href="/beschwerden/reizblase/">Reizblase</a> zu denken; dafür gilt diese Studie nicht.</p>
<h2>Was zur Vorbeugung gehört</h2>
<p>Bei häufigen Rückfällen wird zuerst geklärt, ob wirklich Infekte vorliegen, etwa mit <a href="/gesundheitsbibliothek/untersuchungen/urinuntersuchung/">Urinkultur</a>, und ob es begünstigende Faktoren gibt. Je nach Situation werden verschiedene vorbeugende Massnahmen besprochen, mit und ohne Antibiotika. Diese Entscheidungen gehören in ärztliche Hand.</p>
<h2>So bleibt ein Versuch überprüfbar</h2>
<p>Führe einen Kalender mit bestätigten Infekten und Antibiotikagaben im Jahr davor und während des Versuchs. Weil die Studie Effekte erst nach Monaten zeigte, braucht die Beurteilung Zeit. Lege mit den Behandelnden fest, wann bilanziert wird.</p>
<h2>Wann sofort ärztlich abklären</h2>
<p>Fieber, Schüttelfrost, Flankenschmerzen, Blut im Urin, Beschwerden in der Schwangerschaft oder bei Männern gehören ärztlich beurteilt. Einen akuten Infekt behandelt Akupunktur nicht.</p>
<h2>Risiken und Nebenwirkungen</h2>
<p>Ein Versuch ersetzt nicht die rasche Behandlung eines neuen Infekts. Treten während der Behandlungsserie Infektzeichen auf, geht die ärztliche Beurteilung vor. Häufig sind kleine blaue Flecken, kurzes Nachbluten oder Müdigkeit nach der Sitzung. Schwere Komplikationen sind selten; sie wurden vor allem bei unsterilen Nadeln oder unsachgemässer Behandlung beschrieben. Mehr dazu unter <a href="/gesundheitsbibliothek/fragen/akupunktur-nebenwirkungen/">Nebenwirkungen von Akupunktur</a>.</p>
<h2>Vor einer Terminentscheidung</h2>
<p>Bring Befunde und eine Liste der bisherigen Infekte mit. Kläre <a href="/krankenkassen/akupunktur/">Versicherung und Kosten</a> vorab. Der <a href="/akupunktur-in-der-naehe/">Praxisfinder</a> hilft bei einer ergänzenden Anfrage.</p>
<h2>Häufige Fragen</h2>
<h3>Kann Akupunktur eine akute Blasenentzündung behandeln?</h3>
<p>Dafür gibt es keine Belege. Ein akuter Infekt gehört ärztlich beurteilt.</p>
<h3>Ersetzt Akupunktur eine vorbeugende Antibiotikabehandlung?</h3>
<p>Das ist nicht untersucht. Sprich jede Änderung mit deiner Ärztin ab.</p>
<h3>Wie lange dauert ein vorbeugender Versuch?</h3>
<p>In der Studie dauerte die Behandlung 18 Wochen, und Effekte zeigten sich erst später. Ein kurzer Versuch wäre kaum aussagekräftig.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/39060726/" target="_blank" rel="noopener">Ots, Gold et al. 2024: Segmental acupuncture for prevention of recurrent urinary tract infections, randomised clinical trial, International Urogynecology Journal</a></li>
<li><a href="https://www.nccih.nih.gov/health/acupuncture-effectiveness-and-safety" target="_blank" rel="noopener">NCCIH: Acupuncture, effectiveness and safety</a></li>
</ul>`,
    faqs: [],
    related: [
      { href: '/beschwerden/blasenentzuendung/', label: 'Blasenentzündung', cat: 'Beschwerde' },
      { href: '/beschwerden/interstitielle-zystitis/', label: 'Interstitielle Zystitis', cat: 'Beschwerde' },
      { href: '/gesundheitsbibliothek/untersuchungen/urinuntersuchung/', label: 'Urinuntersuchung', cat: 'Untersuchung' },
    ],
  },
  {
    slug: 'akupunktur-bei-restless-legs',
    title: 'Akupunktur bei Restless Legs: Leitlinie und Studien',
    metaDesc: 'Hilft Akupunktur beim Restless-Legs-Syndrom? Die US-Schlafmedizin sieht keine ausreichende Grundlage für eine Empfehlung. Was Studien zeigen und was zuerst zählt.',
    region: 'Schweizweit',
    excerpt: 'Eine aktuelle Leitlinie sieht für Akupunktur bei Restless Legs keine ausreichende Evidenz. Vorrang haben Eisenwerte, Auslöser und bewährte Behandlungen.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur bei Restless Legs: Was die Evidenz sagt',
    lead: 'Eine aktuelle Leitlinie sieht für Akupunktur bei Restless Legs keine ausreichende Evidenz. Vorrang haben Eisenwerte, Auslöser und bewährte Behandlungen.',
    readingTime: '4 Min.',
    ctaTitle: 'Ergänzung nach der Abklärung besprechen',
    ctaText: 'Wenn Eisenwerte und Auslöser geprüft sind und du ergänzend etwas versuchen möchtest, kannst du anfragen, ob ein begrenzter Versuch sinnvoll ist.',
    ctaLabel: 'Praxis finden',
    ctaHref: '/akupunktur-in-der-naehe/',
    author: REDAKTION,
    ...DATEN_W4,
    bodyHtml: `<div class="wa-callout"><div class="wa-callout-label">Kurz gesagt</div><p>Die Leitlinie der American Academy of Sleep Medicine von 2024 sieht die Evidenz zu Akupunktur beim Restless-Legs-Syndrom als unzureichend und uneindeutig an und spricht keine Empfehlung aus. Auch ein älterer Cochrane-Review kam zu keinem Schluss. Wichtiger sind die Prüfung der Eisenwerte und das Erkennen von Auslösern.</p></div>
<h2>Worum es hier geht</h2>
<p>Beim Restless-Legs-Syndrom treten in Ruhe, vor allem abends, unangenehme Empfindungen und ein Bewegungsdrang in den Beinen auf. Diagnose und Behandlung erklärt die Seite <a href="/beschwerden/restless-legs/">Restless Legs</a>. Hier geht es nur um die Frage, ob Akupunktur ergänzend sinnvoll ist.</p>
<h2>Was Leitlinie und Studien zeigen</h2>
<p><strong>Leitlinie:</strong> Die American Academy of Sleep Medicine hat 2024 die Behandlungsoptionen systematisch bewertet. Für Akupunktur reichten die Daten nicht für eine Empfehlung, weder dafür noch dagegen.</p>
<p><strong>Cochrane-Review:</strong> Eine Übersicht von 2008 fand nur zwei Studien mit insgesamt 170 Personen, beide mit methodischen Mängeln. Die Autoren schlossen, dass sich nicht beurteilen lässt, ob Akupunktur wirksam und sicher ist.</p>
<p><strong>Neuere Einzelstudie:</strong> Eine chinesische Studie von 2024 mit 66 Personen verglich zwei Akupunkturformen miteinander, ohne Scheinbehandlung und ohne Gruppe ohne Akupunktur, über einen Monat mit Sitzungen an sechs Tagen pro Woche. Ob Akupunktur überhaupt besser wirkt als keine oder eine Scheinbehandlung, beantwortet dieses Design nicht.</p>
<h2>Was daraus nicht folgt</h2>
<p>Einzelne Studien bei Menschen unter Dialyse betreffen eine besondere Situation mit eigener Behandlung. Sie lassen sich nicht auf andere Betroffene übertragen. Ebenso wenig sind Erfahrungen mit Massagen, Wärme oder Kombinationsbehandlungen ein Beleg für Akupunktur.</p>
<h2>Was zuerst zählt</h2>
<p>Die Leitlinie empfiehlt, bei allen Betroffenen mit relevanten Beschwerden die Eisenwerte zu prüfen, einschliesslich <a href="/gesundheitsbibliothek/befunde-werte/ferritin-zu-niedrig/">Ferritin</a> und <a href="/gesundheitsbibliothek/befunde-werte/transferrinsaettigung/">Transferrinsättigung</a>, idealerweise morgens. Danach geht es um verstärkende Faktoren wie Alkohol, Koffein, bestimmte Medikamente und eine unbehandelte Schlafapnoe. Die Laborwerte bestimmen mit, ob und wie Eisen gegeben wird; das entscheidet die Ärztin, ebenso über Medikamente.</p>
<h2>Wenn du trotzdem einen Versuch erwägst</h2>
<p>Ein Versuch kommt höchstens ergänzend in Frage, wenn die ärztliche Abklärung erfolgt ist. Lege vorher fest, was sich ändern soll, zum Beispiel Einschlafdauer oder Beschwerdeabende pro Woche, und wann bilanziert wird. Bleibt ein Effekt aus, wird der Versuch beendet.</p>
<h2>Risiken und Nebenwirkungen</h2>
<p>Bei Restless Legs fällt die Behandlung oft in den Abend. Wenn das Liegen während der Sitzung den Bewegungsdrang auslöst, sprich das an; die Lagerung kann angepasst werden. Häufig sind kleine blaue Flecken, kurzes Nachbluten oder Müdigkeit nach der Sitzung. Schwere Komplikationen sind selten; sie wurden vor allem bei unsterilen Nadeln oder unsachgemässer Behandlung beschrieben. Mehr dazu unter <a href="/gesundheitsbibliothek/fragen/akupunktur-nebenwirkungen/">Nebenwirkungen von Akupunktur</a>.</p>
<h2>Vor einer Terminentscheidung</h2>
<p>Bring Laborwerte und Medikamentenliste mit. Kläre <a href="/krankenkassen/akupunktur/">Versicherung und Kosten</a> vorab. Der <a href="/akupunktur-in-der-naehe/">Praxisfinder</a> hilft bei einer ergänzenden Anfrage.</p>
<h2>Häufige Fragen</h2>
<h3>Wird Akupunktur bei Restless Legs empfohlen?</h3>
<p>Nein. Die US-Leitlinie von 2024 spricht wegen unzureichender Daten keine Empfehlung aus.</p>
<h3>Warum sind Eisenwerte so wichtig?</h3>
<p>Eisenmangel spielt beim Restless-Legs-Syndrom eine Rolle, und die Eisenwerte beeinflussen die Wahl der Behandlung. Die Leitlinie nennt dafür eigene Schwellenwerte; die Beurteilung gehört in ärztliche Hand.</p>
<h3>Gilt das auch für Restless Legs bei Dialyse?</h3>
<p>Für Menschen unter Dialyse gelten eigene Empfehlungen. Besprich das mit deinem Nephrologie-Team.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/39324694/" target="_blank" rel="noopener">Winkelman et al. 2025: Treatment of restless legs syndrome and periodic limb movement disorder, AASM clinical practice guideline, Journal of Clinical Sleep Medicine</a></li>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/18843716/" target="_blank" rel="noopener">Cui et al. 2008: Acupuncture for restless legs syndrome, Cochrane Database of Systematic Reviews</a></li>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/39331896/" target="_blank" rel="noopener">Guan et al. 2024: He Tiao Du Ren An Shen acupuncture for restless leg syndrome, randomized trial, Medicine</a></li>
<li><a href="https://www.nccih.nih.gov/health/acupuncture-effectiveness-and-safety" target="_blank" rel="noopener">NCCIH: Acupuncture, effectiveness and safety</a></li>
</ul>`,
    faqs: [],
    related: [
      { href: '/beschwerden/restless-legs/', label: 'Restless Legs', cat: 'Beschwerde' },
      { href: '/beschwerden/eisenmangel/', label: 'Eisenmangel', cat: 'Beschwerde' },
      { href: '/gesundheitsbibliothek/befunde-werte/transferrinsaettigung/', label: 'Transferrinsättigung', cat: 'Befund' },
    ],
  },
  {
    slug: 'akupunktur-bei-fazialisparese',
    title: 'Akupunktur bei Fazialisparese: was belegt ist',
    metaDesc: 'Akupunktur bei Gesichtslähmung (Bell-Parese): Ein Cochrane-Review fand keine verwertbaren Belege, eine neuere Studie betrifft chronische Verläufe. Grenzen und Ablauf.',
    region: 'Schweizweit',
    excerpt: 'Bei akuter Gesichtslähmung haben Abklärung, Kortison nach ärztlicher Entscheidung und Augenschutz Vorrang. Für Akupunktur fehlen belastbare Belege.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur bei Fazialisparese: Wann sie besprochen werden kann',
    lead: 'Bei akuter Gesichtslähmung haben Abklärung, Kortison nach ärztlicher Entscheidung und Augenschutz Vorrang. Für Akupunktur fehlen belastbare Belege.',
    readingTime: '4 Min.',
    ctaTitle: 'Ergänzung nach ärztlicher Behandlung besprechen',
    ctaText: 'Wenn die Lähmung ärztlich abgeklärt und behandelt ist, kannst du anfragen, ob ein begrenzter ergänzender Versuch zu deiner Situation passt.',
    ctaLabel: 'Praxis finden',
    ctaHref: '/akupunktur-in-der-naehe/',
    author: REDAKTION,
    ...DATEN_W4,
    bodyHtml: `<div class="wa-callout"><div class="wa-callout-label">Kurz gesagt</div><p>Ein Cochrane-Review fand die Studien zu Akupunktur bei Bell-Parese zu mangelhaft für eine Aussage. Eine neuere Studie zu chronischen Verläufen nach über einem Jahr zeigte Verbesserungen mit Elektroakupunktur gegenüber Elektrostimulation der Haut. Für die akute Lähmung ersetzt Akupunktur keine ärztliche Behandlung.</p></div>
<h2>Zuerst: eine Gesichtslähmung ist ein Notfall</h2>
<p>Hängt ein Mundwinkel oder schliesst ein Auge plötzlich nicht mehr, muss sofort ein Schlaganfall ausgeschlossen werden. Wähle bei zusätzlichen Zeichen wie Sprach-, Seh- oder Armstörungen den Notruf 144. Wie eine Fazialisparese abgeklärt und behandelt wird und warum der Augenschutz wichtig ist, erklärt die Seite <a href="/beschwerden/fazialisparese/">Fazialisparese</a>.</p>
<h2>Was die Studien zeigen</h2>
<p><strong>Cochrane-Review:</strong> Die Übersicht von 2010 schloss sechs Studien mit 537 Personen ein. Keine berichtete die Endpunkte, die der Review vorgesehen hatte, und Mängel bei Zufallszuteilung, Verblindung und Berichterstattung verhinderten zuverlässige Schlüsse. Die Autorinnen und Autoren hielten keine Aussage zur Wirksamkeit für möglich.</p>
<p><strong>Chronische Verläufe:</strong> Eine chinesische Studie von 2024 untersuchte 60 Personen, deren Gesichtslähmung sich nach zwölf Monaten nicht zurückgebildet hatte. Eine Gruppe erhielt 18 Sitzungen <a href="/therapien/elektroakupunktur/">Elektroakupunktur</a>, die andere eine elektrische Stimulation über die Haut. Die Gesichtssymmetrie in einem Nervenindex verbesserte sich mit Elektroakupunktur stärker, auch nach 24 Wochen. In einer zweiten Bewertungsskala zeigte sich nach sechs Wochen kein Unterschied. Die Gruppe war klein, und Elektrostimulation ist keine Scheinbehandlung.</p>
<h2>Was daraus nicht folgt</h2>
<p>Die Studie zu chronischen Verläufen sagt nichts über die akute Phase. Daraus lässt sich nicht ableiten, dass Akupunktur die Erholung in den ersten Wochen beschleunigt. Auch Lähmungen durch Verletzung, Tumor, Gürtelrose oder Borreliose sind andere Situationen.</p>
<h2>Was die Behandlung trägt</h2>
<p>In der akuten Phase entscheidet die Ärztin rasch über Kortison und je nach Ursache weitere Medikamente. Der Schutz des Auges mit Tropfen, Salbe und nachts einem Uhrglasverband ist zentral. Später kann <a href="/therapien/physiotherapie/">Physiotherapie</a> mit Übungen für die Gesichtsmuskulatur helfen. Bei ausbleibender Erholung können spezialisierte Zentren weitere Optionen prüfen.</p>
<h2>Wenn du einen Versuch erwägst</h2>
<p>Ein ergänzender Versuch kann nach der ärztlichen Akutbehandlung besprochen werden, am ehesten bei anhaltender Schwäche. Lege vorher fest, woran Fortschritt gemessen wird, etwa Fotos mit standardisierten Gesichtsbewegungen, und wann bilanziert wird. Das Auge bleibt geschützt.</p>
<h2>Risiken und Nebenwirkungen</h2>
<p>Im Gesicht und rund um das Auge wird besonders vorsichtig behandelt. Ein Auge, das sich nicht vollständig schliesst, braucht weiterhin seinen Schutz, auch während der Sitzung. Häufig sind kleine blaue Flecken, kurzes Nachbluten oder Müdigkeit nach der Sitzung. Schwere Komplikationen sind selten; sie wurden vor allem bei unsterilen Nadeln oder unsachgemässer Behandlung beschrieben. Mehr dazu unter <a href="/gesundheitsbibliothek/fragen/akupunktur-nebenwirkungen/">Nebenwirkungen von Akupunktur</a>.</p>
<h2>Vor einer Terminentscheidung</h2>
<p>Bring Diagnose, Verlauf und Augenbefund mit. Kläre <a href="/krankenkassen/akupunktur/">Versicherung und Kosten</a> vorab. Der <a href="/akupunktur-in-der-naehe/">Praxisfinder</a> hilft bei einer ergänzenden Anfrage.</p>
<h2>Häufige Fragen</h2>
<h3>Sollte ich bei einer frischen Gesichtslähmung zuerst zur Akupunktur?</h3>
<p>Nein. Zuerst kommt die sofortige ärztliche Abklärung. Über Kortison entscheidet die Ärztin in den ersten Tagen.</p>
<h3>Hilft Akupunktur, wenn die Lähmung nach Monaten bleibt?</h3>
<p>Eine kleine Studie zu chronischen Verläufen zeigte Verbesserungen mit Elektroakupunktur. Belastbar ist das noch nicht.</p>
<h3>Was ist mit dem Auge während der Behandlung?</h3>
<p>Der Augenschutz bleibt wichtig, solange sich das Lid nicht vollständig schliesst. Rötung oder Schmerzen am Auge gehören ärztlich beurteilt.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/20687071/" target="_blank" rel="noopener">Chen et al. 2010: Acupuncture for Bell's palsy, Cochrane Database of Systematic Reviews</a></li>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/38134327/" target="_blank" rel="noopener">Li et al. 2024: Electroacupuncture with intermittent wave stimulation for chronic Bell's palsy, randomized controlled trial, Postgraduate Medical Journal</a></li>
<li><a href="https://www.nccih.nih.gov/health/acupuncture-effectiveness-and-safety" target="_blank" rel="noopener">NCCIH: Acupuncture, effectiveness and safety</a></li>
</ul>`,
    faqs: [],
    related: [
      { href: '/beschwerden/fazialisparese/', label: 'Fazialisparese', cat: 'Beschwerde' },
      { href: '/beschwerden/guertelrose/', label: 'Gürtelrose', cat: 'Beschwerde' },
      { href: '/therapien/elektroakupunktur/', label: 'Elektroakupunktur', cat: 'Therapie' },
    ],
  },
  {
    slug: 'akupunktur-bei-nesselsucht',
    title: 'Akupunktur bei Nesselsucht: Studie und Grenzen',
    metaDesc: 'Akupunktur bei chronischer Nesselsucht: Eine grosse Studie fand messbare, aber klinisch nicht relevante Unterschiede. Was das bedeutet und was die Behandlung trägt.',
    region: 'Schweizweit',
    excerpt: 'Eine grosse Studie fand mit Akupunktur weniger Quaddeln und Juckreiz als mit Scheinakupunktur. Der Unterschied lag aber unter der Schwelle, die Betroffene deutlich spüren.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur bei Nesselsucht: Was die grosse Studie zeigt',
    lead: 'Eine grosse Studie fand mit Akupunktur weniger Quaddeln und Juckreiz als mit Scheinakupunktur. Der Unterschied lag aber unter der Schwelle, die Betroffene deutlich spüren.',
    readingTime: '4 Min.',
    ctaTitle: 'Ergänzung zur Urtikaria-Behandlung besprechen',
    ctaText: 'Wenn deine Nesselsucht ärztlich behandelt wird und du ergänzend etwas versuchen möchtest, kannst du anfragen, ob ein begrenzter Versuch sinnvoll ist.',
    ctaLabel: 'Praxis finden',
    ctaHref: '/akupunktur-in-der-naehe/',
    author: REDAKTION,
    ...DATEN_W4,
    bodyHtml: `<div class="wa-callout"><div class="wa-callout-label">Kurz gesagt</div><p>In einer grossen Studie zur chronischen spontanen Urtikaria verbesserte Akupunktur die Krankheitsaktivität stärker als Scheinakupunktur oder Abwarten. Der Unterschied erreichte aber nicht die Schwelle für einen klinisch bedeutsamen Effekt. Akupunktur ist damit kein Ersatz für die ärztliche Stufentherapie.</p></div>
<h2>Worum es hier geht</h2>
<p>Bei chronischer Nesselsucht treten über mehr als sechs Wochen immer wieder Quaddeln, Juckreiz oder Schwellungen auf. Formen, Auslöser und Behandlung erklärt die Seite <a href="/beschwerden/nesselsucht/">Nesselsucht</a>. Hier geht es nur um die Frage, ob Akupunktur ergänzend sinnvoll ist.</p>
<h2>Was die Studie zeigt</h2>
<p>Die Studie wurde 2023 in den Annals of Internal Medicine veröffentlicht. 330 Personen mit chronischer spontaner Urtikaria aus drei chinesischen Kliniken erhielten vier Wochen lang Akupunktur, Scheinakupunktur oder keine Behandlung, gefolgt von vier Wochen Nachbeobachtung. Gemessen wurde der Wochenwert der Urtikaria-Aktivität, der Quaddeln und Juckreiz zusammenfasst.</p>
<ul>
<li>Mit Akupunktur sank der Wert stärker als mit Scheinakupunktur und als ohne Behandlung.</li>
<li>Beide Unterschiede lagen unter der Grenze, ab der eine Veränderung als klinisch bedeutsam gilt.</li>
<li>Etwa jede siebte Person in der Akupunkturgruppe berichtete leichte, vorübergehende Nebenwirkungen.</li>
</ul>
<p>Die Autorinnen und Autoren nennen selbst Grenzen: keine vollständige Verblindung, selbst berichtete Ergebnisse, kurze Nachbeobachtung und eingeschränkte Übertragbarkeit, weil Antihistaminika während der Studie nicht erlaubt waren.</p>
<h2>Was daraus nicht folgt</h2>
<p>Die Studie betrifft die chronische spontane Form. Für akute Nesselsucht, körperlich ausgelöste Formen wie Druck- oder Kälteurtikaria und für Schwellungen ohne Quaddeln sagt sie nichts aus. Auch eine Wirkung zusätzlich zu Antihistaminika wurde nicht geprüft.</p>
<h2>Was die Behandlung trägt</h2>
<p>Die übliche Behandlung erfolgt stufenweise, beginnend mit nicht müde machenden Antihistaminika, deren Dosis ärztlich angepasst werden kann, und weiteren Optionen bei unzureichender Wirkung. Ein Tagebuch zu Schüben und möglichen Verstärkern hilft der Ärztin bei der Steuerung.</p>
<h2>So bleibt ein Versuch überprüfbar</h2>
<p>Erfasse die Krankheitsaktivität vorher und während des Versuchs, etwa mit einem Wochenwert für Quaddeln und Juckreiz. Lege einen Prüfzeitpunkt fest und ändere die Medikamente nicht eigenmächtig.</p>
<h2>Wann sofort Hilfe holen</h2>
<p>Schwellung von Zunge, Lippen oder Rachen, Atemnot, Schluckbeschwerden oder Kreislaufprobleme sind ein Notfall. Wähle den Notruf 144.</p>
<h2>Risiken und Nebenwirkungen</h2>
<p>Bei Nesselsucht können Reize auf der Haut Quaddeln auslösen. In der grossen Studie berichtete etwa jede siebte Person leichte, vorübergehende Nebenwirkungen. Sag vorher, wenn bei dir Druck oder Reibung Schübe auslösen. Häufig sind kleine blaue Flecken, kurzes Nachbluten oder Müdigkeit nach der Sitzung. Schwere Komplikationen sind selten; sie wurden vor allem bei unsterilen Nadeln oder unsachgemässer Behandlung beschrieben. Mehr dazu unter <a href="/gesundheitsbibliothek/fragen/akupunktur-nebenwirkungen/">Nebenwirkungen von Akupunktur</a>.</p>
<h2>Vor einer Terminentscheidung</h2>
<p>Bring Diagnose und aktuelle Medikation mit. Kläre <a href="/krankenkassen/akupunktur/">Versicherung und Kosten</a> vorab. Der <a href="/akupunktur-in-der-naehe/">Praxisfinder</a> hilft bei einer ergänzenden Anfrage.</p>
<h2>Häufige Fragen</h2>
<h3>Hilft Akupunktur bei chronischer Nesselsucht?</h3>
<p>Die grösste Studie fand einen messbaren, aber kleinen Effekt, der unter der Schwelle für einen spürbaren Unterschied lag.</p>
<h3>Kann ich Antihistaminika weglassen?</h3>
<p>Nein. Änderungen an der Medikation besprichst du mit deiner Ärztin.</p>
<h3>Gilt das auch für akute Nesselsucht?</h3>
<p>Nein. Die Studie betraf nur die chronische spontane Form.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/37956431/" target="_blank" rel="noopener">Zheng et al. 2023: Efficacy of acupuncture for chronic spontaneous urticaria, randomized controlled trial, Annals of Internal Medicine</a></li>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/38109741/" target="_blank" rel="noopener">Correction: Efficacy of acupuncture for chronic spontaneous urticaria, Annals of Internal Medicine 2024 (betrifft die Fallzahlplanung im Methodenteil)</a></li>
<li><a href="https://www.nccih.nih.gov/health/acupuncture-effectiveness-and-safety" target="_blank" rel="noopener">NCCIH: Acupuncture, effectiveness and safety</a></li>
</ul>`,
    faqs: [],
    related: [
      { href: '/beschwerden/nesselsucht/', label: 'Nesselsucht', cat: 'Beschwerde' },
      { href: '/beschwerden/neurodermitis/', label: 'Neurodermitis', cat: 'Beschwerde' },
      { href: '/wissen/akupunktur-bei-neurodermitis/', label: 'Akupunktur bei Neurodermitis', cat: 'Artikel' },
    ],
  },
  {
    slug: 'akupunktur-bei-aromatasehemmer-gelenkschmerzen',
    title: 'Akupunktur bei Gelenkschmerzen durch Aromatasehemmer',
    metaDesc: 'Gelenkschmerzen unter Aromatasehemmern nach Brustkrebs: Eine grosse US-Studie fand mit Akupunktur etwas weniger Schmerzen. Was das bedeutet und was vorher zu klären ist.',
    region: 'Schweizweit',
    excerpt: 'Eine grosse Studie bei Frauen mit Brustkrebs unter Aromatasehemmern fand mit Akupunktur etwas weniger Gelenkschmerzen als mit Schein- oder keiner Akupunktur. Der Unterschied war klein, seine klinische Bedeutung unsicher.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur bei Gelenkschmerzen unter Aromatasehemmern: Was ist belegt?',
    lead: 'Eine grosse Studie bei Frauen mit Brustkrebs unter Aromatasehemmern fand mit Akupunktur etwas weniger Gelenkschmerzen als mit Schein- oder keiner Akupunktur. Der Unterschied war klein, seine klinische Bedeutung unsicher.',
    readingTime: '4 Min.',
    ctaTitle: 'Ergänzung mit dem Onkologie-Team abstimmen',
    ctaText: 'Wenn dein Onkologie-Team einverstanden ist, kannst du anfragen, ob ein begrenzter Akupunkturversuch bei Gelenkschmerzen zu deiner Situation passt.',
    ctaLabel: 'Eignung anfragen',
    ctaHref: '/akupunktur-in-der-naehe/',
    author: REDAKTION,
    ...DATEN_W4,
    bodyHtml: `<div class="wa-callout"><div class="wa-callout-label">Kurz gesagt</div><p>Bei Frauen mit hormonempfindlichem Brustkrebs, die unter einem Aromatasehemmer Gelenkschmerzen entwickelten, verringerte Akupunktur in einer grossen US-Studie die Schmerzen stärker als Schein- oder keine Akupunktur, auch nach einem Jahr. Der Unterschied war klein und blieb unter der vorab als klinisch bedeutsam festgelegten Schwelle. Ein Versuch wird immer mit dem Onkologie-Team abgestimmt.</p></div>
<h2>Worum es hier geht</h2>
<p>Aromatasehemmer wie Anastrozol, Letrozol oder Exemestan senken das Rückfallrisiko bei hormonempfindlichem Brustkrebs. Gelenkschmerzen und Steifigkeit gehören zu den häufigen Nebenwirkungen und können dazu führen, dass die Behandlung abgebrochen wird. Dieser Artikel beantwortet nur eine Frage: Kann Akupunktur bei diesen Gelenkschmerzen helfen? Allgemeine Sicherheitsfragen rund um Akupunktur während einer Krebsbehandlung beantwortet die Seite <a href="/gesundheitsbibliothek/fragen/akupunktur-waehrend-chemotherapie/">Akupunktur während Chemotherapie</a>.</p>
<h2>Was die Studie zeigt</h2>
<p>An der Studie nahmen 226 Frauen an elf Zentren in den USA teil. Sie hatten Brustkrebs im Stadium I bis III, nahmen einen Aromatasehemmer und hatten seitdem Gelenkschmerzen. Sie erhielten über zwölf Wochen echte Akupunktur, eine Scheinakupunktur mit oberflächlichen Nadeln an anderen Punkten oder zunächst keine Behandlung.</p>
<ul>
<li>Nach sechs Wochen war der stärkste Schmerz mit echter Akupunktur um knapp einen Punkt auf einer Skala von 0 bis 10 geringer als in den beiden Vergleichsgruppen. Die vorab festgelegte Schwelle von zwei Punkten wurde nicht erreicht.</li>
<li>Eine Auswertung nach 52 Wochen zeigte weiterhin rund einen Punkt Unterschied. Diese Auswertung war nicht der ursprünglich geplante Hauptendpunkt; Funktionstests unterschieden sich nicht.</li>
<li>Blaue Flecken traten mit echter Akupunktur häufiger auf.</li>
</ul>
<h2>Was daraus nicht folgt</h2>
<p>Die Ergebnisse gelten für Gelenkschmerzen, die unter einem Aromatasehemmer neu aufgetreten oder stärker geworden sind. Sie lassen sich nicht auf andere Nebenwirkungen, andere Krebsarten oder Gelenkschmerzen anderer Ursache übertragen. Akupunktur behandelt den Krebs nicht.</p>
<h2>Was zuerst zählt</h2>
<p>Sprich Gelenkschmerzen früh mit deinem Onkologie-Team an, bevor du eine Einnahme pausierst oder abbrichst. Untersucht wurden unter anderem Bewegung und verschiedene Medikamente, mit gemischten Ergebnissen; welche Schritte passen, entscheidet das Onkologie-Team. Andere Ursachen wie Arthrose oder entzündliche Gelenkerkrankungen werden mitbedacht.</p>
<h2>Sicherheit vor dem Termin</h2>
<p>Vor einem Versuch klärst du mit dem Onkologie-Team, ob aus onkologischer Sicht aktuell etwas dagegen spricht. Die Behandelnden sollten Erfahrung mit onkologischen Patientinnen haben. Nach einer Lymphknotenentfernung oder Bestrahlung der Achsel kommt die Frage dazu, ob und wo an der betroffenen Seite genadelt wird, siehe <a href="/gesundheitsbibliothek/fragen/akupunktur-nach-lymphknotenentfernung/">Akupunktur nach Lymphknotenentfernung</a>.</p>
<h2>Risiken und Nebenwirkungen</h2>
<p>In der Studie traten blaue Flecken mit echter Akupunktur häufiger auf. Schwere Komplikationen sind selten; sie wurden vor allem bei unsterilen Nadeln oder unsachgemässer Behandlung beschrieben. Mehr dazu unter <a href="/gesundheitsbibliothek/fragen/akupunktur-nebenwirkungen/">Nebenwirkungen von Akupunktur</a>.</p>
<h2>Vor einer Terminentscheidung</h2>
<p>Bring Therapieplan, aktuelle Befunde und Medikamentenliste mit. Kläre <a href="/krankenkassen/akupunktur/">Versicherung und Kosten</a> vorab. Der <a href="/akupunktur-in-der-naehe/">Praxisfinder</a> hilft bei einer ergänzenden Anfrage.</p>
<p>Wenn neben Gelenkschmerzen vor allem Erschöpfung belastet, ist das eine andere Behandlungsfrage; die gesonderte Einordnung steht unter <a href="/wissen/akupunktur-bei-krebsbedingter-fatigue/">Akupunktur bei krebsbedingter Fatigue</a>.</p>
<h2>Häufige Fragen</h2>
<h3>Kann Akupunktur die Wirkung des Aromatasehemmers beeinträchtigen?</h3>
<p>Dazu machen die Studien keine Aussage. Deshalb gehört jede ergänzende Behandlung ins Gespräch mit dem Onkologie-Team.</p>
<h3>Wie viele Sitzungen wurden in der Studie gemacht?</h3>
<p>Zwölf Wochen lang, zuerst zweimal, dann einmal pro Woche. Das ist kein festes Schema für jede Patientin.</p>
<h3>Hilft Akupunktur auch gegen Hitzewallungen durch die Antihormontherapie?</h3>
<p>Das ist eine andere Frage mit eigener Studienlage und wird hier nicht beantwortet.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://jamanetwork.com/journals/jama/fullarticle/2687355" target="_blank" rel="noopener">Hershman et al. 2018: Effect of acupuncture vs sham acupuncture or waitlist control on joint pain related to aromatase inhibitors, JAMA</a></li>
<li><a href="https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2798317" target="_blank" rel="noopener">Hershman et al. 2022: Comparison of acupuncture vs sham acupuncture or waiting list control for aromatase inhibitor-related joint pain, 52-week results, JAMA Network Open</a></li>
<li><a href="https://www.nccih.nih.gov/health/acupuncture-effectiveness-and-safety" target="_blank" rel="noopener">NCCIH: Acupuncture, effectiveness and safety</a></li>
</ul>`,
    faqs: [],
    related: [
      { href: '/gesundheitsbibliothek/fragen/akupunktur-waehrend-chemotherapie/', label: 'Akupunktur während Chemotherapie', cat: 'Frage' },
      { href: '/beschwerden/arthrose/', label: 'Arthrose', cat: 'Beschwerde' },
      { href: '/beschwerden/lymphoedem/', label: 'Lymphödem', cat: 'Beschwerde' },
    ],
  },
  // Neun-Artikel-Paket 21.10.2026: 07 trockene Augen, 08 krebsbedingte Fatigue, 09 stabile COPD (Texte Teil B, Quellen Teil C)
  {
    slug: 'akupunktur-bei-trockenen-augen',
    title: 'Akupunktur bei trockenen Augen: Studien und Grenzen',
    metaDesc: 'Akupunktur bei trockenen Augen: Was kontrollierte Studien zeigen, warum Tränenfilmwerte nicht alles sagen und wann augenärztliche Abklärung Vorrang hat.',
    region: 'Schweizweit',
    excerpt: 'Du verwendest bereits Augentropfen und fragst dich, ob Akupunktur zusätzlich helfen könnte. Es gibt kontrollierte Studien, ihre Ergebnisse sind jedoch nicht einheitlich. Wichtig ist, ob nicht nur ein Messwert, sondern dein Alltag spürbar besser wird.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur bei trockenen Augen: Sinnvolle Ergänzung zu Augentropfen?',
    lead: 'Du verwendest bereits Augentropfen und fragst dich, ob Akupunktur zusätzlich helfen könnte. Es gibt kontrollierte Studien, ihre Ergebnisse sind jedoch nicht einheitlich. Wichtig ist, ob nicht nur ein Messwert, sondern dein Alltag spürbar besser wird.',
    readingTime: '3 Min.',
    ctaTitle: 'Eine ergänzende Akupunkturberatung anfragen',
    ctaText: 'Nenne deine augenärztliche Diagnose, laufende Behandlung und mögliche Eingriffe. Wir klären, welche Fachperson eine Beratung übernehmen kann. Eine spezielle Augenbehandlung an jedem Standort wird damit nicht zugesagt.',
    ctaLabel: 'Anfrage senden',
    ctaHref: '/kontakt/',
    author: REDAKTION,
    ...DATEN_N,
    bodyHtml: `<h2>Kurz gesagt</h2>
<p>Akupunktur ist kein gesicherter Ersatz für Augentropfen oder eine augenärztliche Behandlung. Einzelne Studien berichten Vorteile, andere zeigen gegenüber Scheinakupunktur keinen klaren Unterschied. Ein Behandlungsversuch kommt deshalb allenfalls als besprochene Ergänzung infrage, mit begrenzter Erwartung und einem klaren Prüfziel.</p>
<p>Die Ursachen und die medizinische Einordnung bleiben auf der Seite zu <a href="/beschwerden/trockene-augen/">trockenen Augen</a>. Dieser Artikel beantwortet die Methodenentscheidung.</p>
<h2>Warum die Vergleichsgruppe wichtig ist</h2>
<p>Eine randomisierte Studie von 2010 untersuchte 42 Personen mit mittelschweren bis schweren trockenen Augen. Nach drei Wochen zeigten sich zwischen echter und Scheinakupunktur keine statistisch klaren Unterschiede bei Beschwerden, Tränenfilmstabilität oder Tränenproduktion. Verbesserungen innerhalb einer Gruppe waren deshalb kein Nachweis einer Überlegenheit der echten Akupunktur.</p>
<p>Eine andere Studie von 2022 betraf 90 Menschen mit trockenen Augen nach einer Kataraktoperation. Nach acht Wochen war die Tränenfilmstabilität unter echter Akupunktur besser als unter Scheinakupunktur. Ein Vorteil beim Beschwerdefragebogen bestand nach acht, aber nicht mehr nach zwölf Wochen. Die besondere Gruppe nach einer Operation lässt sich nicht auf alle Ursachen trockener Augen übertragen.</p>
<p>Diese Ergebnisse dürfen nicht zu einer einheitlichen Erfolgsgeschichte zusammengezogen werden. Sie betreffen verschiedene Menschen, Abläufe und Endpunkte.</p>
<h2>Bessere Messwerte sind nicht automatisch weniger Beschwerden</h2>
<p>Bei trockenen Augen werden unter anderem Tränenfilm und Beschwerden erfasst. Für deine Entscheidung ist wichtig, was sich im Alltag ändern soll: länger lesen können, weniger störendes Brennen oder weniger Unterbrechungen bei Bildschirmarbeit. Ein statistisch anderer Messwert beantwortet diese Fragen nicht allein.</p>
<p>Bitte die Fachperson deshalb um ein konkretes Ziel und einen vereinbarten Zeitpunkt zur Bewertung. Wenn sich Beschwerden nicht verändern, sollte nicht allein ein erklärtes «Energieungleichgewicht» als Grund für immer weitere Termine dienen. Die Daten begründen keine garantierte Zahl von Sitzungen bis zur Wirkung.</p>
<h2>Die augenärztliche Behandlung bleibt die Grundlage</h2>
<p>Trockene Augen haben unterschiedliche mögliche Auslöser, darunter Kontaktlinsen, Medikamente, Umgebungsbedingungen oder andere Erkrankungen. Bei anhaltenden Beschwerden ist die Ursache zu prüfen. Je nach Situation gehören etwa Tränenersatz und Lidpflege zum Behandlungsplan.</p>
<p>Setze verordnete Augentropfen nicht selbst ab. Bringe zur Beratung mit, was du bereits benutzt und was die Augenärztin festgestellt hat. Nach einer Augenoperation sollte das operierende Team in die Entscheidung einbezogen werden; die positive postoperative Studie ist keine allgemeine Freigabe für frühe Termine nach jedem Eingriff.</p>
<p>Die Methode und allgemeine Risiken beschreibt <a href="/therapien/akupunktur/">Akupunktur</a>. Dieser Artikel gibt keine Anleitung zu Nadeln am Auge und bestätigt keine besondere Qualifikation einer konkreten Praxis.</p>
<h2>Wann du nicht auf einen Termin warten solltest</h2>
<p>Bei plötzlichem Sehverlust oder schweren akuten Augenbeschwerden sofort eine Augennotfallstelle beziehungsweise Notfallstation aufsuchen. Ein stark schmerzendes oder deutlich gerötetes Auge mit Lichtempfindlichkeit oder neuer Sehänderung braucht dringliche augenärztliche Beurteilung. Behandle das nicht einfach als bekannte Trockenheit.</p>
<h2>Häufige Fragen</h2>
<h3>Kann Akupunktur meine Augentropfen ersetzen?</h3>
<p>Die genannten Studien begründen keinen eigenständigen Ersatz. Eine Änderung gehört zur augenärztlichen Betreuung. Kläre vor einem Versuch, welche Behandlung unverändert weiterläuft.</p>
<h3>Gilt das auch bei Sjögren-Syndrom oder nach jeder Augenoperation?</h3>
<p>Nein. Die genannten Gruppen sind nicht beliebig austauschbar. Die Ursache und die Behandlungsgeschichte bestimmen mit, ob die vorliegenden Daten überhaupt zu deiner Situation passen.</p>
<h3>Ist damit Augenakupunktur nach einer bestimmten Methode gemeint?</h3>
<p>Nein. Unterschiedliche Nadelverfahren und Laserakupunktur dürfen nicht als dieselbe Intervention behandelt werden. Frage, welches Verfahren vorgeschlagen wird und welche passende Evidenz dafür vorliegt.</p>
<h2>Deinen nächsten Schritt klären</h2>
<p>Über die <a href="/kontakt/">Kontaktseite</a> kannst du eine ergänzende Beratung anfragen. Nenne bitte die Diagnose und die laufende augenärztliche Behandlung, damit vorab geklärt werden kann, ob eine passende Fachperson verfügbar ist.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/21070615/" target="_blank" rel="noopener">Shin et al. Acupuncture for treating dry eye: a randomized placebo-controlled trial. Acta Ophthalmologica, 2010. PMID 21070615. (PubMed-Abstract)</a></li>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/36347150/" target="_blank" rel="noopener">Kong et al. Randomized, sham-controlled trial of acupuncture for post-cataract surgery dry eye disease. Complementary Therapies in Clinical Practice, 2022. PMID 36347150. (PubMed-Abstract)</a></li>
<li><a href="https://www.nhs.uk/symptoms/dry-eyes/" target="_blank" rel="noopener">NHS. Dry eyes. Patienteninformation. (Patienteninformation, Volltext)</a></li>
<li><a href="https://www.nhs.uk/symptoms/eye-pain/" target="_blank" rel="noopener">NHS. Eye pain. Patienteninformation. (Patienteninformation, Volltext)</a></li>
</ul>`,
    faqs: [],
    related: [
      { href: '/beschwerden/trockene-augen/', label: 'Trockene Augen', cat: 'Beschwerde' },
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
      { href: '/gesundheitsbibliothek/fragen/akupunktur-nebenwirkungen/', label: 'Akupunktur: Nebenwirkungen', cat: 'Frage' },
      { href: '/gesundheitsbibliothek/fragen/akupunktur-nach-operation/', label: 'Akupunktur nach einer Operation', cat: 'Frage' },
    ],
  },
  {
    slug: 'akupunktur-bei-krebsbedingter-fatigue',
    title: 'Akupunktur bei krebsbedingter Fatigue: Was ist belegt?',
    metaDesc: 'Akupunktur bei krebsbedingter Fatigue: Was Studien und Leitlinien zeigen, warum Akupressur getrennt zählt und was vor einer ergänzenden Beratung zu klären ist.',
    region: 'Schweizweit',
    excerpt: 'Die Erschöpfung bleibt, obwohl du dich ausruhst. Wenn du während oder nach einer Krebsbehandlung nach zusätzlicher Unterstützung suchst, ist eine ehrliche Einordnung wichtig: Für Akupunktur ist die Evidenz nicht so eindeutig, wie manche Angebote vermuten lassen.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur bei krebsbedingter Fatigue: Was ist belegt?',
    lead: 'Die Erschöpfung bleibt, obwohl du dich ausruhst. Wenn du während oder nach einer Krebsbehandlung nach zusätzlicher Unterstützung suchst, ist eine ehrliche Einordnung wichtig: Für Akupunktur ist die Evidenz nicht so eindeutig, wie manche Angebote vermuten lassen.',
    readingTime: '3 Min.',
    ctaTitle: 'Ergänzende Beratung in Abstimmung mit deinem Behandlungsteam',
    ctaText: 'Nenne die Krebsbehandlung und die Empfehlung deines Behandlungsteams. Wir prüfen, ob eine passende Fachperson für eine ergänzende Beratung verfügbar ist. Eine Tumorbehandlung oder besondere onkologische Spezialisierung wird damit nicht angeboten oder zugesagt.',
    ctaLabel: 'Anfrage senden',
    ctaHref: '/kontakt/',
    author: REDAKTION,
    ...DATEN_N,
    bodyHtml: `<h2>Kurz gesagt</h2>
<p>Einzelne Studien berichten weniger krebsbedingte Fatigue unter Akupunktur. Eine verlässliche allgemeine Empfehlung lässt sich daraus bisher nicht ableiten. Die ASCO-SIO-Leitlinie von 2024 spricht wegen unzureichender oder uneinheitlicher Evidenz keine Empfehlung für oder gegen Akupunktur zur Fatigue bei Erwachsenen nach Abschluss der Krebsbehandlung aus; ihre Evidenztabelle nennt dazu zwei Studien mit 399 Teilnehmenden, eine positive und eine negative.</p>
<p>Das bedeutet nicht, dass niemand eine Verbesserung erleben kann. Es bedeutet, dass ein Angebot diese Unsicherheit offenlassen muss. Eine zusätzliche Behandlung darf die onkologische Abklärung und Betreuung nicht ersetzen.</p>
<h2>Was mit krebsbedingter Fatigue gemeint ist</h2>
<p>Krebsbedingte Fatigue kann durch die Erkrankung oder ihre Behandlung entstehen. Sie lässt sich durch Schlaf und Ruhe oft nicht vollständig beheben und kann selbst bei geringer Aktivität stark sein. Andere behandelbare Faktoren können mitwirken, etwa Blutarmut, Schmerzen oder Schlafprobleme.</p>
<p>Neue oder zunehmende Erschöpfung gehört deshalb zuerst zum Behandlungsteam. Unsere allgemeine Seite zu <a href="/beschwerden/erschoepfung/">Erschöpfung</a> ersetzt diese onkologische Einordnung nicht. Die Ergebnisse dieses Artikels dürfen auch nicht auf ME/CFS oder Long Covid übertragen werden.</p>
<h2>Warum positive Einzelstudien nicht die ganze Antwort sind</h2>
<p>Eine britische randomisierte Studie mit 302 Brustkrebspatientinnen verglich sechs Wochen Akupunktur zusätzlich zur üblichen Versorgung mit üblicher Versorgung allein. Nach sechs Wochen berichtete die Akupunkturgruppe weniger allgemeine Fatigue. Es gab aber keinen Vergleich mit Scheinakupunktur.</p>
<p>Ein solcher alltagsnaher Vergleich ist relevant, trennt den spezifischen Nadeleffekt jedoch nicht von anderen Unterschieden zwischen den Behandlungsgruppen. Er beantwortet auch nicht jede Frage zur Dauer des Nutzens oder zur Übertragbarkeit auf andere Krebsarten und Behandlungsphasen.</p>
<p>Die Leitlinie von 2024 empfiehlt unter anderem angepasste Bewegung, kognitive Verhaltenstherapie und achtsamkeitsbasierte Programme. Die jeweils passende Auswahl gehört in den Behandlungsplan. Für Akupunktur reichen ihre Daten nicht für eine Empfehlung. Empfehlungen zu Akupressur dürfen nicht auf Nadeln übertragen werden: Es sind unterschiedliche Verfahren.</p>
<p>Neuere Übersichten aus dem Jahr 2026 fassen mehr Studien zusammen: eine mit 13 Studien und 963 Brustkrebspatientinnen, eine mit 28 Studien zu verschiedenen Krebsarten. Beide berichten im Mittel weniger Fatigue unter Akupunktur, stufen die Verlässlichkeit aber als niedrig bis sehr niedrig ein und nennen Verzerrungsrisiken sowie Hinweise auf Publikationsbias. Eine kleine Pilotstudie mit Scheinakupunktur bei 68 Brustkrebspatientinnen fand nach sechs Wochen keinen Unterschied zwischen echter und Scheinakupunktur. Das Leitlinienfazit von 2024 ändert sich dadurch nicht.</p>
<h2>Die Frage nach dem Nutzen kommt nach der Sicherheitsprüfung</h2>
<p>Eine mögliche ergänzende Behandlung muss mit dem onkologischen Team abgestimmt werden. Behandlungsphase, Medikamente und aktuelle Befunde gehören vor dem Termin auf den Tisch. Die konkreten Sicherheitsfragen behandelt <a href="/gesundheitsbibliothek/fragen/akupunktur-waehrend-chemotherapie/">Akupunktur während Chemotherapie</a>.</p>
<p>Nach Entfernung oder Bestrahlung von Lymphknoten kommt eine eigene regionale Vorsichtsfrage hinzu. Welche Informationen dafür nötig sind, steht unter <a href="/gesundheitsbibliothek/fragen/akupunktur-nach-lymphknotenentfernung/">Akupunktur nach Lymphknotenentfernung</a>. Ein allgemeiner Artikel ist keine individuelle Freigabe.</p>
<p>Wenn eine Beratung infrage kommt, sollte sie Aufwand und mögliches Ziel ehrlich abwägen. Gerade bei Fatigue kann die Anreise selbst belastend sein. Bitte vorab um eine Einschätzung, ob der zusätzliche Termin in deinen bestehenden Plan passt und woran ihr einen möglichen Nutzen festmachen würdet.</p>
<h2>Keine automatische Kombination mit Kräutern</h2>
<p>Ein Gespräch über Akupunktur ist keine Freigabe für zusätzliche Präparate. Für chinesische Kräuter ist eine eigene produktbezogene Prüfung nötig. Das gilt besonders bei laufender medikamentöser Krebsbehandlung. Allgemeine Informationen zu pflanzlichen Produkten dürfen nicht als Beleg für ihre Eignung im konkreten onkologischen Plan verwendet werden.</p>
<h2>Häufige Fragen</h2>
<h3>Behandelt Akupunktur damit den Krebs?</h3>
<p>Nein. Die hier diskutierte Frage betrifft das Symptom Fatigue. Eine Veränderung der Erschöpfung ist kein Nachweis einer Wirkung auf den Tumor.</p>
<h3>Warum wird Akupressur teilweise anders bewertet?</h3>
<p>Akupressur verwendet Druck statt Nadeln. Die Forschung und die Empfehlungen müssen für jedes Verfahren getrennt gelesen werden. Eine Empfehlung zur Selbstakupressur begründet keine Empfehlung für Akupunktur.</p>
<h3>Kann ich trotzdem eine Beratung anfragen?</h3>
<p>Ja, nachdem die zusätzliche Massnahme mit deinem Behandlungsteam besprochen wurde. Vorab muss geklärt werden, ob eine passende Fachperson verfügbar ist und ob der zusätzliche Aufwand für dich vertretbar erscheint.</p>
<h2>Deinen nächsten Schritt klären</h2>
<p>Beginne beim onkologischen Behandlungsteam. Wenn eine ergänzende Beratung gewünscht ist, kannst du über die <a href="/kontakt/">Kontaktseite</a> nach einer passenden Ansprechperson fragen. Die Anfrage ist keine Zusage einer spezialisierten onkologischen Behandlung.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/38754041/" target="_blank" rel="noopener">Bower et al. Management of Fatigue in Adult Survivors of Cancer: ASCO-Society for Integrative Oncology Guideline Update. Journal of Clinical Oncology, 2024. PMID 38754041. DOI 10.1200/JCO.24.00541. (PubMed-Abstract und PMC-Volltext mit Empfehlungstabelle)</a></li>
<li><a href="https://www.cancer.gov/about-cancer/treatment/side-effects/fatigue" target="_blank" rel="noopener">National Cancer Institute. Cancer Fatigue. Patienteninformation. (Patienteninformation, Volltext)</a></li>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/23109700/" target="_blank" rel="noopener">Molassiotis et al. Acupuncture for cancer-related fatigue in patients with breast cancer: a pragmatic randomized controlled trial. Journal of Clinical Oncology, 2012. PMID 23109700. (PubMed-Abstract)</a></li>
<li><a href="https://www.nccih.nih.gov/health/traditional-chinese-medicine-what-you-need-to-know" target="_blank" rel="noopener">NCCIH. Traditional Chinese Medicine: What You Need To Know. (Patienteninformation, Volltext)</a></li>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/42363469/" target="_blank" rel="noopener">Effects of acupuncture on cancer-related fatigue and quality of life in breast cancer survivors: a systematic review and meta-analysis of randomized controlled trials. Medicine, 2026. PMID 42363469. (PubMed-Abstract)</a></li>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/42164120/" target="_blank" rel="noopener">Effectiveness of acupuncture for cancer-related fatigue: a systematic review and meta-analysis. Frontiers in Oncology, 2026. PMID 42164120. (PubMed-Abstract)</a></li>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/41821024/" target="_blank" rel="noopener">Acupuncture vs. sham acupuncture for cancer-related fatigue in patients with breast cancer: a double-center, randomized, single-blind pilot study. BMC Complementary Medicine and Therapies, 2026. PMID 41821024. (PubMed-Abstract)</a></li>
</ul>`,
    faqs: [],
    related: [
      { href: '/gesundheitsbibliothek/fragen/akupunktur-waehrend-chemotherapie/', label: 'Akupunktur während Chemotherapie', cat: 'Frage' },
      { href: '/gesundheitsbibliothek/fragen/akupunktur-nach-lymphknotenentfernung/', label: 'Akupunktur nach Lymphknotenentfernung', cat: 'Frage' },
      { href: '/beschwerden/erschoepfung/', label: 'Erschöpfung', cat: 'Beschwerde' },
      { href: '/wissen/akupunktur-bei-aromatasehemmer-gelenkschmerzen/', label: 'Akupunktur bei Gelenkschmerzen durch Aromatasehemmer', cat: 'Wissen' },
    ],
  },
  {
    slug: 'akupunktur-bei-copd',
    title: 'Akupunktur bei COPD: Studien zu Atemnot und Grenzen',
    metaDesc: 'Akupunktur bei stabiler COPD: Was kontrollierte Studien zu Atemnot und Belastbarkeit zeigen und weshalb Inhalation und Lungenrehabilitation wichtig bleiben.',
    region: 'Schweizweit',
    excerpt: 'Du möchtest im Alltag wieder besser zurechtkommen und fragst dich, ob Akupunktur zusätzlich helfen kann. Es gibt Studien mit günstigen Ergebnissen. Sie begründen aber weder eine Heilung der COPD noch einen Ersatz für die pneumologische Behandlung.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur bei stabiler COPD: Kann sie Belastungsatemnot lindern?',
    lead: 'Du möchtest im Alltag wieder besser zurechtkommen und fragst dich, ob Akupunktur zusätzlich helfen kann. Es gibt Studien mit günstigen Ergebnissen. Sie begründen aber weder eine Heilung der COPD noch einen Ersatz für die pneumologische Behandlung.',
    readingTime: '3 Min.',
    ctaTitle: 'Ergänzende Akupunkturberatung bei stabiler COPD anfragen',
    ctaText: 'Nenne deine COPD-Diagnose, laufende Behandlung und das Ziel der Beratung. Wir klären, welche Fachperson infrage kommt. Bei neuer oder stärkerer Atemnot ist zuerst die medizinische Beurteilung nötig.',
    ctaLabel: 'Anfrage senden',
    ctaHref: '/kontakt/',
    author: REDAKTION,
    ...DATEN_N,
    bodyHtml: `<h2>Kurz gesagt</h2>
<p>Akupunktur kann als zusätzliche Möglichkeit besprochen werden, wenn eine COPD ärztlich diagnostiziert und stabil behandelt ist. Kleinere kontrollierte Studien berichten Vorteile bei einzelnen Messgrössen. Wie dauerhaft und für wen sie im Alltag relevant sind, ist noch nicht ausreichend geklärt.</p>
<p>Inhalativa, ein vereinbarter Notfallplan und eine empfohlene Lungenrehabilitation werden dadurch nicht ersetzt. Die grundlegende Einordnung gehört zur Seite <a href="/beschwerden/copd/">COPD</a>. Hier geht es um die zusätzliche Methodenentscheidung, nicht um die Behandlung akuter Atemnot.</p>
<h2>Was eine Studie mit Scheinakupunktur zeigte</h2>
<p>Eine 2024 veröffentlichte Studie aus zwei chinesischen Zentren teilte 74 Menschen mit COPD echter oder Scheinakupunktur zu. Beide Gruppen erhielten weiter ihre medikamentöse Behandlung. Vorgesehen waren 36 Sitzungen über zwölf Wochen. Beim primären Lungenfunktionsmass zeigte sich ein Unterschied zugunsten der echten Akupunktur.</p>
<p>Die Studie war klein und hatte keine anschliessende Nachbeobachtung. Ob sich damit der langfristige Verlauf, schwere Verschlechterungen oder andere wichtige Endpunkte verändern, blieb ungeklärt. Sie belegt deshalb nicht, dass COPD dauerhaft aufgehalten oder geschädigtes Lungengewebe wiederhergestellt wird.</p>
<h2>Belastbarkeit und Lebensqualität sind eigene Ergebnisse</h2>
<p>Eine weitere randomisierte Studie von 2025 schloss 150 Menschen mit stabiler COPD ein. Verglichen wurden Akupunktur, konventionelle Medikamente und ihre Kombination. Die Kombination schnitt unter anderem bei der Gehstrecke im Sechs-Minuten-Test besser ab als Medikamente allein. Für die SGRQ-Lebensqualitätsskala zeigte der Abstract dagegen keinen Gruppen- oder Interaktionseffekt. Eine japanische Studie über ein Jahr mit 45 Teilnehmenden verglich wöchentliche Akupunktur zusätzlich zur üblichen Versorgung mit üblicher Versorgung allein und berichtete nach 52 Wochen eine deutlich bessere Lebensqualität im SGRQ; ohne Scheinakupunktur und bei so kleiner Gruppe ist das ein Hinweis, kein Nachweis.</p>
<p>Damit lässt sich nicht einfach behaupten, alle erfassten Bereiche seien besser geworden. Eine längere Gehstrecke, ein Lungenfunktionswert und weniger Atemnot beim Anziehen sind verschiedene Ergebnisse. Für deine Entscheidung zählt, ob ein möglicher Effekt zu deinem persönlichen Alltagsziel passt.</p>
<h2>Was im bestehenden Behandlungsplan bleibt</h2>
<p>Zu den etablierten COPD-Massnahmen gehören Rauchstopp, passende Medikamente und Lungenrehabilitation. Die Erkrankung ist nicht heilbar, lässt sich aber behandeln. Eine Ergänzung soll diesen Plan unterstützen, nicht die medizinische Betreuung umgehen.</p>
<p>Bringe zur Beratung den aktuellen Medikamentenplan, Befunde und Informationen über bisherige Verschlechterungen mit. Sage, ob du Sauerstoff verwendest und wie belastbar du bei der Anreise bist. Die <a href="/gesundheitsbibliothek/untersuchungen/lungenfunktion/">Spirometrie</a> ist eine medizinische Untersuchung der Lungenfunktion; eine subjektiv leichtere Atmung ersetzt ihren Befund nicht.</p>
<p>Frage nach dem konkreten Vorgehen und dem vorgesehenen Prüfzeitpunkt. Die intensive Behandlung einer Studie ist kein automatisch notwendiges Terminpaket für dich. Auch die Tatsache, dass eine Methode in einer Studie zusätzlich eingesetzt wurde, rechtfertigt keine eigenständige Reduktion deiner Inhalativa.</p>
<h2>Was vor einer Nadelbehandlung zu klären ist</h2>
<p>Aktuelle Infekte, Hautprobleme, Medikamente und andere Erkrankungen gehören in die Anamnese. Allgemeine Risiken erklärt die Seite zu <a href="/gesundheitsbibliothek/fragen/akupunktur-nebenwirkungen/">Nebenwirkungen der Akupunktur</a>. Eine «nebenwirkungsfreie» Behandlung wird hier nicht versprochen.</p>
<p>Mehr Atemnot als üblich braucht noch am selben Tag medizinischen Rat. Bei schwerer Atemnot, blauen oder grauen Lippen, Brustenge oder plötzlicher Verwirrtheit sofort 144 wählen. Warte bei solchen einzelnen Warnzeichen nicht auf einen Akupunkturtermin.</p>
<h2>Häufige Fragen</h2>
<h3>Kann Akupunktur COPD heilen?</h3>
<p>Nein. Die genannten Studien belegen keine Heilung und keine Wiederherstellung geschädigter Lungenbereiche. Sie untersuchen mögliche zusätzliche Effekte auf bestimmte Messgrössen und Beschwerden.</p>
<h3>Kann ich danach weniger inhalieren?</h3>
<p>Eine Änderung der verordneten Medikamente gehört ausschliesslich zur pneumologischen Betreuung. Ein positiver Verlauf während einer ergänzenden Behandlung ist kein Grund für eine selbstständige Reduktion.</p>
<h3>Ist das bei einem akuten Schub sinnvoll?</h3>
<p>Dieser Artikel betrifft stabile COPD. Neue oder verstärkte Atemnot muss medizinisch beurteilt werden. Ein akuter Schub ist keine Situation für eine selbst gewählte ergänzende Behandlung.</p>
<h2>Deinen nächsten Schritt klären</h2>
<p>Wenn deine COPD stabil behandelt ist und du eine Ergänzung besprechen möchtest, kannst du über die <a href="/kontakt/">Kontaktseite</a> eine Beratung anfragen. Nenne deine Diagnose und das konkrete Ziel, damit vorab die Eignung einer Beratung geprüft werden kann.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://link.springer.com/article/10.1186/s12906-024-04630-y" target="_blank" rel="noopener">Xu et al. Effectiveness and safety of acupuncture as an adjunctive therapy for chronic obstructive pulmonary disease: a randomised controlled trial. BMC Complementary Medicine and Therapies, 2024. PMID 39227880. DOI 10.1186/s12906-024-04630-y. (Volltext PMC; Abstract und Limitationen geprüft)</a></li>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/39956529/" target="_blank" rel="noopener">Li et al. Effect of acupuncture on patients with chronic obstructive pulmonary disease: A multicenter randomized controlled trial. Complementary Therapies in Medicine, 2025. PMID 39956529. (PubMed-Abstract)</a></li>
<li><a href="https://www.nhs.uk/conditions/chronic-obstructive-pulmonary-disease-copd/" target="_blank" rel="noopener">NHS. Chronic obstructive pulmonary disease (COPD). Patienteninformation. (Patienteninformation, Volltext)</a></li>
<li><a href="https://www.nhs.uk/symptoms/shortness-of-breath/" target="_blank" rel="noopener">NHS. Shortness of breath. Patienteninformation. (Patienteninformation, Volltext)</a></li>
<li><a href="https://www.nccih.nih.gov/health/traditional-chinese-medicine-what-you-need-to-know" target="_blank" rel="noopener">NCCIH. Traditional Chinese Medicine: What You Need To Know. (Patienteninformation, Volltext)</a></li>
<li><a href="https://doi.org/10.1183/23120541.00668-2024" target="_blank" rel="noopener">Suzuki et al. Effectiveness of a long-term acupuncture treatment in patients with chronic obstructive pulmonary disease: a randomised controlled trial. ERJ Open Research, 2025. DOI 10.1183/23120541.00668-2024. (Abstract über Crossref; Verlagsseite beim Abruf gesperrt)</a></li>
</ul>`,
    faqs: [],
    related: [
      { href: '/beschwerden/copd/', label: 'COPD', cat: 'Beschwerde' },
      { href: '/gesundheitsbibliothek/untersuchungen/lungenfunktion/', label: 'Lungenfunktion (Spirometrie)', cat: 'Untersuchung' },
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
      { href: '/gesundheitsbibliothek/fragen/akupunktur-nebenwirkungen/', label: 'Akupunktur: Nebenwirkungen', cat: 'Frage' },
    ],
  },
];

// Alle Treatment-Decision-Artikel der Serie (inkl. Alt-Artikel in wissen.ts):
// steuert TerminForm-Einbindung im Wissen-Template und das Serien-Gate.
export const akupunkturSerieSlugs: string[] = [
  ...wissenAkupunkturBei.map((w) => w.slug),
  'akupunktur-bei-rueckenschmerzen',
  'akupunktur-bei-nackenschmerzen',
  'akupunktur-bei-heuschnupfen',
  'akupunktur-schlafprobleme',
  'migraene-tcm-warum-akupunktur-nicht-fuer-jeden',
];
