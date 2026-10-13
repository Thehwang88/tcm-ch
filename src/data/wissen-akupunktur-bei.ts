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
const DATEN2 = { datePublished: '2026-10-05', dateModified: '2026-10-05', lastReviewed: '2026-10-05' };
const DATEN3 = { datePublished: '2026-10-13', dateModified: '2026-10-13', lastReviewed: '2026-10-13' };

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
<p>Belastungssteuerung, geeignetes Schuhwerk, Dehnung und gegebenenfalls physiotherapeutische Massnahmen können je nach Befund wichtige Bestandteile sein.</p>
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
<p>Bei zunehmender Taubheit, Muskelschwäche, Muskelabbau am Daumenballen oder objektiv deutlicher Nervenschädigung ist eine fachärztliche Beurteilung wichtig.</p>
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
<p>Realistisch ist Akupunktur bei Ischias ein ergänzender Baustein in drei Situationen: wenn die Abklärung keine Operationsindikation ergeben hat und du die Wartezeit auf Besserung überbrücken willst; wenn Schmerzmittel nicht ausreichen oder nicht vertragen werden; und wenn die Muskulatur in Gesäss und Lendenbereich so verspannt ist, dass sie den Nerv zusätzlich reizt. In diesem letzten Fall kombinieren wir die Nadelung oft mit <a href="/therapien/tuina/">Tuina</a>, weil die manuelle Arbeit am Piriformis und an der tiefen Gesässmuskulatur direkt dort ansetzt.</p>
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
<p>Viele Patientinnen nutzen ergänzend eine <a href="/therapien/kraeutertherapie/">chinesische Kräuterrezeptur</a>. Auch hier gilt: Die Studienlage ist schwach, Wechselwirkungen mit Hormonpräparaten klären wir vorher, und Kräuter sind keine Alternative zur ärztlichen Therapie.</p>
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
