// "TCM verstehen": Wissens-Säule der Gesundheitsbibliothek (Architektur-Welle 09/2026).
//
// Diese Datei trägt NUR die Struktur: 1 Haupt-Hub + 5 Sektions-Hubs. Leaf-Inhalte
// (Konzepte, Muster, Meridiane, Punkte, Diagnostik-Themen) kommen in späteren Wellen
// als TcmEntity-Einträge dazu; erst dann werden Sektionen mit Inhalt indexierbar.
// Indexierungsregel: indexable nur, wenn die Sektion heute echte verlinkte Inhalte
// bündelt (Methoden). Leere Sektionen sind noindex,follow (gleiche Konvention wie Visuals).
//
// Positionierung: traditionelle Begriffe modern und medizinisch verantwortungsvoll
// erklärt. Jede Muster-/Diagnostik-Seite muss künftig klarstellen, dass es sich um
// traditionelle Einordnungsmodelle handelt, nicht um schulmedizinische Diagnosen.

export interface TcmLink { href: string; label: string; cat: string }

// Künftige Entitätstypen des Wissensgraphen. Bewusst im bestehenden Graph-Stil
// (Slug-Referenzen wie in gesundheitsbibliothek.ts), kein paralleles System.
export type TcmEntityType = 'tcm-concept' | 'tcm-pattern' | 'meridian' | 'acupuncture-point' | 'tcm-diagnostic';
// Phase 4A (Foundation, 23.09.2026): Inhaltsmodell fuer Leaves. Regel wie bei
// Befunde & Werte: NUR status 'published' erzeugt Prod-Routen. Drafts haben KEINE
// Route (nicht bloss noindex): kein Thin Content in Google. Finales Copy liefert
// ChatGPT (siehe seo/tcm-verstehen-foundation-editorial-handoff-2026-09-23.md);
// hier stehen nur Struktur, SEO-Vorschlaege und Beziehungen. Keine AI-Fuelltexte.
export interface TcmEntity {
  type: TcmEntityType;
  slug: string;
  section: 'grundlagen' | 'muster' | 'meridiane-punkte' | 'diagnostik' | 'methoden';
  title: string;                   // SEO-Title ohne "| TCM.ch"
  status: 'draft' | 'published';   // draft = WAITING_FOR_CHATGPT_EDITORIAL, keine Route
  indexable: boolean;              // erst mit finalem Copy true (dann auch Sitemap/Queue)
  nav: string;                     // kurzes Karten-Label
  metaDesc: string;
  h1: string;
  publishedAt?: string;
  // Inhaltsbloecke (Reihenfolge = Template-Reihenfolge). Alle optional, Editorial
  // kommt extern; KEINE Platzhalter-Prosa eintragen.
  kurzantwortHtml?: string;        // praezise Definition / kurze Antwort
  traditionellHtml?: string;       // was das traditionelle Konzept meint
  praxisHtml?: string;             // wie es in der TCM-Praxis verwendet wird
  abgrenzungHtml?: string;         // was es NICHT bedeutet
  evidenzHtml?: string;            // moderne medizinische / Evidenz-Perspektive
  relevanzHtml?: string;           // praktische Relevanz fuer Patient:innen
  arztHinweisHtml?: string;        // wann aerztliche Abklaerung zaehlt (wo anwendbar)
  sources?: { label: string; url?: string }[];
  // Beziehungen als Slug-Listen, aufgelöst gegen die bestehenden Datenquellen:
  relatedConcepts?: string[];      // TcmEntity.slug
  relatedPatterns?: string[];      // TcmEntity.slug
  relatedMeridians?: string[];     // TcmEntity.slug
  relatedPoints?: string[];        // TcmEntity.slug
  relatedSignals?: string[];       // koerpersignale slug
  relatedConditions?: string[];    // beschwerden slug
  relatedTherapies?: string[];     // therapien slug
  relatedDiagnostics?: string[];   // DIAGNOSTICS id (schulmedizinisch) ODER TcmEntity slug
  relatedVisuals?: string[];       // visuals slug
  /** Bestehende Nicht-Graph-URLs (Fragen/Wissen), nur echte URLs. */
  relatedLinks?: TcmLink[];
}

// Foundation-Welle 4A: 7 genehmigte Konzepte, alle draft (Editorial ausstehend).
// URL-Schema (mit Sektion, wie "TCM verstehen -> Kategorie -> Leaf"):
// /gesundheitsbibliothek/tcm-verstehen/<section>/<slug>/
export const tcmEntities: TcmEntity[] = [
  {
    type: 'tcm-concept', slug: 'qi', section: 'grundlagen',
    status: 'published', indexable: true, publishedAt: '2026-09-23',
    nav: 'Qi',
    title: 'Qi in der TCM: Was der Begriff bedeutet',
    metaDesc: 'Was meint die TCM mit Qi? Warum Übersetzungen wie "Energie" nur Annäherungen sind, wie der Begriff in der Praxis verwendet wird und was er nicht bedeutet.',
    h1: 'Qi: Was meint die TCM damit?',
    kurzantwortHtml: `<p>Qi ist einer der zentralen Begriffe der chinesischen Medizin. Eine perfekte deutsche Übersetzung gibt es nicht. Häufig wird Qi mit "Energie" oder "Lebensenergie" wiedergegeben, je nach Zusammenhang können aber auch Begriffe wie Funktion, Aktivität oder Dynamik näher an der traditionellen Bedeutung liegen. Wichtig ist: Qi ist ein Konzept der chinesischen Medizin und keine in der modernen Medizin messbare Energieform.</p>`,
    traditionellHtml: `<p>In der traditionellen chinesischen Medizin dient Qi als übergeordneter Begriff, um Funktionen, Bewegung und Veränderung im Körper zu beschreiben. Unterschiedliche Zusammenhänge werden dabei mit unterschiedlichen Formen oder Aufgaben von Qi beschrieben.</p>
<p>So spricht die TCM beispielsweise davon, dass Qi bewegt, wärmt, schützt oder bestimmte Körperfunktionen unterstützt. Auch die Vorstellung, dass Qi entlang der Leitbahnen beziehungsweise Meridiane zirkuliert, gehört zum klassischen Modell.</p>
<p>Dadurch ist Qi weniger ein einzelnes "Ding" als ein Begriff innerhalb eines umfassenden medizinischen Ordnungssystems. Je nach Kontext kann die Bedeutung etwas anders sein.</p>`,
    praxisHtml: `<p>In der Praxis begegnet dir Qi häufig in Begriffen wie Qi-Mangel oder Qi-Stagnation. Eine Therapeutin verwendet solche Begriffe, um ein Muster aus verschiedenen Beobachtungen zusammenzufassen. Dazu können zum Beispiel Erschöpfung, Verdauung, Schlaf, Schmerzen, Temperaturgefühl, emotionale Belastung sowie Puls- und Zungenbild gehören.</p>
<p>Die daraus entstehende TCM-Einschätzung beeinflusst beispielsweise die Auswahl von Akupunkturpunkten oder die traditionelle Behandlungsstrategie.</p>
<p>Ein Begriff wie Qi-Mangel ist deshalb innerhalb der TCM eine Arbeitsbeschreibung. Er ist nicht gleichbedeutend mit einer einzelnen Krankheit und lässt sich nicht durch einen Laborwert bestätigen.</p>`,
    abgrenzungHtml: `<p>Die verbreitete Übersetzung "Lebensenergie" kann hilfreich sein, ist aber leicht missverständlich. Sie kann den Eindruck erwecken, Qi sei eine physikalische Energieform, die wie elektrische Energie oder Wärme gemessen werden könne. Dafür gibt es keine etablierte biomedizinische Messmethode.</p>
<p>Qi ist auch nicht identisch mit Blutfluss, Sauerstoff, Nervenleitung, Stoffwechsel oder dem autonomen Nervensystem. Solche modernen Körperfunktionen können wissenschaftlich untersucht und gemessen werden. Qi gehört dagegen zur traditionellen theoretischen Sprache der chinesischen Medizin.</p>`,
    evidenzHtml: `<p>Einzelne Behandlungsmethoden, die aus der chinesischen Medizin stammen, können wissenschaftlich untersucht werden, ohne dass dafür die traditionelle Qi-Theorie biologisch bewiesen sein muss. Das ist beispielsweise bei Akupunktur der Fall: Für einige Anwendungsgebiete gibt es klinische Forschung, während die traditionelle Erklärung über Qi und Leitbahnen ein separates theoretisches Modell bleibt.</p>
<p>Deshalb ist eine saubere Trennung sinnvoll: Die Frage, ob eine bestimmte Behandlung eine messbare Wirkung hat, ist nicht dasselbe wie die Frage, ob Qi als biomedizinische Struktur oder Substanz nachgewiesen werden kann.</p>`,
    relevanzHtml: `<p>Qi zu verstehen hilft vor allem dabei, die Sprache der TCM einzuordnen. Wenn dir eine Therapeutin beispielsweise sagt, dass sie eine Qi-Stagnation oder einen Qi-Mangel sieht, kannst du nachfragen: Welche konkreten Beschwerden und Beobachtungen führen zu dieser Einschätzung? Und was bedeutet das praktisch für die Behandlung?</p>
<p>Genau so verstehen wir den Begriff bei TCM.ch: als traditionelle Beschreibung, die innerhalb der TCM Orientierung geben kann, ohne moderne medizinische Diagnosen zu ersetzen.</p>`,
    arztHinweisHtml: `<p>Beschwerden sollten nicht allein mit einem vermeintlichen "Qi-Mangel" oder einer "Qi-Stagnation" erklärt werden. Neue, ausgeprägte oder anhaltende Symptome gehören unabhängig von der TCM-Einordnung medizinisch abgeklärt, wenn eine körperliche oder psychische Erkrankung möglich ist.</p>`,
    sources: [
      { label: 'National Center for Complementary and Integrative Health: Traditional Chinese Medicine - What You Need To Know' },
      { label: 'Stanford Encyclopedia of Philosophy: Chinese Metaphysics' },
    ],
    relatedConcepts: ['wei-qi', 'jing', 'shen', 'yin-und-yang', 'fuenf-elemente'],
    relatedTherapies: ['akupunktur'],
  },
  {
    type: 'tcm-concept', slug: 'yin-und-yang', section: 'grundlagen',
    status: 'published', indexable: true, publishedAt: '2026-09-23',
    nav: 'Yin und Yang',
    title: 'Yin und Yang: Bedeutung in der Chinesischen Medizin',
    metaDesc: 'Yin und Yang als Ordnungsprinzip der TCM: was das Begriffspaar traditionell beschreibt, wie es in der Behandlung genutzt wird und was es nicht ist.',
    h1: 'Yin und Yang: Bedeutung in der TCM',
    kurzantwortHtml: `<p>Yin und Yang beschreiben in der chinesischen Philosophie und Medizin zwei aufeinander bezogene Aspekte eines Ganzen. Sie stehen nicht einfach für "gut und schlecht" oder zwei starre Gegensätze. Entscheidend ist ihre Beziehung zueinander: Ruhe und Aktivität, innen und aussen, kühl und warm oder Nacht und Tag können je nach Zusammenhang als Yin und Yang beschrieben werden. In der TCM wird dieses Modell genutzt, um körperliche Funktionen und Beschwerdemuster zu ordnen.</p>`,
    traditionellHtml: `<p>Yin und Yang sind relationale Begriffe. Etwas ist nicht unter allen Umständen absolut Yin oder absolut Yang. Die Einordnung hängt davon ab, womit es verglichen wird und in welchem Zusammenhang man es betrachtet.</p>
<p>Traditionell werden Yin und Yang als gegensätzlich und gleichzeitig voneinander abhängig verstanden. Tag geht in Nacht über, Aktivität in Ruhe, Wärme kann abnehmen und Kälte zunehmen. Das Modell beschreibt deshalb nicht nur Gegensätze, sondern auch Veränderung.</p>
<p>In der chinesischen Medizin wurde dieses Denken auf Körperfunktionen, Krankheitsmuster und Behandlung übertragen. Dadurch entstanden Begriffe wie Yin-Mangel oder Yang-Mangel.</p>`,
    praxisHtml: `<p>Bei einer TCM-Einschätzung können Yin- und Yang-Begriffe helfen, verschiedene Beobachtungen zusammenzuführen. Eine Therapeutin betrachtet dabei nicht nur ein einzelnes Symptom, sondern das gesamte Muster.</p>
<p>Beispiele sind Temperaturgefühl, Durst, Schlaf, Energie, Verdauung, Schmerzen sowie Puls- und Zungenbild. Aus solchen Kombinationen können traditionelle Musterbegriffe entstehen.</p>
<p>Die Behandlung wird dann innerhalb dieses Modells angepasst. Je nach Situation können beispielsweise unterschiedliche Akupunkturpunkte oder andere TCM-Methoden gewählt werden.</p>`,
    abgrenzungHtml: `<p>Yin und Yang sind keine anatomischen Strukturen und keine messbaren Stoffe. Auch ein Begriff wie Yin-Mangel bedeutet nicht, dass im Körper ein bestimmter messbarer Stoff fehlt. Ebenso ist Yang-Mangel keine schulmedizinische Diagnose.</p>
<p>Problematisch wird es, wenn traditionelle Musterbegriffe unmittelbar mit Erkrankungen gleichgesetzt werden. Ein Mensch mit Müdigkeit hat beispielsweise nicht automatisch einen Yang-Mangel. Müdigkeit kann sehr unterschiedliche Ursachen haben, die gegebenenfalls medizinisch abgeklärt werden müssen.</p>`,
    evidenzHtml: `<p>Yin und Yang gehören zu einem historisch gewachsenen chinesischen Denkmodell, das auch ausserhalb der Medizin eine wichtige Rolle spielt. Moderne biomedizinische Forschung arbeitet mit anderen Kategorien und Messgrössen.</p>
<p>Dass der menschliche Körper durch zahlreiche gegenregulierende Systeme stabil gehalten wird, bedeutet deshalb nicht, dass damit die traditionelle Yin-Yang-Theorie wissenschaftlich bestätigt wäre. Die Konzepte können sich sprachlich manchmal ähnlich anhören, beruhen aber auf unterschiedlichen theoretischen Systemen.</p>`,
    relevanzHtml: `<p>Für Patientinnen und Patienten ist Yin und Yang vor allem deshalb relevant, weil viele TCM-Erklärungen darauf aufbauen. Wer das Grundprinzip versteht, kann Begriffe wie Yin-Mangel oder Yang-Mangel besser einordnen, ohne sie mit einer medizinischen Diagnose zu verwechseln.</p>
<p>Bei TCM.ch verwenden wir solche Begriffe deshalb immer mit ihrem Kontext: Was wurde beobachtet? Welche Beschwerden stehen tatsächlich im Vordergrund? Und gibt es medizinische Fragen, die unabhängig vom traditionellen Muster geklärt werden müssen?</p>`,
    arztHinweisHtml: `<p>Ein traditionelles Yin- oder Yang-Muster sollte nie der Grund sein, relevante Beschwerden nicht medizinisch untersuchen zu lassen. Besonders bei neuen, starken, anhaltenden oder ungewöhnlichen Symptomen sollte zuerst geklärt werden, ob eine behandelbare körperliche oder psychische Ursache vorliegt.</p>`,
    sources: [
      { label: 'Stanford Encyclopedia of Philosophy: Chinese Metaphysics' },
      { label: 'Stanford Encyclopedia of Philosophy: Philosophy in Han Dynasty China' },
    ],
    relatedConcepts: ['qi', 'fuenf-elemente'],
  },
  {
    type: 'tcm-concept', slug: 'fuenf-elemente', section: 'grundlagen',
    status: 'published', indexable: true, publishedAt: '2026-09-23',
    nav: 'Fünf Elemente',
    title: 'Fünf Elemente der TCM: Holz, Feuer, Erde, Metall, Wasser',
    metaDesc: 'Die Fünf Elemente (Wandlungsphasen) der TCM: was das traditionelle Modell beschreibt, wie es in der Praxis verwendet wird und wo seine Grenzen liegen.',
    h1: 'Die Fünf Elemente der TCM',
    kurzantwortHtml: `<p>Die Fünf Elemente der TCM sind Holz, Feuer, Erde, Metall und Wasser. Der chinesische Begriff Wu Xing wird häufig auch mit "Fünf Wandlungsphasen" übersetzt, weil nicht fünf feste Stoffe gemeint sind, sondern ein traditionelles Modell für Veränderung, Beziehungen und wiederkehrende Muster. In der chinesischen Medizin werden den fünf Phasen unter anderem Funktionskreise, Jahreszeiten und weitere Eigenschaften zugeordnet.</p>`,
    traditionellHtml: `<p>Die Fünf Wandlungsphasen entstanden als Teil eines grösseren chinesischen Ordnungsmodells. Holz, Feuer, Erde, Metall und Wasser stehen dabei für unterschiedliche Qualitäten und Prozesse.</p>
<p>Traditionell werden Beziehungen zwischen den Phasen beschrieben. Besonders bekannt sind ein hervorbringender beziehungsweise nährender Zyklus und ein kontrollierender Zyklus. Dadurch soll erklärt werden, wie verschiedene Bereiche einander unterstützen oder begrenzen.</p>
<p>In der TCM wurden diese Zuordnungen mit Funktionskreisen verbunden. Typische traditionelle Paarungen sind:</p>
<ul>
<li>Holz: Leber und Gallenblase</li>
<li>Feuer: Herz und Dünndarm sowie weitere Feuer-Zuordnungen</li>
<li>Erde: Milz und Magen</li>
<li>Metall: Lunge und Dickdarm</li>
<li>Wasser: Niere und Blase</li>
</ul>
<p>Diese Begriffe beschreiben die traditionelle Systematik. Sie bedeuten nicht, dass anatomische Organe buchstäblich aus einem bestimmten Element bestehen.</p>`,
    praxisHtml: `<p>In der Praxis kann das Modell der Fünf Elemente helfen, Zusammenhänge innerhalb einer TCM-Einschätzung zu strukturieren. Eine Therapeutin kombiniert dafür die Beschwerden mit Anamnese, Puls, Zunge und weiteren traditionellen Kriterien.</p>
<p>Die Fünf Elemente sind dabei meist nicht die einzige Grundlage einer Behandlung. In der heutigen TCM werden häufig mehrere Modelle nebeneinander verwendet, darunter Yin und Yang, Qi, Leitbahnen sowie verschiedene Musterlehren.</p>`,
    abgrenzungHtml: `<p>Holz, Feuer, Erde, Metall und Wasser sind in diesem Zusammenhang keine chemischen Elemente und keine anatomischen Kategorien. Auch die Zuordnung "Leber = Holz" bedeutet nicht, dass Eigenschaften der biologischen Leber durch das Element Holz erklärt werden.</p>
<p>Ebenso sollte aus einer traditionellen Zuordnung keine Selbstdiagnose entstehen. Ärger bedeutet beispielsweise nicht automatisch "Leberproblem", und Verdauungsbeschwerden beweisen keinen "Erde-Mangel". Solche Verkürzungen machen aus einem komplexen traditionellen Modell eine scheinbar einfache Diagnose, die es so weder in der TCM noch in der modernen Medizin gibt.</p>`,
    evidenzHtml: `<p>Die Fünf Wandlungsphasen sind ein historisches chinesisches Klassifikations- und Veränderungsmodell. Die moderne Biomedizin beschreibt Organe, Stoffwechsel, Nerven, Hormone und Erkrankungen mit anderen Modellen und Messverfahren.</p>
<p>Die traditionelle Fünf-Elemente-Zuordnung ist deshalb nicht als naturwissenschaftlich bestätigte Organphysiologie zu verstehen. Wissenschaftlich untersuchbar sind konkrete Behandlungen und deren Ergebnisse. Das ist von der Frage zu trennen, ob das historische Erklärungsmodell selbst biomedizinisch nachgewiesen ist.</p>`,
    relevanzHtml: `<p>Die Fünf Elemente sind besonders hilfreich, wenn du verstehen möchtest, warum in der chinesischen Medizin scheinbar weit voneinander entfernte Themen miteinander verbunden werden. Das Modell versucht, Beziehungen und Muster zu beschreiben statt jedes Symptom isoliert zu betrachten.</p>
<p>Für Patientinnen und Patienten sollte daraus aber vor allem Orientierung entstehen, keine starre Etikettierung. Entscheidend bleiben deine konkreten Beschwerden, deine medizinische Situation und eine nachvollziehbare Behandlungsplanung.</p>`,
    arztHinweisHtml: `<p>Element-Zuordnungen sind kein Ersatz für medizinische Diagnostik. Beschwerden eines Organsystems, auffällige Laborwerte oder neue körperliche Symptome sollten anhand medizinischer Kriterien beurteilt werden und nicht aus einer TCM-Element-Zuordnung abgeleitet werden.</p>`,
    sources: [
      { label: 'Stanford Encyclopedia of Philosophy: Chinese Metaphysics' },
      { label: 'Stanford Encyclopedia of Philosophy: Philosophy in Han Dynasty China' },
    ],
    relatedConcepts: ['qi', 'yin-und-yang', 'organuhr'],
  },
  {
    type: 'tcm-concept', slug: 'organuhr', section: 'grundlagen',
    status: 'published', indexable: true, publishedAt: '2026-09-23',
    nav: 'TCM-Organuhr',
    title: 'TCM-Organuhr: Das traditionelle 24-Stunden-Modell erklärt',
    metaDesc: 'Die chinesische Organuhr: was das traditionelle 24-Stunden-Modell beschreibt, wie nächtliches Aufwachen traditionell gedeutet wird und wo die Grenzen liegen.',
    h1: 'Die TCM-Organuhr: Was das Modell beschreibt und was nicht',
    kurzantwortHtml: `<p>Die TCM-Organuhr ist ein traditionelles Modell, das den 24-Stunden-Tag in zwölf Abschnitte von jeweils zwei Stunden einteilt. Jeder Zeitraum wird in der chinesischen Medizin einer Leitbahn beziehungsweise einem Funktionskreis zugeordnet. Das Modell wird traditionell genutzt, um zeitliche Muster von Beschwerden zu beobachten und in eine TCM-Einschätzung einzubeziehen. Es ist jedoch keine wissenschaftlich bestätigte Organuhr im biomedizinischen Sinn: Wer beispielsweise regelmässig um 3 Uhr morgens aufwacht, hat deshalb nicht automatisch ein Problem mit der Leber oder einem anderen Organ.</p>`,
    traditionellHtml: `<p>In traditionellen chinesisch-medizinischen Modellen werden die zwölf Hauptleitbahnen über den Tag hinweg bestimmten Zeitfenstern zugeordnet. Gemeint ist nicht, dass ein Organ nur während dieser zwei Stunden arbeitet. Vielmehr beschreibt die Organuhr eine traditionelle Vorstellung davon, wann ein Funktionskreis besonders im Vordergrund steht.</p>
<p>Die häufig verwendete Einteilung lautet:</p>
<ul>
<li>23 bis 1 Uhr: Gallenblase</li>
<li>1 bis 3 Uhr: Leber</li>
<li>3 bis 5 Uhr: Lunge</li>
<li>5 bis 7 Uhr: Dickdarm</li>
<li>7 bis 9 Uhr: Magen</li>
<li>9 bis 11 Uhr: Milz</li>
<li>11 bis 13 Uhr: Herz</li>
<li>13 bis 15 Uhr: Dünndarm</li>
<li>15 bis 17 Uhr: Blase</li>
<li>17 bis 19 Uhr: Niere</li>
<li>19 bis 21 Uhr: Perikard</li>
<li>21 bis 23 Uhr: Dreifacher Erwärmer</li>
</ul>
<p>Begriffe wie Leber, Milz oder Niere haben in diesem Zusammenhang eine andere Bedeutung als die gleichnamigen anatomischen Organe der modernen Medizin. In der TCM bezeichnen sie grössere funktionelle Zuordnungen. Deshalb darf eine traditionelle Zuordnung nicht mit einer Erkrankung des jeweiligen Organs gleichgesetzt werden.</p>`,
    praxisHtml: `<p>In einer TCM-Anamnese kann die Tageszeit durchaus interessant sein. Eine Therapeutin kann zum Beispiel fragen, ob Beschwerden immer zu einer ähnlichen Uhrzeit auftreten, ob du regelmässig nachts aufwachst oder ob Energie, Verdauung oder Schmerzen im Tagesverlauf schwanken.</p>
<p>Die Uhrzeit ist dabei nur ein Teil des Gesamtbilds. Sie wird zusammen mit Beschwerden, Schlaf, Verdauung, Appetit, Stress, Temperaturgefühl, Zungenbild, Puls und weiteren Informationen betrachtet. Eine seriöse TCM-Einschätzung sollte deshalb nicht allein aus der Uhrzeit eines Symptoms abgeleitet werden.</p>
<p>Gerade beim nächtlichen Aufwachen ist diese Unterscheidung wichtig. In populären Darstellungen der Organuhr wird beispielsweise manchmal aus "1 bis 3 Uhr = Leber" direkt geschlossen, dass nächtliches Erwachen in diesem Zeitraum ein Leberproblem bedeute. So eindeutig funktioniert das traditionelle Modell nicht, und medizinisch lässt sich daraus keine Organdiagnose ableiten.</p>`,
    abgrenzungHtml: `<p>Die TCM-Organuhr ist nicht dasselbe wie die biologische Uhr der modernen Medizin. Dass der menschliche Körper einem ungefähr 24-stündigen Rhythmus folgt, ist wissenschaftlich gut belegt. Schlaf und Wachheit, Hormonausschüttung, Körpertemperatur, Verdauung und viele weitere Prozesse zeigen sogenannte zirkadiane Rhythmen.</p>
<p>Diese moderne Chronobiologie bestätigt jedoch nicht automatisch die traditionelle Zuordnung "bestimmtes Organ = bestimmtes Zwei-Stunden-Fenster". Es handelt sich um zwei unterschiedliche Modelle mit unterschiedlicher wissenschaftlicher Grundlage.</p>
<p>Auch ein einzelner Zeitpunkt ist diagnostisch unspezifisch. Um 2 Uhr, 3 Uhr oder 4 Uhr nachts aufzuwachen kann viele Gründe haben: Stress, Geräusche, Alkohol, Medikamente, Schmerzen, Temperatur, Schlafgewohnheiten, hormonelle Veränderungen, Atemstörungen oder ganz normale Schwankungen des Schlafs.</p>`,
    evidenzHtml: `<p>Die moderne Medizin kennt ausgeprägte Tagesrhythmen im menschlichen Körper. Ein zentraler Taktgeber im Gehirn koordiniert zusammen mit weiteren biologischen Uhren unter anderem Schlaf, Hormone, Körpertemperatur und Stoffwechsel. Licht und Dunkelheit gehören zu den wichtigsten Zeitgebern.</p>
<p>Für die konkrete TCM-Organuhr mit ihren zwölf traditionellen Zwei-Stunden-Zuordnungen gibt es dagegen keine vergleichbar gesicherte wissenschaftliche Bestätigung. Es existieren Forschungsarbeiten zu chinesischer Chronotherapie und zu zeitabhängigen biologischen Vorgängen, daraus lässt sich aber nicht ableiten, dass Beschwerden zu einer bestimmten Uhrzeit zuverlässig einem bestimmten TCM-Funktionskreis oder anatomischen Organ zugeordnet werden können.</p>
<p>Am sinnvollsten ist die Organuhr deshalb als traditionelles Beobachtungsmodell zu verstehen, nicht als diagnostischen Test.</p>`,
    relevanzHtml: `<p>Die Organuhr kann interessant sein, wenn du verstehen möchtest, warum eine TCM-Therapeutin nach dem Zeitpunkt deiner Beschwerden fragt. Sie kann auch helfen, Muster bewusst wahrzunehmen: Wann schläfst du ein? Wann wachst du auf? Wann treten Schmerzen auf? Wann fühlst du dich besonders müde oder wach?</p>
<p>Diese Beobachtungen können für ein Gespräch hilfreich sein. Sie sollten aber nicht dazu führen, aus einer Uhrzeit selbst eine Krankheit abzuleiten. Wenn du zum Beispiel häufig zwischen 1 und 3 Uhr aufwachst, ist die nützlichere Frage zunächst: Wie oft passiert es, wie lange bist du wach, gibt es Stress, Schnarchen, Atempausen, Schmerzen, Medikamente oder andere Veränderungen?</p>`,
    arztHinweisHtml: `<p>Wiederkehrendes nächtliches Erwachen sollte medizinisch eingeordnet werden, wenn es länger anhält, deinen Alltag deutlich beeinträchtigt oder zusammen mit anderen auffälligen Beschwerden auftritt. Dazu gehören zum Beispiel ausgeprägte Tagesmüdigkeit, lautes Schnarchen mit beobachteten Atempausen, Luftnot, starke Schmerzen, neue neurologische Beschwerden oder andere deutliche Veränderungen.</p>
<p>Bei akuten schweren Beschwerden wie starker Atemnot, Brustschmerz, Bewusstseinsstörung oder plötzlich aufgetretenen neurologischen Ausfällen gilt in der Schweiz: medizinischer Notfall, Telefon 144.</p>`,
    sources: [
      { label: 'National Institute of General Medical Sciences: Circadian Rhythms' },
      { label: 'Samuels N. Chronotherapy in traditional Chinese medicine. American Journal of Chinese Medicine, 2000.' },
      { label: 'National Center for Complementary and Integrative Health: Traditional Chinese Medicine - What You Need To Know' },
    ],
    relatedConcepts: ['organuhr-leber', 'fuenf-elemente', 'qi'],
    relatedSignals: ['herzklopfen-im-liegen', 'nachtschweiss-ohne-fieber'],
    relatedConditions: ['schlafprobleme'],
  },
  {
    type: 'tcm-concept', slug: 'organuhr-leber', section: 'grundlagen',
    status: 'published', indexable: true, publishedAt: '2026-09-26',
    nav: 'Organuhr: Leber-Zeit',
    title: 'Organuhr Leber: Was bedeutet die Leber-Zeit von 1 bis 3 Uhr?',
    metaDesc: 'Die Organuhr ordnet der Leber traditionell die Zeit von 1 bis 3 Uhr zu. Was das klassische Modell meint und warum nächtliches Aufwachen keine Leberdiagnose ist.',
    h1: 'Was bedeutet die Leber-Zeit in der Organuhr?',
    kurzantwortHtml: `<p>In der traditionellen chinesischen <a href="/gesundheitsbibliothek/tcm-verstehen/grundlagen/organuhr/">Organuhr</a> wird dem Funktionskreis Leber die Zeit zwischen 1 und 3 Uhr nachts zugeordnet. Das ist ein historisches Ordnungsmodell der TCM, keine messbare Organaktivität. Wer regelmässig in dieser Zeit aufwacht, hat deshalb nicht automatisch ein Leberproblem, weder im schulmedizinischen noch im traditionellen Sinn.</p>`,
    traditionellHtml: `<p>Die klassische Organuhr teilt den Tag in zwölf Zwei-Stunden-Abschnitte und ordnet jedem Abschnitt einen traditionellen Funktionskreis zu. Die Stunden von 1 bis 3 Uhr gelten dabei als Zeit der „Leber", von 3 bis 5 Uhr folgt die „Lunge".</p>
<p>Wichtig: Der TCM-Begriff Leber meint einen Funktionskreis mit traditionell zugeschriebenen Aufgaben, unter anderem dem freien Fluss von <a href="/gesundheitsbibliothek/tcm-verstehen/grundlagen/qi/">Qi</a> und der Verbindung zu Anspannung und Emotionen. Er ist nicht identisch mit dem anatomischen Organ Leber und schon gar nicht mit Leberwerten im Blut.</p>`,
    praxisHtml: `<p>In der TCM-Praxis ist die Leber-Zeit ein Gesprächsanlass, kein Befund: Wenn jemand berichtet, seit Wochen zwischen 1 und 3 Uhr wach zu liegen, kann das eine Therapeutin im traditionellen Modell zusammen mit vielen weiteren Beobachtungen einordnen, etwa Anspannung, Reizbarkeit oder Zyklusmustern. Eine einzelne Uhrzeit begründet dabei nie eine Einschätzung; sie ist höchstens ein Puzzleteil unter vielen.</p>`,
    abgrenzungHtml: `<p>Im Internet kursieren Deutungstabellen nach dem Muster „Aufwachen um 2 Uhr = Leberproblem". Solche Aussagen sind weder schulmedizinisch haltbar noch entsprechen sie seriöser TCM-Praxis. Nächtliches Aufwachen hat gut untersuchte häufige Ursachen: Stress, Alkohol, Schlafapnoe, Schmerzen, hormonelle Umstellung, Medikamente oder schlicht leichte Schlafphasen in der zweiten Nachthälfte.</p>
<p>Sorgen um die Organ-Leber klären Blutwerte und ärztliche Untersuchung, nicht die Uhrzeit des Aufwachens; die Einordnung von Leberwerten erklärt die Seite <a href="/gesundheitsbibliothek/befunde-werte/leberwerte-erhoeht/">Leberwerte erhöht</a>.</p>`,
    evidenzHtml: `<p>Die moderne Chronobiologie kennt tatsächlich Tagesrhythmen vieler Körperfunktionen, auch der Leber. Diese Erkenntnisse sind jedoch unabhängig von der traditionellen Organuhr entstanden und bestätigen deren Zwei-Stunden-Zuordnungen nicht. Es gibt keine Studien, die das Aufwachen zu einer bestimmten Uhrzeit als zuverlässigen Hinweis auf ein bestimmtes Organproblem belegen.</p>`,
    relevanzHtml: `<p>Wachst du regelmässig zur gleichen Zeit auf, lohnt sich der Blick auf die häufigen, fassbaren Ursachen; eine praktische Einordnung gibt das Körpersignal <a href="/koerpersignale/immer-zur-gleichen-uhrzeit-aufwachen/">Immer zur gleichen Uhrzeit aufwachen</a>. Bei anhaltenden Schlafproblemen findest du Hilfe unter <a href="/beschwerden/schlafprobleme/">Schlafprobleme</a> und akute Selbsthilfe unter <a href="/gesundheitsbibliothek/was-jetzt/schlafprobleme-heute-nacht/">Was tun bei Schlafproblemen heute Nacht?</a></p>`,
    arztHinweisHtml: `<p>Anhaltende Schlafstörungen, nächtliches Erwachen mit Atemnot, Herzrasen oder Schmerzen sowie ausgeprägte Tagesmüdigkeit gehören ärztlich abgeklärt, unabhängig von jeder Uhrzeit-Deutung.</p>`,
    relatedConcepts: ['organuhr', 'qi', 'yin-und-yang'],
    relatedTherapies: ['akupunktur'],
  },
  {
    type: 'tcm-concept', slug: 'wei-qi', section: 'grundlagen',
    status: 'published', indexable: true, publishedAt: '2026-09-26',
    nav: 'Wei Qi',
    title: 'Wei Qi: Das Abwehr-Qi der TCM erklärt',
    metaDesc: 'Wei Qi bezeichnet in der TCM traditionell das „Abwehr-Qi" an der Körperoberfläche. Was das klassische Konzept meint und warum es nicht das Immunsystem ist.',
    h1: 'Was ist Wei Qi in der TCM?',
    kurzantwortHtml: `<p>Wei Qi, oft als „Abwehr-Qi" übersetzt, ist ein traditionelles Konzept der chinesischen Medizin: eine Form von <a href="/gesundheitsbibliothek/tcm-verstehen/grundlagen/qi/">Qi</a>, die im klassischen Modell an der Körperoberfläche zirkuliert und den Körper vor äusseren Einflüssen wie „Wind" und „Kälte" schützen soll. Wei Qi ist ein historischer Erklärungsbegriff, nicht das moderne Immunsystem und keine messbare Körperfunktion.</p>`,
    traditionellHtml: `<p>Die klassischen Texte unterscheiden verschiedene Qi-Formen. Das Wei Qi gilt dabei als die „schnelle, bewegliche" Form: Es soll tagsüber an Oberfläche und Haut zirkulieren, die Poren öffnen und schliessen und den Körper gegenüber äusseren klimatischen Einflüssen abgrenzen. Nachts zieht es sich dem Modell zufolge weiter ins Innere zurück; damit erklärte man traditionell auch, warum man im Schlaf schneller friert.</p>
<p>Erkältungssymptome deutete die historische TCM als Auseinandersetzung zwischen äusseren Faktoren und dem Wei Qi an der Oberfläche. Das ist eine vormoderne Beschreibungssprache für Beobachtungen am Krankenbett, entstanden Jahrhunderte vor der Entdeckung von Krankheitserregern.</p>`,
    praxisHtml: `<p>In der heutigen TCM-Praxis taucht Wei Qi vor allem als Denkfigur auf, wenn es um Infektanfälligkeit, Zugluft-Empfindlichkeit oder starkes Schwitzen geht: Die Therapeutin beschreibt damit innerhalb des traditionellen Modells, auf welcher „Ebene" sie eine Behandlung ansetzt. Für dich als Patient:in ist wichtig: Das ist eine traditionelle Einordnung der Behandlung, kein biologischer Wirkmechanismus.</p>`,
    abgrenzungHtml: `<p>Wei Qi darf nicht mit dem Immunsystem gleichgesetzt werden. Das Immunsystem ist ein messbares biologisches System aus Zellen, Antikörpern und Signalstoffen; Wei Qi ist ein historisches Modellkonzept ohne anatomisches Korrelat. Aussagen wie „Wei Qi stärken verhindert Infekte" sind deshalb nicht haltbar: Weder lässt sich Wei Qi messen, noch ist ein solcher Schutzeffekt belegt.</p>
<p>Wer häufig krank ist, findet die fassbaren Ursachen und Abklärungswege unter <a href="/wissen/haeufige-infekte-immunsystem/">Häufige Infekte und Immunsystem</a>; auffällige Entzündungswerte erklärt <a href="/gesundheitsbibliothek/befunde-werte/crp-erhoeht/">CRP erhöht</a>.</p>`,
    evidenzHtml: `<p>Aus wissenschaftlicher Sicht ist Wei Qi eine Theoriefigur der klassischen chinesischen Medizin. Die moderne Immunologie beschreibt Abwehr völlig anders und deutlich präziser. Studien zu Akupunktur bei Infektanfälligkeit sind begrenzt und rechtfertigen keine Schutzversprechen; seriös ist höchstens die Aussage, dass TCM-Behandlungen von manchen Menschen als unterstützend für das Allgemeinbefinden erlebt werden.</p>`,
    relevanzHtml: `<p>Wenn eine Therapeutin von Wei Qi spricht, beschreibt sie ihre traditionelle Behandlungslogik, keine Diagnose deines Immunsystems. Bei wiederholten Infekten, anhaltender Erschöpfung oder Fieber gehört die medizinische Abklärung an den Anfang; TCM kann danach je nach Situation ergänzend eingesetzt werden.</p>`,
    arztHinweisHtml: `<p>Häufige oder ungewöhnlich schwere Infekte, anhaltendes Fieber, Nachtschweiss oder ungewollter Gewichtsverlust gehören ärztlich abgeklärt; ein traditionelles Konzept ersetzt diese Abklärung nicht.</p>`,
    relatedConcepts: ['qi', 'yin-und-yang', 'jing'],
    relatedTherapies: ['akupunktur'],
  },
  {
    type: 'tcm-concept', slug: 'jing', section: 'grundlagen',
    status: 'published', indexable: true, publishedAt: '2026-09-26',
    nav: 'Jing (Essenz)',
    title: 'Jing in der TCM: Das Essenz-Konzept erklärt',
    metaDesc: 'Jing bezeichnet in der TCM traditionell die „Essenz": ein klassisches Konzept zu Konstitution, Entwicklung und Lebensphasen. Was es meint und was nicht.',
    h1: 'Was ist Jing in der chinesischen Medizin?',
    kurzantwortHtml: `<p>Jing, meist mit „Essenz" übersetzt, ist eines der Grundkonzepte der klassischen chinesischen Medizin. Es beschreibt im traditionellen Modell die konstitutionelle Grundlage eines Menschen: das, was er mitbringt, und wie er sich über Lebensphasen entwickelt und altert. Jing ist eine historische Denkfigur, keine messbare biologische Substanz.</p>`,
    traditionellHtml: `<p>Die klassischen Texte unterscheiden das „vorgeburtliche" Jing, das ein Mensch dem Modell zufolge von den Eltern mitbekommt, und das „nachgeburtliche" Jing, das über Ernährung und Lebensweise laufend ergänzt wird. Traditionell wird Jing dem Funktionskreis Niere zugeordnet und mit Wachstum, Entwicklung, Fruchtbarkeit und Altern in Verbindung gebracht.</p>
<p>Die klassischen Beschreibungen von Lebensphasen in Sieben- und Acht-Jahres-Zyklen gehören zu diesem Konzept. Sie sind kulturhistorisch interessant, aber keine biologischen Gesetzmässigkeiten.</p>`,
    praxisHtml: `<p>In der heutigen Praxis dient Jing vor allem als traditioneller Rahmen, um über Konstitution, Erholung und Lebensphasen zu sprechen, etwa bei Erschöpfung, Kinderwunsch oder in den Wechseljahren. Eine seriöse Therapeutin nutzt den Begriff als Modellsprache innerhalb der TCM-Anamnese, nicht als Diagnose oder Prognose.</p>`,
    abgrenzungHtml: `<p>Jing ist keine Substanz, die sich messen, aufbrauchen oder mit Präparaten „auffüllen" liesse. Angebote, die „Jing-Aufbau" durch Supplements oder Kräuterkuren versprechen, haben weder eine traditionelle noch eine wissenschaftliche Grundlage in dieser Form; chinesische <a href="/therapien/kraeutertherapie/">Kräutertherapie</a> ist ein professioneller Behandlungsweg, kein Anti-Aging-Produkt.</p>
<p>Auch Longevity- und Anti-Aging-Versprechen lassen sich aus dem Konzept nicht ableiten. Der TCM-Begriff Niere, dem Jing zugeordnet wird, ist zudem nicht das anatomische Organ; Nieren-Laborwerte erklärt die Seite <a href="/gesundheitsbibliothek/befunde-werte/nierenwerte-erhoeht/">Nierenwerte erhöht</a>.</p>`,
    evidenzHtml: `<p>Wachstum, Fruchtbarkeit und Altern werden heute durch Genetik, Endokrinologie und Zellbiologie erklärt. Das Jing-Konzept hat darin kein direktes Gegenstück und wird von der Forschung nicht als eigenständige Grösse untersucht. Es bleibt ein traditionelles Ordnungsmodell mit historischem und kulturellem Wert.</p>`,
    relevanzHtml: `<p>Für dich heisst das: Wenn in einer TCM-Beratung von Jing die Rede ist, geht es um die traditionelle Einordnung von Konstitution und Lebensphase, nicht um einen Befund. Konkrete Anliegen wie <a href="/beschwerden/erschoepfung/">Erschöpfung</a>, <a href="/beschwerden/kinderwunsch/">Kinderwunsch</a> oder <a href="/beschwerden/wechseljahre/">Wechseljahre</a> haben eigene, fassbare Abklärungs- und Behandlungswege.</p>`,
    arztHinweisHtml: `<p>Anhaltende Erschöpfung, unerfüllter Kinderwunsch oder ausgeprägte Wechseljahrsbeschwerden gehören medizinisch abgeklärt beziehungsweise begleitet; traditionelle Konzepte ersetzen diese Abklärung nicht.</p>`,
    relatedConcepts: ['qi', 'yin-und-yang', 'shen', 'wei-qi'],
    relatedTherapies: ['akupunktur', 'kraeutertherapie'],
  },
  {
    type: 'tcm-concept', slug: 'shen', section: 'grundlagen',
    status: 'published', indexable: true, publishedAt: '2026-09-26',
    nav: 'Shen (Geist)',
    title: 'Shen in der TCM: Geist und Bewusstsein im traditionellen Modell',
    metaDesc: 'Shen bezeichnet in der TCM traditionell Geist, Bewusstsein und Ausstrahlung und wird klassisch dem Herz-Funktionskreis zugeordnet. Was das Konzept meint und was nicht.',
    h1: 'Was bedeutet Shen in der TCM?',
    kurzantwortHtml: `<p>Shen wird meist mit „Geist" übersetzt und bezeichnet in der klassischen chinesischen Medizin das Bündel aus Bewusstsein, mentaler Präsenz, Emotionen und Ausstrahlung. Traditionell wird Shen dem Funktionskreis Herz zugeordnet; ein „ruhiger Shen" gilt als Zeichen von innerer Ausgeglichenheit und gutem Schlaf. Shen ist ein traditionelles Modellkonzept, kein neurologischer oder psychiatrischer Begriff.</p>`,
    traditionellHtml: `<p>In den klassischen Texten „wohnt" der Shen im Herzen und zeigt sich unter anderem im Blick, in der Klarheit des Denkens und im Schlaf. Unruhe, Grübeln oder Schlaflosigkeit werden im traditionellen Modell als „unruhiger Shen" beschrieben; das Konzept steht in enger Beziehung zu <a href="/gesundheitsbibliothek/tcm-verstehen/grundlagen/qi/">Qi</a>, Blut und <a href="/gesundheitsbibliothek/tcm-verstehen/grundlagen/yin-und-yang/">Yin und Yang</a>.</p>
<p>Diese Zuordnung zum „Herzen" ist kulturhistorisch zu verstehen: Viele vormoderne Medizinsysteme, auch europäische, verorteten Geist und Gefühl im Herzen.</p>`,
    praxisHtml: `<p>Praktisch dient Shen der Therapeutin als traditioneller Sammelbegriff für die mentale Seite des Befindens: Wie präsent, erholt und belastet wirkt jemand? Bei Schlafproblemen, innerer Unruhe oder Stress fliesst diese Beobachtung in die TCM-Einschätzung ein und beeinflusst zum Beispiel die Punktwahl in der <a href="/therapien/akupunktur/">Akupunktur</a>. Das ersetzt keine psychologische oder ärztliche Beurteilung.</p>`,
    abgrenzungHtml: `<p>Aus Shen lassen sich keine psychischen Diagnosen ableiten: Depression, Angststörungen oder andere Erkrankungen sind medizinische Diagnosen mit eigenen Kriterien und Behandlungswegen. Ebenso wenig ist Shen ein Organ oder eine Hirnfunktion; die moderne Neurowissenschaft beschreibt Bewusstsein und Emotion grundlegend anders.</p>
<p>Ein seriöser Umgang heisst: Shen als traditionelle Beschreibungssprache nutzen und bei relevanten psychischen Beschwerden zur fachlichen Abklärung ermutigen.</p>`,
    evidenzHtml: `<p>Shen ist wissenschaftlich nicht messbar und kein Forschungsgegenstand der Psychiatrie oder Neurologie. Untersucht wird stattdessen, ob Akupunktur bei Schlafproblemen oder Stress ergänzend helfen kann; die Evidenz dazu ist je nach Fragestellung unterschiedlich und rechtfertigt keine Heilversprechen für psychische Erkrankungen.</p>`,
    relevanzHtml: `<p>Wenn deine Therapeutin vom Shen spricht, meint sie die traditionelle Sicht auf Präsenz, Schlaf und innere Ruhe. Konkrete Hilfe findest du unter <a href="/beschwerden/schlafprobleme/">Schlafprobleme</a> und <a href="/beschwerden/stress-burnout/">Stress und Burnout</a>; für die akute Nacht gibt es <a href="/gesundheitsbibliothek/was-jetzt/schlafprobleme-heute-nacht/">Was tun bei Schlafproblemen heute Nacht?</a></p>`,
    arztHinweisHtml: `<p>Anhaltende gedrückte Stimmung, Angstzustände, Hoffnungslosigkeit oder Gedanken, sich etwas anzutun, gehören in ärztliche oder psychotherapeutische Hände. In akuten Krisen ist in der Schweiz die Dargebotene Hand unter Telefon 143 erreichbar, in Notfällen der Notruf 144.</p>`,
    relatedConcepts: ['qi', 'yin-und-yang', 'jing', 'organuhr'],
    relatedTherapies: ['akupunktur'],
  },
  {
    type: 'tcm-concept', slug: 'akupunkturpunkte', section: 'meridiane-punkte',
    status: 'published', indexable: true, publishedAt: '2026-09-26',
    nav: 'Akupunkturpunkte',
    title: 'Akupunkturpunkte: Was sie sind und wie sie gewählt werden',
    metaDesc: 'Was Akupunkturpunkte in der TCM sind, wie sie mit dem Meridianmodell zusammenhängen, wie Therapeut:innen Punkte auswählen und was die Forschung dazu sagt.',
    h1: 'Was sind Akupunkturpunkte?',
    kurzantwortHtml: `<p>Akupunkturpunkte sind definierte Stellen am Körper, die in der traditionellen chinesischen Medizin für Akupunktur und Akupressur verwendet werden. Sie werden im TCM-Modell entlang der <a href="/gesundheitsbibliothek/tcm-verstehen/meridiane-punkte/meridiane/">Meridiane</a> angeordnet und nach traditionellen Kriterien ausgewählt. Akupunkturpunkte sind Orientierungspunkte eines traditionellen Behandlungssystems, keine anatomisch eigenständigen Organe.</p>`,
    traditionellHtml: `<p>Die klassische chinesische Medizin beschreibt mehrere hundert Punkte, die meisten davon auf den zwölf Hauptleitbahnen. Jeder Punkt trägt einen traditionellen Namen und eine Nummer innerhalb seiner Leitbahn, zum Beispiel „Dickdarm 4" am Handrücken.</p>
<p>Im traditionellen Modell werden Punkten bestimmte Wirkbereiche und Beziehungen zugeschrieben: lokale Punkte in der Nähe einer Beschwerde, Fernpunkte an Armen oder Beinen und Kombinationen, die sich auf das vermutete TCM-Muster beziehen. Diese Zuschreibungen stammen aus jahrhundertelanger Überlieferung und Systematisierung, nicht aus anatomischen Messungen.</p>`,
    praxisHtml: `<p>In der Behandlung wählt die Therapeutin oder der Therapeut Punkte nach mehreren Kriterien aus: wo die Beschwerde liegt, welches TCM-Muster nach Gespräch, Puls- und Zungenbefund vermutet wird und wie die letzte Behandlung vertragen wurde. Meist werden wenige bis rund ein Dutzend Punkte kombiniert; mehr Punkte bedeuten nicht automatisch eine bessere Behandlung.</p>
<p>Viele häufig verwendete Punkte liegen an Unterarmen, Händen, Unterschenkeln und Füssen. Deshalb kann eine Behandlung von Kopf- oder Bauchbeschwerden auch Punkte an Armen und Beinen einbeziehen. Dieselben Punkte dienen in der <a href="/therapien/akupressur/">Akupressur</a> als Orientierung, dort mit Druck statt Nadeln.</p>`,
    abgrenzungHtml: `<p>Akupunkturpunkte sind keine nachgewiesenen anatomischen Strukturen: Es gibt kein eigenes „Punkt-Organ", das sich unter dem Mikroskop eindeutig abgrenzen liesse. Manche Punkte liegen in Regionen mit vielen Nervenendigungen oder Muskel-Faszien-Übergängen, eine durchgehende anatomische Erklärung für alle Punkte existiert jedoch nicht.</p>
<p>Ebenso wenig gibt es den einen „Punkt gegen" eine bestimmte Krankheit. Listen, die einzelnen Punkten feste Heilwirkungen zuschreiben, werden weder der traditionellen Systematik noch der Studienlage gerecht. Diese Seite ist bewusst keine Anleitung zur Selbstbehandlung.</p>`,
    evidenzHtml: `<p>Die Forschung untersucht Akupunktur meist als Gesamtverfahren, nicht einzelne Punkte isoliert. Für einige Anwendungsgebiete, etwa bestimmte Schmerzzustände, zeigen Studien Effekte von Akupunktur; wie viel davon auf die exakte Punktlokalisation zurückgeht, ist wissenschaftlich umstritten, da auch Nadelungen abseits klassischer Punkte in Studien Wirkungen zeigen können.</p>
<p>Seriös lässt sich sagen: Die Punktwahl folgt einem traditionellen, in sich konsistenten System, und die Wirksamkeit der Akupunktur ist je nach Beschwerde unterschiedlich gut belegt. Ein Wirkversprechen für einzelne Punkte lässt sich daraus nicht ableiten.</p>`,
    relevanzHtml: `<p>Für dich als Patient:in heisst das: Du musst keine Punkte kennen oder mitbringen. Die Auswahl gehört zur Behandlung und wird dir auf Wunsch erklärt. Wenn dich interessiert, wie eine Behandlung abläuft und wie sich die Nadeln anfühlen, findest du das unter <a href="/gesundheitsbibliothek/fragen/was-passiert-beim-ersten-termin/">Was passiert beim ersten Termin?</a> und <a href="/gesundheitsbibliothek/fragen/tut-akupunktur-weh/">Tut Akupunktur weh?</a></p>`,
    arztHinweisHtml: `<p>Akupunkturpunkte und ihre traditionelle Systematik ersetzen keine medizinische Diagnostik. Neue, starke oder unklare Beschwerden gehören zuerst ärztlich eingeordnet; Akupunktur kann danach je nach Beschwerde als ergänzende Behandlung infrage kommen.</p>`,
    relatedConcepts: ['meridiane', 'qi'],
    relatedTherapies: ['akupunktur', 'akupressur'],
  },
  {
    type: 'tcm-concept', slug: 'meridiane', section: 'meridiane-punkte',
    status: 'published', indexable: true, publishedAt: '2026-09-23',
    nav: 'Meridiane',
    title: 'Meridiane in der TCM: Das Leitbahnen-Modell erklärt',
    metaDesc: 'Was Meridiane in der TCM sind: das traditionelle Leitbahnen-Modell, seine Rolle in der Akupunktur und warum Meridiane keine anatomischen Strukturen sind.',
    h1: 'Meridiane: Das Leitbahnen-Modell der TCM',
    kurzantwortHtml: `<p>Meridiane, in der TCM häufig auch Leitbahnen genannt, sind ein traditionelles Ordnungssystem der chinesischen Medizin. Auf diesen Leitbahnen werden Akupunkturpunkte angeordnet und miteinander in Beziehung gesetzt. Das Meridianmodell ist zentral für Akupunktur und Akupressur. Meridiane sind jedoch keine anatomisch eindeutig nachgewiesenen Gefässe, Nerven oder anderen Körperstrukturen.</p>`,
    traditionellHtml: `<p>Die klassische TCM beschreibt ein Netzwerk von Leitbahnen, über das verschiedene Körperregionen, Funktionskreise und Akupunkturpunkte miteinander verbunden werden. Besonders bekannt sind die zwölf Hauptleitbahnen.</p>
<p>Zu ihnen gehören traditionell die Leitbahnen von:</p>
<ul>
<li>Lunge und Dickdarm</li>
<li>Magen und Milz</li>
<li>Herz und Dünndarm</li>
<li>Blase und Niere</li>
<li>Perikard und Dreifachem Erwärmer</li>
<li>Gallenblase und Leber</li>
</ul>
<p>Daneben beschreibt die chinesische Medizin weitere Leitbahnsysteme. Die Namen orientieren sich an traditionellen Funktionskreisen und dürfen nicht so verstanden werden, als würde jede Leitbahn anatomisch direkt zu dem gleichnamigen Organ führen.</p>`,
    praxisHtml: `<p>Für Akupunktur ist das Meridianmodell vor allem eine Landkarte zur Auswahl und Kombination von Punkten. Eine Therapeutin entscheidet nicht nur danach, wo ein Symptom liegt, sondern berücksichtigt auch das vermutete TCM-Muster und Beziehungen zwischen verschiedenen Punkten.</p>
<p>Ein Punkt am Unterarm kann deshalb in der traditionellen Akupunktur auch für Beschwerden verwendet werden, die nicht unmittelbar an dieser Stelle auftreten. Ob eine bestimmte Punktauswahl sinnvoll ist, hängt von der konkreten Situation ab.</p>
<p>Auch in der Akupressur dient das Leitbahnen-Modell zur Orientierung. Der entscheidende Unterschied ist, dass dabei Druck statt Nadeln eingesetzt wird.</p>`,
    abgrenzungHtml: `<p>Meridiane sollten nicht mit Blutgefässen, Lymphbahnen oder Nerven verwechselt werden. Bis heute gibt es keine allgemein anerkannte anatomische Struktur, die das traditionelle Meridiansystem eins zu eins abbildet.</p>
<p>Es gibt Forschungsansätze, die unter anderem Bindegewebe, Faszien, nervale Mechanismen, elektrische Eigenschaften oder andere physiologische Prozesse untersuchen. Solche Hypothesen können interessant sein, haben aber bislang keinen Konsens hervorgebracht, der die klassischen Meridiane als eigenständige anatomische Kanäle bestätigt.</p>`,
    evidenzHtml: `<p>Akupunktur kann wissenschaftlich untersucht werden, ohne dass dafür Meridiane als anatomische Strukturen nachgewiesen sein müssen. Für bestimmte Beschwerden existiert klinische Evidenz zu Akupunktur. Gleichzeitig sind die genauen Wirkmechanismen komplex und Gegenstand weiterer Forschung.</p>
<p>Untersuchungen beschäftigen sich beispielsweise mit Nervenreizung, Schmerzverarbeitung, lokalen Gewebereaktionen und weiteren physiologischen Mechanismen. Diese Forschung sollte nicht mit dem Nachweis des traditionellen Leitbahnen-Modells gleichgesetzt werden.</p>`,
    relevanzHtml: `<p>Wenn du Akupunktur bekommst, erklärt das Meridianmodell, warum Therapeutinnen bestimmte Punkte miteinander kombinieren und weshalb Punkte nicht immer direkt an der schmerzenden Stelle liegen.</p>
<p>Du musst das Modell nicht als Anatomie verstehen, damit es als traditionelle Behandlungssystematik nachvollziehbar wird. Bei TCM.ch trennen wir deshalb bewusst zwischen der historischen TCM-Erklärung und dem, was über Anatomie und Physiologie wissenschaftlich belegt ist.</p>`,
    arztHinweisHtml: `<p>Kribbeln, Taubheit, Lähmungserscheinungen, starke neu aufgetretene Schmerzen oder andere neurologische Beschwerden sollten nicht als "blockierter Meridian" selbst diagnostiziert werden. Solche Symptome können medizinische Ursachen haben und sollten entsprechend abgeklärt werden.</p>
<p>Bei plötzlich auftretenden Lähmungen, Sprachstörungen, starker Schwäche oder anderen akuten neurologischen Ausfällen gilt in der Schweiz: Notruf 144.</p>`,
    sources: [
      { label: 'National Center for Complementary and Integrative Health: Acupuncture - Effectiveness and Safety' },
      { label: 'Peer-reviewed research on the anatomical basis of acupuncture meridians: anatomical basis remains unresolved' },
    ],
    relatedConcepts: ['akupunkturpunkte', 'qi'],
    relatedTherapies: ['akupunktur', 'akupressur'],
  },
  {
    type: 'tcm-diagnostic', slug: 'zungendiagnostik', section: 'diagnostik',
    status: 'published', indexable: true, publishedAt: '2026-09-23',
    nav: 'Zungendiagnostik',
    title: 'Zungendiagnostik in der TCM: Was die Zunge zeigt und was nicht',
    metaDesc: 'Zungendiagnostik der TCM: was Therapeut:innen an Farbe, Form und Belag beobachten, wie das Bild in die Einschätzung einfliesst und was es nicht leisten kann.',
    h1: 'Zungendiagnostik: Wie die TCM die Zunge betrachtet',
    kurzantwortHtml: `<p>Bei der Zungendiagnostik betrachtet eine TCM-Therapeutin unter anderem Farbe, Form, Feuchtigkeit und Belag der Zunge. Diese Beobachtungen werden zusammen mit Gespräch, Puls und Beschwerden in ein traditionelles TCM-Muster eingeordnet. Die Zungendiagnostik ist kein Ersatz für medizinische Diagnostik und eignet sich nicht dazu, anhand eines einzelnen Merkmals selbst eine Krankheit festzustellen.</p>`,
    traditionellHtml: `<p>Die Zunge gehört in der chinesischen Medizin zu den klassischen Beobachtungsmerkmalen. Traditionell werden verschiedene Bereiche betrachtet:</p>
<ul>
<li>Farbe des Zungenkörpers</li>
<li>Form und Grösse</li>
<li>Feuchtigkeit</li>
<li>Zungenbelag</li>
<li>Risse oder andere sichtbare Merkmale</li>
</ul>
<p>Diese Beobachtungen werden innerhalb der TCM bestimmten Mustern zugeordnet. Eine einzelne rote, blasse oder belegte Zunge soll dabei nicht isoliert beurteilt werden. Entscheidend ist die Kombination mit den übrigen Beschwerden und Befunden der traditionellen Untersuchung.</p>`,
    praxisHtml: `<p>Beim ersten TCM-Termin wird die Therapeutin deine Zunge meist nur kurz anschauen. Dafür ist normalerweise keine spezielle Vorbereitung nötig. Essen, Getränke, Rauchen, Mundpflege und andere Faktoren können das Aussehen der Zunge verändern und sollten bei der Interpretation berücksichtigt werden.</p>
<p>Das Zungenbild wird anschliessend mit anderen Informationen zusammengeführt. Dazu gehören typischerweise deine Beschwerden, Schlaf, Verdauung, Temperaturgefühl, Energie, Zyklus und der traditionell getastete Puls.</p>
<p>Die TCM-Behandlung wird deshalb nicht aufgrund der Zunge allein geplant.</p>`,
    abgrenzungHtml: `<p>Eine TCM-Zungenbeurteilung ist nicht dasselbe wie eine ärztliche oder zahnmedizinische Untersuchung der Mundhöhle. Sichtbare Veränderungen können zahlreiche Ursachen haben, darunter Ernährung, Medikamente, Mundtrockenheit, Infektionen, Reizungen, Zahn- oder Schleimhauterkrankungen.</p>
<p>Besonders problematisch sind Online-Tabellen nach dem Prinzip "rote Spitze = Herzproblem" oder "dicker Belag = bestimmte Krankheit". Solche vereinfachten Zuordnungen eignen sich nicht für eine verlässliche Selbstdiagnose.</p>`,
    evidenzHtml: `<p>Die Zunge enthält tatsächlich medizinisch relevante sichtbare Merkmale, und die Inspektion der Mundhöhle gehört auch zur konventionellen Medizin. Das bedeutet jedoch nicht, dass das traditionelle TCM-Zungenmodell als diagnostischer Test für innere Erkrankungen validiert ist.</p>
<p>Studien zur Zuverlässigkeit traditioneller TCM-Diagnostik zeigen, dass die Übereinstimmung zwischen verschiedenen Beurteilenden je nach Merkmal unterschiedlich und teilweise nur begrenzt ist. Technische Bildanalyse kann bestimmte sichtbare Eigenschaften standardisierter erfassen, beantwortet aber nicht automatisch die Frage, ob sich daraus eine bestimmte medizinische Erkrankung diagnostizieren lässt.</p>
<p>Deshalb verstehen wir die Zungenbeurteilung als Teil der traditionellen TCM-Einschätzung, nicht als Ersatz für Labor, Bildgebung oder ärztliche Diagnostik.</p>`,
    relevanzHtml: `<p>Für dich als Patientin oder Patient ist vor allem wichtig zu wissen, warum bei einem TCM-Termin überhaupt auf die Zunge geschaut wird. Sie liefert der Therapeutin einen weiteren Beobachtungspunkt innerhalb ihres traditionellen Modells.</p>
<p>Ein seriöses Gespräch sollte dabei nie bei einem Zungenmerkmal stehen bleiben. Wenn aus der Beobachtung Fragen entstehen, können konventionelle medizinische Untersuchungen zusätzlich sinnvoll sein.</p>`,
    arztHinweisHtml: `<p>Ungeklärte oder auffällige Veränderungen im Mund sollten medizinisch oder zahnmedizinisch beurteilt werden, besonders wenn sie bestehen bleiben oder mit Schmerzen, Blutungen, Geschwüren, deutlicher Schwellung, Schluckbeschwerden oder anderen neuen Symptomen verbunden sind.</p>
<p>Bei akuter Schwellung mit Atem- oder Schluckproblemen ist rasche medizinische Hilfe erforderlich.</p>`,
    sources: [
      { label: 'Experimental Studies of Inter-Rater Agreement in Traditional Chinese Medicine: A Systematic Review' },
      { label: 'Research on intra-rater and inter-rater reliability of TCM tongue assessment' },
    ],
    relatedDiagnostics: ['pulsdiagnostik'],
    relatedSignals: ['zungenbrennen'],
    relatedLinks: [
      { href: '/gesundheitsbibliothek/fragen/was-passiert-beim-ersten-termin/', label: 'Was passiert beim ersten Termin?', cat: 'Frage' },
    ],
  },
  {
    type: 'tcm-diagnostic', slug: 'pulsdiagnostik', section: 'diagnostik',
    status: 'published', indexable: true, publishedAt: '2026-09-23',
    nav: 'Pulsdiagnostik',
    title: 'Pulsdiagnostik in der TCM: Was das Pulstasten erfasst',
    metaDesc: 'Pulsdiagnostik der TCM: warum an beiden Handgelenken getastet wird, welche Qualitäten traditionell unterschieden werden und was das Verfahren nicht ersetzt.',
    h1: 'Pulsdiagnostik: Wie die TCM den Puls tastet',
    kurzantwortHtml: `<p>Bei der Pulsdiagnostik der TCM tastet eine Therapeutin den Puls an beiden Handgelenken und beurteilt dabei traditionell mehr als nur die Herzfrequenz. Beschrieben werden unter anderem Tiefe, Stärke, Geschwindigkeit und weitere sogenannte Pulsqualitäten. Diese Einschätzung gehört zum traditionellen TCM-Modell. Sie ersetzt weder eine medizinische Pulsmessung noch eine Untersuchung von Herz und Kreislauf.</p>`,
    traditionellHtml: `<p>Die Pulsdiagnostik hat in der chinesischen Medizin eine lange Tradition. Der Puls wird typischerweise an mehreren Positionen an beiden Handgelenken getastet. Innerhalb des traditionellen Systems werden unterschiedliche Positionen mit verschiedenen Funktionskreisen in Beziehung gesetzt.</p>
<p>Zusätzlich unterscheiden TCM-Therapeutinnen zahlreiche beschreibende Pulsqualitäten. Beispiele sind traditionell ein oberflächlicher, tiefer, schneller, langsamer, kräftiger, schwacher oder gespannter Puls.</p>
<p>Diese Begriffe sind Teil einer TCM-Mustersprache. Sie dürfen nicht direkt mit einer bestimmten Herzerkrankung oder einem einzelnen medizinischen Messwert gleichgesetzt werden.</p>`,
    praxisHtml: `<p>Beim Termin legt die Therapeutin meist mehrere Finger auf die Arterie am Handgelenk und tastet den Puls nacheinander an verschiedenen Positionen und mit unterschiedlichem Druck.</p>
<p>Die Beobachtung wird zusammen mit deiner Anamnese, dem Zungenbild und den aktuellen Beschwerden eingeordnet. Der TCM-Puls kann sich aus Sicht der traditionellen Diagnostik beispielsweise abhängig von aktueller Situation und Gesamtbild unterschiedlich darstellen.</p>
<p>Er sollte deshalb nicht isoliert interpretiert werden und ist innerhalb der TCM nur ein Teil der Gesamtbeurteilung.</p>`,
    abgrenzungHtml: `<p>Die TCM-Pulsdiagnostik unterscheidet sich von einer konventionellen Untersuchung des Kreislaufs. In der Medizin werden unter anderem Herzfrequenz und Herzrhythmus beurteilt, bei Bedarf ergänzt durch Blutdruckmessung, EKG, Langzeit-EKG, Labor oder andere Untersuchungen.</p>
<p>Eine TCM-Pulsqualität kann solche Verfahren nicht ersetzen. Ein traditionell als "schwach" beschriebener Puls beweist beispielsweise keine bestimmte Erkrankung. Umgekehrt lässt sich eine Herzrhythmusstörung nicht zuverlässig ausschliessen, nur weil der TCM-Puls unauffällig erscheint.</p>`,
    evidenzHtml: `<p>Ein wesentlicher Forschungsbereich zur TCM-Pulsdiagnostik ist die Frage, wie zuverlässig unterschiedliche Therapeutinnen dieselben Pulsqualitäten beurteilen. Übersichtsarbeiten zeigen hier eine relevante Variabilität. Die Übereinstimmung zwischen Untersuchenden ist nicht durchgehend hoch.</p>
<p>Deshalb wird auch versucht, einzelne Pulsmerkmale technisch zu erfassen und stärker zu standardisieren. Diese Forschung kann die Beschreibung objektivierbarer machen, bedeutet aber nicht, dass die traditionellen Pulszuordnungen bereits als medizinische Diagnostik validiert sind.</p>`,
    relevanzHtml: `<p>Wenn eine TCM-Therapeutin deinen Puls länger tastet als du es vom Hausarzt kennst, liegt das daran, dass sie innerhalb des traditionellen Systems andere Informationen sucht als nur Schläge pro Minute.</p>
<p>Du kannst jederzeit fragen, welche Beobachtung sie gemacht hat und wie diese zusammen mit deinen Beschwerden in die Behandlung einfliesst. Gute integrative Medizin bedeutet dabei auch, klar zu sagen, wo eine traditionelle Einschätzung endet und wo medizinische Diagnostik beginnt.</p>`,
    arztHinweisHtml: `<p>Herzklopfen, ein unregelmässiger Puls, Schwindel, Ohnmacht, Atemnot oder neu auftretende Kreislaufbeschwerden sollten medizinisch beurteilt werden. Eine TCM-Pulsdiagnostik ist dafür kein Ersatz.</p>
<p>Bei starkem Brustschmerz, schwerer Atemnot, Bewusstlosigkeit oder anderen akuten schweren Beschwerden gilt in der Schweiz: Notruf 144.</p>`,
    sources: [
      { label: 'Experimental Studies of Inter-Rater Agreement in Traditional Chinese Medicine: A Systematic Review' },
      { label: 'Can Traditional Chinese Medicine Diagnosis Be Parameterized and Standardized? A Narrative Review' },
    ],
    relatedDiagnostics: ['zungendiagnostik'],
    relatedLinks: [
      { href: '/gesundheitsbibliothek/fragen/was-passiert-beim-ersten-termin/', label: 'Was passiert beim ersten Termin?', cat: 'Frage' },
    ],
  },
];

export const publishedTcmEntities = tcmEntities.filter((e) => e.status === 'published');
export const tcmEntityBySlug = (slug: string) => tcmEntities.find((e) => e.slug === slug);

export interface TcmSection {
  slug: string;
  nav: string;
  title: string;
  metaDesc: string;
  h1: string;
  lead: string;
  indexable: boolean;
  /** Traditionelles-Modell-Hinweis prominent anzeigen (Muster, Diagnostik). */
  modellHinweis?: boolean;
  introHtml: string;
  /** Bestehende Inhalte, die heute schon in diese Sektion gehören (nur echte URLs). */
  vorhandene: TcmLink[];
  /** Geplante Themen als reiner Text (KEINE Links, keine URLs, kein Fake-Inhalt). */
  geplant: string[];
}

export const tcmSections: TcmSection[] = [
  {
    slug: 'grundlagen',
    nav: 'Grundlagen & Begriffe',
    title: 'TCM-Grundlagen & Begriffe',
    metaDesc: 'Qi, Yin und Yang, Fünf Elemente, Organuhr: die Grundbegriffe der Traditionellen Chinesischen Medizin, modern und verständlich eingeordnet.',
    h1: 'Grundlagen & Begriffe',
    lead: 'Was meint die TCM, wenn sie von Qi, Yin und Yang oder den Fünf Elementen spricht? Hier entsteht das Begriffslexikon: traditionelle Konzepte, modern erklärt.',
    indexable: true,
    introHtml: '<p>Die Traditionelle Chinesische Medizin arbeitet mit eigenen Begriffen und Denkmodellen, die über 2000 Jahre gewachsen sind. Wer sie zum ersten Mal hört, versteht oft nur Bahnhof. Diese Sektion übersetzt: Was ist mit einem Begriff traditionell gemeint, wie nutzt ihn die Therapeutin in der Praxis, und wie ist er aus heutiger medizinischer Sicht einzuordnen? Wichtig vorweg: Es handelt sich um traditionelle Erklärungsmodelle, nicht um anatomische oder biomedizinische Fakten.</p>',
    vorhandene: [
      { href: '/therapien/', label: 'Therapien im Überblick', cat: 'Therapien' },
      { href: '/gesundheitsbibliothek/fragen/was-passiert-beim-ersten-termin/', label: 'Was passiert beim ersten Termin?', cat: 'Frage' },
    ],
    geplant: ['TCM-Ernährung', 'Blut (Xue)'],
  },
  {
    slug: 'muster',
    nav: 'TCM-Muster',
    title: 'TCM-Muster & Syndrome',
    metaDesc: 'Qi-Mangel, Leber-Qi-Stagnation, Yin-Mangel: was TCM-Muster bedeuten, wie Therapeutinnen sie nutzen und was sie NICHT sind: schulmedizinische Diagnosen.',
    h1: 'TCM-Muster',
    lead: 'Leber-Qi-Stagnation, Milz-Qi-Mangel, Yin-Mangel: Die TCM ordnet Beschwerden in traditionelle Muster ein. Hier entsteht die Übersicht, was diese Begriffe bedeuten und was nicht.',
    indexable: false,
    modellHinweis: true,
    introHtml: '<p>Wenn eine TCM-Therapeutin von einem Muster wie Qi-Stagnation oder Yin-Mangel spricht, ist das eine traditionelle Arbeitsdiagnose: eine Einordnung von Beschwerden, Puls- und Zungenbild nach den Kategorien der chinesischen Medizin. Sie hilft, die Behandlung zu wählen. Sie ist keine schulmedizinische Diagnose und ersetzt keine ärztliche Abklärung. Genau diese doppelte Lesart wird jede Muster-Seite in dieser Sektion sauber trennen.</p>',
    vorhandene: [
      { href: '/gesundheitsbibliothek/fragen/wann-zuerst-zum-arzt/', label: 'Wann sollte ich zuerst zum Arzt?', cat: 'Frage' },
      { href: '/koerpersignale/', label: 'Körpersignale einordnen', cat: 'Körpersignale' },
    ],
    geplant: ['Qi-Mangel', 'Qi-Stagnation', 'Leber-Qi-Stagnation', 'Milz-Qi-Mangel', 'Yin-Mangel', 'Yang-Mangel', 'Blut-Mangel', 'Blut-Stase', 'Feuchtigkeit', 'Hitze', 'Kälte'],
  },
  {
    slug: 'meridiane-punkte',
    nav: 'Meridiane & Punkte',
    title: 'Meridiane & Akupunkturpunkte',
    metaDesc: 'Meridiane, Akupunkturpunkte und Akupressurpunkte: wie das traditionelle Leitbahnen-Modell aufgebaut ist und wie Punkte in der Behandlung eingesetzt werden.',
    h1: 'Meridiane & Punkte',
    lead: 'Wo liegen die Leitbahnen der TCM, welche Punkte nutzt die Akupunktur, und was kannst du mit Akupressur selbst tun? Hier entsteht die Übersicht über Meridiane und Punkte.',
    indexable: true,
    introHtml: '<p>Das Meridian-Modell beschreibt traditionell zwölf Hauptleitbahnen, auf denen die Akupunkturpunkte liegen. Es ist ein historisch gewachsenes Ordnungssystem für die Punktauswahl, kein anatomischer Befund: Meridiane sind mit bildgebenden Verfahren nicht darstellbar. In der Praxis relevant bleibt das System trotzdem, weil es beschreibt, welche Punkte bei welchen Beschwerden kombiniert werden. Diese Sektion wird die wichtigsten Meridiane und die meistgenutzten Punkte einzeln vorstellen, inklusive dem, was du mit Akupressur selbst ausprobieren kannst.</p>',
    vorhandene: [
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
      { href: '/therapien/akupressur/', label: 'Akupressur', cat: 'Therapie' },
      { href: '/therapien/ohrakupunktur/', label: 'Ohrakupunktur', cat: 'Therapie' },
      { href: '/wissen/wie-lange-bleiben-akupunkturnadeln-drin/', label: 'Wie lange bleiben die Nadeln drin?', cat: 'Artikel' },
    ],
    geplant: ['Akupunkturpunkte: Überblick', 'Akupressurpunkte Hand', 'Akupressurpunkte Fuss', 'Lungenmeridian', 'Lebermeridian', 'Magenmeridian', 'Nierenmeridian', 'Dickdarmmeridian', 'Einzelne Punkte (z.B. Neiguan PC6, Hegu Di4, Zusanli Ma36)'],
  },
  {
    slug: 'diagnostik',
    nav: 'Diagnostik in der TCM',
    title: 'Diagnostik in der TCM',
    metaDesc: 'Zungendiagnose, Pulsdiagnose, TCM-Anamnese: wie eine TCM-Diagnose entsteht, was Therapeutinnen beobachten und was das Verfahren nicht leisten kann.',
    h1: 'Diagnostik in der TCM',
    lead: 'Puls tasten, Zunge anschauen, ausführlich fragen: So entsteht eine TCM-Einschätzung. Hier entsteht die Erklärung der traditionellen Diagnostik, ehrlich eingeordnet.',
    indexable: true,
    modellHinweis: true,
    introHtml: '<p>Die TCM-Diagnostik stützt sich auf Beobachtung: das Tasten des Pulses an beiden Handgelenken, das Betrachten von Zungenfarbe und Zungenbelag und eine ausführliche Anamnese zu Schlaf, Verdauung, Energie und Zyklus. Daraus entsteht die traditionelle Einordnung, nach der behandelt wird. Wichtig zur Abgrenzung: Diese Verfahren sind Einschätzungsinstrumente der chinesischen Medizin, keine medizinische Diagnostik. Blutwerte, Bildgebung und ärztliche Untersuchungen ersetzen sie nicht; was die Schulmedizin einsetzt, findest du unter <a href="/gesundheitsbibliothek/#diagnostik">Untersuchungen &amp; Diagnostik</a>.</p>',
    vorhandene: [
      { href: '/gesundheitsbibliothek/fragen/was-passiert-beim-ersten-termin/', label: 'Was passiert beim ersten Termin?', cat: 'Frage' },
      { href: '/gesundheitsbibliothek/fragen/erster-termin/', label: 'Erster Termin & Vorbereitung', cat: 'Fragen' },
      { href: '/gesundheitsbibliothek/untersuchungen/nervenleitmessung/', label: 'Nervenleitmessung (schulmedizinisch)', cat: 'Untersuchung' },
    ],
    geplant: ['Zungenfarbe und Zungenbelag im Detail', 'Die TCM-Anamnese', 'Wie eine TCM-Diagnose entsteht'],
  },
  {
    slug: 'methoden',
    nav: 'Methoden erklärt',
    title: 'TCM-Methoden erklärt',
    metaDesc: 'Akupressur, Gua Sha, Moxibustion, Schröpfen, Ohrakupunktur, Kräutertherapie: alle TCM-Methoden mit Wirkung, Ablauf und Kostenübernahme, an einem Ort.',
    h1: 'Methoden erklärt',
    lead: 'Von Akupressur bis Schröpfen: Jede Methode der chinesischen Medizin hat ihre eigene Seite mit Wirkung, Ablauf, Grenzen und Kostenübernahme. Hier ist der Überblick.',
    indexable: true,
    introHtml: '<p>Die Behandlungsmethoden sind der praktischste Einstieg in die chinesische Medizin, und sie sind auf TCM.ch bereits ausführlich erklärt. Diese Übersicht bündelt die bestehenden Methoden-Seiten und die vertiefenden Artikel dazu. Für Wirkung, Ablauf, Kosten und Grenzen einer Methode ist immer die verlinkte Hauptseite der richtige Ort.</p>',
    vorhandene: [
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
      { href: '/therapien/akupressur/', label: 'Akupressur', cat: 'Therapie' },
      { href: '/therapien/gua-sha/', label: 'Gua Sha', cat: 'Therapie' },
      { href: '/therapien/schroepfen/', label: 'Schröpfen', cat: 'Therapie' },
      { href: '/therapien/moxibustion/', label: 'Moxibustion (Moxa)', cat: 'Therapie' },
      { href: '/therapien/ohrakupunktur/', label: 'Ohrakupunktur', cat: 'Therapie' },
      { href: '/therapien/kraeutertherapie/', label: 'Chinesische Kräutertherapie', cat: 'Therapie' },
      { href: '/therapien/tuina/', label: 'Tuina', cat: 'Therapie' },
      { href: '/wissen/schroepfen-wirkung-flecken/', label: 'Schröpfen: Wirkung und Flecken', cat: 'Artikel' },
      { href: '/wissen/elektroakupunktur-wirkung/', label: 'Elektroakupunktur: Wirkung', cat: 'Artikel' },
      { href: '/wissen/dauernadeln-akupunktur/', label: 'Dauernadeln', cat: 'Artikel' },
      { href: '/wissen/dry-needling-vs-akupunktur/', label: 'Dry Needling vs. Akupunktur', cat: 'Artikel' },
      { href: '/gesundheitsbibliothek/fragen/schroepfen-methoden/', label: 'Häufige Fragen zu den Methoden', cat: 'Fragen' },
    ],
    geplant: [],
  },
];

export const tcmSectionBySlug = (slug: string) => tcmSections.find((s) => s.slug === slug);
