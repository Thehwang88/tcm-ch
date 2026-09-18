// Akupunkturverfahren: Daten-Layer für den Spezialverfahren-Subcluster unter
// /therapien/akupunktur/verfahren/ (Hub) und /therapien/akupunktur/<slug>/ (Leaves).
//
// KEIN neues Top-Level der Gesundheitsbibliothek. Regeln:
// - Eine Methode = genau EINE kanonische Seite. Bestehende Owner (Ohrakupunktur,
//   Elektroakupunktur, Dauernadeln, Ear Seeds, Gesichtsakupunktur, Dry Needling)
//   werden NUR verlinkt (canonicalUrl), nie dupliziert.
// - Methodenseiten beantworten "Was ist dieses Verfahren?". KEINE
//   Methode-x-Beschwerde-Kombiseiten (YNSA bei Schlaganfall etc.): Beschwerde-
//   Intents gehören den Beschwerden-Seiten.
// - Dry Needling ist KEINE TCM-Akupunkturform, sondern eine verwandte
//   Nadeltechnik mit eigenem Konzept (methodType 'verwandte-nadeltechnik').
// - Angebots-Status: Nur Methoden mit Beleg in den Geschäftsdaten (standorte.ts,
//   Therapie-Leaves) gelten als angeboten. Für alle anderen NEUTRALE Formulierung,
//   keine erfundene Verfügbarkeit ("offered: 'unverified'").
// - planned-Einträge (Bienengift-Akupunktur, Pharmakopunktur) erzeugen KEINE
//   Route, erscheinen NICHT auf dem Hub und NICHT in Suche/Sitemap, bis
//   Angebot, Rechtslage und Sicherheit verifiziert sind.

export type VerfahrenMethodType = 'klassisch' | 'spezialverfahren' | 'verwandte-nadeltechnik';

export interface VerfahrenLink { href: string; label: string; cat: string }

export interface AkupunkturVerfahren {
  slug: string;
  label: string;          // Kartentitel im Hub
  title?: string;         // SEO-Title (nur eigene Seiten)
  h1?: string;
  status: 'planned' | 'published';
  indexable: boolean;
  methodType: VerfahrenMethodType;
  deck: string;           // Kartentext im Hub / Meta-Basis
  // Bestehende kanonische Seite. Gesetzt => KEINE neue Route, Karte verlinkt dorthin.
  canonicalUrl?: string;
  offered: boolean | 'unverified';
  offeringNote?: string;
  primaryPurpose?: string;
  overlapNotes?: string;
  // Inhalt (nur eigene neue Seiten):
  shortAnswerHtml?: string;
  bodyHtml?: string;
  evidenceHtml?: string;
  safetyHtml?: string;
  related?: VerfahrenLink[];
  publishedAt?: string;
  updatedAt?: string;
}

// Hub hat echten Navigations- und Vergleichswert (9 Methoden, Vergleichssektion)
// und ist bewusst indexierbar; siehe seo/akupunkturverfahren-cluster-2026-09.md.
export const VERFAHREN_HUB_INDEXABLE = true;

export const akupunkturverfahren: AkupunkturVerfahren[] = [
  // ── Bestehende kanonische Seiten (nur Navigation, keine neuen Routen) ──
  {
    slug: 'akupunktur',
    label: 'Klassische Körperakupunktur',
    status: 'published', indexable: true, methodType: 'klassisch',
    canonicalUrl: '/therapien/akupunktur/',
    offered: true,
    deck: 'Die Hauptmethode: feine Nadeln an ausgewählten Punkten am ganzen Körper. Basis der meisten Behandlungen bei TCM.ch.',
  },
  {
    slug: 'ohrakupunktur',
    label: 'Ohrakupunktur',
    status: 'published', indexable: true, methodType: 'spezialverfahren',
    canonicalUrl: '/therapien/ohrakupunktur/',
    offered: true,
    deck: 'Behandlung über Reflexzonen der Ohrmuschel, oft ergänzend zur Körperakupunktur.',
  },
  {
    slug: 'elektroakupunktur',
    label: 'Elektroakupunktur',
    status: 'published', indexable: true, methodType: 'spezialverfahren',
    canonicalUrl: '/therapien/elektroakupunktur/',
    offered: true,
    deck: 'Gesetzte Nadeln werden mit schwachem Reizstrom stimuliert, vor allem in der Schmerzbehandlung.',
  },
  {
    slug: 'dauernadeln',
    label: 'Dauernadeln',
    status: 'published', indexable: true, methodType: 'spezialverfahren',
    canonicalUrl: '/therapien/dauernadeln/',
    offered: true,
    deck: 'Winzige fixierte Nadeln, meist im Ohr, die den Reiz über mehrere Tage in den Alltag verlängern.',
  },
  {
    slug: 'ear-seeds',
    label: 'Ear Seeds',
    status: 'published', indexable: true, methodType: 'spezialverfahren',
    canonicalUrl: '/therapien/ear-seeds/',
    offered: true,
    deck: 'Nadelfreie Ohr-Stimulation mit kleinen Pflaster-Kügelchen auf Akupressurpunkten.',
  },
  {
    slug: 'gesichtsakupunktur',
    label: 'Gesichtsakupunktur',
    status: 'published', indexable: true, methodType: 'spezialverfahren',
    canonicalUrl: '/therapien/gesichtsakupunktur/',
    offered: true,
    deck: 'Sehr feine Nadeln im Gesichtsbereich, kosmetisch und bei bestimmten Beschwerden im Gesicht.',
  },
  {
    slug: 'dry-needling',
    label: 'Dry Needling',
    status: 'published', indexable: true, methodType: 'verwandte-nadeltechnik',
    canonicalUrl: '/therapien/physiotherapie/dry-needling/',
    offered: true,
    deck: 'Verwandte Nadeltechnik aus der Physiotherapie: zielt auf muskuläre Triggerpunkte, mit eigenem, nicht-TCM-basiertem Konzept.',
  },

  // ── Neue eigene Methodenseiten ──
  {
    slug: 'schaedelakupunktur',
    label: 'Schädelakupunktur',
    title: 'Schädelakupunktur: Methode, Anwendung und Einordnung',
    h1: 'Schädelakupunktur',
    status: 'published', indexable: true, methodType: 'spezialverfahren',
    publishedAt: '2026-09-18',
    offered: 'unverified',
    offeringNote: 'Ob und an welchem Standort Schädelakupunktur eingesetzt wird, hängt von der Ausbildung der behandelnden Fachperson ab. Das klären wir bei der Zuweisung.',
    deck: 'Akupunktur an definierten Zonen der Kopfhaut: was das Verfahren auszeichnet, wie eine Behandlung abläuft und wo die Grenzen liegen.',
    primaryPurpose: 'Erklärt die Methode Schädelakupunktur allgemein. Keine Beschwerde-Seite, kein YNSA-Ersatz.',
    overlapNotes: 'Kein bestehender Owner (nur beiläufige Erwähnungen in Wissen-Artikeln). YNSA erhält eine eigene Seite: YNSA ist EIN spezifisches System, nicht Synonym für Schädelakupunktur.',
    shortAnswerHtml: `<p>Schädelakupunktur ist ein Sammelbegriff für Akupunktur-Ansätze, bei denen definierte Zonen der Kopfhaut mit sehr feinen Nadeln stimuliert werden. Es gibt nicht das eine Verfahren: Verschiedene Systeme teilen die Kopfhaut unterschiedlich ein und stammen aus unterschiedlichen Traditionen. Gemeinsam ist ihnen der Behandlungsort Kopfhaut und die flache, oberflächliche Nadelung.</p>`,
    bodyHtml: `<h2>Wie unterscheidet sie sich von der Körperakupunktur?</h2>
<p>Die <a href="/therapien/akupunktur/">klassische Körperakupunktur</a> arbeitet mit Punkten am ganzen Körper, die traditionell entlang von Leitbahnen beschrieben werden. Die Schädelakupunktur beschränkt sich auf die Kopfhaut und folgt eigenen Ordnungssystemen: Je nach Schule werden dort Zonen oder Linien definiert, denen Körperregionen oder Funktionen zugeordnet werden. Die Nadeln werden flach unter die Kopfhaut geführt, nicht senkrecht wie an vielen Körperpunkten.</p>
<p>In der Praxis wird Schädelakupunktur häufig nicht allein, sondern in Kombination mit Körper- oder <a href="/therapien/ohrakupunktur/">Ohrakupunktur</a> eingesetzt.</p>
<h2>Wie läuft eine Behandlung ab?</h2>
<p>Am Anfang steht wie immer das Gespräch: Beschwerden, Vorgeschichte, Medikamente. Danach wählt die Fachperson die passenden Zonen aus und setzt dort einige sehr feine Nadeln flach unter die Kopfhaut. Das Einstechen ist meist wenig spürbar; manche beschreiben ein kurzes Ziehen oder ein Spannungsgefühl. Wie lange die Nadeln liegen bleiben und ob sie zwischendurch stimuliert werden, hängt vom verwendeten System und vom Behandlungsziel ab. Ein fixes Standardprotokoll für alle gibt es nicht.</p>
<h2>Wofür wird Schädelakupunktur eingesetzt?</h2>
<p>Diskutiert und eingesetzt wird das Verfahren vor allem bei Schmerzen, etwa <a href="/beschwerden/kopfschmerzen/">Kopfschmerzen</a>, sowie ergänzend in der Begleitung neurologischer Beschwerdebilder. Wichtig ist die ehrliche Einordnung: Bei neurologischen Erkrankungen ist Akupunktur, wenn überhaupt, eine Ergänzung. Sie ersetzt keine neurologische Behandlung und keine medizinische Rehabilitation, und sie repariert keine geschädigten Nervenstrukturen. Ob eine Begleitung im Einzelfall sinnvoll ist, gehört mit den behandelnden Ärztinnen und Ärzten abgestimmt.</p>
<h2>Schädelakupunktur und YNSA: nicht dasselbe</h2>
<p>Die <a href="/therapien/akupunktur/ynsa/">YNSA (Yamamoto Neue Schädelakupunktur)</a> ist ein spezifisches, in Japan entwickeltes System mit eigener Zonen-Einteilung und eigener Diagnostik. Sie ist damit EINE Form der Schädelakupunktur, aber nicht deren Synonym: Daneben existieren andere Systeme mit anderer Einteilung der Kopfhaut. Wer gezielt nach YNSA sucht, findet die Details auf der eigenen Seite.</p>`,
    evidenceHtml: `<p>Die Studienlage ist je nach Indikation und untersuchtem System unterschiedlich und insgesamt uneinheitlich: Es gibt klinische Studien und Übersichtsarbeiten zu einzelnen Anwendungsfeldern, oft mit methodischen Einschränkungen wie kleinen Teilnehmerzahlen. Eine pauschale Aussage "wirkt bei X" lässt sich daraus nicht ableiten. Traditionelle Begründung, klinische Erfahrung und wissenschaftliche Evidenz sind drei verschiedene Ebenen, und wir vermischen sie nicht.</p>`,
    safetyHtml: `<p>In geübten Händen gilt die Schädelakupunktur als risikoarm. Möglich sind kleine Blutungen oder Blutergüsse an der Kopfhaut (dort ist die Durchblutung stark), kurzer Schwindel oder Müdigkeit nach der Behandlung. Sterile Einmalnadeln und saubere Technik sind Standard. Wenn du blutverdünnende Medikamente nimmst, eine Kopfhauterkrankung besteht oder Beschwerden neu und unklar sind, gehört das vor der Behandlung ins Gespräch, und Unklares zuerst in ärztliche Abklärung.</p>`,
    related: [
      { href: '/therapien/akupunktur/ynsa/', label: 'YNSA', cat: 'Verfahren' },
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
      { href: '/therapien/ohrakupunktur/', label: 'Ohrakupunktur', cat: 'Therapie' },
      { href: '/therapien/elektroakupunktur/', label: 'Elektroakupunktur', cat: 'Therapie' },
    ],
  },
  {
    slug: 'ynsa',
    label: 'YNSA',
    title: 'YNSA: Yamamoto Neue Schädelakupunktur erklärt',
    h1: 'YNSA: Yamamoto Neue Schädelakupunktur',
    status: 'published', indexable: true, methodType: 'spezialverfahren',
    publishedAt: '2026-09-18',
    offered: 'unverified',
    offeringNote: 'YNSA setzt eine spezifische Ausbildung voraus. Ob eine entsprechend geschulte Fachperson verfügbar ist, klären wir bei der Zuweisung.',
    deck: 'Das von Toshikatsu Yamamoto entwickelte Schädelakupunktur-System: eigene Zonen, eigene Diagnostik und klare Abgrenzung zu anderen Verfahren.',
    primaryPurpose: 'Erklärt spezifisch das Yamamoto-System. Kein Synonym für Schädelakupunktur allgemein, keine Beschwerde-Seite.',
    overlapNotes: 'Kein bestehender Owner. Abgrenzung zur neuen Seite schaedelakupunktur (Oberbegriff) ist in beiden Texten explizit. KEINE Kombiseiten wie "YNSA bei Schlaganfall".',
    shortAnswerHtml: `<p>YNSA steht für Yamamoto Neue Schädelakupunktur (englisch Yamamoto New Scalp Acupuncture): ein eigenständiges Akupunktursystem, das der japanische Arzt Toshikatsu Yamamoto ab den 1960er-Jahren entwickelt hat. Behandelt wird an definierten Punktarealen der Kopfhaut, vor allem im Stirn- und Schläfenbereich. YNSA ist damit eine spezifische Form der Schädelakupunktur, nicht deren Oberbegriff.</p>`,
    bodyHtml: `<h2>Was hinter dem System steckt</h2>
<p>Yamamoto beschrieb auf der Kopfhaut sogenannte Somatotope: Areale, in denen der Körper verkleinert abgebildet gedacht wird, ähnlich dem Prinzip, das auch der <a href="/therapien/ohrakupunktur/">Ohrakupunktur</a> zugrunde liegt. Zu den Basispunkten für Bewegungsapparat und Sinnesorgane kamen im Lauf der Entwicklung weitere Punktgruppen hinzu. Das System wird bis heute international gelehrt und weiterentwickelt.</p>
<h2>Wie unterscheidet sich YNSA von der klassischen Akupunktur?</h2>
<p>Drei Punkte: Erstens der Ort, behandelt wird ausschliesslich am Kopf statt am ganzen Körper. Zweitens die Systematik, YNSA folgt Yamamotos Somatotop-Karten, nicht den traditionellen Leitbahnen der chinesischen Medizin. Drittens die Diagnostik: Typisch für YNSA ist eine eigene Tastdiagnostik, bei der über die Palpation bestimmter Zonen, etwa am Hals oder Bauch, die zu behandelnden Punkte ausgewählt werden.</p>
<h2>Wie unterscheidet sich YNSA von anderer Schädelakupunktur?</h2>
<p>Auch die <a href="/therapien/akupunktur/schaedelakupunktur/">chinesisch geprägten Schädelakupunktur-Systeme</a> arbeiten an der Kopfhaut, teilen sie aber anders ein, meist in Linien oder Zonen mit Bezug zu Hirnregionen, und nutzen eine andere Diagnostik. YNSA ist jünger, japanischen Ursprungs und punktbasiert. Wer "Schädelakupunktur" anbietet, arbeitet also nicht automatisch mit YNSA, und umgekehrt.</p>
<h2>Wie läuft eine YNSA-Behandlung ab?</h2>
<p>Nach Gespräch und Tastbefund werden wenige sehr feine Nadeln an den ausgewählten Punktarealen der Kopfhaut gesetzt. Die Nadeln bleiben eine Weile liegen; die Dauer richtet sich nach Situation und Reaktion. Viele empfinden die Behandlung als wenig belastend, das Einstechen an der Kopfhaut kann kurz ziehen.</p>
<h2>Wofür wird YNSA diskutiert?</h2>
<p>International wird YNSA vor allem bei Schmerzen des Bewegungsapparats und ergänzend in der Begleitung neurologischer Beschwerdebilder diskutiert und eingesetzt. Auch hier gilt ohne Ausnahme: Akupunktur ersetzt keine neurologische Diagnostik, Therapie oder Rehabilitation und stellt keine Heilung neurologischer Erkrankungen in Aussicht. Eine allfällige Begleitung gehört mit dem behandelnden ärztlichen Team koordiniert.</p>`,
    evidenceHtml: `<p>Zu YNSA existieren klinische Studien und Fallserien, deren Qualität und Ergebnisse je nach Indikation stark variieren; belastbare, grosse Studien sind rar. Eine gesicherte Wirksamkeit für bestimmte Erkrankungen lässt sich daraus nicht ableiten. Wir benennen das offen: Die Methode ist etabliert gelehrt, die wissenschaftliche Evidenz dazu ist begrenzt und uneinheitlich.</p>`,
    safetyHtml: `<p>Die Risiken entsprechen denen der Schädelakupunktur insgesamt: kleine Blutungen oder Blutergüsse an der gut durchbluteten Kopfhaut, gelegentlich kurzer Schwindel oder Müdigkeit. Sterile Einmalnadeln sind Standard. Blutverdünnung, Kopfhauterkrankungen und neu aufgetretene, unklare Beschwerden gehören vor der Behandlung angesprochen bzw. zuerst ärztlich abgeklärt.</p>`,
    related: [
      { href: '/therapien/akupunktur/schaedelakupunktur/', label: 'Schädelakupunktur', cat: 'Verfahren' },
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
      { href: '/therapien/ohrakupunktur/', label: 'Ohrakupunktur', cat: 'Therapie' },
    ],
  },
  {
    slug: 'bauchakupunktur',
    label: 'Bauchakupunktur',
    title: 'Bauchakupunktur: Methode und Anwendung erklärt',
    h1: 'Bauchakupunktur',
    status: 'published', indexable: true, methodType: 'spezialverfahren',
    publishedAt: '2026-09-18',
    offered: 'unverified',
    offeringNote: 'Ob Bauchakupunktur als eigenständiges System an einem Standort eingesetzt wird, hängt von der Ausbildung der Fachperson ab. Das klären wir bei der Zuweisung.',
    deck: 'Akupunktur nach einem spezifischen System im Bauchbereich: Prinzip, Ablauf und warum die anatomische Sicherheit hier besondere Ausbildung verlangt.',
    primaryPurpose: 'Erklärt die Methode Bauchakupunktur (Abdominalakupunktur). Keine Verdauungs-Beschwerde-Seite.',
    overlapNotes: 'Kein bestehender Owner. Verdauungs-Intents bleiben bei /beschwerden/verdauungsprobleme/ u.a.; KEINE Kombiseiten wie "Bauchakupunktur bei Reizdarm". Abgrenzung zu gewöhnlichen Bauch-Punkten der Körperakupunktur und zu Bauchmassage im Text explizit.',
    shortAnswerHtml: `<p>Bauchakupunktur (auch Abdominalakupunktur) ist ein Akupunktur-Ansatz, bei dem ausschliesslich Punkte in der Bauchregion genadelt werden, nach einem eigenen, in China entwickelten Ordnungssystem. Sie ist nicht einfach "Akupunktur am Bauch": Das System definiert eigene Punkte und Zuordnungen rund um den Nabel und arbeitet typischerweise mit sehr feinen, oberflächlich gesetzten Nadeln.</p>`,
    bodyHtml: `<h2>Was die Methode auszeichnet</h2>
<p>Drei Abgrenzungen sind wichtig. Erstens: In der <a href="/therapien/akupunktur/">klassischen Körperakupunktur</a> liegen einzelne Punkte ohnehin am Bauch; das macht eine Behandlung noch nicht zur Bauchakupunktur. Zweitens: Bauchakupunktur ist keine <a href="/therapien/massage/">Bauchmassage</a> und keine manuelle Technik, es werden Nadeln gesetzt. Drittens hat sie nichts mit medizinischen Eingriffen am Bauch zu tun. Als eigenständiges System versteht sie die Bauchregion als eigene Landkarte, über die der ganze Körper behandelt werden soll, ein Prinzip, das der <a href="/therapien/ohrakupunktur/">Ohrakupunktur</a> ähnelt.</p>
<h2>Wie läuft eine Behandlung ab?</h2>
<p>Nach Gespräch und Untersuchung werden wenige feine Nadeln an definierten Stellen der Bauchdecke gesetzt, meist oberflächlich und mit geringer Stichtiefe. Die Nadeln bleiben eine Weile liegen, du liegst dabei entspannt auf dem Rücken. Viele Patientinnen und Patienten beschreiben die Behandlung als besonders sanft, weil die Bauchdecke weniger empfindlich auf feine Nadeln reagiert als manche Körperpunkte.</p>
<h2>Wofür wird Bauchakupunktur eingesetzt?</h2>
<p>Eingesetzt und diskutiert wird das System, wie andere Akupunkturformen auch, vor allem bei Schmerzen des Bewegungsapparats und funktionellen Beschwerden. Es ist ausdrücklich keine Spezialmethode "für den Bauch": Wer Verdauungsbeschwerden abklären oder verstehen will, findet die Einordnung auf den Beschwerden-Seiten, etwa zu <a href="/beschwerden/verdauungsprobleme/">Verdauungsproblemen</a>. Heilversprechen für einzelne Erkrankungen lassen sich aus der Methode nicht ableiten.</p>`,
    evidenceHtml: `<p>Zur Bauchakupunktur existieren vor allem Studien aus dem chinesischen Raum sowie Fallserien; unabhängige, methodisch starke Untersuchungen sind selten. Die traditionelle Systematik und die klinische Praxis sind gut beschrieben, die wissenschaftliche Evidenz ist demgegenüber begrenzt. Wir trennen diese Ebenen bewusst.</p>`,
    safetyHtml: `<p>Der Behandlungsort verlangt Respekt: Unter der Bauchdecke liegen Organe, deshalb gehören Punktwahl und Stichtiefe ausschliesslich in die Hände entsprechend ausgebildeter Fachpersonen; zur Selbstbehandlung eignet sich das Verfahren nicht. Üblich sind allenfalls kleine Blutergüsse oder ein kurzes Druckgefühl. Nicht genadelt wird unter anderem in der Schwangerschaft im Bauchbereich. Wichtig ausserdem: Neue, starke oder unklare Bauchschmerzen sind zuerst ein Fall für die ärztliche Abklärung, nicht für Akupunktur.</p>`,
    related: [
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
      { href: '/therapien/ohrakupunktur/', label: 'Ohrakupunktur', cat: 'Therapie' },
      { href: '/koerpersignale/voellegefuehl-nach-dem-essen/', label: 'Völlegefühl nach dem Essen', cat: 'Körpersignal' },
      { href: '/beschwerden/verdauungsprobleme/', label: 'Verdauungsprobleme', cat: 'Beschwerde' },
    ],
  },
  {
    slug: 'laserakupunktur',
    label: 'Laserakupunktur',
    title: 'Laserakupunktur: Akupunktur ohne Nadeln erklärt',
    h1: 'Laserakupunktur',
    status: 'published', indexable: true, methodType: 'spezialverfahren',
    publishedAt: '2026-09-18',
    offered: 'unverified',
    offeringNote: 'Laserakupunktur setzt entsprechende Geräte und Schulung voraus. Ob sie an einem Standort verfügbar ist, klären wir bei der Zuweisung.',
    deck: 'Akupunkturpunkte werden mit schwachem Laserlicht statt mit Nadeln stimuliert: schmerzfrei, aber mit eigener Einordnung bei Wirkung und Evidenz.',
    primaryPurpose: 'Erklärt die Methode Laserakupunktur. Keine Beschwerde-Seite, kein Geräte-Ratgeber.',
    overlapNotes: 'Kein bestehender Owner (nur beiläufige Erwähnungen, z.B. auf der Kinder-Akupunktur-Seite). Abgrenzung zu flächiger Lasertherapie im Text explizit. Keine DIY-Geräte-Anleitungen.',
    shortAnswerHtml: `<p>Bei der Laserakupunktur werden ausgewählte Akupunkturpunkte mit schwachem, gebündeltem Licht (Low-Level-Laser) stimuliert statt mit Nadeln. Die Behandlung ist schmerzfrei und ohne Einstich. Ob sie der Nadelakupunktur gleichwertig ist, ist wissenschaftlich nicht geklärt; sie ist eine eigenständige Variante mit eigenen Stärken und offenen Fragen.</p>`,
    bodyHtml: `<h2>Unterschied zur Nadelakupunktur</h2>
<p>Die <a href="/therapien/akupunktur/">klassische Akupunktur</a> setzt einen mechanischen Reiz über die Nadel. Die Laserakupunktur ersetzt diesen durch einen Lichtreiz mit niedriger Leistung, der das Gewebe nicht spürbar erwärmt und die Haut nicht verletzt. Punktauswahl und Behandlungslogik folgen denselben Überlegungen wie bei der Nadelbehandlung; anders ist nur die Art der Stimulation. Das typische Nadelgefühl, das dumpfe Ziehen am Punkt, entfällt.</p>
<h2>Für wen kann das interessant sein?</h2>
<p>Vor allem für Menschen mit ausgeprägter Nadelangst und in Situationen, in denen Nadeln unpraktisch sind. Auch bei Kindern wird Laserakupunktur eingesetzt, etwa bei uns in der <a href="/akupunktur-kinder/">Kinder-Akupunktur</a>. Ein Automatismus ist das nicht: Ob Laser oder Nadel die bessere Wahl ist, hängt vom Einzelfall ab, nicht von einer pauschalen Regel wie "für empfindliche Menschen immer Laser".</p>
<h2>Wie läuft eine Behandlung ab und tut sie weh?</h2>
<p>Nach dem Gespräch wird der Laserstift nacheinander für kurze Zeit auf die ausgewählten Punkte gehalten, meist einige Sekunden bis wenige Minuten pro Punkt. Du spürst dabei in der Regel nichts, höchstens die Berührung des Geräts. Deshalb die ehrliche Antwort auf die häufigste Frage: Nein, Laserakupunktur tut nicht weh.</p>
<h2>Laserakupunktur ist nicht dasselbe wie Lasertherapie</h2>
<p>Beide arbeiten mit Low-Level-Licht, aber mit unterschiedlicher Logik: Die Laserakupunktur stimuliert punktuell definierte Akupunkturpunkte. Die Lasertherapie (etwa in Physiotherapie oder Sportmedizin) bestrahlt flächig Gewebe, Sehnen oder Gelenke, ohne Bezug zu Akupunkturpunkten. Gerät und Begriff können sich überschneiden, das klinische Konzept dahinter ist verschieden.</p>`,
    evidenceHtml: `<p>Die Studienlage zur Laserakupunktur ist heterogen: Untersuchungen unterscheiden sich stark in Indikation, Laserleistung, Wellenlänge und Behandlungsdauer, entsprechend unterschiedlich fallen die Ergebnisse aus. Für einzelne Anwendungsfelder gibt es Hinweise auf Nutzen, für eine generelle Gleichwertigkeit mit der Nadelakupunktur fehlen belastbare Belege. Wir formulieren deshalb zurückhaltend und versprechen nicht, was die Datenlage nicht hergibt.</p>`,
    safetyHtml: `<p>Laserakupunktur gilt als sehr nebenwirkungsarm: kein Einstich, keine Blutung, kein Infektionsrisiko. Zentral ist der Augenschutz, direktes Laserlicht gehört nie ins Auge; in der Behandlung werden dafür geeignete Schutzmassnahmen wie Schutzbrillen eingesetzt. Die Anwendung gehört in geschulte Hände mit geprüften Geräten; von Selbstbehandlungen mit gekauften Lasergeräten raten wir ab, dazu geben wir bewusst keine Anleitungen.</p>`,
    related: [
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
      { href: '/therapien/ohrakupunktur/', label: 'Ohrakupunktur', cat: 'Therapie' },
      { href: '/therapien/elektroakupunktur/', label: 'Elektroakupunktur', cat: 'Therapie' },
      { href: '/gesundheitsbibliothek/fragen/tut-akupunktur-weh/', label: 'Tut Akupunktur weh?', cat: 'Frage' },
    ],
  },

  // ── Geplant: KEINE Route, KEIN Hub-Eintrag, KEINE Suche, bis verifiziert ──
  {
    slug: 'bienengift-akupunktur',
    label: 'Bienengift-Akupunktur',
    status: 'planned', indexable: false, methodType: 'spezialverfahren',
    offered: 'unverified',
    deck: 'Platzhalter. Vor jeder Veröffentlichung zu klären: tatsächliches Angebot bei TCM.ch, Schweizer Rechts-/Zulassungslage, Qualifikation, Produkt- und Anwendungsanforderungen, Allergie-/Anaphylaxie-Risiko und Notfallbereitschaft, Evidenz.',
    primaryPurpose: 'Noch keiner. Wird erst nach Verifikation definiert.',
    overlapNotes: 'Nicht als angebotene Behandlung darstellen. Kein Hub-Eintrag, keine Route, keine Suche.',
  },
  {
    slug: 'pharmakopunktur',
    label: 'Pharmakopunktur',
    status: 'planned', indexable: false, methodType: 'spezialverfahren',
    offered: 'unverified',
    deck: 'Platzhalter. Vor jeder Veröffentlichung zu klären: Definition und injizierte Substanzen, medizinischer/regulatorischer Status in der Schweiz, Verschreibungs- und Anwendungsregeln, Evidenz, tatsächliches Angebot bei TCM.ch.',
    primaryPurpose: 'Noch keiner. Wird erst nach Verifikation definiert.',
    overlapNotes: 'Nicht als angebotene Behandlung darstellen. Kein Hub-Eintrag, keine Route, keine Suche.',
  },
];

// Eigene neue Seiten (Route /therapien/akupunktur/<slug>/): published + kein canonicalUrl.
export const publishedVerfahrenPages = akupunkturverfahren.filter(
  (v) => v.status === 'published' && !v.canonicalUrl,
);
// Hub-Karten: alles Publizierte (bestehende Owner + eigene Seiten), nie planned.
export const hubVerfahren = akupunkturverfahren.filter((v) => v.status === 'published');
