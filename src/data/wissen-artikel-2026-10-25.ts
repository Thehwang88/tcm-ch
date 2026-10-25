// Artikelpaket 25.10.2026: neun eigenständige Entscheidungsartikel unter /wissen/ (Akupunktur zur
// Raucherentwöhnung, Schröpfen bei Nackenschmerzen, Akupunktur bei Mundtrockenheit nach Bestrahlung,
// sechs Kräuter-Entscheidungen). Gleiches Modell wie wissen-kraeuter.ts (Wissen-Interface, FAQ und
// Quellen im bodyHtml, faqs: [] => kein FAQPage-Schema). KEIN Teil der Akupunktur-bei-Serie: für die
// beiden Akupunktur-Artikel gibt es keinen Beschwerden-Owner, den die Serienregeln verlangen.
// Datum bis Release ungesetzt (PUBLISHED_ARTIKEL_2026_10_25 in befunde-werte.ts).
// Quellenebene je Quelle in der Quellenliste; Bericht: seo/artikel-2026-10-25.md.
import type { Wissen } from './wissen';
import { PUBLISHED_ARTIKEL_2026_10_25 } from './befunde-werte';

const REDAKTION = {
  name: 'Redaktion TCM.ch',
  role: 'Redaktionelle Einordnung',
  bio: 'Redaktionelle Einordnung auf Basis der im Artikel verlinkten Quellen. Keine ärztliche Diagnose und keine individuelle Therapieempfehlung.',
};
const DATEN_P = { datePublished: PUBLISHED_ARTIKEL_2026_10_25 ?? '', dateModified: PUBLISHED_ARTIKEL_2026_10_25 ?? '' };

export const wissenArtikel25: Wissen[] = [
  {
    slug: 'akupunktur-raucherentwoehnung',
    title: 'Akupunktur zur Raucherentwöhnung: Was belegt ist',
    metaDesc: 'Hilft Akupunktur beim Rauchstopp? Was die Cochrane-Übersicht und die WHO-Leitlinie 2024 sagen, wo die Grenzen liegen und was nachweislich hilft.',
    region: 'Schweizweit',
    excerpt: 'Akupunktur wird oft als Hilfe beim Rauchstopp angeboten. Für die ersten Wochen gibt es schwache Hinweise, ein dauerhafter Nutzen ist nicht belegt. Was das für deine Entscheidung heisst.',
    category: 'Therapien verstehen',
    h1: 'Akupunktur zur Raucherentwöhnung: Hilft sie beim Rauchstopp?',
    lead: 'Du willst mit dem Rauchen aufhören und fragst dich, ob Akupunktur dabei hilft. Die Studienlage ist ernüchternd, aber nicht leer. Hier steht, was belegt ist und wie du Akupunktur einordnest, falls du sie ergänzend nutzen willst.',
    readingTime: '4 Min.',
    ctaTitle: 'Ergänzende Akupunktur zum Rauchstopp besprechen',
    ctaText: 'Schreib uns, wie dein Rauchstopp geplant ist und welche Unterstützung du bereits nutzt. Wir besprechen offen, ob eine ergänzende Akupunktur in deinen Plan passt und was sie nicht leisten kann.',
    ctaLabel: 'Anfrage senden',
    ctaHref: '/kontakt/',
    author: REDAKTION,
    ...DATEN_P,
    bodyHtml: `<h2>Kurz gesagt</h2>
<p>Eine Cochrane-Übersicht fand keine durchgehenden, unverzerrten Belege dafür, dass Akupunktur, Akupressur oder Laserbehandlung den Rauchstopp über sechs Monate oder länger unterstützen. Für die ersten Wochen gibt es schwache Hinweise auf einen kleinen Effekt. Die WHO-Leitlinie von 2024 hält die Evidenz für zu schwach, um traditionelle und komplementäre Verfahren zu empfehlen oder davon abzuraten.</p>
<p>Wenn du Akupunktur nutzen möchtest, dann als Ergänzung zu Beratung und, wenn passend, Medikamenten. Als Ersatz für diese nachweislich wirksamen Hilfen taugt sie nicht.</p>
<h2>Was die Cochrane-Übersicht zeigt</h2>
<p>Die Übersicht von 2014 wertete 38 randomisierte Studien aus. Im Vergleich mit Scheinakupunktur waren kurz nach der Behandlung etwas mehr Menschen rauchfrei, nach sechs bis zwölf Monaten zeigte sich kein gesicherter Unterschied. Die Studien galten nicht als frei von Verzerrungen, und grössere Studien zeigten eher kleinere Effekte. Akupunktur schnitt schlechter ab als Nikotinersatz und war psychologischer Unterstützung nicht überlegen. Elektrostimulation wirkte nicht besser als eine Scheinstimulation.</p>
<p>Bei Ohrverfahren mit Dauerreiz unterschied die Übersicht: Für dauerhafte Akupressur am Ohr gab es kurzfristige Hinweise auf einen Effekt, für Dauernadeln nicht. Über längere Zeit war ein Effekt nicht mehr gesichert.</p>
<h2>Was die WHO-Leitlinie 2024 sagt</h2>
<p>Die WHO hat 2024 ihre erste klinische Leitlinie zur Tabakentwöhnung bei Erwachsenen veröffentlicht. Sie empfiehlt Kurzberatung, intensivere Verhaltensunterstützung und Medikamente wie Vareniclin, Nikotinersatz, Bupropion und Cytisin, am besten kombiniert.</p>
<p>Zu traditionellen und komplementären Verfahren hält die Leitlinie fest, dass die Evidenz für eine Empfehlung dafür oder dagegen nicht ausreicht. Eine dafür aktualisierte Übersicht mit 71 Studien fand Hinweise niedriger Sicherheit auf einen kurzfristigen Effekt von Akupunktur gegenüber Scheinakupunktur. Ob ein Nutzen langfristig anhält, bewertet die WHO als unsicher. Wer solche Verfahren nutzt, soll zusätzlich Beratung und, wenn passend, Medikamente erhalten.</p>
<h2>Was das für deine Entscheidung heisst</h2>
<ul>
<li>Die Grundlage bilden ein klarer Plan, Beratung und, wenn passend, ärztlich oder in der Apotheke besprochene Medikamente.</li>
<li>Akupunktur kann ergänzend dazukommen, wenn du sie in einen solchen Plan einbaust.</li>
<li>Rechne nicht damit, dass Akupunktur das Verlangen zuverlässig verschwinden lässt. Einen dauerhaften Rauchstopp kann sie nicht versprechen.</li>
</ul>
<h2>Sicherheit</h2>
<p>Die WHO weist darauf hin, dass seltene schwere Komplikationen der Akupunktur beschrieben sind, und verlangt deshalb gut ausgebildete Fachpersonen. Typische Nebenwirkungen erklärt die Seite <a href="/gesundheitsbibliothek/fragen/akupunktur-nebenwirkungen/">Akupunktur: Nebenwirkungen</a>. Wie Dauernadeln im Ohr funktionieren und wo ihre Grenzen liegen, beschreibt <a href="/wissen/dauernadeln-akupunktur/">Dauernadeln in der Akupunktur</a>.</p>
<p>Zu Kosten und Zusatzversicherung: <a href="/krankenkassen/akupunktur/">Akupunktur und Krankenkasse</a>.</p>
<h2>Häufige Fragen</h2>
<h3>Hilft Akupunktur gegen das Verlangen nach der Zigarette?</h3>
<p>Die Studien deuten höchstens auf einen kleinen Effekt in den ersten Wochen hin. Dass Akupunktur das Rauchverlangen gezielt dämpft, ist nicht belegt.</p>
<h3>Kann ich Akupunktur mit Nikotinersatz kombinieren?</h3>
<p>Die WHO rät, ergänzende Verfahren in einen umfassenden Ansatz mit Beratung und, wenn passend, Medikamenten einzubetten. Welches Medikament zu dir passt, klärst du ärztlich oder in der Apotheke.</p>
<h3>Wie viele Sitzungen braucht es?</h3>
<p>Eine belegte Zahl gibt es nicht, weil kein dauerhafter Nutzen nachgewiesen ist. Wenn du es versuchst, vereinbare vorher einen Rauchstopp-Termin und einen Zeitpunkt, an dem ihr Bilanz zieht.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/24459016/" target="_blank" rel="noopener">White AR et al. Acupuncture and related interventions for smoking cessation. Cochrane Database of Systematic Reviews, 2014. CD000009.pub4. PMID 24459016. (PubMed-Abstract)</a></li>
<li><a href="https://www.who.int/publications/i/item/9789240096431" target="_blank" rel="noopener">WHO. WHO clinical treatment guideline for tobacco cessation in adults. Genf, 2024. ISBN 978-92-4-009643-1. (Volltext, Abschnitt 3.6, abgerufen 25. Oktober 2026)</a></li>
</ul>`,
    faqs: [],
    related: [
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
      { href: '/therapien/dauernadeln/', label: 'Dauernadeln', cat: 'Therapie' },
      { href: '/wissen/dauernadeln-akupunktur/', label: 'Dauernadeln in der Akupunktur', cat: 'Wissen' },
      { href: '/gesundheitsbibliothek/fragen/akupunktur-nebenwirkungen/', label: 'Akupunktur: Nebenwirkungen', cat: 'Frage' },
    ],
  },
  {
    slug: 'schroepfen-bei-nackenschmerzen',
    title: 'Schröpfen bei Nackenschmerzen: Was Studien zeigen',
    metaDesc: 'Hilft Schröpfen bei chronischen Nackenschmerzen? Was Metaanalysen und Vergleichsstudien zeigen, welche Vergleiche fehlen und wie du das einordnest.',
    region: 'Schweizweit',
    excerpt: 'Studien zeigen Linderung vor allem im Vergleich mit keiner zusätzlichen Behandlung. Gegen eine Entspannungsübung schnitt Schröpfmassage beim Schmerz nicht besser ab, und Scheinvergleiche fehlen weitgehend.',
    category: 'Therapien verstehen',
    h1: 'Schröpfen bei chronischen Nackenschmerzen: Was ist belegt?',
    lead: 'Dein Nacken schmerzt seit Monaten, und Schröpfen wird dir empfohlen. Es gibt viele Studien, aber sie sind klein und unterschiedlich gebaut. Entscheidend ist, womit Schröpfen jeweils verglichen wurde.',
    readingTime: '4 Min.',
    ctaTitle: 'Schröpfen als Ergänzung besprechen',
    ctaText: 'Beschreib kurz, seit wann der Nacken schmerzt, was abgeklärt ist und was du bereits machst. Wir besprechen offen, ob Schröpfen als Ergänzung passt und was du davon erwarten kannst.',
    ctaLabel: 'Anfrage senden',
    ctaHref: '/kontakt/',
    author: REDAKTION,
    ...DATEN_P,
    bodyHtml: `<h2>Kurz gesagt</h2>
<p>Übersichtsarbeiten finden bei chronischen Nackenschmerzen nach Schröpfen weniger Schmerzen und eine bessere Funktion, vor allem im Vergleich mit keiner zusätzlichen Behandlung. In einer Studie, die Schröpfmassage mit progressiver Muskelentspannung verglich, gab es beim Schmerz keinen signifikanten Unterschied. Vergleiche mit Scheinschröpfen fehlen weitgehend, und die Qualität der Studien ist überwiegend niedrig.</p>
<p>Schröpfen kommt deshalb höchstens als Ergänzung in einem umfassenderen Behandlungsplan infrage. Was bei Nackenschmerzen sonst wichtig ist, steht auf der Seite <a href="/beschwerden/nackenschmerzen/">Nackenschmerzen</a>.</p>
<h2>Welche Verfahren untersucht wurden</h2>
<p>Unter Schröpfen fallen verschiedene Techniken: trockenes Schröpfen mit stehenden Schröpfgläsern, die gleitende <a href="/wissen/schroepfmassage/">Schröpfmassage</a> und blutiges Schröpfen, bei dem die Haut zuvor angeritzt wird. Die Studien verwenden unterschiedliche Formen. Ein Ergebnis zu einer Technik lässt sich deshalb nicht ohne Weiteres auf eine andere übertragen. Das Verfahren selbst erklärt die Seite <a href="/therapien/schroepfen/">Schröpfen</a>.</p>
<h2>Was die Übersichtsarbeiten zeigen</h2>
<p>Eine Metaanalyse von 2018 im BMJ Open wertete 18 randomisierte Studien aus. Im Vergleich mit keiner Behandlung waren Schmerz und Funktion nach Schröpfen besser. Auch gegenüber aktiven Vergleichsbehandlungen und als Zusatz zu einer anderen Behandlung zeigte sich weniger Schmerz. Wegen der niedrigen Qualität der Studien sehen die Autorinnen und Autoren keine abschliessende Aussage. Im Volltext halten sie fest, dass eine Verblindung schwierig ist, weil Scheinschröpfen selten eingesetzt wird.</p>
<p>Eine Metaanalyse von 2026 schloss 9 randomisierte Studien mit 401 Erwachsenen ein, die seit mindestens drei Monaten Nackenschmerzen hatten. Verglichen wurden verschiedene Schröpfformen mit Kontrollbehandlungen. Schmerz und Funktion verbesserten sich, wobei die Belege für die Funktion stärker waren als für den Schmerz. Mehrere Studien hatten methodische Schwächen. Schwere Nebenwirkungen wurden nicht berichtet. Welche Kontrollbehandlungen genau verwendet wurden, schlüsselt die Zusammenfassung nicht auf.</p>
<h2>Was einzelne Vergleichsstudien zeigen</h2>
<p>In einer Studie mit 50 Personen erhielt die eine Gruppe fünf Schröpfmassagen zweimal pro Woche, die andere Gruppe wartete und behandelte wie bisher weiter. Nach der Behandlungsserie hatte die Schröpfgruppe weniger Nackenschmerzen und eine bessere Funktion. Eine Wartegruppe erhält aber keine zusätzliche Zuwendung und keine Behandlung, von der sie sich etwas verspricht.</p>
<p>In einer anderen Studie mit 61 Personen wendeten Partnerinnen oder Partner zu Hause zwölf Wochen lang eine Schröpfmassage an. Die Vergleichsgruppe übte progressive Muskelentspannung. Beide Gruppen hatten danach weniger Schmerzen, ohne signifikanten Unterschied zwischen den Gruppen. Beim Wohlbefinden und bei der Druckschmerzempfindlichkeit schnitt die Schröpfmassage besser ab.</p>
<h2>Wie du die Ergebnisse lesen kannst</h2>
<p>Je strenger der Vergleich, desto kleiner wird der Vorteil. Ob eine Besserung auf das Schröpfen selbst zurückgeht oder auf Zuwendung, Erwartung und Ruhe, lässt sich ohne Scheinvergleich nicht trennen. Die meisten Studien massen zudem kurz nach der Behandlungsserie. Über die Dauer einer Wirkung sagen sie wenig.</p>
<h2>Nebenwirkungen und Vorsicht</h2>
<p>Typisch sind runde Verfärbungen der Haut. Was sonst vorkommen kann, beschreibt <a href="/gesundheitsbibliothek/fragen/schroepfen-nebenwirkungen/">Schröpfen: Nebenwirkungen</a>. Nimmst du Blutverdünner, gehört das vor der Behandlung auf den Tisch; was dazu gilt, steht unter <a href="/gesundheitsbibliothek/fragen/akupunktur-blutverduenner/">Akupunktur mit Blutverdünnern</a> im Abschnitt zum Schröpfen.</p>
<h2>Häufige Fragen</h2>
<h3>Ist Schröpfen bei Nackenschmerzen besser als Massage?</h3>
<p>Ein direkter Vergleich mit klassischer Massage lag in den hier ausgewerteten Studien nicht vor. Wie sich die beiden Methoden unterscheiden, erklärt <a href="/wissen/schroepfen-oder-massage/">Schröpfen oder Massage?</a></p>
<h3>Wie lange hält die Wirkung an?</h3>
<p>Das lässt sich aus den Studien kaum sagen. Sie massen überwiegend direkt nach einer kurzen Behandlungsserie.</p>
<h3>Hinterlässt Schröpfen am Nacken sichtbare Flecken?</h3>
<p>Meist bleiben runde Verfärbungen für eine gewisse Zeit sichtbar. Woher sie kommen, erklärt <a href="/wissen/schroepfen-wirkung-flecken/">Schröpfen: Wirkung und Flecken</a>.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/42105092/" target="_blank" rel="noopener">Torad AA et al. Effect of cupping therapy on chronic neck pain: A systematic review and meta-analysis of randomized controlled trials. Journal of Back and Musculoskeletal Rehabilitation, 2026. PMID 42105092. DOI 10.1177/10538127261446411. (PubMed-Abstract)</a></li>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/30397006/" target="_blank" rel="noopener">Kim S et al. Is cupping therapy effective in patients with neck pain? A systematic review and meta-analysis. BMJ Open, 2018. PMID 30397006. (PubMed-Abstract, Volltext PMC6231582 zur Verblindung)</a></li>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/28219058/" target="_blank" rel="noopener">Saha FJ et al. The Effects of Cupping Massage in Patients with Chronic Neck Pain. A Randomised Controlled Trial. Complementary Medicine Research, 2017. PMID 28219058. (PubMed-Abstract)</a></li>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/23762355/" target="_blank" rel="noopener">Lauche R et al. Effectiveness of home-based cupping massage compared to progressive muscle relaxation in patients with chronic neck pain. PLoS One, 2013. PMID 23762355. (PubMed-Abstract)</a></li>
</ul>`,
    faqs: [],
    related: [
      { href: '/beschwerden/nackenschmerzen/', label: 'Nackenschmerzen', cat: 'Beschwerde' },
      { href: '/therapien/schroepfen/', label: 'Schröpfen', cat: 'Therapie' },
      { href: '/wissen/schroepfmassage/', label: 'Schröpfmassage', cat: 'Wissen' },
      { href: '/gesundheitsbibliothek/fragen/schroepfen-nebenwirkungen/', label: 'Schröpfen: Nebenwirkungen', cat: 'Frage' },
    ],
  },
  {
    slug: 'chinesische-kraeuter-bei-kniearthrose',
    title: 'Chinesische Kräuter bei Kniearthrose: Studienlage',
    metaDesc: 'Chinesische Kräuter bei Kniearthrose: Eine placebokontrollierte Studie fand keinen Vorteil gegenüber Placebo. Was das heisst und was bei Arthrose zuerst kommt.',
    region: 'Schweizweit',
    excerpt: 'In einer placebokontrollierten Studie mit einer chinesischen Rezeptur besserten sich Schmerz und Funktion in beiden Gruppen, mit der Rezeptur aber nicht stärker als mit Placebo.',
    category: 'Beschwerden verstehen',
    h1: 'Chinesische Kräuter bei Kniearthrose: Was zeigt die Studie?',
    lead: 'Dein Knie ist von Arthrose betroffen, und du überlegst, ob chinesische Kräuter die Schmerzen lindern könnten. Die beste hier ausgewertete Studie fällt negativ aus. Was das für deine Entscheidung bedeutet.',
    readingTime: '3 Min.',
    ctaTitle: 'Behandlungsplan bei Kniearthrose besprechen',
    ctaText: 'Nenne deine Diagnose, deine Medikamente und was du bereits machst. Wir besprechen offen, welche ergänzende Behandlung infrage kommt und was die Studienlage dazu sagt.',
    ctaLabel: 'Anfrage senden',
    ctaHref: '/kontakt/',
    author: REDAKTION,
    ...DATEN_P,
    bodyHtml: `<h2>Kurz gesagt</h2>
<p>Eine randomisierte, doppelblinde Studie an mehreren Zentren prüfte die chinesische Rezeptur Huo-Luo-Xiao-Ling-Dan gegen Placebo. Nach acht Wochen hatten beide Gruppen weniger Schmerzen und eine bessere Funktion, die Rezeptur aber nicht mehr als das Placebo. Die Autorinnen und Autoren halten fest: Sie war sicher anzuwenden, aber Placebo nicht überlegen.</p>
<p>Das Ergebnis gilt für diese eine Rezeptur. Es zeigt aber, dass ein positiver Eindruck im Alltag nicht genügt, um eine Wirkung der Kräuter zu belegen. Das Beschwerdebild erklärt die Seite <a href="/beschwerden/gonarthrose/">Gonarthrose</a>.</p>
<h2>Was die Studie genau zeigte</h2>
<p>Die Studie lief in zwei Stufen. In der ersten erhielten 28 Personen sechs Wochen lang eine niedrige Dosis oder Placebo; ein Unterschied zeigte sich nicht. Auf Empfehlung des unabhängigen Sicherheitsgremiums wurde die Studie neu angelegt. In der zweiten Stufe erhielten 92 Personen acht Wochen lang eine höhere Dosis oder Placebo.</p>
<p>Gemessen wurden Knieschmerz und Funktion mit einem etablierten Fragebogen sowie die Gesamteinschätzung der Teilnehmenden. Alle Werte verbesserten sich in beiden Gruppen deutlich, ohne signifikanten Unterschied zwischen den Gruppen. Beim Schmerz sank der Wert mit der Rezeptur im Mittel um 1,2 Punkte, mit Placebo um 1,4 Punkte. Schwere Nebenwirkungen traten nicht auf.</p>
<h2>Was das Ergebnis bedeutet</h2>
<p>Dass sich auch die Placebogruppe besserte, zeigt, wie stark Erwartung, Zuwendung und natürliche Schwankungen bei Arthroseschmerzen mitwirken. Für die Frage, ob die Kräuter selbst etwas beitragen, zählt der Unterschied zwischen den Gruppen. Der war in dieser Studie nicht nachweisbar. Für andere Rezepturen sagt das Ergebnis weder Wirkung noch Unwirksamkeit aus; sie müssten eigens geprüft sein.</p>
<h2>Was bei Kniearthrose zuerst kommt</h2>
<p>Nach britischer Patienteninformation ist Arthrose nicht heilbar, verschlechtert sich aber nicht zwingend. Zu den wichtigsten Behandlungen gehören regelmässige Bewegung mit Kräftigungsübungen und, bei Übergewicht, eine Gewichtsabnahme. Dazu kommen je nach Situation Schmerzmittel und Physiotherapie; eine Operation wird nur in wenigen Fällen erwogen. Ob Akupunktur eine Ergänzung sein kann, ordnet der Artikel <a href="/wissen/akupunktur-bei-knieschmerzen/">Akupunktur bei Knieschmerzen</a> eigens ein.</p>
<h2>Wenn du Kräuter trotzdem erwägst</h2>
<p>Nenne alle Medikamente, auch Schmerzmittel und Blutverdünner, damit Wechselwirkungen geprüft werden können; Hintergrund dazu unter <a href="/gesundheitsbibliothek/fragen/tcm-kraeuter-nebenwirkungen/">TCM-Kräuter: Nebenwirkungen</a>. Vereinbare ein konkretes Alltagsziel und einen Prüfzeitpunkt. Bleibt eine Veränderung aus, ist mehr vom Gleichen keine sinnvolle Antwort.</p>
<h2>Häufige Fragen</h2>
<h3>Bauen chinesische Kräuter Knorpel wieder auf?</h3>
<p>Dafür gibt es keinen Beleg. Die Studie mass Schmerz und Funktion, nicht den Knorpel, und fand auch dort keinen Vorteil gegenüber Placebo.</p>
<h3>Warum ging es der Placebogruppe auch besser?</h3>
<p>Arthroseschmerzen schwanken, und Erwartung und Zuwendung wirken mit. Genau deshalb braucht es den Vergleich mit Placebo, um eine Wirkung der Kräuter selbst zu erkennen.</p>
<h3>Gibt es andere Rezepturen mit besseren Ergebnissen?</h3>
<p>Hier wurde nur diese eine placebokontrollierte Studie ausgewertet. Ein Ergebnis zu einer anderen Rezeptur müsste eigens geprüft werden und gilt nicht automatisch für chinesische Kräuter insgesamt.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/26099553/" target="_blank" rel="noopener">Lao L et al. Huo-Luo-Xiao-Ling (HLXL)-Dan, a Traditional Chinese Medicine, for patients with osteoarthritis of the knee: a multi-site, randomized, double-blind, placebo-controlled phase II clinical trial. Osteoarthritis and Cartilage, 2015. PMID 26099553. DOI 10.1016/j.joca.2015.06.007. (PubMed-Abstract)</a></li>
<li><a href="https://www.nhs.uk/conditions/osteoarthritis/treatment/" target="_blank" rel="noopener">NHS. Osteoarthritis: Treatment. (Patienteninformation, Volltext, abgerufen 25. Oktober 2026)</a></li>
</ul>`,
    faqs: [],
    related: [
      { href: '/beschwerden/gonarthrose/', label: 'Gonarthrose', cat: 'Beschwerde' },
      { href: '/wissen/akupunktur-bei-knieschmerzen/', label: 'Akupunktur bei Knieschmerzen', cat: 'Wissen' },
      { href: '/therapien/kraeutertherapie/', label: 'Kräutertherapie', cat: 'Therapie' },
      { href: '/gesundheitsbibliothek/fragen/tcm-kraeuter-nebenwirkungen/', label: 'TCM-Kräuter: Nebenwirkungen', cat: 'Frage' },
    ],
  },
  {
    slug: 'chinesische-kraeuter-bei-nesselsucht',
    title: 'Chinesische Kräuter bei chronischer Nesselsucht',
    metaDesc: 'Chinesische Kräuter bei chronischer Urtikaria: Was eine placebokontrollierte Studie als Zusatz zum Antihistaminikum zeigte und wo die Grenzen der Daten liegen.',
    region: 'Schweizweit',
    excerpt: 'Als Zusatz zu einem Antihistaminikum linderte eine Kräuterkombination in einer kleinen Studie die Nesselsucht etwas stärker als Placebo. Die Lebensqualität unterschied sich nicht.',
    category: 'Beschwerden verstehen',
    h1: 'Chinesische Kräuter bei chronischer Nesselsucht: Was ist belegt?',
    lead: 'Die Quaddeln kommen seit Langem immer wieder, und du überlegst, ob chinesische Kräuter neben dem Antihistaminikum helfen können. Es gibt einzelne Studien, aber sie sind klein und betreffen bestimmte Rezepturen.',
    readingTime: '4 Min.',
    ctaTitle: 'Kräuterberatung bei chronischer Nesselsucht anfragen',
    ctaText: 'Nenne deine Diagnose, deine Medikamente und wie lange die Nesselsucht besteht. Wir klären, ob eine ergänzende Kräuterberatung infrage kommt. Umfang und Kosten werden vorab besprochen.',
    ctaLabel: 'Anfrage senden',
    ctaHref: '/kontakt/',
    author: REDAKTION,
    ...DATEN_P,
    bodyHtml: `<h2>Kurz gesagt</h2>
<p>In einer kleinen, doppelblinden Studie bekamen Menschen mit chronischer Nesselsucht zusätzlich zum Antihistaminikum eine Kombination aus zwei chinesischen Rezepturen oder ein Placebo. Nach acht Wochen war die Krankheitsaktivität in der Kräutergruppe etwas niedriger. Bei der Lebensqualität und in der Nachbeobachtung gab es keinen gesicherten Unterschied.</p>
<p>Die Kräuter wurden als Zusatz geprüft, nicht als Ersatz. Für eine andere Rezeptur gilt das Ergebnis nicht automatisch. Ursachen, Abklärung und Warnzeichen erklärt die Seite <a href="/beschwerden/nesselsucht/">Nesselsucht</a>.</p>
<h2>Worum es hier geht</h2>
<p>Dieser Artikel betrifft die chronische Nesselsucht, also immer wiederkehrende Quaddeln über lange Zeit. Eine akute allergische Reaktion ist etwas anderes; Warnzeichen und Abklärung beschreibt die Seite zur Nesselsucht. Ob Akupunktur bei chronischer Nesselsucht hilft, ordnet der Artikel <a href="/wissen/akupunktur-bei-nesselsucht/">Akupunktur bei Nesselsucht</a> gesondert ein.</p>
<h2>Was die placebokontrollierte Studie zeigte</h2>
<p>78 Personen wurden für die Studie geprüft; ausgewertet wurden 56, die das Protokoll eingehalten hatten. Die eine Gruppe nahm vier Wochen lang die Kräuterkombination und Levocetirizin ein, danach vier Wochen nur Levocetirizin. Die andere Gruppe erhielt Placebo und Levocetirizin.</p>
<p>Am Tag 56 lag der Wochenwert für die Nesselsucht-Aktivität in der Kräutergruppe bei 9,9 Punkten, in der Placebogruppe bei 15,6 Punkten. Dieser Unterschied war statistisch signifikant. Die Lebensqualität besserte sich in beiden Gruppen, ohne signifikanten Unterschied. Sechs Monate nach Studienende berichteten 36 % der Kräutergruppe und 20 % der Placebogruppe keinen Rückfall oder eine deutliche Besserung; dieser Unterschied war nicht signifikant. Die Kräuter wurden gut vertragen.</p>
<p>Die Autorinnen und Autoren sprechen von einer Pilotstudie und halten grössere Studien mit längerer Nachbeobachtung für nötig. Dass nur die Teilnehmenden ausgewertet wurden, die das Protokoll einhielten, kann das Ergebnis zugunsten der Kräuter verzerren.</p>
<h2>Was eine Metaanalyse ergänzt</h2>
<p>Eine Metaanalyse von 2025 fasste 14 Studien mit 1’192 Personen aus den Jahren 2013 bis 2023 zusammen. Die Gesamtwirksamkeit, ein in solchen Studien häufig grob definierter Endpunkt, fiel mit chinesischer Medizin besser aus. Beim Symptomwert zeigte sich dagegen kein signifikanter Unterschied. Die Autorinnen und Autoren bemängeln selbst die fehlende Standardisierung der Wirksamkeitsmessung.</p>
<h2>Was das für deine Entscheidung heisst</h2>
<ul>
<li>Die Grundlage bleibt die ärztlich abgestimmte Behandlung, in der Regel mit Antihistaminika. Änderungen daran gehören ärztlich besprochen.</li>
<li>Kräuter kommen höchstens ergänzend infrage, mit einer konkret benannten Rezeptur und einem vereinbarten Prüfzeitpunkt.</li>
<li>Nenne alle Medikamente. Wechselwirkungen und mögliche Leberbelastungen erklären <a href="/gesundheitsbibliothek/fragen/tcm-kraeuter-nebenwirkungen/">TCM-Kräuter: Nebenwirkungen</a> und <a href="/gesundheitsbibliothek/fragen/tcm-kraeuter-leber/">Können TCM-Kräuter die Leber schädigen?</a></li>
</ul>
<h2>Häufige Fragen</h2>
<h3>Kann ich das Antihistaminikum durch Kräuter ersetzen?</h3>
<p>Nein. In der Studie wurden die Kräuter zusätzlich zum Antihistaminikum gegeben. Ob sie allein etwas bewirken, wurde nicht untersucht.</p>
<h3>Hält eine Besserung nach dem Absetzen an?</h3>
<p>Das ist nicht belegt. In der Nachbeobachtung nach sechs Monaten war der Unterschied zwischen den Gruppen nicht signifikant.</p>
<h3>Gilt das Ergebnis für jede Kräuterrezeptur?</h3>
<p>Nein. Die Studie prüfte eine bestimmte Kombination aus zwei Rezepturen. Andere Mischungen brauchen eigene Belege.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/30618764/" target="_blank" rel="noopener">Yang SH et al. The Efficacy and Safety of a Fixed Combination of Chinese Herbal Medicine in Chronic Urticaria: A Randomized, Double-Blind, Placebo-Controlled Pilot Study. Frontiers in Pharmacology, 2018. PMID 30618764. DOI 10.3389/fphar.2018.01474. (PubMed-Abstract)</a></li>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/40527813/" target="_blank" rel="noopener">Chen R et al. Treatment of chronic urticaria with traditional Chinese medicine: A systematic review, meta-analysis, and medication regularity. Medicine (Baltimore), 2025. PMID 40527813. (PubMed-Abstract)</a></li>
</ul>`,
    faqs: [],
    related: [
      { href: '/beschwerden/nesselsucht/', label: 'Nesselsucht', cat: 'Beschwerde' },
      { href: '/wissen/akupunktur-bei-nesselsucht/', label: 'Akupunktur bei Nesselsucht', cat: 'Wissen' },
      { href: '/therapien/kraeutertherapie/', label: 'Kräutertherapie', cat: 'Therapie' },
      { href: '/gesundheitsbibliothek/fragen/tcm-kraeuter-nebenwirkungen/', label: 'TCM-Kräuter: Nebenwirkungen', cat: 'Frage' },
    ],
  },
  {
    slug: 'chinesische-kraeuter-bei-bandscheibenvorfall',
    title: 'Chinesische Kräuter bei Bandscheibenvorfall (LWS)',
    metaDesc: 'Chinesische Kräuter bei lumbalem Bandscheibenvorfall: Was eine Studie als Zusatz zu einem Schmerzmittel zeigte, was offen bleibt und wann sofort Abklärung nötig ist.',
    region: 'Schweizweit',
    excerpt: 'Als Zusatz zu einem Entzündungshemmer verbesserten sich Schmerz und Funktion mit einer Rezeptur etwas stärker als mit Placebo. Ob der Vorfall selbst beeinflusst wird, wurde nicht untersucht.',
    category: 'Beschwerden verstehen',
    h1: 'Chinesische Kräuter bei Bandscheibenvorfall: Was zeigt die Forschung?',
    lead: 'Bei dir wurde ein Bandscheibenvorfall in der Lendenwirbelsäule festgestellt, und du fragst dich, ob chinesische Kräuter die Schmerzen lindern können. Es gibt eine kontrollierte Studie, die du kennen solltest, mit klaren Grenzen.',
    readingTime: '4 Min.',
    ctaTitle: 'Ergänzende Behandlung abgestimmt besprechen',
    ctaText: 'Nenne deine Diagnose, deine Medikamente und wer dich behandelt. Wir besprechen offen, ob eine ergänzende Behandlung passt. Bei Warnzeichen gehört die Abklärung zuerst ärztlich.',
    ctaLabel: 'Anfrage senden',
    ctaHref: '/kontakt/',
    author: REDAKTION,
    ...DATEN_P,
    bodyHtml: `<h2>Kurz gesagt</h2>
<p>In einer randomisierten Studie erhielten Menschen mit Rückenschmerzen durch einen lumbalen Bandscheibenvorfall zwei Wochen lang ein entzündungshemmendes Schmerzmittel, zusätzlich entweder eine chinesische Rezeptur oder Placebo. Mit der Rezeptur besserten sich Schmerz und Funktion etwas stärker, auch acht Wochen nach Behandlungsende.</p>
<p>Die Studie zeigt einen Zusatznutzen zu einem Schmerzmittel, keinen Nutzen der Kräuter allein. Ob sich der Vorfall zurückbildet oder eine Operation vermieden wird, wurde nicht untersucht. Grundlagen zum Beschwerdebild stehen auf der Seite <a href="/beschwerden/bandscheibenvorfall/">Bandscheibenvorfall</a>.</p>
<h2>Zuerst: Wann sofort Hilfe nötig ist</h2>
<p>Nach britischer Patienteninformation gehören Rückenschmerzen sofort in die Notaufnahme, wenn zusätzlich Taubheit im Gesäss- oder Genitalbereich auftritt, du nicht Wasser lassen kannst, das Gefühl in einem oder beiden Beinen verloren geht, du Blase oder Darm nicht mehr kontrollieren kannst oder die Schmerzen nach einem schweren Unfall begonnen haben. In der Schweiz erreichst du den Notruf unter 144.</p>
<h2>Was die Studie zeigte</h2>
<p>Die Studie lief 2023 an einem einzelnen Zentrum. 206 Personen schlossen die Behandlung ab: 104 erhielten das Schmerzmittel Celecoxib mit der Rezeptur Bushen Huoxue, 102 Celecoxib mit Placebo. Gemessen wurden Schmerz, Funktion im Alltag, Beweglichkeit, ein Gehtest sowie Angst und Depressivität, am Ende der zweiwöchigen Behandlung sowie vier und acht Wochen danach.</p>
<p>Der Funktionswert war in der Kräutergruppe zu allen drei Zeitpunkten günstiger, nach acht Wochen zum Beispiel 10,3 gegenüber 12,8 Punkten. Auch Schmerz, ein weiterer Funktionsfragebogen, der Gehtest und die Beweglichkeit schnitten besser ab. Bei Angst und Depressivität gab es keinen Unterschied.</p>
<h2>Was offen bleibt</h2>
<p>Die Unterschiede zwischen den Gruppen sind eher klein. Ob sie im Alltag spürbar sind, beantwortet die Zusammenfassung nicht. Die Studie war kurz, stammt aus einem einzigen Zentrum und prüfte eine bestimmte Rezeptur. Bildgebung des Vorfalls war kein Messpunkt.</p>
<h2>Was in der Behandlung zuerst kommt</h2>
<p>Nach britischer Patienteninformation bessert sich ein Bandscheibenvorfall meist langsam. Hilfreich sind Aktivbleiben, sanfte Bewegung und Schmerzmittel. Ärztlich abklären solltest du, wenn Schmerzmittel nicht helfen oder es nach einigen Wochen nicht besser wird. Ob Akupunktur bei ausstrahlenden Schmerzen ergänzen kann, ordnet <a href="/wissen/akupunktur-bei-ischias/">Akupunktur bei Ischias</a> ein.</p>
<p>Wenn du Kräuter ergänzend erwägst, nenne alle Medikamente, insbesondere Schmerzmittel und Blutverdünner. Hintergrund zu Wechselwirkungen: <a href="/gesundheitsbibliothek/fragen/tcm-kraeuter-nebenwirkungen/">TCM-Kräuter: Nebenwirkungen</a>.</p>
<h2>Häufige Fragen</h2>
<h3>Bildet sich der Vorfall durch Kräuter zurück?</h3>
<p>Dafür gibt es keinen Beleg. Die Studie mass Beschwerden und Funktion, nicht den Vorfall selbst.</p>
<h3>Kann ich mit Kräutern eine Operation vermeiden?</h3>
<p>Das beantwortet die Studie nicht. Ob eine Operation nötig ist, entscheidest du mit deiner Ärztin oder deinem Arzt.</p>
<h3>Ersetzen die Kräuter das Schmerzmittel?</h3>
<p>Nein. In der Studie wurden sie zusätzlich zu Celecoxib gegeben. Eine Wirkung der Kräuter allein wurde nicht untersucht.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/38363892/" target="_blank" rel="noopener">Yang S et al. A randomized controlled trial: The efficacy and safety of Bushen Huoxue formula in the management of lower back pain from lumbar disc herniation. Medicine (Baltimore), 2024. PMID 38363892. DOI 10.1097/MD.0000000000037293. (PubMed-Abstract)</a></li>
<li><a href="https://www.nhs.uk/conditions/slipped-disc/" target="_blank" rel="noopener">NHS. Slipped disc. (Patienteninformation, Volltext, abgerufen 25. Oktober 2026)</a></li>
</ul>`,
    faqs: [],
    related: [
      { href: '/beschwerden/bandscheibenvorfall/', label: 'Bandscheibenvorfall', cat: 'Beschwerde' },
      { href: '/wissen/akupunktur-bei-ischias/', label: 'Akupunktur bei Ischias', cat: 'Wissen' },
      { href: '/therapien/kraeutertherapie/', label: 'Kräutertherapie', cat: 'Therapie' },
      { href: '/gesundheitsbibliothek/fragen/tcm-kraeuter-nebenwirkungen/', label: 'TCM-Kräuter: Nebenwirkungen', cat: 'Frage' },
    ],
  },
  {
    slug: 'akupunktur-bei-mundtrockenheit-nach-bestrahlung',
    title: 'Akupunktur bei Mundtrockenheit nach Bestrahlung',
    metaDesc: 'Chronische Mundtrockenheit nach Bestrahlung im Kopf-Hals-Bereich: Was eine grosse Studie zu Akupunktur, Scheinakupunktur und Mundpflege zeigte.',
    region: 'Schweizweit',
    excerpt: 'In einer Studie mit 258 Personen linderte echte Akupunktur die Mundtrockenheit stärker als Mundpflege allein. Gegenüber Scheinakupunktur war der Unterschied nach strenger Auswertung nicht gesichert.',
    category: 'Beschwerden verstehen',
    h1: 'Akupunktur bei Mundtrockenheit nach Bestrahlung: Was ist belegt?',
    lead: 'Nach einer Strahlentherapie im Kopf-Hals-Bereich bleibt der Mund bei vielen dauerhaft trocken. Wenn du überlegst, ob Akupunktur ergänzend helfen kann, lohnt sich ein genauer Blick auf eine grosse neuere Studie.',
    readingTime: '4 Min.',
    ctaTitle: 'Ergänzende Akupunktur in der Nachsorge besprechen',
    ctaText: 'Nenne deine Diagnose, wann die Bestrahlung endete und wer dich in der Nachsorge betreut. Wir besprechen offen, ob eine ergänzende Akupunktur passt und was sie leisten kann.',
    ctaLabel: 'Anfrage senden',
    ctaHref: '/kontakt/',
    author: REDAKTION,
    ...DATEN_P,
    bodyHtml: `<h2>Kurz gesagt</h2>
<p>Eine grosse randomisierte Studie verglich bei chronischer Mundtrockenheit nach Bestrahlung im Kopf-Hals-Bereich echte Akupunktur, Scheinakupunktur und Mundpflege allein. Nach vier Wochen hatte die Gruppe mit echter Akupunktur weniger Beschwerden als die Gruppe mit Mundpflege allein. Gegenüber Scheinakupunktur war der Unterschied nach Korrektur für mehrere Vergleiche nicht statistisch gesichert.</p>
<p>Akupunktur kommt deshalb als Ergänzung in der Nachsorge infrage. Eine spezifische Wirkung der Nadeln über die Behandlungssituation hinaus ist nicht sicher belegt.</p>
<h2>Worum es hier geht</h2>
<p>Dieser Artikel betrifft die anhaltende Mundtrockenheit nach einer Strahlentherapie bei Kopf-Hals-Krebs. Gelegentlich trockener Mund, etwa nachts, hat oft andere Gründe; dazu mehr unter <a href="/koerpersignale/trockener-mund-nachts/">Trockener Mund in der Nacht</a>. Auch das Sjögren-Syndrom ist ein eigenes Krankheitsbild, für das diese Studie nichts aussagt.</p>
<h2>Was die grosse Studie zeigte</h2>
<p>Die 2024 veröffentlichte Studie lief an 33 Standorten in den USA. Teilgenommen haben 258 Personen, deren Bestrahlung mindestens zwölf Monate zurücklag und die eine Mundtrockenheit vom Grad 2 oder 3 hatten. Alle erhielten eine Standard-Mundpflege. Je 86 Personen bekamen zusätzlich echte Akupunktur, Scheinakupunktur oder nichts weiter. Behandelt wurde zweimal pro Woche während vier Wochen, bei leichtem Ansprechen weitere vier Wochen.</p>
<p>Hauptmesspunkt war ein Fragebogen zu den Beschwerden nach vier Wochen. Echte Akupunktur schnitt besser ab als Mundpflege allein; dieser Unterschied hielt auch der strengen Korrektur für drei Vergleiche stand. Gegenüber Scheinakupunktur war der Unterschied kleiner und nach dieser Korrektur nicht mehr statistisch gesichert. Zwischen Scheinakupunktur und Mundpflege allein gab es nach vier Wochen keinen Unterschied.</p>
<p>Nach acht und zwölf Wochen war echte Akupunktur der Mundpflege allein weiterhin überlegen. Nach 26 Wochen hatte nur noch die Gruppe mit Scheinakupunktur niedrigere Werte als die Gruppe mit Mundpflege allein; weitere Unterschiede bestanden nicht. Schwere Nebenwirkungen traten nicht auf.</p>
<h2>Was eine ältere Übersicht ergänzt</h2>
<p>Eine Cochrane-Übersicht von 2013 fand nur kleine Studien mit hohem Verzerrungsrisiko. Zwei auswertbare Studien mit zusammen 70 Personen zeigten keinen klaren Unterschied bei den Beschwerden zwischen Akupunktur und Kontrolle. Leichte, vorübergehende Nebenwirkungen wie kleine Blutergüsse und Müdigkeit kamen mit Akupunktur häufiger vor.</p>
<h2>Was das für deine Entscheidung heisst</h2>
<ul>
<li>Mundpflege und die Nachsorge durch dein Behandlungsteam bleiben die Grundlage. In der Studie erhielten alle eine Standard-Mundpflege.</li>
<li>Akupunktur kann ergänzend erwogen werden. Ein Teil der Besserung lässt sich nicht sicher den Nadeln selbst zuschreiben, und der Vorteil war nach einem halben Jahr nicht mehr nachweisbar.</li>
<li>Sprich die Behandlung mit deinem onkologischen Team ab. Was bei laufender Krebstherapie zu klären ist, steht unter <a href="/gesundheitsbibliothek/fragen/akupunktur-waehrend-chemotherapie/">Akupunktur während der Chemotherapie</a>.</li>
</ul>
<h2>Häufige Fragen</h2>
<h3>Wird die Speichelproduktion wieder normal?</h3>
<p>Das zeigt die Studie nicht. Ihr Hauptmesspunkt waren die Beschwerden im Fragebogen, nicht die Speichelmenge. Die Cochrane-Übersicht fand für die Speichelmenge nur sehr kleine Effekte in kleinen Studien.</p>
<h3>Kann ich schon während der Bestrahlung mit Akupunktur beginnen?</h3>
<p>Diese Studie schloss nur Personen ein, deren Bestrahlung mindestens ein Jahr zurücklag. Für die Zeit während der Bestrahlung sagt sie nichts aus. Kläre das mit deinem Behandlungsteam.</p>
<h3>Hilft das auch bei Mundtrockenheit durch Sjögren?</h3>
<p>Dafür liefert diese Studie keine Aussage. Sjögren ist eine andere Erkrankung mit eigener Behandlung.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/38739392/" target="_blank" rel="noopener">Cohen L et al. Acupuncture for Chronic Radiation-Induced Xerostomia in Head and Neck Cancer: A Multicenter Randomized Clinical Trial. JAMA Network Open, 2024. PMID 38739392. DOI 10.1001/jamanetworkopen.2024.10421. (Volltext PMC11091764)</a></li>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/23996155/" target="_blank" rel="noopener">Furness S et al. Interventions for the management of dry mouth: non-pharmacological interventions. Cochrane Database of Systematic Reviews, 2013. CD009603. PMID 23996155. (PubMed-Abstract)</a></li>
</ul>`,
    faqs: [],
    related: [
      { href: '/therapien/akupunktur/', label: 'Akupunktur', cat: 'Therapie' },
      { href: '/gesundheitsbibliothek/fragen/akupunktur-waehrend-chemotherapie/', label: 'Akupunktur während der Chemotherapie', cat: 'Frage' },
      { href: '/koerpersignale/trockener-mund-nachts/', label: 'Trockener Mund in der Nacht', cat: 'Körpersignal' },
      { href: '/gesundheitsbibliothek/fragen/akupunktur-nebenwirkungen/', label: 'Akupunktur: Nebenwirkungen', cat: 'Frage' },
    ],
  },
  {
    slug: 'chinesische-kraeuter-bei-hashimoto',
    title: 'Chinesische Kräuter bei Hashimoto: Studienlage',
    metaDesc: 'Chinesische Kräuter bei Hashimoto: Was Metaanalysen zu Antikörpern und Beschwerden zeigen, warum Laborwerte kein Heilungsnachweis sind und was für L-Thyroxin gilt.',
    region: 'Schweizweit',
    excerpt: 'Studien berichten vor allem über gesunkene Antikörper und bessere Beschwerdewerte, meist als Zusatz zur üblichen Behandlung. Die Qualität ist niedrig, und Laborwerte sind kein Nachweis für Heilung.',
    category: 'Beschwerden verstehen',
    h1: 'Chinesische Kräuter bei Hashimoto: Was zeigen die Studien?',
    lead: 'Du hast Hashimoto, nimmst vielleicht Schilddrüsenhormone und suchst nach zusätzlicher Unterstützung. Chinesische Kräuter werden dafür untersucht, doch die Studien messen oft etwas anderes, als dich im Alltag interessiert.',
    readingTime: '4 Min.',
    ctaTitle: 'Kräuterberatung bei Hashimoto anfragen',
    ctaText: 'Nenne deine Diagnose, deine aktuelle Medikation und deine letzten Laborwerte. Wir klären, ob eine ergänzende Kräuterberatung infrage kommt, abgestimmt auf deine ärztliche Behandlung.',
    ctaLabel: 'Anfrage senden',
    ctaHref: '/kontakt/',
    author: REDAKTION,
    ...DATEN_P,
    bodyHtml: `<h2>Kurz gesagt</h2>
<p>Zwei Metaanalysen von 2024 werten Studien zu chinesischen Kräutern bei Hashimoto aus. Sie berichten über niedrigere Schilddrüsen-Antikörper, bessere Beschwerdewerte und bei Unterfunktion günstigere Schilddrüsenwerte, meist wenn Kräuter zusätzlich zur üblichen Behandlung gegeben wurden. Die Autorinnen und Autoren der neueren Analyse bewerten die Ergebnisse als vorläufig.</p>
<p>Gesunkene Antikörper sind kein Nachweis dafür, dass die Erkrankung heilt oder dass du weniger Schilddrüsenhormon brauchst. Grundlagen zum Krankheitsbild stehen auf der Seite <a href="/beschwerden/hashimoto/">Hashimoto</a>.</p>
<h2>Was die Metaanalysen zeigen</h2>
<p>Die erste Analyse schloss 18 randomisierte Studien mit 1’247 Personen ein, die Hashimoto mit Unterfunktion hatten. Verglichen wurde chinesische Kräutermedizin zusammen mit der üblichen Behandlung gegen die übliche Behandlung allein. Die Kombination schnitt bei der Gesamtwirksamkeit, bei Beschwerdewerten, bei den Schilddrüsenhormonen und beim TSH besser ab. Nebenwirkungen traten nicht häufiger auf.</p>
<p>Die zweite, eine Netzwerk-Metaanalyse, verglich 16 Studien mit 16 verschiedenen Rezepturen. Alle bis auf eine senkten die TPO-Antikörper stärker als eine Behandlung ohne Medikamente, und alle verbesserten einen Beschwerdewert nach chinesischer Medizin. Schwere Nebenwirkungen wurden nicht berichtet. Die Autorinnen und Autoren halten fest, dass die Ergebnisse vorläufig sind und durch hochwertige Studien bestätigt werden müssen.</p>
<h2>Warum Laborwerte nicht alles sind</h2>
<p>TPO-Antikörper zeigen, dass das Immunsystem die Schilddrüse angreift. Was erhöhte Werte bedeuten, erklärt <a href="/gesundheitsbibliothek/befunde-werte/tpo-antikoerper-erhoeht/">TPO-Antikörper erhöht</a>. Ob niedrigere Antikörper den weiteren Verlauf verbessern oder die Hormonbehandlung überflüssig machen, belegen diese Studien nicht. Auch die verwendeten Beschwerdewerte und die Gesamtwirksamkeit sind grobe Masse, die je nach Studie unterschiedlich definiert sind.</p>
<p>Weil 16 verschiedene Rezepturen untersucht wurden, lässt sich aus den Analysen keine allgemeine Kräuterempfehlung ableiten. Ein Ergebnis gilt jeweils für die geprüfte Rezeptur.</p>
<h2>Was für Schilddrüsenhormone gilt</h2>
<p>Ändere die Dosis von L-Thyroxin nie selbst und setze es nicht ab. In den Studien zur Unterfunktion wurden die Kräuter zusätzlich gegeben. Informiere deine Ärztin oder deinen Arzt über alle Präparate, die du einnimmst, damit Laborkontrollen richtig eingeordnet werden. Hintergrund zu Wechselwirkungen: <a href="/gesundheitsbibliothek/fragen/tcm-kraeuter-nebenwirkungen/">TCM-Kräuter: Nebenwirkungen</a>.</p>
<h2>Häufige Fragen</h2>
<h3>Kann ich L-Thyroxin durch Kräuter ersetzen?</h3>
<p>Nein. In den Studien zur Unterfunktion ergänzten die Kräuter die übliche Behandlung. Ein Ersatz wurde nicht geprüft.</p>
<h3>Sinken meine Antikörper mit Kräutern?</h3>
<p>Studien berichten das für verschiedene Rezepturen, bei insgesamt niedriger Qualität. Ob dir ein niedrigerer Wert im Alltag etwas bringt, ist damit nicht belegt.</p>
<h3>Woran merke ich, ob eine Behandlung etwas bringt?</h3>
<p>Vereinbare vorab konkrete Ziele, etwa zu Müdigkeit oder Verdauung, und einen Prüfzeitpunkt. Die Laborkontrollen bleiben bei deiner Ärztin oder deinem Arzt.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/36942566/" target="_blank" rel="noopener">Tao YX et al. Efficacy of Chinese medicine in the adjuvant treatment of Hashimoto's thyroiditis with hypothyroidism: a systematic review and meta-analysis. Biotechnology and Genetic Engineering Reviews, 2024. PMID 36942566. (PubMed-Abstract)</a></li>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/38181936/" target="_blank" rel="noopener">Luo J et al. Herbal medicine for Hashimoto's thyroiditis: A systematic review and network meta-analysis. Journal of Ethnopharmacology, 2024. PMID 38181936. (PubMed-Abstract)</a></li>
</ul>`,
    faqs: [],
    related: [
      { href: '/beschwerden/hashimoto/', label: 'Hashimoto', cat: 'Beschwerde' },
      { href: '/gesundheitsbibliothek/befunde-werte/tpo-antikoerper-erhoeht/', label: 'TPO-Antikörper erhöht', cat: 'Befund' },
      { href: '/therapien/kraeutertherapie/', label: 'Kräutertherapie', cat: 'Therapie' },
      { href: '/gesundheitsbibliothek/fragen/tcm-kraeuter-nebenwirkungen/', label: 'TCM-Kräuter: Nebenwirkungen', cat: 'Frage' },
    ],
  },
  {
    slug: 'chinesische-kraeuter-bei-fettleber',
    title: 'Chinesische Kräuter bei Fettleber (MASLD)',
    metaDesc: 'Chinesische Kräuter bei Fettleber: Was eine placebokontrollierte Studie zu Leberfett und Leberwerten zeigte und warum der Lebensstil die Grundlage bleibt.',
    region: 'Schweizweit',
    excerpt: 'Eine Rezeptur senkte in einer Studie Leberfett und Leberwerte stärker als Placebo. Ob das langfristig Leberschäden verhindert, wurde nicht untersucht.',
    category: 'Beschwerden verstehen',
    h1: 'Chinesische Kräuter bei Fettleber: Was ist belegt?',
    lead: 'Im Ultraschall oder bei den Leberwerten ist eine Fettleber aufgefallen, und du fragst dich, ob chinesische Kräuter helfen können. Eine neuere Studie liefert Daten, die man genau lesen muss.',
    readingTime: '4 Min.',
    ctaTitle: 'Begleitung bei Fettleber besprechen',
    ctaText: 'Nenne deine Befunde, deine Medikamente und wer dich ärztlich betreut. Wir besprechen offen, ob eine ergänzende Begleitung passt. Die Kontrolle der Leberwerte bleibt ärztlich.',
    ctaLabel: 'Anfrage senden',
    ctaHref: '/kontakt/',
    author: REDAKTION,
    ...DATEN_P,
    bodyHtml: `<h2>Kurz gesagt</h2>
<p>In einer doppelblinden Studie mit 130 Personen senkte die chinesische Rezeptur Yinchenhao-Dekokt über 24 Wochen den Fettanteil der Leber, mehrere Leberwerte und den Body-Mass-Index stärker als Placebo. Schwere Nebenwirkungen traten nicht auf.</p>
<p>Die Studie mass Zwischenwerte wie Leberfett und Laborwerte. Ob die Rezeptur Vernarbung, Zirrhose oder andere Folgen verhindert, wurde nicht untersucht. Nach der europäischen Leitlinie bleiben Gewichtsabnahme, Ernährung, Bewegung und die Behandlung von Begleiterkrankungen die Grundlage. Mehr zum Krankheitsbild auf der Seite <a href="/beschwerden/fettleber/">Fettleber</a>.</p>
<h2>Was MASLD bedeutet</h2>
<p>MASLD ist die heutige Bezeichnung für die stoffwechselbedingte Fettleber, früher NAFLD genannt. Gemeint ist Fett in der Leber zusammen mit mindestens einem Risikofaktor für Herz-Kreislauf- und Stoffwechselerkrankungen, ohne schädlichen Alkoholkonsum. Die Erkrankung reicht von reiner Verfettung über Entzündung bis zu Vernarbung und Zirrhose.</p>
<h2>Was die Studie zeigte</h2>
<p>130 Personen mit Fettleber erhielten zufällig zugeteilt 24 Wochen lang Yinchenhao-Dekokt als Granulat oder ein Placebo. Hauptmesspunkt war der Fettanteil der Leber in der Magnetresonanztomografie. Nach 24 Wochen waren der Fettanteil, ein Ultraschall-Messwert für Leberfett, die Leberwerte ALT, AST und ALP sowie der Body-Mass-Index in der Kräutergruppe deutlicher gesunken als mit Placebo.</p>
<p>Wie gross die Unterschiede waren, nennt die Zusammenfassung nicht. Die Studie prüfte eine bestimmte Rezeptur über ein halbes Jahr. Ob sich der Effekt mit anderen Rezepturen, über längere Zeit oder bei fortgeschrittener Erkrankung zeigt, bleibt offen.</p>
<h2>Was nach der Leitlinie zuerst kommt</h2>
<p>Die gemeinsame europäische Leitlinie von 2024 empfiehlt bei MASLD Gewichtsabnahme, Ernährungsumstellung, Bewegung und den Verzicht auf schädlichen Alkoholkonsum. Begleiterkrankungen wie Diabetes oder Übergewicht sollen gut behandelt werden, je nach Situation auch medikamentös. Um eine Vernarbung früh zu erkennen, nennt die Leitlinie Blutwert-Scores und anschliessend bildgebende Verfahren wie die <a href="/gesundheitsbibliothek/untersuchungen/leberelastografie/">Leberelastografie</a>.</p>
<h2>Kräuter und Leber: Vorsicht</h2>
<p>Gerade bei einer Lebererkrankung ist die Sicherheit von Kräutern wichtig. Einzelne chinesische Arzneimittel sind mit Leberschäden in Verbindung gebracht worden; mehr dazu unter <a href="/gesundheitsbibliothek/fragen/tcm-kraeuter-leber/">Können TCM-Kräuter die Leber schädigen?</a> Eine Kräuterbehandlung gehört deshalb abgestimmt, mit regelmässigen Kontrollen der Leberwerte durch deine Ärztin oder deinen Arzt.</p>
<h2>Häufige Fragen</h2>
<h3>Können Kräuter die Gewichtsabnahme ersetzen?</h3>
<p>Nein. Die Leitlinie nennt den Lebensstil als Grundlage. In der Studie ist zudem nicht geklärt, wie viel des Effekts auf die ebenfalls gesunkene Körpermasse zurückgeht.</p>
<h3>Sinken meine Leberwerte mit Kräutern?</h3>
<p>In dieser Studie sanken sie mit der geprüften Rezeptur stärker als mit Placebo. Ob das langfristig vor Folgeschäden schützt, ist nicht belegt.</p>
<h3>Ist es riskant, bei Fettleber Kräuter einzunehmen?</h3>
<p>Ein Risiko besteht, weil einzelne Kräuter die Leber schädigen können. Deshalb gehören Rezeptur, Produktqualität und Laborkontrollen in eine abgestimmte Behandlung.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/41905832/" target="_blank" rel="noopener">Xu FP et al. Yinchenhao Decoction, a compound Chinese herbal medicine, for patients with nonalcoholic fatty liver disease: A randomized, double-blind, placebo-controlled trial. Journal of Integrative Medicine, 2026. PMID 41905832. DOI 10.1016/j.joim.2026.03.003. (PubMed-Abstract)</a></li>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/38851997/" target="_blank" rel="noopener">EASL, EASD, EASO. Clinical Practice Guidelines on the management of metabolic dysfunction-associated steatotic liver disease (MASLD). Journal of Hepatology, 2024. PMID 38851997. (PubMed-Abstract)</a></li>
</ul>`,
    faqs: [],
    related: [
      { href: '/beschwerden/fettleber/', label: 'Fettleber', cat: 'Beschwerde' },
      { href: '/gesundheitsbibliothek/befunde-werte/leberwerte-erhoeht/', label: 'Leberwerte erhöht', cat: 'Befund' },
      { href: '/gesundheitsbibliothek/fragen/tcm-kraeuter-leber/', label: 'Können TCM-Kräuter die Leber schädigen?', cat: 'Frage' },
      { href: '/therapien/kraeutertherapie/', label: 'Kräutertherapie', cat: 'Therapie' },
    ],
  },
  {
    slug: 'chinesische-kraeuter-bei-colitis-ulcerosa',
    title: 'Chinesische Kräuter bei Colitis ulcerosa: Risiken',
    metaDesc: 'Chinesische Kräuter bei Colitis ulcerosa: Was die Studie zu Indigo naturalis zeigte, warum sie abgebrochen wurde und was das für Selbstversuche bedeutet.',
    region: 'Schweizweit',
    excerpt: 'Indigo naturalis wirkte in einer Studie deutlich, die Studie wurde aber wegen eines ernsten Sicherheitssignals abgebrochen. Ein Beispiel, warum Wirkung und Sicherheit zusammengehören.',
    category: 'Beschwerden verstehen',
    h1: 'Chinesische Kräuter bei Colitis ulcerosa: Wirkung und Risiken',
    lead: 'Du lebst mit Colitis ulcerosa und liest von chinesischen Kräutern, die die Entzündung beruhigen sollen. Das bekannteste Beispiel zeigt, warum eine Wirkung allein nicht reicht.',
    readingTime: '4 Min.',
    ctaTitle: 'Ergänzende Behandlung abgestimmt besprechen',
    ctaText: 'Nenne deine Diagnose, deine Medikamente und wer dich gastroenterologisch betreut. Wir besprechen offen, ob eine ergänzende Behandlung passt, abgestimmt auf deine laufende Therapie.',
    ctaLabel: 'Anfrage senden',
    ctaHref: '/kontakt/',
    author: REDAKTION,
    ...DATEN_P,
    bodyHtml: `<h2>Kurz gesagt</h2>
<p>Indigo naturalis, auch Qing Dai genannt, führte in einer placebokontrollierten Studie aus Japan bei aktiver Colitis ulcerosa deutlich häufiger zu einem Ansprechen als Placebo. Die Studie wurde trotzdem abgebrochen: Bei einer Person, die das Mittel selbst gekauft und über Monate eingenommen hatte, war Lungenhochdruck aufgetreten. Die Autorinnen und Autoren rieten, Indigo naturalis vorerst nicht einzusetzen.</p>
<p>Daraus folgt nicht, dass jede chinesische Rezeptur gefährlich oder wirksam ist. Es folgt, dass Wirkung und Sicherheit für jedes Mittel eigens geprüft sein müssen und dass Selbstversuche bei Colitis ulcerosa riskant sind. Grundlagen zur Erkrankung stehen auf der Seite <a href="/beschwerden/colitis-ulcerosa/">Colitis ulcerosa</a>.</p>
<h2>Was die Studie zeigte</h2>
<p>86 Personen mit aktiver Colitis ulcerosa erhielten acht Wochen lang 0,5, 1 oder 2 Gramm Indigo naturalis pro Tag oder Placebo. Ein klinisches Ansprechen erreichten 13,6 % mit Placebo und 69,6 bis 81,0 % mit Indigo naturalis, je nach Dosis. Eine Remission erreichten 4,5 % mit Placebo, 55,0 % mit 1 Gramm und 38,1 % mit 2 Gramm. Auch die Schleimhaut heilte häufiger ab.</p>
<p>Bei 10 Personen mit Indigo naturalis traten leichte Leberfunktionsstörungen auf. Abgebrochen wurde die Studie aus einem äusseren Grund: wegen eines Berichts über Lungenhochdruck bei einer Person, die Indigo naturalis ausserhalb der Studie selbst gekauft und sechs Monate lang eingenommen hatte.</p>
<h2>Was über das Sicherheitssignal bekannt ist</h2>
<p>Eine japanische Auswertung von 2025 beschreibt 20 Personen, bei denen nach Einnahme von Qing Dai ein Lungenhochdruck festgestellt wurde. Sie hatten das Mittel im Median 4,8 Jahre eingenommen. Nach dem Absetzen und mit Medikamenten gegen Lungenhochdruck besserten sich die Kreislaufwerte im Mittel deutlich, bei 7 von 20 blieb der Lungenhochdruck trotz Behandlung bestehen. Laut dieser Auswertung führen die europäischen Leitlinien zum Lungenhochdruck von 2022 Qing Dai als Mittel, das mit Lungenhochdruck in Verbindung gebracht wird.</p>
<h2>Was das für deine Entscheidung heisst</h2>
<ul>
<li>Kaufe und nimm Indigo naturalis nicht auf eigene Faust ein.</li>
<li>Wenn du Qing Dai eingenommen hast oder einnimmst, sag das deiner Gastroenterologin oder deinem Gastroenterologen.</li>
<li>Kräuter ersetzen die Colitis-Behandlung nicht. Setze verordnete Medikamente nicht ab. Eine ergänzende Kräuterbehandlung gehört offen mit deinem Behandlungsteam abgestimmt.</li>
<li>Qualität und Herkunft der Kräuter sind wichtig; mehr dazu unter <a href="/wissen/chinesische-kraeuter-qualitaet-schweiz/">Qualität chinesischer Kräuter in der Schweiz</a>.</li>
</ul>
<h2>Häufige Fragen</h2>
<h3>Darf ich Indigo naturalis selbst einnehmen?</h3>
<p>Davon ist abzuraten. Die Studienautorinnen und Studienautoren empfehlen, das Mittel wegen möglicher Nebenwirkungen wie Lungenhochdruck vorerst nicht einzusetzen.</p>
<h3>Gilt die Warnung für alle chinesischen Kräuter?</h3>
<p>Nein. Sie betrifft Indigo naturalis. Andere Rezepturen sind damit weder als sicher noch als gefährlich belegt; jede braucht eigene Daten. Allgemeines zu Nebenwirkungen erklärt <a href="/gesundheitsbibliothek/fragen/tcm-kraeuter-nebenwirkungen/">TCM-Kräuter: Nebenwirkungen</a>.</p>
<h3>Können Kräuter meine Colitis-Medikamente ersetzen?</h3>
<p>Nein. Dafür gibt es keinen Beleg. Änderungen an der Therapie entscheidest du mit deinem Behandlungsteam.</p>
<h2>Quellen</h2>
<ul>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/29174928/" target="_blank" rel="noopener">Naganuma M et al. Efficacy of Indigo Naturalis in a Multicenter Randomized Controlled Trial of Patients With Ulcerative Colitis. Gastroenterology, 2018. PMID 29174928. DOI 10.1053/j.gastro.2017.11.024. (PubMed-Abstract)</a></li>
<li><a href="https://pubmed.ncbi.nlm.nih.gov/41403416/" target="_blank" rel="noopener">Isobe S et al. Long-term outcomes of Qing-Dai-induced pulmonary arterial hypertension. ERJ Open Research, 2025. PMID 41403416. (PubMed-Abstract)</a></li>
</ul>`,
    faqs: [],
    related: [
      { href: '/beschwerden/colitis-ulcerosa/', label: 'Colitis ulcerosa', cat: 'Beschwerde' },
      { href: '/gesundheitsbibliothek/fragen/tcm-kraeuter-nebenwirkungen/', label: 'TCM-Kräuter: Nebenwirkungen', cat: 'Frage' },
      { href: '/wissen/chinesische-kraeuter-qualitaet-schweiz/', label: 'Qualität chinesischer Kräuter', cat: 'Wissen' },
      { href: '/therapien/kraeutertherapie/', label: 'Kräutertherapie', cat: 'Therapie' },
    ],
  },
];
