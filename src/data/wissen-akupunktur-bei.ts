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
